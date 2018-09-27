namespace FilterConstructor

open Elmish
open Fable.Import


module CombinedFilterArrayInput =

  type Shape<'scalar, 'color> =
    | Scalar of 'scalar
    | Color of 'color

  type Model = Shape<FilterScalarArrayInput.Model,
                     FilterColorArrayInput.Model>

  type Message = Shape<FilterScalarArrayInput.Message,
                       FilterColorArrayInput.Message>
  

  let initScalar defaultMin defaultMax defaultValue inputs name =
    Scalar (FilterScalarArrayInput.init name inputs defaultMin defaultMax defaultValue)
  
  let initColor defaultValue inputs name =
    Color (FilterColorArrayInput.init name inputs defaultValue)


  let update (message: Message) (model: Model) : Model * Sub<Message> list =
    match (model, message) with
    | Scalar model', Scalar message' ->
      let m, cmd = FilterArrayInput.update message' model'
      (Scalar m), Cmd.map Scalar cmd
    | Scalar _, _ -> model, []

    | Color model', Color message' ->
      let m, cmd = FilterArrayInput.update message' model'
      (Color m), Cmd.map Color cmd
    | Color _, _ -> model, []


  let view (model: Model) (dispatch: Dispatch<Message>) : React.ReactElement =
    match model with
    | Scalar model' -> FilterArrayInput.view model' (Scalar >> dispatch)
    | Color model' -> FilterArrayInput.view model' (Color >> dispatch)
