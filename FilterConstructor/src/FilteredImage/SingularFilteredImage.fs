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
      Image: Image.Model }

  type Model = FilteredImage.Model<Model'>

  type Message =
    | ResizeModeChanged of int
    | SelectImage
    | SetImage of Image.Model
    | ImageSelectModalMessage of ImageSelectModal.Message
    | FilteredImageMessage of FilteredImage.Message<Model'>

  let init image =    
    FilteredImage.init
      { Filters = []
        SelectedResizeMode = ResizeMode.Contain
        Image = image }

  let resizeControlIndex model =
    defaultArg
      (Array.tryFindIndex (fun x -> x = model.SelectedResizeMode) FilteredImage.resizeModes)
      0

  let private updatedModel (model: Model) filters =
    { model with Image = { model.Image with Filters = filters } }

  let update (message: Message) (model: Model) =
    match message with
    | ResizeModeChanged index ->
      { model with Image =
                     { model.Image with SelectedResizeMode = FilteredImage.resizeModes.[index] } },
      []

    | SetImage image -> 
      let model' = { model with Image = { model.Image with Image = image } }
      model', FilteredImage.updateDependentCmd model' FilteredImageMessage Cmd.none

    | SelectImage ->
      { model with ImageSelectModalIsVisible = true }, []

    | ImageSelectModalMessage msg ->
      match msg with
      | ImageSelectModal.ImageSelectionSucceed image ->
        model, Cmd.ofMsg (SetImage image)
      | ImageSelectModal.ImageSelectionCancelled ->
        model, []
      | ImageSelectModal.ImageSelectionFailed message ->
        Alert.alert ("Error", message, [])
        model, []
      | ImageSelectModal.Hide ->
        { model with ImageSelectModalIsVisible = false }, []

    | FilteredImageMessage msg ->
      FilteredImage.update model msg model.Image.Filters updatedModel FilteredImageMessage


  let private imageStyle =
    ImageProperties.Style
      [ MarginBottom (dip 5.)
        Width (pct 100.)
        Height (dip Constants.imageHeight) ]

  let private resizer model dispatch =
    Platform.select
      [ Platform.Android
          (RNS.segmentedControlTab
            [ RNS.Props.Values FilteredImage.resizeControlValues
              RNS.Props.OnTabPress (ResizeModeChanged >> dispatch)
              RNS.Props.SelectedIndex (resizeControlIndex model) ])
        Platform.Ios
          (RN.segmentedControlIOS
             [ Values FilteredImage.resizeControlValues
               SegmentedControlIOSProperties.OnChange
                 (fun event ->
                    dispatch (ResizeModeChanged event.nativeEvent.selectedSegmentIndex))
               SelectedIndex (resizeControlIndex model) ]) ]

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
              model.Image.Image
              model.ImageSelectModalIsVisible
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
             resizer model.Image dispatch
             FilteredImage.imageControls
               isDependency
               (Some (fun _ -> dispatch SelectImage))
               dispatch' ]) ]
