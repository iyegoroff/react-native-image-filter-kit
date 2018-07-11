namespace FilterConstructor

open Elmish
open Fable.Helpers.ReactNative
open Fable.Helpers.ReactNative.Props
open Fable.Import
module R = Fable.Helpers.React
module RN = Fable.Helpers.ReactNative


module FilterInputSlider =

  type Message =
    | ValueChanged of float

  let private containerStyle =
    ViewProperties.Style
      [ BorderWidth 1.
        BorderRadius 3.
        Padding (Dip 3.)
        MarginBottom (Dip 3.) ]

  let private rangeLegendStyle =
    ViewProperties.Style
      [ FlexDirection FlexDirection.Row
        JustifyContent JustifyContent.SpaceBetween ]

  let view name suffix value min max (dispatch: Dispatch<Message>) =
    RN.view
      [ containerStyle ]
      [ RN.text [] (sprintf "%s %.2f" name value)
        RN.slider
          [ MaximumValue max
            MinimumValue min
            Step ((min - max) / 100.)
            SliderProperties.Value value 
            SliderProperties.OnSlidingComplete (ValueChanged >> dispatch) ]
        RN.view
          [ rangeLegendStyle ]
          [ RN.text [] (sprintf "%.2f%s" min suffix)
            RN.text [] (sprintf "%.2f%s" max suffix) ] ]
