namespace FilterConstructor

open Elmish


module FilterScalarInput =

  type Model = FilterRangeInput.Model<float, float>

  type Message = FilterRangeInput.Message<Model>

  let init =
    FilterRangeInput.init id<float>

  let private updateScalar (model: Model) scalar =
    { model with Value = scalar }

  let update (message: Message) (model: Model) =
    FilterRangeInput.update message model

  let view (model: Model) (dispatch: Dispatch<Message>) =
    FilterRangeInput.sliderView model "%s" id updateScalar dispatch
