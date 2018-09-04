namespace FilterConstructor

open Elmish
open Elmish.React
open Fable.Helpers.ReactNative
open Fable.Helpers.ReactNative.Props
open Fable.Import

module RN = Fable.Helpers.ReactNative


module Select =

  type Message<'a> =
    | ItemSelected of 'a

  type CustomSection = { title: string }

  let private itemStyle =
    ViewProperties.Style
      [ Padding (dip 15.) ]

  let private selectedStyle =
    TextProperties.Style
      [ FontWeight FontWeight.Bold
        TextDecorationLine TextDecorationLine.Underline ]

  let private separatorStyle =
    ViewProperties.Style
      [ Height (dip 1.)
        Width (pct 95.)
        AlignSelf Alignment.Center
        BackgroundColor "lightgray" ]

  let private sectionHeaderStyle =
    TextProperties.Style
      [ PaddingVertical (dip 2.)
        PaddingLeft (dip 5.)
        BackgroundColor "wheat" 
        FontSize 14.
        TextStyle.Color "darkblue"
        FontWeight FontWeight.Bold ]
    

  let private separator () =
    RN.view [ separatorStyle ] []

  let private touchable isEnabled =
    Platform.select
      [ Platform.Ios
          (fun onPress ->
             RN.touchableOpacity
               [ OnPress onPress
                 Disabled (not isEnabled) ])
        Platform.Android
          (fun onPress ->
             RN.touchableNativeFeedback
               [ OnPress onPress
                 Disabled (not isEnabled) ]) ]

  let private sectionHeader section =
    RN.text
      [ sectionHeaderStyle ]
      (unbox<CustomSection> section).title

  let view items selected itemKey itemEnabled equals (dispatch: Dispatch<Message<'a>>) =
    let renderItem item =
      let style = match selected with
                  | Some sel when (equals item sel) -> [ selectedStyle ]
                  | _ -> []
      touchable
        (itemEnabled item)
        (fun () -> dispatch (ItemSelected item))
        [ RN.view
            [ itemStyle ]
            [ RN.text
                style
                (itemKey item) ] ]

    RN.sectionList items
      [ RenderSectionHeader (fun info -> sectionHeader info.section)
        SectionListProperties.RenderItem (fun item -> lazyView renderItem item.item)
        SectionListProperties.ItemSeparatorComponent separator
        SectionListProperties.ExtraData selected
        SectionListProperties.KeyExtractor (fun item _ -> itemKey item) ]
