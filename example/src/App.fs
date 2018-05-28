module App

open Elmish
open Elmish.ReactNative
open Elmish.HMR

Program.mkProgram Main.init Main.update Main.view
|> Program.withConsoleTrace
|> Program.withHMR
|> Program.withReactNative "FilterConstructor"
|> Program.run
