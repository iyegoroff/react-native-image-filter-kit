namespace FilterConstructor

open Elmish
open Fable.Import
open Fable.Helpers.ReactNative
open Fable.Helpers.ReactNative.Props

module R = Fable.Helpers.React
module RN = Fable.Helpers.ReactNative


module FilterBooleanInput =

  type Model =
    { Name: string
      Value: bool }

  type Message =
    | ValueChanged of bool

  let init value (Name name) : Model =
    { Name = name
      Value = value }

  let update (message: Message) (model: Model) : Model * Sub<Message> list =
    match message with
    | ValueChanged value -> 
      { model with Value = value }, []

  let private containerStyle =
    ViewProperties.Style
      [ BorderWidth 1.
        BorderRadius 3.
        Padding (dip 3.)
        MarginBottom (dip 3.)
        FlexDirection FlexDirection.Row 
        JustifyContent JustifyContent.SpaceBetween
        AlignItems ItemAlignment.Center 
        BackgroundColor "white" ]

  let view (model: Model) (dispatch: Dispatch<Message>) : React.ReactElement =
    RN.view
      [ containerStyle ]
      [ RN.text [] (sprintf "%s %b" model.Name model.Value)
        RN.switch
          [ Value model.Value
            OnValueChange (ValueChanged >> dispatch) ] ]
