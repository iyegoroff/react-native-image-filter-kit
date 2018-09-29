namespace FilterConstructor

open Elmish
open Fable.Import
open Fable.Import.ReactNativeColorWheel
open Fable.Helpers.ReactNative
open Fable.Helpers.ReactNative.Props
open Elmish.React

module R = Fable.Helpers.React
module RN = Fable.Helpers.ReactNative
module RNS = Fable.Helpers.ReactNativeSegmentedControlTab

module FilterEnumInput =

  type Model=
    { Name: string
      Value: string
      AvailableValues: string list }

  type Message =
    | ValueChanged of string

  let init (value: string) (availableValues: string list) (Name name) =
    { Name = name
      Value = value.Trim [| '"' |]
      AvailableValues = availableValues |> List.map (fun v -> v.Trim [| '"' |]) }

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
        BackgroundColor "white" ]

  let view (model: Model) (dispatch: Dispatch<Message>) : React.ReactElement =
    let segmentedControl model =
      RNS.segmentedControlTab
        [ RNS.Props.Values (ResizeArray model.AvailableValues)
          RNS.Props.OnTabPress (fun idx -> dispatch (ValueChanged model.AvailableValues.[idx]))
          RNS.Props.SelectedIndex (model.AvailableValues
                                   |> List.tryFindIndex (fun value -> value = model.Value)
                                   |> Option.defaultValue 0) ]

    RN.view
      [ containerStyle ]
      [ RN.text [] (sprintf "%s" model.Name)
        (lazyView segmentedControl model) ]
