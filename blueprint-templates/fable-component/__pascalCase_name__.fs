module {{pascalCase name}}

open Elmish
open Fable.Helpers.ReactNative.Props
module R = Fable.Helpers.ReactNative

type Model = unit

type Message = None

let init () =
  ()

let update (message: Message) model =
  match message with
  | None ->
    ()

let view model (dispatch: Dispatch<Message>) =
  R.view []
    [ R.text [] "{{pascalCase name}}" ]
