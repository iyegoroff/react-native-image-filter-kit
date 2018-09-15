namespace FilterConstructor

open Elmish
open Fable.Helpers.ReactNative.Props
open Fable.Helpers.ReactNative
open Fable.Import.ReactNative
open Fable.Core
open Fable.Import
open Fable.Import.ReactNativeFab.Props

module R = Fable.Helpers.React
module RN = Fable.Helpers.ReactNative
module RNF = Fable.Import.ReactNativeFab

module SelectModal =

  type Message<'a> =
    | Hide
    | SelectMessage of Select.Message<'a>

  let private dispatchWithClose dispatch =
    function
    | Select.ItemSelected item ->
      dispatch Hide
      (fun () ->
         JS.setTimeout (fun () -> dispatch (SelectMessage (Select.ItemSelected item))) 50
         |> ignore
         |> U2.Case1)
      |> Globals.InteractionManager.runAfterInteractions
      |> ignore
    
  let view items selected itemKey itemEnabled equals isVisible (dispatch: Dispatch<Message<'a>>) =
      
    RN.modal
      [ AnimationType
          (Platform.select
             [ Platform.Ios AnimationType.Slide
               Platform.Android AnimationType.Fade ])
        ModalProperties.Visible isVisible
        OnRequestClose (fun () -> dispatch Hide) ]
      [ Select.view
          items
          selected
          itemKey
          itemEnabled
          equals
          (dispatchWithClose dispatch)
        Platform.select
          [ Platform.Ios
              (RNF.Fab
                 [ IconTextComponent (RN.text [] "❌")
                   ButtonColor "darkred"
                   OnClickAction (fun _ -> dispatch Hide) ])
            Platform.Android (R.fragment [] []) ] ]
