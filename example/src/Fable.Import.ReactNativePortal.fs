namespace Fable.Import

open Fable.Helpers.ReactNative
open Fable.Core.JsInterop

module ReactNativePortal =

  let inline blackPortal (name: string) (children: React.ReactElement list): React.ReactElement =
    createElementWithObjProps(
      import "BlackPortal" "react-native-portal",
      createObj ["name" ==> name],
      children
    )

  let inline whitePortal (name: string) (children: React.ReactElement list): React.ReactElement =
    createElementWithObjProps(
      import "WhitePortal" "react-native-portal",
      createObj ["name" ==> name],
      children
    )

  let inline portalProvider (children: React.ReactElement list): React.ReactElement =
    createElement(
      import "PortalProvider" "react-native-portal",
      [],
      children
    )

  let inline enterPortal<'a> = blackPortal

  let inline exitPortal<'a> = whitePortal
