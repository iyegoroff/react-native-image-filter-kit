namespace FilterConstructor

open Elmish


module FilterScalarInput =

  type Model = FilterInput.Model<float, float>

  type Message = FilterInput.Message<Model>

  let init =
    FilterInput.init Utils.average id

  let private updateScalar (model: Model) scalar =
    { model with Value = scalar }

  let update (message: Message) (model: Model) =
    FilterInput.update message model

  let view (model: Model) (dispatch: Dispatch<Message>) =
    FilterInput.sliderView model "%s" id updateScalar dispatch
