namespace Fable.Import

open Fable.Core
open Fable.Import.ReactNative

[<Erase>]
module ReactNativeSegmentedControlTab =

  type SegmentedControlTabProps =
      abstract values: ResizeArray<string> option with get, set
      abstract selectedIndex: int option with get, set
      abstract selectedIndices: ResizeArray<int> option with get, set
      abstract multiple: bool option with get, set
      abstract borderRadius: float option with get, set
      abstract tabsContainerStyle: ViewStyle option with get, set
      abstract tabStyle: ViewStyle option with get, set
      abstract tabTextStyle: TextStyle option with get, set
      abstract activeTabStyle: ViewStyle option with get, set
      abstract activeTabTextStyle: TextStyle option with get, set
      abstract badges: ResizeArray<float> option with get, set
      abstract tabBadgeContainerStyle: ViewStyle option with get, set
      abstract activeTabBadgeContainerStyle: ViewStyle option with get, set
      abstract tabBadgeStyle: TextStyle option with get, set
      abstract activeTabBadgeStyle: TextStyle option with get, set
      abstract onTabPress: (int -> unit) option with get, set
      abstract allowFontScaling: bool option with get, set
      abstract accessible: bool option with get, set
      abstract accessibilityLabels: ResizeArray<string> option with get, set

  and SegmentedControlTabStatic =
      inherit React.ComponentClass<BrightnessProps>

  and SegmentedControlTab =
      SegmentedControlTabStatic


  type Globals =
      [<Import("default", "react-native-segmented-control-tab")>] static member SegmentedControlTab with get(): SegmentedControlTabStatic = jsNative and set(v: SegmentedControlTabStatic): unit = jsNative
      