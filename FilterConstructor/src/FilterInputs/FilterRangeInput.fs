namespace FilterConstructor

open Elmish
open Fable.Import

module R = Fable.Helpers.React
module RN = Fable.Helpers.ReactNative
module RNF = Fable.Import.ReactNativeImageFilterKit


module FilterRangeInput =

  [<CustomEquality>]
  [<NoComparison>]
  type Model<'v, 'r when 'r : equality> =
    { Name: string
      Value: 'r
      Min: 'r
      Max: 'r
      Convert: 'r -> 'v
      Step: float }
    override _x.GetHashCode() = 0
    override x.Equals(yObj) =
      match yObj with
      | :? Model<'v, 'r> as y -> 
        x.Name = y.Name && x.Value = y.Value && x.Min = y.Min && x.Max = y.Max && x.Step = y.Step
      | _ -> false

  type Message<'model> =
    | ValueChanged of 'model
    | FilterInputSliderMessage of (float -> 'model) * FilterInputSlider.Message

  let init convert name min max value : Model<'a, 'b> =
    Utils.invariant (value >= min && value <= max) "FilterRangeInput.init: value"
    { Name = name
      Min = min
      Max = max
      Value = value
      Convert = convert
      Step = 0. }

  let initStepper convert name min max value step : Model<'a, 'b> =
    { init convert name min max value with Step = step }

  let update (message: Message<Model<'v, 'r>>) (model: Model<'v, 'r>) =
    match message with
    | ValueChanged model' ->
      model', []

    | FilterInputSliderMessage (update, msg) ->
      match msg with
      | FilterInputSlider.ValueChanged value ->
        model, Cmd.ofMsg (ValueChanged (update value))


  let sliderView
    (model: Model<'v, 'r>)
    namePattern
    extractValue
    updateValue
    (dispatch: Dispatch<Message<Model<'v, 'r>>>) =
      FilterInputSlider.view
        (sprintf namePattern model.Name)
        ""
        (extractValue model.Value)
        (extractValue model.Min)
        (extractValue model.Max)
        model.Step
        (fun msg -> dispatch (FilterInputSliderMessage (updateValue model, msg)))
