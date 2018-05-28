module {{pascalCase name}}

open Elmish
open Fable.Helpers.ReactNative.Props
module R = Fable.Helpers.ReactNative


type Model = unit


type Msg = None


let init () =
  (), Cmd.none


let update (msg: Msg) model =
  match msg with
  | None ->
    (), Cmd.none


let view model (dispatch: Dispatch<Msg>) =

  R.view []
    [ R.text [] "{{pascalCase name}}" ]
