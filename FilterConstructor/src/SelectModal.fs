namespace FilterConstructor

open Elmish
open Fable.Helpers.ReactNative.Props
open Fable.Helpers.ReactNative
open Fable.Import.ReactNative
open Fable.Import
open Fable.Import.ReactNativeFab.Props
open Fable.Helpers.ReactNative.Props

module R = Fable.Helpers.React
module RN = Fable.Helpers.ReactNative
module RNF = Fable.Import.ReactNativeFab

module SelectModal =

  type Model<'item when 'item : equality> =
    { Select: Select.Model<'item>
      RememberSelectedItem: bool
      IsVisible: bool }

  type Message<'item> =
    | Hide
    | Show
    | SelectMessage of Select.Message<'item>

  let init
    items selectedItem extractItemKey isItemEnabled areItemsEqual rememberSelectedItem isVisible =
    
    { Select = Select.init items selectedItem extractItemKey isItemEnabled areItemsEqual
      RememberSelectedItem = rememberSelectedItem
      IsVisible = isVisible }

  let update (message: Message<'item>) (model: Model<'item>) : Model<'item> * Cmd<Message<'item>> =
    match message with
    | Hide ->
      let clearSearchCmd = Cmd.ofMsg (SelectMessage Select.ClearSearch)
        
      { model with IsVisible = false },
      if model.RememberSelectedItem then
        clearSearchCmd
      else
        Cmd.batch [ clearSearchCmd; Cmd.ofMsg (SelectMessage Select.ClearSelection) ]

    | Show ->
      { model with IsVisible = true }, []
    
    | SelectMessage msg ->
      let select, cmd = Select.update msg model.Select

      match msg with
      | Select.ItemSelected _ when model.IsVisible ->
        { model with Select = select }, Cmd.batch [ Cmd.ofMsg Hide; Cmd.map SelectMessage cmd ]

      | _ ->
        { model with Select = select }, Cmd.map SelectMessage cmd

  let private containerStyle =
    ViewProperties.Style
      [ Flex 1. ]

  let private contentStyle =
    ViewProperties.Style
      [ Flex 1.
        BackgroundColor "white" ]

  let private content (model: Model<'item>) (dispatch: Dispatch<Message<'item>>) =
    RN.view
      [ containerStyle ]
      [ RN.view
          [ contentStyle ]
          [ Select.view model.Select (SelectMessage >> dispatch)
            Platform.select
              [ Platform.Ios
                  (RNF.Fab
                     [ IconTextComponent (RN.text [] "❌")
                       ButtonColor "darkred"
                       OnClickAction (fun _ -> dispatch Hide) ])
                Platform.Android (R.fragment [] []) ] ] ]

  let view (model: Model<'item>) (dispatch: Dispatch<Message<'item>>) =
    RN.modal
      [ AnimationType
          (Platform.select
             [ Platform.Ios AnimationType.Slide
               Platform.Android AnimationType.Fade ])
        ModalProperties.Visible model.IsVisible
        OnRequestClose (fun () -> dispatch Hide) ]
      [ (content model dispatch) ]
