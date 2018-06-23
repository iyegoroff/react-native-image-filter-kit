namespace FilterConstructor

open Elmish
open Fable.Helpers.ReactNative.Props
module R = Fable.Helpers.React
module RN = Fable.Helpers.ReactNative


module FilterInputSlider =

  type Message =
    | ValueChanged of float

  let private containerStyle =
    ViewProperties.Style
      [ BorderWidth 1.
        BorderRadius 3. ]

  let private rangeLegendStyle =
    ViewProperties.Style
      [ FlexDirection FlexDirection.Row
        JustifyContent JustifyContent.SpaceBetween ]

  let view name suffix value min max (dispatch: Dispatch<Message>) =
    RN.view
      [ containerStyle ]
      [ RN.text [] name
        RN.slider
          [ MaximumValue max
            MinimumValue min
            SliderProperties.Value value
            SliderProperties.OnValueChange (ValueChanged >> dispatch) ]
        RN.view
          [ rangeLegendStyle ]
          [ RN.text [] (sprintf "%f%s" min suffix)
            RN.text [] (sprintf "%f%s" max suffix) ] ]
