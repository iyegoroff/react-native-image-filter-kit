namespace FilterConstructor

open Elmish
open Fable.Helpers.ReactNative
open Fable.Helpers.ReactNative.Props
open Fable.Import
module R = Fable.Helpers.React
module RN = Fable.Helpers.ReactNative
module RS = Fable.Import.ReactNativeSlider


module FilterInputSlider =

  type Message =
    | ValueChanged of float

  let private containerStyle =
    ViewProperties.Style
      [ BorderWidth 1.
        BorderRadius 3.
        Padding (dip 3.)
        MarginBottom (dip 3.)
        BackgroundColor "white" ]

  let private rangeLegendStyle =
    ViewProperties.Style
      [ FlexDirection FlexDirection.Row
        JustifyContent JustifyContent.SpaceBetween ]

  let private thumbStyle =
    RS.Props.ThumbStyle
      [ ShadowColor "black"
        ShadowRadius 1.
        ShadowOpacity 1.
        ShadowOffset
          { width = 0.
            height = 0. }
        BackgroundColor "white"
        Elevation 2. ]

  let view name suffix value min max (dispatch: Dispatch<Message>) =
    RN.view
      [ containerStyle ]
      [ RN.text [] (sprintf "%s %.2f" name value)
        (Platform.select
          [ Platform.Android
              (RN.slider
                [ MaximumValue max
                  MinimumValue min
                  SliderProperties.Value value
                  SliderProperties.OnSlidingComplete (ValueChanged >> dispatch) ])
            Platform.Ios
              (RS.slider
                [ thumbStyle
                  RS.Props.MaximumValue max
                  RS.Props.MinimumValue min
                  RS.Props.Value value
                  RS.Props.MinimumTrackTintColor "#007aff"
                  RS.Props.OnSlidingComplete (ValueChanged >> dispatch) ]) ]) 
        RN.view
          [ rangeLegendStyle ]
          [ RN.text [] (sprintf "%.2f%s" min suffix)
            RN.text [] (sprintf "%.2f%s" max suffix) ] ]
