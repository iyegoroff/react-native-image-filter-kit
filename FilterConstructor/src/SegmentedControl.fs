namespace FilterConstructor

open Fable.Helpers
open Fable.Helpers.ReactNative
open Fable.Helpers.ReactNative.Props

module RN = Fable.Helpers.ReactNative
module RNS = Fable.Helpers.ReactNativeSegmentedControlTab


module SegmentedControl =

  let view values selectedIndex onIndexChange =
    Platform.select
      [ Platform.Android
          (RNS.segmentedControlTab
            [ RNS.Props.Values values
              RNS.Props.OnTabPress onIndexChange
              RNS.Props.SelectedIndex selectedIndex ])
        Platform.Ios
          (RN.segmentedControlIOS
             [ Values values
               SegmentedControlIOSProperties.OnChange
                 (fun event -> onIndexChange event.nativeEvent.selectedSegmentIndex)
               SelectedIndex selectedIndex ]) ]
