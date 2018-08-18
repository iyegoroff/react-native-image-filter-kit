namespace FilterConstructor

open Elmish
open Fable.Import.ReactNativeImageFilterKit.Props

module R = Fable.Helpers.React
module RNF = Fable.Import.ReactNativeImageFilterKit

module FilterRGBAVectorInput =

  type Model = FilterRangeInput.Model<IRGBAVector, float * float * float * float>

  type Message = FilterRangeInput.Message<Model>

  let private averageRGBAVector (r0, g0, b0, a0) (r1, g1, b1, a1) =
    (Utils.average r0 r1, Utils.average g0 g1, Utils.average b0 b1, Utils.average a0 a1)

  let init =
    FilterRangeInput.init RNF.RGBAVector

  let private updateRGBAVectorR (model: Model) r =
    let (_, g, b, a) = model.Value
    { model with Value = (r, g, b, a) }

  let private updateRGBAVectorG (model: Model) g =
    let (r, _, b, a) = model.Value
    { model with Value = (r, g, b, a) }

  let private updateRGBAVectorB (model: Model) b =
    let (r, g, _, a) = model.Value
    { model with Value = (r, g, b, a) }

  let private updateRGBAVectorA (model: Model) a =
    let (r, g, b, _) = model.Value
    { model with Value = (r, g, b, a) }

  let update (message: Message) (model: Model) =
    FilterRangeInput.update message model

  let view (model: Model) (dispatch: Dispatch<Message>) =
    R.fragment
      []
      [ FilterRangeInput.sliderView model "%s.r" (fun (r, _, _, _) -> r) updateRGBAVectorR dispatch
        FilterRangeInput.sliderView model "%s.g" (fun (_, g, _, _) -> g) updateRGBAVectorG dispatch
        FilterRangeInput.sliderView model "%s.b" (fun (_, _, b, _) -> b) updateRGBAVectorB dispatch
        FilterRangeInput.sliderView model "%s.a" (fun (_, _, _, a) -> a) updateRGBAVectorA dispatch ]
