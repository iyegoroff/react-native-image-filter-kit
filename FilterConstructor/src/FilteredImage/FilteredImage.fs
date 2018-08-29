namespace FilterConstructor

open Elmish
open Fable.Helpers.ReactNative
open Fable.Helpers.ReactNative.Props
open Fable.Import

module R = Fable.Helpers.React
module RN = Fable.Helpers.ReactNative
module RNP = Fable.Import.ReactNativePortal


module FilteredImage =

  type Id = Constants.Id

  type FilterItem = (Id * CombinedFilter.Model * Filter.Model)

  type Loading =
    | InProgress of int
    | Failed

  type Model<'a> = 
    { Image: 'a
      ImageSelectModalIsVisible: bool
      FilterSelectModalIsVisible: bool
      LoadingStatus: Loading
      NextId: Id }

  type Message =
    | Delete
    | Error of System.Exception
    | SelectFilter
    | FilterSelectModalMessage of FilterSelectModal.Message
    | FilterMessage of Id * Filter.Message
    | CopyCode
    | ImageLoadingStarted
    | ImageLoadingSucceed
    | ImageLoadingFailed


  let resizeModes =
    [| ResizeMode.Contain
       ResizeMode.Cover
       ResizeMode.Stretch
       ResizeMode.Center
       ResizeMode.Repeat |]

  let resizeControlValues = new ResizeArray<string> (Array.map unbox<string> resizeModes)

  let init image =    
    { Image = image
      ImageSelectModalIsVisible = false 
      FilterSelectModalIsVisible = false
      LoadingStatus = InProgress 0
      NextId = 0 }

  let loadingStatus message status =
    match (message, status) with
    | ImageLoadingStarted, InProgress x -> InProgress (x + 1)
    | ImageLoadingSucceed, InProgress x -> InProgress (x - 1)
    | _, _ -> Failed

  let update (model: Model<'a>) (message: Message) filters updatedModel mapMessage =
    match message with
    | Delete ->
      model, []

    | Error _ ->
      model, []

    | SelectFilter ->
      { model with FilterSelectModalIsVisible = true }, []

    | FilterSelectModalMessage msg ->
      match msg with
      | SelectModal.SelectMessage (Select.ItemSelected filter) -> 
        // Utils.configureNextLayoutAnimation ()
        let filters' = filters @ [model.NextId, filter, CombinedFilter.init filter]
        { (updatedModel model filters') with NextId = model.NextId + 1 }, []
        // Cmd.ofPromise Utils.delay 0 UpdateUnanimatedFilters Error
      | SelectModal.Hide ->
        { model with FilterSelectModalIsVisible = false }, []

    | FilterMessage (id, msg) ->
      match List.tryFind (fun (i, _, _) -> i = id) filters with
      | None -> model, []
      | Some (_, _, filter) ->
        let filter', cmd = Filter.update msg filter
        let filters =
          List.map (fun (i, t, f) -> i, t, if i = id then filter' else f) filters
        let filters' =
          match msg with
          | Filter.Message.Delete ->
            // Utils.configureNextLayoutAnimation ()
            List.filter (fun (i, _, _) -> i <> id) filters
          | Filter.Message.MoveDown ->
            // Utils.configureNextLayoutAnimation ()
            Utils.moveUpAt (List.findIndex (fun (i, _, _) -> i = id) filters) filters
          | Filter.Message.MoveUp ->
            // Utils.configureNextLayoutAnimation ()
            Utils.moveDownAt (List.findIndex (fun (i, _, _) -> i = id) filters) filters
          | _ -> filters

        updatedModel model filters',
        Cmd.batch
          [ Cmd.map (fun sub -> mapMessage (FilterMessage (id, sub))) cmd ]
            // Cmd.ofPromise Utils.delay 0 UpdateUnanimatedFilters Error ]

    | ImageLoadingStarted ->
      { model with LoadingStatus = (loadingStatus ImageLoadingStarted model.LoadingStatus) }, []
      
    | ImageLoadingSucceed ->
      { model with LoadingStatus = (loadingStatus ImageLoadingStarted model.LoadingStatus) }, []

    | ImageLoadingFailed ->
      { model with LoadingStatus = Failed }, []

        // | CopyCode ->
    //   model.Filters
    //   |> List.map (fun (_, filter, value) -> (filter, value))
    //   |> JSGenerator.run
    //   |> Globals.Clipboard.setString

    //   Alert.alert ("Info", "JS code copied to clipboard", [])
    //   model, []

  let private containerStyle =
    ViewProperties.Style
      [ MarginTop (dip 5.)
        Padding (dip 5.)
        BorderWidth 2.
        BorderRadius 3.
        BackgroundColor "white" ]

  let private imageControlsStyle =
    ViewProperties.Style
      [ MarginTop (dip 10.)
        FlexDirection FlexDirection.Row
        JustifyContent JustifyContent.SpaceBetween ]

  let private spinnerStyle =
    ViewProperties.Style
      [ Position Position.Absolute
        Width (pct 100.) 
        Height (pct 100.)
        JustifyContent JustifyContent.Center 
        AlignItems ItemAlignment.Center ]

  let private filterContainerStyle =
    ViewProperties.Style
      [ FlexDirection FlexDirection.ColumnReverse ]

  let imageControls dispatchSelectImage dispatch = 
    RN.view
      [ imageControlsStyle ]
      [ RN.button
          [ ButtonProperties.Title "Copy JS"
            ButtonProperties.OnPress (fun _ -> dispatch CopyCode) ]
          [] 
        RN.button
          [ ButtonProperties.Title "Change image"
            (match dispatchSelectImage with
             | Some dispatchSelectImage' -> ButtonProperties.OnPress dispatchSelectImage'
             | _ -> ButtonProperties.Disabled true) ]
          [] 
        RN.button
          [ ButtonProperties.Title "Delete"
            ButtonProperties.Color "red"
            ButtonProperties.OnPress (fun _ -> dispatch Delete) ]
            [] ]

  let filterPortal model dispatch =
    RNP.enterPortal
      Constants.filterPortal
      [ FilterSelectModal.view
          model.FilterSelectModalIsVisible
          (FilterSelectModalMessage >> dispatch) ]

  let spinner model =
    match model.LoadingStatus with
    | InProgress 0 -> R.fragment [] []
    | InProgress _ -> RN.activityIndicator [ spinnerStyle ]
    | Failed -> RN.view [ spinnerStyle ] [ RN.text [] "🚫" ]
    
  let view filters (dispatch: Dispatch<Message>) subviews =
    RN.view
      [ containerStyle
        ActivityIndicator.Size Size.Large ]
      [ R.fragment
          []
          [ RN.button
              [ ButtonProperties.Title "Add filter"
                ButtonProperties.OnPress (fun _ -> dispatch SelectFilter) ]
              []
            Spacer.view
            RN.view
              [ filterContainerStyle ]
              (List.map
                 (fun (id, tag, filter) ->
                    R.fragment
                      [ R.Props.FragmentProp.Key (string id) ]
                      [ CombinedFilter.controls
                          tag
                          filter
                          (fun msg -> dispatch (FilterMessage (id, msg))) ])
                 filters) ] 
        R.fragment
          []
          subviews ]
