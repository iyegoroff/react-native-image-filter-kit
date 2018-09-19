namespace FilterConstructor

open Elmish
open Fable.Import


module CombinedFilteredImage =

  type Shape<'singular, 'composition> =
    | Singular of 'singular
    | Composition of 'composition

  type Model = Shape<SingularFilteredImage.Model,
                     FilteredImageComposition.Model>

  type Message = Shape<SingularFilteredImage.Message,
                       FilteredImageComposition.Message>

  let initSingular image =
    Singular (SingularFilteredImage.init image)

  let initComposition filter images dependencies filterSelectModal =
    Composition (FilteredImageComposition.init filter images dependencies filterSelectModal)

  let withDependent (model: Model) id =
    match model with
    | Composition image -> Composition { image with Dependent = id }
    | Singular image -> Singular { image with Dependent = id }

  let imageNode (model: Model) =
    match model with
    | Composition image -> FilteredImageComposition.Composition image.Image
    | Singular image -> FilteredImageComposition.Singular image.Image

  let isDependent =
    function
    | Composition _ -> true
    | _ -> false

  let isDependency (model: Model) =
    match model with
    | Composition image -> image.Dependent.IsSome
    | Singular image -> image.Dependent.IsSome

  let isDependencyFor (model: Model) id =
    match model with
    | Composition image -> Option.exists ((=) id) image.Dependent
    | Singular image -> Option.exists ((=) id) image.Dependent

  let filters (model: Model) =
    match model with
    | Composition image -> image.Image.Filters
    | Singular image -> image.Image.Filters

  let dependencies (model: Model) =
    match model with
    | Composition image -> image.Dependencies
    | Singular image -> image.Dependencies

  let update (message: Message) (model: Model) : Model * Sub<Message> list =
    match (model, message) with
    | Singular model', Singular message' ->
      let m, cmd = SingularFilteredImage.update message' model'
      (Singular m), Cmd.map Singular cmd
    | Singular _, _ -> model, []

    | Composition model', Composition message' ->
      let m, cmd = FilteredImageComposition.update message' model'
      (Composition m), Cmd.map Composition cmd
    | Composition _, _ -> model, []

  let view (model: Model) (dispatch: Dispatch<Message>) : React.ReactElement =
    match model with
    | Singular model' -> SingularFilteredImage.view model' (Singular >> dispatch)
    | Composition model' -> FilteredImageComposition.view model' (Composition >> dispatch)
