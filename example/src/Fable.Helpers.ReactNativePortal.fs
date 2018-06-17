module Fable.Helpers.ReactNativePortal

open Fable.Helpers.ReactNative
open Fable.Core.JsInterop
open Fable.Import

type RNP = ReactNativePortal.Globals


let inline blackPortal (name: string) (children: React.ReactElement list): React.ReactElement =
  createElementWithObjProps(RNP.BlackPortal, createObj ["name" ==> name], children)

let inline whitePortal (name: string) (children: React.ReactElement list): React.ReactElement =
  createElementWithObjProps(RNP.WhitePortal, createObj ["name" ==> name], children)

let inline portalProvider (children: React.ReactElement list): React.ReactElement =
  createElement(RNP.PortalProvider, [], children)

let enterPortal = blackPortal

let exitPortal = whitePortal