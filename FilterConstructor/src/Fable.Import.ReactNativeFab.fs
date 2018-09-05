module Fable.Import.ReactNativeFab

open Fable.Helpers.React
open Fable.Core
open Fable.Core.JsInterop


module Props =

  type FabProps =
    | Visible of bool
    | ButtonColor of string
    | OnClickAction of (unit -> unit)
    | IconTextColor of string
    | IconTextComponent of React.ReactElement
    | SnackOffset of float


open Props

let inline private propsToObj (props: 'a list): obj = keyValueList CaseRules.LowerFirst props

let inline Fab (props: FabProps list) : React.ReactElement =
  ofImport "default" "react-native-fab" (propsToObj props) []
