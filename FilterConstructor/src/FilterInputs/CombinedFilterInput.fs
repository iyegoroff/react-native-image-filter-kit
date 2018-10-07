namespace FilterConstructor

open Elmish
open Fable.Import


module CombinedFilterInput =

  type Shape<'scalar, 'distance, 'point, 'rgbaVector, 'boolean, 'color, 'offset, 'array, 'enum> =
    | Scalar of 'scalar
    | Distance of 'distance
    | Point of 'point
    | RGBAVector of 'rgbaVector
    | Boolean of 'boolean
    | Color of 'color
    | Offset of 'offset
    | Array of 'array
    | Enum of 'enum

  type Model = Shape<FilterScalarInput.Model,
                     FilterDistanceInput.Model,
                     FilterPointInput.Model,
                     FilterRGBAVectorInput.Model,
                     FilterBooleanInput.Model,
                     FilterColorInput.Model,
                     FilterOffsetInput.Model,
                     CombinedFilterArrayInput.Model,
                     CombinedFilterEnumInput.Model>

  type Message = Shape<FilterScalarInput.Message,
                       FilterDistanceInput.Message,
                       FilterPointInput.Message,
                       FilterRGBAVectorInput.Message,
                       FilterBooleanInput.Message,
                       FilterColorInput.Message,
                       FilterOffsetInput.Message,
                       CombinedFilterArrayInput.Message,
                       CombinedFilterEnumInput.Message>
  

  let initScalar min max value name =
    Scalar (FilterScalarInput.init min max value name)

  let initScalarStepper min max value step name =
    Scalar (FilterScalarInput.initStepper min max value step name)

  let initDistance toDistance min max value name =
    Distance (FilterDistanceInput.init toDistance min max value name)

  let initPoint toPoint min max value name =
    Point (FilterPointInput.init toPoint min max value name)

  let initRGBAVector min max value name =
    RGBAVector (FilterRGBAVectorInput.init min max value name)

  let initBoolean name =
    Boolean (FilterBooleanInput.init false name)
    
  let initColor value name =
    Color (FilterColorInput.init value name)

  let initOffset min max value name =
    Offset (FilterOffsetInput.init min max value name)

  let initScalarArray defaultMin defaultMax defaultValue inputs name =
    Array (CombinedFilterArrayInput.initScalar defaultMin defaultMax defaultValue inputs name)

  let initColorArray defaultValue inputs name =
    Array (CombinedFilterArrayInput.initColor defaultValue inputs name)

  let initTileModeEnum value name =
    Enum (CombinedFilterEnumInput.initTileMode value name)

  let initPorterDuffModeEnum value name =
    Enum (CombinedFilterEnumInput.initPorterDuffMode value name)

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

    | Array model', Array message' ->
      let m, cmd = CombinedFilterArrayInput.update message' model'
      (Array m), Cmd.map Array cmd
    | Array _, _ -> model, []

    | Enum model', Enum message' ->
      let m, cmd = CombinedFilterEnumInput.update message' model'
      (Enum m), Cmd.map Enum cmd
    | Enum _, _ -> model, []

  let view (model: Model) (dispatch: Dispatch<Message>) : React.ReactElement =
    match model with
    | Scalar model' -> FilterScalarInput.view model' (Scalar >> dispatch)
    | Distance model' -> FilterDistanceInput.view model' (Distance >> dispatch)
    | Point model' -> FilterPointInput.view model' (Point >> dispatch)
    | RGBAVector model' -> FilterRGBAVectorInput.view model' (RGBAVector >> dispatch)
    | Boolean model' -> FilterBooleanInput.view model' (Boolean >> dispatch)
    | Color model' -> FilterColorInput.view model' (Color >> dispatch)
    | Offset model' -> FilterOffsetInput.view model' (Offset >> dispatch)
    | Array model' -> CombinedFilterArrayInput.view model' (Array >> dispatch)
    | Enum model' -> CombinedFilterEnumInput.view model' (Enum >> dispatch)
