namespace FilterConstructor

open Elmish
open Fable.Import

module R = Fable.Helpers.React
module RN = Fable.Helpers.ReactNative


module CombinedFilterInput =

  type Shape<'scalar, 'distance, 'point, 'rgbaVector> =
    | Scalar of 'scalar
    | Distance of 'distance
    | Point of 'point
    | RGBAVector of 'rgbaVector

  type Model = Shape<FilterScalarInput.Model,
                     FilterDistanceInput.Model,
                     FilterPointInput.Model,
                     FilterRGBAVectorInput.Model>

  type Message = Shape<FilterScalarInput.Message,
                       FilterDistanceInput.Message,
                       FilterPointInput.Message,
                       FilterRGBAVectorInput.Message>
  

  let initScalar min max name =
    Scalar (FilterScalarInput.init name min max)

  let initDistance toDistance min max name =
    Distance (FilterDistanceInput.init name toDistance min max)

  let initPoint toPoint min max name =
    Point (FilterPointInput.init name toPoint min max)

  let initRGBAVector min max name =
    RGBAVector (FilterRGBAVectorInput.init name min max)

  let update (message: Message) (model: Model) : Model * Sub<Message> list =
    match (model, message) with
    | Scalar model', Scalar message' ->
      let m, cmd = FilterScalarInput.update message' model'
      (Scalar m), Cmd.map Scalar cmd
    | Scalar _, _ -> model, []

    | Distance model', Distance message' ->
      let m, cmd = FilterDistanceInput.update message' model'
      (Distance m), Cmd.map Distance cmd
    | Distance _, _ -> model, []

    | Point model', Point message' ->
      let m, cmd = FilterPointInput.update message' model'
      (Point m), Cmd.map Point cmd
    | Point _, _ -> model, []

    | RGBAVector model', RGBAVector message' ->
      let m, cmd = FilterRGBAVectorInput.update message' model'
      (RGBAVector m), Cmd.map RGBAVector cmd
    | RGBAVector _, _ -> model, []

  let view (model: Model) (dispatch: Dispatch<Message>) : React.ReactElement =
    match model with
    | Scalar model' -> FilterScalarInput.view model' (Scalar >> dispatch)
    | Distance model' -> FilterDistanceInput.view model' (Distance >> dispatch)
    | Point model' -> FilterPointInput.view model' (Point >> dispatch)
    | RGBAVector model' -> FilterRGBAVectorInput.view model' (RGBAVector >> dispatch)
