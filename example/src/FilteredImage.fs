module FilteredImage

open Elmish
open ReactNativeHelpers.Props
module R = ReactNativeHelpers


type Model = 
  { image: IImageSourceProperties list
    filterSelectIsVisible: bool }


type Message =
  | ShowFilterSelect
  | HideFilterSelect


let init image =
  { image = image
    filterSelectIsVisible = false }


let update (message: Message) model =
  match message with
  | ShowFilterSelect ->
    { model with filterSelectIsVisible = true }
  | HideFilterSelect ->
    { model with filterSelectIsVisible = false }

let inline containerStyle<'a> =
  ViewProperties.Style
    [ MarginTop (Absolute 5.)
      Padding (Absolute 5.)
      BorderWidth 1.
      BorderRadius 3.
      BackgroundColor "white" ]

let inline imageStyle<'a> =
  ImageProperties.Style
    [ MarginTop (Absolute 5.)
      Width (Relative "100%")
      Height (Absolute Constants.imageHeight) ]

let view model (dispatch: Dispatch<Message>) =
  R.view
    [ containerStyle ]
    [ R.button
        [ ButtonProperties.Title "Add filter"
          ButtonProperties.OnPress (fun () -> dispatch ShowFilterSelect)
        ]
        []
      R.image
        [ imageStyle
          Source model.image ] ]
