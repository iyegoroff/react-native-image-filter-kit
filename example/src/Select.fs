namespace FilterConstructor

open Elmish
open Fable.Helpers.ReactNative
open Fable.Helpers.ReactNative.Props
open System
module R = Fable.Helpers.ReactNative


module Select =

  type Message<'a> =
    | ItemSelected of 'a


  let inline itemStyle<'a> =
    ViewProperties.Style
      [ Padding (Dip 15.)
        Flex 1. ]

  let inline selectedStyle<'a> =
    TextProperties.Style
      [ FontWeight FontWeight.Bold
        TextDecorationLine TextDecorationLine.Underline ]

  let inline separatorStyle<'a> =
    ViewProperties.Style
      [ Height (Dip 1.)
        Width (Pct 95.)
        AlignSelf Alignment.Center
        BackgroundColor "lightgray" ]

  let separator () =
    R.view [ separatorStyle ] []

  let touchable =
    Platform.select
      [ Platform.Ios (fun onPress -> R.touchableOpacity [ OnPress onPress ])
        Platform.Android (fun onPress -> R.touchableNativeFeedback [ OnPress onPress ]) ]

  let view items selected itemKey equals (dispatch: Dispatch<Message<'a>>) =
    let renderItem (item: FlatListRenderItemInfo<'a>) =
      let style = match selected with
                  | Some sel when (equals item.item sel) -> [ selectedStyle ]
                  | _ -> []
      touchable
        (fun () -> dispatch (ItemSelected item.item))
        [ R.view
            [ itemStyle ]
            [ R.text
                style
                (itemKey item.item) ] ]

    R.flatList items
      [ RenderItem renderItem
        ItemSeparatorComponent separator
        ExtraData selected
        KeyExtractor (fun item _ -> itemKey item) ]
