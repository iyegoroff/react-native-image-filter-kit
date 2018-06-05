namespace FilterConstructor

open Elmish
open ReactNativeHelpers.Props
module R = ReactNativeHelpers


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
