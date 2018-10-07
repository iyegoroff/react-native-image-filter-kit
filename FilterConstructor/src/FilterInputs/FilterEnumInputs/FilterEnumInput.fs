namespace FilterConstructor

open Elmish
open Fable.Import
open Fable.Helpers.ReactNative
open Fable.Helpers.ReactNative.Props
open Elmish.React
open Fable.Helpers.ReactNative.Props.Picker

module R = Fable.Helpers.React
module RN = Fable.Helpers.ReactNative
module RNS = Fable.Helpers.ReactNativeSegmentedControlTab

module FilterEnumInput =

  type Model<'item when 'item : equality> =
    { Name: string
      Value: 'item
      AvailableValues: 'item list }

  type Message<'item when 'item : equality> =
    | ValueChanged of 'item

  let private label<'item when 'item : equality> (item: 'item) =
    (sprintf "%A" item).Trim [|'"'|]

  let init<'item when 'item : equality> (value: 'item) (availableValues: 'item list) (Name name) =
    { Name = name
      Value = value
      AvailableValues = availableValues }

  let update<'item when 'item : equality>
    (message: Message<'item>)
    (model: Model<'item>) : Model<'item> * Sub<Message<'item>> list =

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

  let private segmentedControl model dispatch =
    SegmentedControl.view
      (ResizeArray (model.AvailableValues |> List.map label))
      (model.AvailableValues
       |> List.tryFindIndex (fun value -> value = model.Value)
       |> Option.defaultValue 0)
      (fun idx -> dispatch (ValueChanged model.AvailableValues.[idx]))

  let private picker model dispatch =
    RN.picker
      [ PickerProperties.SelectedValue model.Value
        PickerProperties.OnValueChange (fun value _ -> dispatch (ValueChanged value)) ]
      (model.AvailableValues
       |> List.map (fun value ->
                      RN.pickerItem
                        [ PickerItemProperties.Value value
                          PickerItemProperties.Label (label value) ]))

  let view<'item when 'item : equality>
    (model: Model<'item>)
    (dispatch: Dispatch<Message<'item>>) : React.ReactElement =

    RN.view
      [ containerStyle ]
      [ RN.text [] (sprintf "%s" model.Name)
        (lazyView2
           (if model.AvailableValues.Length > 4 then picker else segmentedControl)
           model
           dispatch) ]
