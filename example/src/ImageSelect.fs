module ImageSelect

open Elmish
open ReactNativeHelpers
open ReactNativeHelpers.Props
open System
open Fable.Import
module R = ReactNativeHelpers

type ImageModel =
  { name: string
    source: IImageSourceProperties list }

type AvailableImageModel =
  | ImageModel of ImageModel
  | RandomImage

type Model = 
  { availableImages: AvailableImageModel array
    selectedImage: ImageModel }

type Message =
  | SelectImage of ImageModel
  | SelectRandomImage


let init image =
  let defaultImage =
    { name = "Parrot"
      source = (localImage "${entryDir}/../parrot.png") }

  let availableImages =
    [| ImageModel defaultImage
       ImageModel { name = "React logo"
                    source = [ ImageSourceProperties.Uri "https://pbs.twimg.com/profile_images/446356636710363136/OYIaJ1KK_400x400.png" ]}
       RandomImage |]

  let selectedImage =
    match image with
    | None -> defaultImage
    | Some i ->
      let found = Array.tryFind (function
                                 | ImageModel m -> m.source = i
                                 | RandomImage -> false)
                                availableImages
      match found with
      | Some (ImageModel img) -> img
      | _ -> defaultImage
                      
 
  { availableImages = availableImages
    selectedImage = selectedImage }

let imageName = function
  | RandomImage -> "Random"
  | ImageModel model -> model.name

let randomImageUrl () =
  let id = JS.Math.round (JS.Math.random () * 992.)
  let timestamp = JS.Date.now ()

  sprintf "https://picsum.photos/%f?image=%f&t=%f" Constants.imageHeight id timestamp

let update (message: Message) model =
  match message with
  | SelectImage image ->
    { model with selectedImage = image }, []
  
  | SelectRandomImage ->
    model,
    Cmd.ofMsg (SelectImage { name = imageName RandomImage
                             source = [ ImageSourceProperties.Uri (randomImageUrl ()) ] })


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

let view model (dispatch: Dispatch<Message>) =
  let imageItem (image: FlatListRenderItemInfo<AvailableImageModel>) =
    let onPress () = match image.item with
                     | RandomImage -> dispatch SelectRandomImage
                     | ImageModel model -> dispatch (SelectImage model)

    R.touchableNativeFeedback
      [ OnPress onPress ]
      [ R.view
          [ itemStyle ]
          [ R.text
              (if (imageName image.item).Equals model.selectedImage.name then [ selectedStyle ] else [])
              (imageName image.item) ] ]

  R.flatList model.availableImages
    [ RenderItem (Func<_, _>imageItem)
      ItemSeparatorComponent separator
      KeyExtractor (Func<_, _, _>(fun image _ -> imageName image)) ]
