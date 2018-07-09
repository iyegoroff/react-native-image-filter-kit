namespace FilterConstructor

open Elmish
open Fable.Helpers.ReactNativeImageFilterKit.Props

module FilterDistanceInput =

  type Model = FilterInput.Model<IDistance, float>

  type Message = FilterInput.Message<Model>

  let init name (toDistance: float -> IDistance) =
    FilterInput.init Utils.average toDistance name

  let private updateDistance (model: Model) distance =
    { model with Value = distance }

  let update (message: Message) (model: Model) =
    FilterInput.update message model

  let view (model: Model) (dispatch: Dispatch<Message>) =
    FilterInput.sliderView model "%s" id updateDistance dispatch
