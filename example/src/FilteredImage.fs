
namespace FilterConstructor

open Elmish
open Fable.Helpers.ReactNative
open Fable.Helpers.ReactNative.Props
open SelectModal
open Select
open Fable.Import

module R = Fable.Helpers.React
module RN = Fable.Helpers.ReactNative


module FilteredImage =

  type Model = 
    { Image: Image.Model
      Filters: Filter.Model list
      ImageSelectModalIsVisible: bool
      FilterSelectModalIsVisible: bool }

  type Message =
    | Delete
    | ImageSelectModalMessage of ImageSelectModal.Message
    | SelectImage
    | FilterSelectModalMessage of FilterSelectModal.Message
    | SelectFilter


  let init image =
    { Image = image
      Filters = []
      ImageSelectModalIsVisible = false 
      FilterSelectModalIsVisible = false }

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

    | FilterSelectModalMessage msg ->
      match msg with
      | SelectMessage (ItemSelected filter) -> 
        { model with Filters = model.Filters @ [filter] }, []
      | Hide ->
        { model with FilterSelectModalIsVisible = false }, []

    | SelectFilter ->
      { model with FilterSelectModalIsVisible = true }, []


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

  let controls model dispatch =
    model.Filters
    |> List.map (fun filter -> RN.text [] (Filter.name filter))
    |> R.fragment []
      

  let filteredImage model dispatch =
    model.Filters
    |> List.fold
         (fun child filter -> [ (Filter.element filter) child ])
         [ RN.image
             [ imageStyle
               Source (Image.source model.Image) ] ]
    |> R.fragment []
      
    
  let view model (dispatch: Dispatch<Message>) =
    R.fragment
      []
      [ ImageSelectModal.view
          model.Image
          model.ImageSelectModalIsVisible
          (ImageSelectModalMessage >> dispatch)
        FilterSelectModal.view
          model.FilterSelectModalIsVisible
          (FilterSelectModalMessage >> dispatch)
        RN.view
          [ containerStyle
            ActivityIndicator.Size Size.Large ]
          [ (controls model dispatch)
            RN.activityIndicator
              [ spinnerStyle ]
            (filteredImage model dispatch)
            RN.view
              [ controlsStyle ]
              [ RN.button
                  [ ButtonProperties.Title "Add filter"
                    ButtonProperties.OnPress (fun () -> dispatch SelectFilter) ]
                  []
                RN.button
                  [ ButtonProperties.Title "Change image"
                    ButtonProperties.OnPress (fun () -> dispatch SelectImage) ]
                  [] 
                RN.button
                  [ ButtonProperties.Title "Delete"
                    ButtonProperties.Color "red"
                    ButtonProperties.OnPress (fun () -> dispatch Delete) ]
                  [] ] ] ]