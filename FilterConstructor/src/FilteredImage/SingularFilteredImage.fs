namespace FilterConstructor

open Elmish
open Fable.Helpers.ReactNative
open Fable.Helpers.ReactNative.Props
open Fable.Import

module R = Fable.Helpers.React
module RN = Fable.Helpers.ReactNative
module RNP = Fable.Import.ReactNativePortal
module RNS = Fable.Helpers.ReactNativeSegmentedControlTab


module SingularFilteredImage =

  type Model' =
    { Filters: FilteredImage.FilterItem list
      SelectedResizeMode: ResizeMode
      Image: Image.Model
      ImageSelectModal: ImageSelectModal.Model }

  type Model = FilteredImage.Model<Model'>

  type Message =
    | ResizeModeChanged of int
    | SetImage of Image.Model
    | ImageSelectModalMessage of ImageSelectModal.Message
    | FilteredImageMessage of FilteredImage.Message<Model'>

  let init image =
    FilteredImage.init
      { Filters = []
        SelectedResizeMode = ResizeMode.Contain
        Image = image
        ImageSelectModal = ImageSelectModal.init image false }
      (FilterSelectModal.initSingular false)

  let resizeControlIndex model =
    defaultArg
      (Array.tryFindIndex (fun x -> x = model.SelectedResizeMode) FilteredImage.resizeModes)
      0

  let private updatedModel (model: Model) filters =
    { model with Image = { model.Image with Filters = filters } }

  let update (message: Message) (model: Model) =
    match message with
    | ResizeModeChanged index ->
      let model' =
        { model with Image =
                       { model.Image with SelectedResizeMode = FilteredImage.resizeModes.[index] } }
      model', FilteredImage.updateDependentCmd model' FilteredImageMessage Cmd.none

    | SetImage image -> 
      let prevFilters =
        match model.Image.Image with
        | Image.Generated _ -> List.tail model.Image.Filters
        | _ -> model.Image.Filters

      let filters =
        match image with
        | Image.Generated generator -> (0, generator, CombinedFilter.init generator)::prevFilters
        | _ -> prevFilters

      let image' = { model.Image with Image = image
                                      Filters = filters }
      let model' = { model with Image = image' }

      model', FilteredImage.updateDependentCmd model' FilteredImageMessage Cmd.none

    | ImageSelectModalMessage msg ->
      let imageSelectModal, cmd = ImageSelectModal.update msg model.Image.ImageSelectModal

      match msg with
      | ImageSelectModal.ImageSelectionSucceed image ->
        model, Cmd.ofMsg (SetImage image)

      | ImageSelectModal.ImageSelectionCancelled ->
        model, []

      | ImageSelectModal.ImageSelectionFailed message ->
        Alert.alert ("Error", message, [])
        model, []

      | _ ->
        { model with Image = { model.Image with ImageSelectModal = imageSelectModal } },
        Cmd.map ImageSelectModalMessage cmd

    | FilteredImageMessage msg ->
      let model', cmd = FilteredImage.update msg model model.Image.Filters updatedModel id
      model', Cmd.map FilteredImageMessage cmd


  let private imageStyle =
    ImageProperties.Style
      [ MarginBottom (dip 5.)
        Width (pct 100.)
        Height (dip Constants.imageHeight) ]

  let image model dispatch =
    match (Image.source model.Image) with
    | None -> R.fragment [] []
    | Some source ->
      (List.fold
        (fun child (_, tag, filter) -> CombinedFilter.view tag filter child)
        (RN.image
          [ imageStyle
            OnLoadStart (fun _ -> dispatch FilteredImage.ImageLoadingStarted)
            OnLoad (fun _ -> dispatch FilteredImage.ImageLoadingSucceed)
            OnError (fun _ -> dispatch FilteredImage.ImageLoadingFailed)
            ResizeMode model.SelectedResizeMode
            Source source ])
        model.Filters)

  let view (model: Model) (dispatch: Dispatch<Message>) =
    let dispatch' = FilteredImageMessage >> dispatch
    let isDependency = model.Dependent.IsSome

    R.fragment
      []
      [ RNP.enterPortal
          Constants.imagePortal
          [ ImageSelectModal.view
              model.Image.ImageSelectModal
              (ImageSelectModalMessage >> dispatch) ]
        FilteredImage.filterPortal model dispatch'
        (FilteredImage.view
           isDependency
           model.Image.Filters
           dispatch'
           [ RN.view
               []
               [ FilteredImage.spinner model
                 image model.Image dispatch' ]
             SegmentedControl.view
               FilteredImage.resizeControlValues
               (resizeControlIndex model.Image)
               (ResizeModeChanged >> dispatch)
             FilteredImage.imageControls
               isDependency
               (Some (fun _ -> dispatch (ImageSelectModalMessage ImageSelectModal.showMsg)))
               dispatch' ]) ]
