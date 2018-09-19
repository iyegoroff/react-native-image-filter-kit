namespace FilterConstructor

open Elmish
open Fable.Import


module CombinedFilterInput =

  type Shape<'scalar, 'distance, 'point, 'rgbaVector, 'boolean, 'color, 'offset> =
    | Scalar of 'scalar
    | Distance of 'distance
    | Point of 'point
    | RGBAVector of 'rgbaVector
    | Boolean of 'boolean
    | Color of 'color
    | Offset of 'offset

  type Model = Shape<FilterScalarInput.Model,
                     FilterDistanceInput.Model,
                     FilterPointInput.Model,
                     FilterRGBAVectorInput.Model,
                     FilterBooleanInput.Model,
                     FilterColorInput.Model,
                     FilterOffsetInput.Model>

  type Message = Shape<FilterScalarInput.Message,
                       FilterDistanceInput.Message,
                       FilterPointInput.Message,
                       FilterRGBAVectorInput.Message,
                       FilterBooleanInput.Message,
                       FilterColorInput.Message,
                       FilterOffsetInput.Message>
  

  let initScalar min max value name =
    Scalar (FilterScalarInput.init name min max value)

  let initDistance toDistance min max value name =
    Distance (FilterDistanceInput.init name toDistance min max value)

  let initPoint toPoint min max value name =
    Point (FilterPointInput.init name toPoint min max value)

  let initRGBAVector min max value name =
    RGBAVector (FilterRGBAVectorInput.init name min max value)

  let initBoolean name =
    Boolean (FilterBooleanInput.init name false)
    
  let initColor value name =
    Color (FilterColorInput.init name value)

  let initOffset min max value name =
    Offset (FilterOffsetInput.init name min max value)

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

    | Boolean model', Boolean message' ->
      let m, cmd = FilterBooleanInput.update message' model'
      (Boolean m), Cmd.map Boolean cmd
    | Boolean _, _ -> model, []

    | Color model', Color message' ->
      let m, cmd = FilterColorInput.update message' model'
      (Color m), Cmd.map Color cmd
    | Color _, _ -> model, []

    | Offset model', Offset message' ->
      let m, cmd = FilterOffsetInput.update message' model'
      (Offset m), Cmd.map Offset cmd
    | Offset _, _ -> model, []

  let view (model: Model) (dispatch: Dispatch<Message>) : React.ReactElement =
    match model with
    | Scalar model' -> FilterScalarInput.view model' (Scalar >> dispatch)
    | Distance model' -> FilterDistanceInput.view model' (Distance >> dispatch)
    | Point model' -> FilterPointInput.view model' (Point >> dispatch)
    | RGBAVector model' -> FilterRGBAVectorInput.view model' (RGBAVector >> dispatch)
    | Boolean model' -> FilterBooleanInput.view model' (Boolean >> dispatch)
    | Color model' -> FilterColorInput.view model' (Color >> dispatch)
    | Offset model' -> FilterOffsetInput.view model' (Offset >> dispatch)
