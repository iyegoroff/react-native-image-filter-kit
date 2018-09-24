namespace FilterConstructor

open Elmish
open Fable.Helpers.ReactNative.Props
open Fable.Helpers.ReactNative
open Fable.Import.ReactNative
open Fable.Import
open Fable.Import.ReactNativeFab.Props

module R = Fable.Helpers.React
module RN = Fable.Helpers.ReactNative
module RNF = Fable.Import.ReactNativeFab

module SelectModal =

  type Model<'item when 'item : equality> =
    { Select: Select.Model<'item>
      RememberSelectedItem: bool
      IsVisible: bool
      MarginBottom: float }

  type Message<'item> =
    | Hide
    | Show
    | AdjustMarginBottom of float
    | SelectMessage of Select.Message<'item>

  let init
    items selectedItem extractItemKey isItemEnabled areItemsEqual rememberSelectedItem isVisible =
    
    { Select = Select.init items selectedItem extractItemKey isItemEnabled areItemsEqual
      RememberSelectedItem = rememberSelectedItem
      IsVisible = isVisible
      MarginBottom = 0. }

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

    | AdjustMarginBottom marginBottom ->
      { model with MarginBottom = marginBottom }, []

  let private containerStyle =
    ViewProperties.Style
      [ Flex 1. ]

  let private contentStyle =
    FastMemoize.memoize
      (fun marginBottom ->
         ViewProperties.Style
           [ Flex 1.
             MarginBottom (dip marginBottom)
             BackgroundColor "white" ])
    
  let view (model: Model<'item>) (dispatch: Dispatch<Message<'item>>) =
    RN.modal
      [ AnimationType
          (Platform.select
             [ Platform.Ios AnimationType.Slide
               Platform.Android AnimationType.Fade ])
        ModalProperties.Visible model.IsVisible
        OnRequestClose (fun () -> dispatch Hide) ]
      [ RN.view
          [ containerStyle
            ViewProperties.OnLayout
              (fun event ->
                let marginBottom =
                  event.nativeEvent.layout.height - (Constants.screenSize ()).height
                dispatch (AdjustMarginBottom marginBottom)) ]
          [ RN.view
              [ (contentStyle model.MarginBottom) ]
              [ Select.view model.Select (SelectMessage >> dispatch)
                Platform.select
                  [ Platform.Ios
                      (RNF.Fab
                         [ IconTextComponent (RN.text [] "❌")
                           ButtonColor "darkred"
                           OnClickAction (fun _ -> dispatch Hide) ])
                    Platform.Android (R.fragment [] []) ] ] ] ]
