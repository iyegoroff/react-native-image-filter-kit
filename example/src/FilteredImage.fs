
namespace FilterConstructor
open Elmish
open Fable.Helpers.ReactNative
open Fable.Helpers.ReactNative.Props
open SelectModal
open Select
open Fable.Import

module R = Fable.Helpers.React
module RN = Fable.Helpers.ReactNative
module RNP = Fable.Import.ReactNativePortal


module FilteredImage =

  type Id = int

  type Model = 
    { Image: Image.Model
      Filters: (Id * CombinedFilter.Model * Filter.Model) list
      ImageSelectModalIsVisible: bool
      FilterSelectModalIsVisible: bool
      NextId: Id }

  type Message =
    | Delete
    | ImageSelectModalMessage of ImageSelectModal.Message
    | SelectImage
    | FilterSelectModalMessage of FilterSelectModal.Message
    | SelectFilter
    | FilterMessage of Id * Filter.Message


  let init image =
    { Image = image
      Filters = []
      ImageSelectModalIsVisible = false 
      FilterSelectModalIsVisible = false
      NextId = 0 }

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
        { model with Filters = model.Filters @ [model.NextId, filter, CombinedFilter.init filter]
                     NextId = model.NextId + 1 }, []
      | Hide ->
        { model with FilterSelectModalIsVisible = false }, []

    | SelectFilter ->
      { model with FilterSelectModalIsVisible = true }, []

    | FilterMessage (id, msg) ->
      match List.tryFind (fun (i, _, _) -> i = id) model.Filters with
      | None -> model, []
      | Some (_, _, filter) ->
        let filter', cmd = Filter.update msg filter
        { model with Filters = List.map
                                 (fun (i, t, f) -> i, t, if i = id then filter' else f)
                                 model.Filters },
        Cmd.map (fun sub -> FilterMessage (id, sub)) cmd
      


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
        Height (Dip Constants.imageHeight)
        ImageStyle.ResizeMode "contain" ]

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
    |> List.map
       (fun (id, tag, filter) -> CombinedFilter.controls tag filter (fun msg -> dispatch (id, msg)))
    |> R.fragment []
      

  let filteredImage model =
    List.fold
     (fun child (_, tag, filter) -> CombinedFilter.view tag filter child)
     (RN.image
       [ imageStyle
         Source (Image.source model.Image) ])
     model.Filters
      
    
  let view model (dispatch: Dispatch<Message>) =
    R.fragment
      []
      [ RNP.enterPortal
          Constants.imagePortal
          [ ImageSelectModal.view
              model.Image
              model.ImageSelectModalIsVisible
              (ImageSelectModalMessage >> dispatch) ]
        RNP.enterPortal
          Constants.filterPortal
          [ FilterSelectModal.view
              model.FilterSelectModalIsVisible
              (FilterSelectModalMessage >> dispatch) ]
        RN.view
          [ containerStyle
            ActivityIndicator.Size Size.Large ]
          [ (controls model (FilterMessage >> dispatch))
            RN.view
              []
              [ RN.activityIndicator
                  [ spinnerStyle ]
                (filteredImage model) ]
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
