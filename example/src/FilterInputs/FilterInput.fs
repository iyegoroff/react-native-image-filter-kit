namespace FilterConstructor

open Elmish
open Fable.Import

module R = Fable.Helpers.React
module RN = Fable.Helpers.ReactNative
module RNF = Fable.Helpers.ReactNativeImageFilterKit


module FilterInput =

  [<CustomEquality>]
  [<NoComparison>]
  type Model<'v, 'r when 'r : equality> =
    { Name: string
      Value: 'r
      Min: 'r
      Max: 'r
      Convert: 'r -> 'v }
    override _x.GetHashCode() = 0
    override x.Equals(yObj) =
      match yObj with
      | :? Model<'v, 'r> as y -> 
        x.Name = y.Name && x.Value = y.Value && x.Min = y.Min && x.Max = y.Max
      | _ -> false

  type Message<'model> =
    | ValueChanged of 'model
    | FilterInputSliderMessage of (float -> 'model) * FilterInputSlider.Message

  let init average convert name min max : Model<'a, 'b> =
    { Name = name
      Min = min
      Max = max
      Value = average min max
      Convert = convert }

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
        (fun msg -> dispatch (FilterInputSliderMessage (updateValue model, msg)))
