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

  let initComposition images =
    Composition (FilteredImageComposition.init images)

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
