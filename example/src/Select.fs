namespace FilterConstructor

open Elmish
open ReactNativeHelpers
open ReactNativeHelpers.Props
open System
module R = ReactNativeHelpers


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

  let view items selected itemKey equals (dispatch: Dispatch<Message<'a>>) =
    let renderItem (item: FlatListRenderItemInfo<'a>) =
      let onPress () = dispatch (ItemSelected item.item)

      R.touchableNativeFeedback
        [ OnPress onPress ]
        [ R.view
            [ itemStyle ]
            [ R.text
                (if equals item.item selected then [ selectedStyle ] else [])
                (itemKey item.item) ] ]

    R.flatList items
      [ RenderItem (Func<_, _>renderItem)
        ItemSeparatorComponent separator
        ExtraData selected
        KeyExtractor (Func<_, _, _>(fun item _ -> itemKey item)) ]
