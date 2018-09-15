namespace FilterConstructor

open Elmish
open Fable.Import
open Fable.Helpers.ReactNative.Props
open Fable.Helpers.ReactNative
open Fable.Helpers.ReactNative.Props.TextInput
open Fable.Import.ReactNative

module R = Fable.Helpers.React
module RN = Fable.Helpers.ReactNative


module SearchBar =

  let private containerStyle =
    ViewProperties.Style
      [ BorderRadius 3.
        BorderWidth 1.
        BackgroundColor "white"
        Opacity 0.9
        Flex 1.
        FlexDirection FlexDirection.Row
        Width (pct 100.)
        Height (pct 100.) ]

  let private inputStyle = 
    TextInputProperties.Style
      [ FontSize 24.
        BorderRadius 3.
        Flex 1. ]

  let private iconStyle =
    ImageProperties.Style
      [ Height (pct 100.)
        Flex 0.15 ]

  let view onBlur onChangeText : React.ReactElement =
    let mutable inputRef: TextInput option = None
    
    RN.view [ containerStyle ]
      [ RN.touchableWithoutFeedback
          [ OnPress (fun () -> inputRef |> Option.iter (fun input -> input.focus ())) ]
          [ RN.image
              [ iconStyle
                ResizeMode ResizeMode.Contain
                Source (localImage "${entryDir}/../img/search.png") ] ]
        RN.textInput
          [ inputStyle
            OnBlur onBlur
            OnChangeText onChangeText
            TextInputProperties.Ref (fun ref -> inputRef <- (Some ref)) ] ]
