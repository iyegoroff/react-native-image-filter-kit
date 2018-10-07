namespace FilterConstructor

open Elmish
open Fable.Import
open Fable.Import.ReactNativeColorWheel
open Fable.Helpers.ReactNative
open Fable.Helpers.ReactNative.Props
open Elmish.React
open System

module R = Fable.Helpers.React
module RN = Fable.Helpers.ReactNative
module RNC = Fable.Helpers.ReactNativeColorWheel


module FilterColorInput =

  type Model =
    { Name: string
      Value: string
      ColorWheelRef: ColorWheel option }

  type Message =
    | ColorChanged of string
    | OpacityChanged of string
    | ColorWheelRefChanged of ColorWheel
    | FilterInputSliderMessage of FilterInputSlider.Message

  let init value (Name name) : Model =
    { Name = name
      Value = if (String.length value) = 7 then sprintf "%sff" value else value
      ColorWheelRef = None }

  let private extractOpacity model =
    model.Value.Substring 7

  let private extractColor model =
    model.Value.Substring (0, 7)

  let update (message: Message) (model: Model) : Model * Sub<Message> list =
    match message with
    | ColorChanged color -> 
      { model with Value = sprintf "%s%s" color (extractOpacity model) }, []

    | OpacityChanged opacity ->
      { model with Value = sprintf "%s%s" (extractColor model) opacity }, []

    | ColorWheelRefChanged value -> 
      { model with ColorWheelRef = Some value }, []

    | FilterInputSliderMessage msg ->
      match msg with
      | FilterInputSlider.ValueChanged value ->
        let opacity = (String.Format("{0:X}", (Math.Round (255. * value)))).PadLeft (2, '0')
        model, Cmd.ofMsg (OpacityChanged opacity)

  let private containerStyle =
    ViewProperties.Style
      [ BorderWidth 1.
        BorderRadius 3.
        Padding (dip 3.)
        MarginBottom (dip 3.)
        BackgroundColor "white" ]

  let private colorWheelStyle =
    RNC.Props.Style
      [ Width (dip 235.)
        Height (dip 200.)
        MarginBottom (dip 20.)
        AlignSelf Alignment.Center
        Flex 1. ]

  let view (model: Model) (dispatch: Dispatch<Message>) : React.ReactElement =
    let wheel =
      (fun () ->
         RNC.colorWheel
           [ colorWheelStyle
             RNC.Props.Ref (ColorWheelRefChanged >> dispatch)
             RNC.Props.InitialColor (extractColor model)
             RNC.Props.Precision 10.
             RNC.Props.OnHexColorChange (ColorChanged >> dispatch) ])

    RN.view
      [ containerStyle ]
      [ RN.text [] (sprintf "%s %s" model.Name (model.Value.ToLower ()))
        lazyView wheel ()
        (FilterInputSlider.slider 1. 0. 1. 0. (FilterInputSliderMessage >> dispatch))
        (FilterInputSlider.legend 0. 1. "") ]
