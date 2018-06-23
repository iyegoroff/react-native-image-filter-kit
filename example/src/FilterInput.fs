namespace FilterConstructor

open Elmish
open Fable.Core
open Fable.Helpers.ReactNative.Props
open Fable.Helpers.ReactNativeImageFilterKit.Props
module R = Fable.Helpers.React
module RN = Fable.Helpers.ReactNative


module FilterInput =

  type ModelShape<'T> =
    { Name: string
      Value: 'T
      Min: 'T
      Max: 'T }

  type Model =
    | Distance of ModelShape<IDistance>
    | Point of ModelShape<Point>
    | Scalar of ModelShape<float>

  type Message =
    | ValueChanged of Model
    | FilterInputSliderMessage of (float -> Model) * FilterInputSlider.Message
    

  [<Emit("parseFloat($0)")>]
  let distanceToFloat (_: IDistance): float = jsNative
  
  let private averageScalar min max =
    (min + max) / 2.

  let private averageDistance min max =
    Distance.Dip (averageScalar (distanceToFloat min) (distanceToFloat max))

  let private averagePoint min max =
    { x = averageDistance min.x max.x
      y = averageDistance min.y max.y }

  let private init case average name min max : Model =
    case { Name = name
           Min = min
           Max = max
           Value = average min max }

  let initScalar =
    init Scalar averageScalar

  let initDistance =
    init Distance averageDistance

  let initPoint =
    init Point averagePoint

  let update (message: Message) (model: Model) =
    match message with
    | ValueChanged model' ->
      model', []

    | FilterInputSliderMessage (convert, msg) ->
      match msg with
      | FilterInputSlider.ValueChanged value ->
        model, [ Cmd.ofMsg (ValueChanged (convert value)) ]

  let private updateScalar shape value =
    Scalar { shape with Value = value }

  let private updateDistance shape value =
    Distance { shape with Value = Distance.Dip value }

  let private updatePointX shape value =
    Point { shape with Value = { shape.Value with x = Distance.Dip value } }

  let private updatePointY shape value =
    Point { shape with Value = { shape.Value with y = Distance.Dip value } }


  let view (model: Model) (dispatch: Dispatch<Message>) =
    match model with
    | Distance shape ->
      FilterInputSlider.view
        shape.Name
        ""
        (distanceToFloat shape.Value)
        (distanceToFloat shape.Min)
        (distanceToFloat shape.Max)
        (fun msg -> dispatch (FilterInputSliderMessage (updateDistance shape, msg)))

    | Point shape ->
      R.fragment
        []
        [ FilterInputSlider.view
            (sprintf "%s.x" shape.Name)
            ""
            (distanceToFloat shape.Value.x)
            (distanceToFloat shape.Min.x)
            (distanceToFloat shape.Max.x)
            (fun msg -> dispatch (FilterInputSliderMessage (updatePointX shape, msg)))
          FilterInputSlider.view
            (sprintf "%s.y" shape.Name)
            ""
            (distanceToFloat shape.Value.y)
            (distanceToFloat shape.Min.y)
            (distanceToFloat shape.Max.y)
            (fun msg -> dispatch (FilterInputSliderMessage (updatePointY shape, msg))) ]

    | Scalar shape ->
      FilterInputSlider.view
        shape.Name
        ""
        shape.Value
        shape.Min
        shape.Max
        (fun msg -> dispatch (FilterInputSliderMessage (updateScalar shape, msg)))
