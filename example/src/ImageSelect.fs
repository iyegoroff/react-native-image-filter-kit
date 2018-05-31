module ImageSelect

open Elmish
open ReactNativeHelpers
open ReactNativeHelpers.Props
open System
module R = ReactNativeHelpers

type ImageModel =
  { name: string
    source: IImageSourceProperties list }

type Model = 
  { availableImages: ImageModel array
    selectedImage: ImageModel }

type Message = SelectImage of ImageModel


let init () =
  let availableImages = [|
    { name = "Parrot"
      source = (localImage "${entryDir}/../parrot.png") }
    { name = "Random"
      source = (localImage "${entryDir}/../parrot.png") }
  |]
 
  { availableImages = availableImages
    selectedImage = availableImages.[0] }

let update (message: Message) model =
  match message with
  | SelectImage image ->
    { model with selectedImage = image }


let inline itemStyle<'a> =
  ViewProperties.Style
    [ Padding (Absolute 15.)
      Flex 1. ]

let inline selectedStyle<'a> =
  TextProperties.Style
    [ FontWeight FontWeight.Bold
      TextDecorationLine TextDecorationLine.Underline ]

let inline separatorStyle<'a> =
  ViewProperties.Style
    [ Height (Absolute 1.)
      Width (Relative "95%")
      AlignSelf Alignment.Center
      BackgroundColor "lightgray" ]

let view model (dispatch: Dispatch<Message>) =
  let imageItem (image: FlatListRenderItemInfo<ImageModel>) =
    R.touchableNativeFeedback
      [ OnPress (fun () -> dispatch (SelectImage image.item)) ]
      [ R.view
          [ itemStyle ]
          [ R.text
              (if image.item.Equals model.selectedImage then [ selectedStyle ] else [])
              image.item.name ] ]

  R.flatList model.availableImages
    [ RenderItem (Func<_, _>imageItem)
      ItemSeparatorComponent (fun () -> (R.view [ separatorStyle ] []))
      KeyExtractor (Func<_, _, _>(fun image _ -> image.name)) ]
