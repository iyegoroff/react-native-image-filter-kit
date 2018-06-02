module FilteredImage

open Elmish
open ReactNativeHelpers
open ReactNativeHelpers.Props
module R = ReactNativeHelpers


type Model = 
  { image: IImageSourceProperties list
    imageSelectModal: ImageSelectModal.Model
    filterSelectIsVisible: bool }

type Message =
  | ShowFilterSelect
  | HideFilterSelect
  | Delete
  | ShowImageSelect
  | HideImageSelect


let init image =
  { image = image
    imageSelectModal = ImageSelectModal.init (Some image)
    filterSelectIsVisible = false }

let update (message: Message) model =
  match message with
  | ShowFilterSelect ->
    { model with filterSelectIsVisible = true }

  | HideFilterSelect ->
    { model with filterSelectIsVisible = false }


let containerStyle =
  ViewProperties.Style
    [ MarginTop (Dip 5.)
      Padding (Dip 5.)
      BorderWidth 2.
      BorderRadius 3.
      BackgroundColor "white" ]

let imageStyle =
  ImageProperties.Style
    [ MarginBottom (Dip 5.)
      Width (Pct 100.)
      Height (Dip Constants.imageHeight) ]

let controlsStyle =
  ViewProperties.Style
    [ FlexDirection FlexDirection.Row
      JustifyContent JustifyContent.SpaceBetween ]

let view model (dispatch: Dispatch<Message>) =
  R.view
    [ containerStyle ]
    [ R.image
        [ imageStyle
          Source model.image ]
      R.view
        [ controlsStyle ]
        [ R.button
            [ ButtonProperties.Title "Add filter"
              ButtonProperties.OnPress (fun () -> dispatch ShowFilterSelect) ]
            []
          R.button
            [ ButtonProperties.Title "Change image"
              ButtonProperties.OnPress (fun () -> dispatch ShowFilterSelect) ]
            [] 
          R.button
            [ ButtonProperties.Title "Delete"
              ButtonProperties.Color "red"
              ButtonProperties.OnPress (fun () -> dispatch ShowFilterSelect) ]
            [] ] ]
