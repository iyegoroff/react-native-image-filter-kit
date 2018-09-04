namespace FilterConstructor

open Elmish
open Fable.Import.ReactNativeImageFilterKit.Props

module R = Fable.Helpers.React
module RNF = Fable.Import.ReactNativeImageFilterKit

module FilterOffsetInput =

  type Model = FilterRangeInput.Model<IOffset, float * float>

  type Message = FilterRangeInput.Message<Model>

  let private averageOffset (x1, y1) (x2, y2) =
    (Utils.average x1 x2, Utils.average y1 y2)

  let init =
    FilterRangeInput.init RNF.Offset

  let private updateOffsetX (model: Model) x =
    let (_, y) = model.Value
    { model with Value = (x, y) }

  let private updateOffsetY (model: Model) y =
    let (x, _) = model.Value
    { model with Value = (x, y) }

  let update (message: Message) (model: Model) =
    FilterRangeInput.update message model

  let view (model: Model) (dispatch: Dispatch<Message>) =
    R.fragment
      []
      [ FilterRangeInput.sliderView model "%s.x" fst updateOffsetX dispatch
        FilterRangeInput.sliderView model "%s.y" snd updateOffsetY dispatch ]
