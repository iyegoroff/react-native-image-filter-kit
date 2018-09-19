namespace FilterConstructor

open Elmish
open Fable.Import
open Fable.Helpers.ReactNative.Props

module R = Fable.Helpers.React
module RN = Fable.Helpers.ReactNative


module {{pascalCase name}} =

  type Model = unit

  type Message = None

  let init () : Model =
    ()

  let update (message: Message) (model: Model) : Model * Cmd<Message> =
    match message with
    | None ->
      ()

  let view (model: Model) (dispatch: Dispatch<Message>) : React.ReactElement =
    RN.view []
      [ RN.text [] "{{pascalCase name}}" ]
