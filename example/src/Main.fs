module Main

open Elmish
open Fable.Helpers.ReactNative.Props
module R = Fable.Helpers.ReactNative


type Model = 
  { defaultImage: ImageSourceProperties }


type Msg =
  | Increment
  | Decrement
  | MoreThanFive


let init () =
  0, Cmd.none


let update (msg:Msg) count =
  match msg with
  | Increment when count >= 5 ->
      count + 1, Cmd.ofMsg MoreThanFive

  | Increment ->
      count + 1, Cmd.none

  | Decrement ->
      count - 1, Cmd.none
  
  | MoreThanFive ->
      count, Cmd.none


let view count (dispatch:Dispatch<Msg>) =
  let onClick msg =
    fun () -> msg |> dispatch 

  R.view [Styles.sceneBackground]
    [ Styles.button "-" (onClick Decrement)
      R.text [Styles.defaultText] (string count)
      Styles.button "+" (onClick Increment) ]