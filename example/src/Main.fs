module Main

open Elmish
open Fable.Core
open Fable.Import.ReactNative
open Fable.Helpers.React
open ReactNativeHelpers.Props
module R = ReactNativeHelpers

type Model =
  { filteredImages: FilteredImage.Model list
    imageSelect: ImageSelect.Model
    imageSelectIsVisible: bool }

type Message =
  | AddFilteredImage
  | ShowImageSelect
  | HideImageSelect
  | FilteredImageMessage of int * FilteredImage.Message
  | ImageSelectMessage of ImageSelect.Message


let init () =
  { filteredImages = []
    imageSelect = ImageSelect.init ()
    imageSelectIsVisible = false },
  Cmd.none

let selectedImage model =
  model.imageSelect.selectedImage.source

let update (message: Message) model =
  match message with
  | AddFilteredImage ->
    { model with filteredImages = (FilteredImage.init (selectedImage model)) :: model.filteredImages },
    []

  | FilteredImageMessage (id, msg) ->
    { model with filteredImages =
                   model.filteredImages
                   |> List.mapi (fun i m -> if i = id then FilteredImage.update msg m else m) }, []

  | ShowImageSelect ->
    { model with imageSelectIsVisible = true }, []

  | HideImageSelect ->
    { model with imageSelectIsVisible = false }, []

  | ImageSelectMessage msg ->
    let imageSelect, cmd = ImageSelect.update msg model.imageSelect
    let filteredImages = match msg with
                         | ImageSelect.SelectImage imageModel ->
                             model.filteredImages
                             |> List.map (fun m -> { m with image = imageModel.source })
                         | _ -> model.filteredImages
    let mappedCmd = Cmd.map ImageSelectMessage cmd
    let command = match msg with
                  | ImageSelect.SelectImage _ -> Cmd.batch [ mappedCmd; Cmd.ofMsg HideImageSelect ]
                  | _ -> mappedCmd
    { model with imageSelect = imageSelect
                 filteredImages = filteredImages }, command


let inline containerStyle<'a> =
  ViewProperties.Style
    [ Padding (Absolute 20.)
      Flex 1. ]

let inline gapStyle<'a> =
  ViewProperties.Style
    [ Height (Absolute 5.) ]

[<Pojo>]
type ScrollToConfig = { y: float }

let view model (dispatch: Dispatch<Message>) =
  let filteredImageDispatch i msg = dispatch <| FilteredImageMessage (i, msg)

  let items = model.filteredImages
              |> List.mapi (fun i c -> FilteredImage.view c (filteredImageDispatch i))

  let mutable scrollView: Option<ScrollView> = None

  let scrollToBottom = fun _ height ->
    match scrollView with
    | Some ref -> ref.scrollTo(U2.Case2 ({ y = height } :> obj))
    | None -> ()

  fragment
    []
    [ R.modal
        [ Visible model.imageSelectIsVisible
          OnRequestClose (fun () -> dispatch HideImageSelect) ]
        [ ImageSelect.view model.imageSelect (ImageSelectMessage >> dispatch) ]
      R.scrollView
        [ ScrollViewProperties.OnContentSizeChange scrollToBottom
          ScrollViewProperties.Ref (fun ref -> scrollView <- Some ref)]
        [ R.view
            [ containerStyle ]
            [ R.button
                [ ButtonProperties.Title "Change all images"
                  ButtonProperties.OnPress (fun () -> dispatch ShowImageSelect)]
                [] 
              R.view [ gapStyle ] []
              fragment [] [ yield! items ]
              R.view [ gapStyle ] []
              R.button
                [ ButtonProperties.Title "Add filtered image"
                  ButtonProperties.OnPress (fun () -> dispatch AddFilteredImage)]
                [] ] ] ]