
namespace FilterConstructor

open Elmish
open ReactNativeHelpers
open ReactNativeHelpers.Props
open Fable.Helpers.React
open SelectModal
open Select
open Fable.Import
module R = ReactNativeHelpers


module FilteredImage =

  type Model = 
    { Image: Image.Model
      ImageSelectModalIsVisible: bool }

  type Message =
    | Delete
    | SelectImage
    | AddFilter
    | ImageSelectModalMessage of ImageSelectModal.Message


  let init image =
    { Image = image
      ImageSelectModalIsVisible = false }

  let selectImage model image =
    { model with Image = image }

  let update (message: Message) model =
    match message with
    | Delete ->
      model, []

    | ImageSelectModalMessage msg ->
      match msg with
      | SelectMessage (ItemSelected image) -> 
        (selectImage model image), []
      | Hide ->
        { model with ImageSelectModalIsVisible = false }, []

    | SelectImage ->
      { model with ImageSelectModalIsVisible = true }, []

    | AddFilter -> model, []


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

  let spinnerStyle =
    ViewProperties.Style
      [ Position Position.Absolute
        Width (Pct 100.) 
        Height (Dip Constants.imageHeight)
        FlexStyle.Left (Dip 5.)
        FlexStyle.Top (Dip 5.) ]

  let view model (dispatch: Dispatch<Message>) =
    fragment
      []
      [ ImageSelectModal.view
          model.Image
          model.ImageSelectModalIsVisible
          (ImageSelectModalMessage >> dispatch)
        R.view
          [ containerStyle
            ActivityIndicator.Size Size.Large ]
          [ R.activityIndicator
              [ spinnerStyle ]
            R.image
              [ imageStyle
                Source (Image.source model.Image) ]
            R.view
              [ controlsStyle ]
              [ R.button
                  [ ButtonProperties.Title "Add filter"
                    ButtonProperties.OnPress (fun () -> dispatch AddFilter) ]
                  []
                R.button
                  [ ButtonProperties.Title "Change image"
                    ButtonProperties.OnPress (fun () -> dispatch SelectImage) ]
                  [] 
                R.button
                  [ ButtonProperties.Title "Delete"
                    ButtonProperties.Color "red"
                    ButtonProperties.OnPress (fun () -> dispatch Delete) ]
                  [] ] ] ]