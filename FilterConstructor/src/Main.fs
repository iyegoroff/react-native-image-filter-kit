namespace FilterConstructor

open Elmish
open Elmish.React
open Fable.Helpers.ReactNative
open Fable.Helpers.ReactNative.Props
open Fable.Import
open Fable.Import.ReactNative

module RN = Fable.Helpers.ReactNative
module R = Fable.Helpers.React
module RNP = Fable.Import.ReactNativePortal


module Main =

  type Id = Constants.Id

  type Model =
    { FilteredImages: (Id * CombinedFilteredImage.Model) array
      DefaultImageSelectModalIsVisible: bool
      DefaultImage: Image.Model
      NextId: Id }

  type Message =
    | AddFilteredImage
    | ComposeTwoFirstImages
    | SelectDefaultImage
    | ImageSelectModalMessage of ImageSelectModal.Message
    | FilteredImageMessage of Id * FilteredImage.Message
    | ContainerScrolled

  let init () = 
    // Utils.enableExperimentalLayoutAnimationOnAndroid ()
    { FilteredImages = [||]
      DefaultImageSelectModalIsVisible = false
      DefaultImage = Image.defaultImage
      NextId = 0 },
    Cmd.none

  let update (message: Message) model =
    match message with
    | AddFilteredImage ->
      Utils.configureNextLayoutAnimation ()
      let newImage = FilteredImage.init model.DefaultImage
      { model with FilteredImages = Array.append [| (model.NextId, newImage) |] model.FilteredImages
                   NextId = model.NextId + 1 }, []

    | ComposeTwoFirstImages ->
      let composableImages =
        model.FilteredImages
        |> Array.filter (fun (_, image) -> not (FilteredImage.isCompositionInput image))
      
      if composableImages.Length > 1 then
        Utils.configureNextLayoutAnimation ()
        let (fId, fImage) = composableImages.[0]
        let (sId, sImage) = composableImages.[1]
        let newImage = FilteredImage.init fImage.Image (Some sImage.Image)
        let filteredImages =
          model.FilteredImages
          |> Array.map
               (fun (i, m) ->
                  (i, { m with IsCompositionInput = (i = fId || i = sId || m.IsCompositionInput) }))
           
        { model with FilteredImages = Array.append [| model.NextId, newImage |] filteredImages
                     NextId = model.NextId + 1 }, []
      else
        model, []

    | SelectDefaultImage ->
      { model with DefaultImageSelectModalIsVisible = true }, []

    | ImageSelectModalMessage msg ->
      match msg with
      | ImageSelectModal.ImageSelectionSucceed image ->
        { model with DefaultImage = image },
        model.FilteredImages
        |> Array.map
             (fun (id, _) ->
                Cmd.map
                  (fun sub -> FilteredImageMessage (id, sub))
                  (Cmd.ofMsg (FilteredImage.SetImage image)))
        |> Cmd.batch
      | ImageSelectModal.ImageSelectionCancelled ->
        model, []
      | ImageSelectModal.ImageSelectionFailed message ->
        Alert.alert ("Error", message, [])
        model, []
      | ImageSelectModal.Hide ->
        { model with DefaultImageSelectModalIsVisible = false }, []

    | FilteredImageMessage (id, msg) ->
      match Array.tryFind (fun (i, _) -> i = id) model.FilteredImages with
      | None -> model, []
      | Some (_, image) ->
        match msg with
        | FilteredImage.Delete ->
          Utils.configureNextLayoutAnimation ()
          { model with FilteredImages = Array.filter
                                          (fun (i, _) -> i <> id)
                                          model.FilteredImages }, []
        | _ ->
          let image', cmd = FilteredImage.update msg image
          { model with FilteredImages = Array.map
                                          (fun (i, m) -> i, if i = id then image' else m)
                                          model.FilteredImages },
          Cmd.map (fun sub -> FilteredImageMessage (id, sub)) cmd

    | ContainerScrolled ->
      model.FilteredImages
      |> Array.toList
      |> List.collect (fun (_, image) -> image.Filters)
      |> List.collect (fun (_, _, filter) -> filter)
      |> List.iter
           (function
            | (_, CombinedFilterInput.Model.Color
                    { FilterColorInput.Model.ColorWheelRef = Some wheel }) -> wheel.measureOffset ()
            | _ -> ())
      model, []


  let private canComposeImages (model: Model) =
    (model.FilteredImages
     |> Array.filter (fun (_, image) -> not (FilteredImage.isCompositionInput image))).Length > 1


  let private separatorStyle =
    ViewProperties.Style
      [ Height (dip 1.5) ]

  let private listContentStyle =
    ScrollViewProperties.ContentContainerStyle
      [ Padding (pct 1.5)
        PaddingTop (dip 5.) ]

  let private listStyle =
    ScrollViewProperties.Style
      [ BackgroundColor "wheat" ]

  let private separator () =
    RN.view [ separatorStyle ] []
        
  let view model (dispatch: Dispatch<Message>) =
    let filteredImageDispatch i msg = dispatch <| FilteredImageMessage (i, msg)

    let renderFilteredImage (id, image) =
      FilteredImage.view image (filteredImageDispatch id)

    let listControls () =
      R.fragment
        []
        [ RN.button
            [ ButtonProperties.Title "Change all images"
              ButtonProperties.Color "green"
              ButtonProperties.OnPress (fun () -> dispatch SelectDefaultImage) ]
            []
          Spacer.view
          RN.button
            [ ButtonProperties.Title "Add filtered image"
              ButtonProperties.Color "green"
              ButtonProperties.OnPress (fun () -> dispatch AddFilteredImage) ]
            []
          (if (canComposeImages model) then
             R.fragment
               []
               [ Spacer.view
                 RN.button
                   [ ButtonProperties.Title "Compose two first images"
                     ButtonProperties.Color "green"
                     ButtonProperties.OnPress (fun () -> dispatch ComposeTwoFirstImages) ]
                   [] ]
           else
             R.fragment [] []) ]

    RNP.portalProvider
      [ RN.statusBar
          [ StatusBarProperties.Hidden true ]
        ImageSelectModal.view
          model.DefaultImage
          model.DefaultImageSelectModalIsVisible
          (ImageSelectModalMessage >> dispatch)
        RNP.exitPortal Constants.filterPortal []
        RNP.exitPortal Constants.imagePortal []
        RN.flatList model.FilteredImages
          [ listContentStyle
            listStyle
            ExtraData (canComposeImages model)
            RenderItem (fun item -> lazyView renderFilteredImage item.item)
            ItemSeparatorComponent separator
            ListHeaderComponent listControls
            OnMomentumScrollEnd (fun _ -> dispatch ContainerScrolled)
            OnScrollEndDrag (fun _ -> dispatch ContainerScrolled)
            KeyExtractor (fun (id, _) _ -> string id) ] ]
