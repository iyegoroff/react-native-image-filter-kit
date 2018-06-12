namespace FilterConstructor

open Elmish
open Fable.Helpers.ReactNative.Props
module R = Fable.Helpers.ReactNative


module SelectModal =

  type Message<'a> =
    | Hide
    | SelectMessage of Select.Message<'a>


  let view items selected itemKey equals isVisible (dispatch: Dispatch<Message<'a>>) =
    R.modal
      [ Visible isVisible
        OnRequestClose (fun () -> dispatch Hide) ]
      [ Select.view items selected itemKey equals (fun msg ->
                                                     dispatch (SelectMessage msg)
                                                     dispatch Hide) ]
