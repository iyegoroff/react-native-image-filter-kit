namespace FilterConstructor

open Elmish
open Fable.Helpers.ReactNative
open Fable.Helpers.ReactNative.Props
open Fable.Import
open Fable.Import.ReactNative
open System

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

  let private stepperStyle =
    ViewProperties.Style
      [ Position Position.Absolute
        Height (pct 100.)
        Width (pct 100.)
        PaddingHorizontal (dip 16.)
        FlexDirection FlexDirection.Row
        JustifyContent JustifyContent.SpaceBetween ]

  let private markStyle =
    ViewProperties.Style
      [ Height (pct 100.)
        BorderRightWidth 1.
        MarginHorizontal (dip -0.5)
        BorderColor "black" ]

  let view name suffix value min max (step: float) (dispatch: Dispatch<Message>) =
    let marksAmount = (int ((max - min) / step)) + 1

    RN.view
      [ containerStyle ]
      [ RN.text [] (sprintf "%s %.2f" name value)
        RN.view
          []
          [ (match step with
             | 0. -> R.fragment [] []
             | _ ->
               RN.view
                [ stepperStyle ]
                (Array.create marksAmount (RN.view [ markStyle ] []) |> Array.toList))
            (Platform.select
              [ Platform.Android
                  (RN.slider
                    [ MaximumValue max
                      MinimumValue min
                      SliderProperties.Step step
                      SliderProperties.Value value
                      SliderProperties.OnSlidingComplete (ValueChanged >> dispatch) ])
                Platform.Ios
                  (RS.slider
                    [ thumbStyle
                      RS.Props.Step step
                      RS.Props.MaximumValue max
                      RS.Props.MinimumValue min
                      RS.Props.Value value
                      RS.Props.MinimumTrackTintColor "#007aff"
                      RS.Props.OnSlidingComplete (ValueChanged >> dispatch) ]) ]) ]
        RN.view
          [ rangeLegendStyle ]
          [ RN.text [] (sprintf "%.2f%s" min suffix)
            RN.text [] (sprintf "%.2f%s" max suffix) ] ]
