namespace FilterConstructor

open Elmish
open Fable.Import.ReactNativeImageFilterKit.Props

module FilterDistanceInput =

  type Model = FilterRangeInput.Model<IDistance, float>

  type Message = FilterRangeInput.Message<Model>

  let init name (toDistance: float -> IDistance) =
    FilterRangeInput.init Utils.average toDistance name

  let private updateDistance (model: Model) distance =
    { model with Value = distance }

  let update (message: Message) (model: Model) =
    FilterRangeInput.update message model

  let view (model: Model) (dispatch: Dispatch<Message>) =
    FilterRangeInput.sliderView model "%s" id updateDistance dispatch
