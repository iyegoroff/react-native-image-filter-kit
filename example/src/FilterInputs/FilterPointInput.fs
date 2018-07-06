namespace FilterConstructor

open Elmish
open Fable.Helpers.ReactNativeImageFilterKit.Props

module R = Fable.Helpers.React
module RNF = Fable.Helpers.ReactNativeImageFilterKit

module FilterPointInput =

  type Model = FilterInput.Model<IPoint, float * float>

  type Message = FilterInput.Message<Model>

  let private averagePoint (x1, y1) (x2, y2) =
    (Utils.average x1 x2, Utils.average y1 y2)

  let init (toDistance: float -> IDistance) =
    FilterInput.init averagePoint (fun (x, y) -> RNF.Point (toDistance x, toDistance y))

  let private updatePointX (model: Model) x =
    let (_, y) = model.Value
    { model with Value = (x, y) }

  let private updatePointY (model: Model) y =
    let (x, _) = model.Value
    { model with Value = (x, y) }

  let update (message: Message) (model: Model) =
    FilterInput.update message model

  let view (model: Model) (dispatch: Dispatch<Message>) =
    R.fragment
      []
      [ FilterInput.sliderView model "%s.x" fst updatePointX dispatch
        FilterInput.sliderView model "%s.y" snd updatePointY dispatch ]
