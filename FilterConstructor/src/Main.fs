namespace FilterConstructor

open Elmish
open Elmish.React
open Fable.Helpers.ReactNative
open Fable.Helpers.ReactNative.Props
open Fable.Import

module RN = Fable.Helpers.ReactNative
module R = Fable.Helpers.React
module RNP = Fable.Import.ReactNativePortal


module Main =

  type Model =
    { FilteredImages: (Id * CombinedFilteredImage.Model) array
      CompositionFilterSelectModal: FilterSelectModal.Model
      DefaultImageSelectModal: ImageSelectModal.Model
      DefaultImage: Image.Model
      NextId: Id }

  type Message =
    | CombinedFilteredImageMessage of Id * CombinedFilteredImage.Message
    | AddSingularFilteredImage
    | DefaultImageSelectModalMessage of ImageSelectModal.Message
    | CompositionFilterSelectModalMessage of FilterSelectModal.Message
    | ContainerScrolled

  let init () = 
    // Utils.enableExperimentalLayoutAnimationOnAndroid ()
    { FilteredImages = [||]
      CompositionFilterSelectModal = FilterSelectModal.initComposition 2 false
      DefaultImageSelectModal = ImageSelectModal.init Image.defaultImage false
      DefaultImage = Image.defaultImage
      NextId = 0 },
    Cmd.none

  let private composableImages (model: Model) =
    (model.FilteredImages
     |> Array.filter (fun (_, image) -> not (CombinedFilteredImage.isDependency image)))

  let private canComposeImages (model: Model) =
    (composableImages model).Length > 1


  let update (message: Message) model =
    match message with
    | AddSingularFilteredImage ->
      Utils.configureNextLayoutAnimation ()
      let newImage = CombinedFilteredImage.initSingular Image.defaultImage 
      { model with FilteredImages = Array.append [| (model.NextId, newImage) |] model.FilteredImages
                   NextId = model.NextId + 1 }, []

    | CompositionFilterSelectModalMessage msg ->      
      let filterSelectModal, cmd = FilterSelectModal.update msg model.CompositionFilterSelectModal
      let cmd' = Cmd.map CompositionFilterSelectModalMessage cmd

      match msg with
      | SelectModal.SelectMessage (Select.ItemSelected filter) ->
        let imagesAmount = CombinedFilter.requiredImagesAmount filter
        let composableImages = composableImages model

        if composableImages.Length >= imagesAmount then
          Utils.configureNextLayoutAnimation ()
          let dependencies =
            composableImages
            |> Array.take imagesAmount
            |> Array.toList

          let composition =
            CombinedFilteredImage.initComposition
              filter
              (List.map (snd >> CombinedFilteredImage.imageNode) dependencies)
              (List.map fst dependencies)
              (FilterSelectModal.initComposition composableImages.Length false)

          let filteredImages =
            model.FilteredImages
            |> Array.append [| model.NextId, composition |]
            |> Array.map
                 (fun (id, image) ->
                    if List.exists (fun (depId, _) -> depId = id) dependencies then
                      (id, CombinedFilteredImage.withDependent image (Some model.NextId))
                    else
                      (id, image))
             
          { model with FilteredImages = filteredImages
                       NextId = model.NextId + 1 },
          cmd'
        else
          model, cmd'

      | _ ->
        { model with CompositionFilterSelectModal = filterSelectModal }, cmd'

    | DefaultImageSelectModalMessage msg ->
      match msg with
      | ImageSelectModal.ImageSelectionSucceed image ->
        { model with DefaultImage = image },
        model.FilteredImages
        |> Array.map
             (fun (id, _) ->
                Cmd.map
                  (fun sub -> CombinedFilteredImageMessage (id, sub))
                  (Cmd.ofMsg
                     (CombinedFilteredImage.Singular (SingularFilteredImage.SetImage image))))
        |> Cmd.batch

      | ImageSelectModal.ImageSelectionCancelled ->
        model, []

      | ImageSelectModal.ImageSelectionFailed message ->
        Alert.alert ("Error", message, [])
        model, []

      | _ ->
        let imageSelectModal, cmd = ImageSelectModal.update msg model.DefaultImageSelectModal

        { model with DefaultImageSelectModal = imageSelectModal },
        Cmd.map DefaultImageSelectModalMessage cmd

    | CombinedFilteredImageMessage (id, msg) ->
      match Array.tryFind (fun (i, _) -> i = id) model.FilteredImages with
      | None -> model, []
      | Some (_, image) ->
        match (msg, image) with
        | CombinedFilteredImage.Singular
            (SingularFilteredImage.FilteredImageMessage
               (FilteredImage.UpdateDependent (depId, _))), _
        | CombinedFilteredImage.Composition
            (FilteredImageComposition.FilteredImageMessage
               (FilteredImage.UpdateDependent (depId, _))), _ ->
          match Array.tryFind (fun (depId', _) -> depId = depId') model.FilteredImages with
          | None -> model, []
          | Some (_, dependent) ->
            let dependencies = CombinedFilteredImage.dependencies dependent
            let imageNodes =
              model.FilteredImages
              |> Array.filter (fun (id', _) -> List.contains id' dependencies)
              |> Array.map (snd >> CombinedFilteredImage.imageNode)
              |> Array.toList

            model,
            Cmd.ofMsg
              (CombinedFilteredImageMessage
                (depId,
                 (CombinedFilteredImage.Composition (FilteredImageComposition.Update imageNodes))))

        | CombinedFilteredImage.Singular
            (SingularFilteredImage.FilteredImageMessage FilteredImage.Delete),
          CombinedFilteredImage.Singular _ ->
          Utils.configureNextLayoutAnimation ()
          { model with FilteredImages =
                         Array.filter (fun (i, _) -> i <> id) model.FilteredImages }, []

        | CombinedFilteredImage.Composition
            (FilteredImageComposition.FilteredImageMessage FilteredImage.Delete),
          CombinedFilteredImage.Composition _ ->
          let filteredImages =
            model.FilteredImages
            |> Array.map
                 (fun (depId, depImage) ->
                    if CombinedFilteredImage.isDependencyFor depImage id then
                      (depId, CombinedFilteredImage.withDependent depImage None)
                    else
                      (depId, depImage))
            |> Array.filter (fun (i, _) -> i <> id)
          { model with FilteredImages = filteredImages }, []

        | _, _ ->
          let image', cmd = CombinedFilteredImage.update msg image
          { model with FilteredImages = Array.map
                                          (fun (i, m) -> i, if i = id then image' else m)
                                          model.FilteredImages },
          Cmd.map (fun sub -> CombinedFilteredImageMessage (id, sub)) cmd

    | ContainerScrolled ->
      model.FilteredImages
      |> Array.toList
      |> List.collect (fun (_, image) -> CombinedFilteredImage.filters image)
      |> List.collect (fun (_, _, filter) -> filter.Inputs)
      |> List.iter
           (function
            | (_, CombinedFilterInput.Model.Color
                    { FilterColorInput.Model.ColorWheelRef = Some wheel }) -> wheel.measureOffset ()
            | (_, CombinedFilterInput.Model.Array (CombinedFilterArrayInput.Model.Color array)) ->
              array.Inputs
              |> List.map (fun (_, color) -> color.ColorWheelRef)
              |> List.iter (Option.fold (fun _ wheel -> wheel.measureOffset ()) ())
            | _ -> ())
      model, []

  let private separatorStyle =
    ViewProperties.Style
      [ Height (dip 1.5) ]

  let private listContentStyle =
    ContentContainerStyle
      [ Padding (pct 1.5)
        PaddingTop (dip 15.) ]

  let private listStyle =
    ScrollViewProperties.Style
      [ BackgroundColor "wheat" ]

  let private separator () =
    RN.view [ separatorStyle ] []
        
  let view (model: Model) (dispatch: Dispatch<Message>) =
    let filteredImageDispatch i msg = dispatch <| CombinedFilteredImageMessage (i, msg)

    let renderFilteredImage (id, image) =
      CombinedFilteredImage.view image (filteredImageDispatch id)

    let listControls () =
      R.fragment
        []
        [ RN.button
            [ ButtonProperties.Title "Change all images"
              ButtonProperties.Color "green"
              (ButtonProperties.OnPress
                 (fun () -> dispatch (DefaultImageSelectModalMessage ImageSelectModal.showMsg))) ]
            []
          Spacer.view
          RN.button
            [ ButtonProperties.Title "Add filtered image"
              ButtonProperties.Color "green"
              ButtonProperties.OnPress (fun () -> dispatch AddSingularFilteredImage) ]
            []
          Spacer.view
          RN.button
            [ ButtonProperties.Title "Compose last images"
              ButtonProperties.Color "green"
              ButtonProperties.Disabled (not (canComposeImages model))
              (ButtonProperties.OnPress
                (fun () ->
                   dispatch (CompositionFilterSelectModalMessage FilterSelectModal.showMsg))) ]
            [] ]

    RNP.portalProvider
      [ RN.statusBar
          [ StatusBarProperties.Hidden true ]
        RN.flatList model.FilteredImages
          [ listContentStyle
            listStyle
            ExtraData (canComposeImages model)
            RenderItem (fun item -> lazyView renderFilteredImage item.item)
            ItemSeparatorComponent separator
            ListHeaderComponent listControls
            OnMomentumScrollEnd (fun _ -> dispatch ContainerScrolled)
            OnScrollEndDrag (fun _ -> dispatch ContainerScrolled)
            KeyExtractor (fun (id, _) _ -> string id) ]
        RNP.exitPortal Constants.filterPortal []
        RNP.exitPortal Constants.imagePortal []
        ImageSelectModal.view
          model.DefaultImageSelectModal
          (DefaultImageSelectModalMessage >> dispatch)
        FilterSelectModal.view
          model.CompositionFilterSelectModal
          (CompositionFilterSelectModalMessage >> dispatch)  ]

  let pureView  =
    lazyView2 view
