namespace FilterConstructor

open Elmish
open Fable.Helpers.ReactNative.Props
module R = Fable.Helpers.React
module RN = Fable.Helpers.ReactNative


module {{pascalCase name}} =

  type Model = unit

  type Message = None

  let init () =
    ()

  let update (message: Message) model =
    match message with
    | None ->
      ()

  let view model (dispatch: Dispatch<Message>) =
    RN.view []
      [ RN.text [] "{{pascalCase name}}" ]
