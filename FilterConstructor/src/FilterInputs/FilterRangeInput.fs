namespace FilterConstructor

open Elmish
open Fable.Import

module R = Fable.Helpers.React
module RN = Fable.Helpers.ReactNative
module RNF = Fable.Import.ReactNativeImageFilterKit


module FilterRangeInput =

  type Model<'v, 'r when 'r : equality> =
    { Name: string
      Value: 'r
      Min: 'r
      Max: 'r
      Convert: StructurallyNull<'r -> 'v>
      Step: float }

  type Message<'model> =
    | ValueChanged of 'model
    | FilterInputSliderMessage of (float -> 'model) * FilterInputSlider.Message

  let init convert min max value (Name name) : Model<'a, 'b> =
    Utils.invariant (value >= min && value <= max) "FilterRangeInput.init: value"
    { Name = name
      Min = min
      Max = max
      Value = value
      Convert = { Value = convert }
      Step = 0. }

  let initStepper convert min max value step name : Model<'a, 'b> =
    { init convert min max value name with Step = step }

  let convert model =
    model.Convert.Value model.Value

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
