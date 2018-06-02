module Main

open Elmish
open Fable.Core
open Fable.Import.ReactNative
open Fable.Helpers.React
open ReactNativeHelpers
open ReactNativeHelpers.Props
module R = ReactNativeHelpers

type Id = int

type Model =
  { filteredImages: (Id * FilteredImage.Model) list
    imageSelectModal: ImageSelectModal.Model
    nextId: Id }

type Message =
  | AddFilteredImage
  | FilteredImageMessage of int * FilteredImage.Message
  | ImageSelectModalMessage of ImageSelectModal.Message


let init () =
  { filteredImages = []
    imageSelectModal = (ImageSelectModal.init None)
    nextId = 0 },
  Cmd.none

let inline selectedImage model =
  ImageSelectModal.selectedImage model.imageSelectModal

let update (message: Message) model =
  match message with
  | AddFilteredImage ->
    { model with filteredImages =
                   (model.nextId, FilteredImage.init (selectedImage model)) :: model.filteredImages
                 nextId = model.nextId + 1 },
    []

  | FilteredImageMessage (id, msg) ->
    { model with filteredImages =
                   model.filteredImages
                   |> List.map
                     (fun (i, m) -> i, if i = id then FilteredImage.update msg m else m) },
    []

  | ImageSelectModalMessage msg ->
    let imageSelectModal, cmd = ImageSelectModal.update msg model.imageSelectModal
    let filteredImages = match msg with
                         | ImageSelectModal.ImageSelected image ->
                             model.filteredImages
                             |> List.map (fun (i, m) -> i, { m with image = image.source })
                         | _ -> model.filteredImages
    { model with imageSelectModal = imageSelectModal
                 filteredImages = filteredImages }, Cmd.map ImageSelectModalMessage cmd


let inline containerStyle<'a> =
  ViewProperties.Style
    [ Padding (Dip 15.)
      Flex 1. ]

let inline gapStyle<'a> =
  ViewProperties.Style
    [ Height (Dip 5.) ]

[<Pojo>]
type ScrollToConfig = { y: float }

let view model (dispatch: Dispatch<Message>) =
  let filteredImageDispatch i msg = dispatch <| FilteredImageMessage (i, msg)

  let items = model.filteredImages
              |> List.map (fun (i, c) -> FilteredImage.view c (filteredImageDispatch i))

  let mutable scrollView: Option<ScrollView> = None

  let scrollToBottom = fun _ height ->
    match scrollView with
    | Some ref -> ref.scrollTo(U2.Case2 ({ y = height } :> obj))
    | None -> ()

  fragment
    []
    [ ImageSelectModal.view model.imageSelectModal (ImageSelectModalMessage >> dispatch)
      R.scrollView
        [ ScrollViewProperties.OnContentSizeChange scrollToBottom
          ScrollViewProperties.Ref (fun ref -> scrollView <- Some ref)]
        [ R.view
            [ containerStyle ]
            [ R.button
                [ ButtonProperties.Title "Change all images"
                  ButtonProperties.OnPress
                    (fun () -> dispatch (ImageSelectModalMessage ImageSelectModal.Message.Show)) ]
                []
              R.view [ gapStyle ] []
              fragment [] [ yield! items ]
              R.view [ gapStyle ] []
              R.button
                [ ButtonProperties.Title "Add filtered image"
                  ButtonProperties.OnPress (fun () -> dispatch AddFilteredImage)]
                [] ] ] ]