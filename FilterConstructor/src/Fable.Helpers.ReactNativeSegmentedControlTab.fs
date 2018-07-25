[<RequireQualifiedAccess>]
module Fable.Helpers.ReactNativeSegmentedControlTab

open Fable.Import.React
open Fable.Helpers.ReactNative.Props
open Fable.Core.JsInterop

module R = Fable.Helpers.React

module Props =

  type SegmentedControlTabProps =
    | Values of ResizeArray<string>
    | SelectedIndex of int
    | SelectedIndices of ResizeArray<int>
    | Multiple of bool
    | BorderRadius of float
    | TabsContainerStyle of IStyle list
    | TabStyle of IStyle list
    | TabTextStyle of IStyle list
    | ActiveTabStyle of IStyle list
    | ActiveTabTextStyle of IStyle list
    | Badges of ResizeArray<float>
    | TabBadgeContainerStyle of IStyle list
    | ActiveTabBadgeContainerStyle of IStyle list
    | TabBadgeStyle of IStyle list
    | ActiveTabBadgeStyle of IStyle list
    | OnTabPress of (int -> unit)
    | AllowFontScaling of bool
    | Accessible of bool
    | AccessibilityLabels of ResizeArray<string>

open Props

let inline segmentedControlTab (props: SegmentedControlTabProps list): ReactElement =
  R.createElement(importDefault "react-native-segmented-control-tab", props, [])
