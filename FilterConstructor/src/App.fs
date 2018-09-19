namespace FilterConstructor

open Elmish
open Elmish.ReactNative
open Elmish.HMR


module App =

  Program.mkProgram Main.init Main.update Main.pureView
  |> Program.withHMR
  |> Program.withReactNative "FilterConstructor"
  |> Program.run
