namespace FilterConstructor

open Fable.Helpers
open Elmish
open Elmish.React
open Fable.Import
open Fable.Helpers.ReactNative
open Fable.Helpers.ReactNative.Props
open Fable.Import.ReactNativeCollapsibleHeaderViews.Props
open Fable.Core
open Fable.Import.ReactNative

module RN = Fable.Helpers.ReactNative
module RNCHV = Fable.Import.ReactNativeCollapsibleHeaderViews


module Select =

  type Section<'item> =
    { Items: 'item array
      Title: string }

  type Model<'item when 'item : equality> =
    { Sections: Section<'item> array
      SelectedItem: 'item option
      ExtractItemKey: StructurallyNull<'item -> string>
      IsItemEnabled: StructurallyNull<'item -> bool>
      AreItemsEqual:  StructurallyNull<'item -> 'item -> bool>
      SearchedTerm: string }

  type private CustomSection = { title: string }


  type Message<'item> =
    | ItemSelected of 'item
    | ClearSelection
    | ClearSearch
    | Search of string

  let init items selectedItem extractItemKey isItemEnabled areItemsEqual =
    { Sections = items
      SelectedItem = selectedItem
      ExtractItemKey = { Value = extractItemKey }
      IsItemEnabled = { Value = isItemEnabled }
      AreItemsEqual = { Value = areItemsEqual }
      SearchedTerm = "" }

  let update (message: Message<'item>) (model: Model<'item>) =
    match message with
    | ClearSelection ->
      { model with SelectedItem = None }, []

    | ClearSearch ->
      { model with SearchedTerm = "" }, []

    | ItemSelected item ->
      { model with SelectedItem = Some item
                   SearchedTerm = "" }, []

    | Search term ->
      { model with SearchedTerm = term }, []

  let private itemStyle =
    ViewProperties.Style
      [ Padding (dip 15.) ]

  let private selectedStyle =
    TextProperties.Style
      [ FontWeight FontWeight.Bold
        TextDecorationLine TextDecorationLine.Underline ]

  let private disabledStyle =
    TextProperties.Style
      [ TextStyle.Color "lightgray" ]

  let private separatorStyle =
    ViewProperties.Style
      [ Height (dip 1.)
        Width (pct 95.)
        AlignSelf Alignment.Center
        BackgroundColor "lightgray" ]

  let private sectionHeaderStyle =
    TextProperties.Style
      [ PaddingVertical (dip 2.)
        PaddingLeft (dip 5.)
        BackgroundColor "wheat" 
        FontSize 14.
        TextStyle.Color "darkblue"
        FontWeight FontWeight.Bold ]
  
  let private listHeaderStyle =
    ViewProperties.Style
      [ Flex 1.
        JustifyContent JustifyContent.Center
        BackgroundColor "transparent"
        Padding (dip 5.) ]

  let private separator () =
    RN.view [ separatorStyle ] []

  let private touchable isEnabled =
    Platform.select
      [ Platform.Ios
          (fun onPress ->
             RN.touchableOpacity
               [ OnPress onPress
                 Disabled (not isEnabled) ])
        Platform.Android
          (fun onPress ->
             RN.touchableNativeFeedback
               [ OnPress onPress
                 Disabled (not isEnabled) ]) ]

  let private sectionHeader section =
    RN.text
      [ sectionHeaderStyle ]
      (unbox<CustomSection> section).title

  type [<Pojo>] private SelectProps<'item when 'item : equality> =
    { Model: Model<'item>
      Dispatch: Dispatch<Message<'item>> }

  type private Select<'item when 'item : equality>(props: SelectProps<'item>) as this =
    inherit React.Component<SelectProps<'item>, obj>(props)

    let header = this.Header

    member this.TextChanged =
      Debounce.debounce (Search >> this.props.Dispatch) 200 false

    member this.Header(_headerProps: CollapsibleHeaderProps) =
      RN.view
       [ listHeaderStyle ]
       [ SearchBar.view ignore (Debounce.unwrap this.TextChanged) ]

    override this.componentWillUnmount() =
      Debounce.clear this.TextChanged

    override this.render() =
      let model = this.props.Model
      let dispatch = this.props.Dispatch

      let filteredSections =
        model.Sections
        |> Array.map
            (fun s ->
              (section
                (Array.filter
                  (fun item ->
                    ((model.ExtractItemKey.Value item).ToLower ()).Contains
                       (model.SearchedTerm.ToLower ()))
                  s.Items)
                []
                { title = s.Title }))

      let renderItem item =
        touchable
          (model.IsItemEnabled.Value item)
          (fun () -> dispatch (ItemSelected item))
          [ RN.view
              [ itemStyle ]
              [ RN.text
                  (match model.SelectedItem with
                   | Some sel when (model.AreItemsEqual.Value item sel) -> [ selectedStyle ]
                   | _ -> if model.IsItemEnabled.Value item then [] else [ disabledStyle ])
                  (model.ExtractItemKey.Value item) ] ]

      RNCHV.collapsibleHeaderSectionList filteredSections header 60.
        [ HeaderContainerBackgroundColor "transparent" ]
        [ RenderSectionHeader (fun info -> sectionHeader info.section)
          SectionListProperties.RenderItem (fun item -> lazyView renderItem item.item)
          SectionListProperties.ItemSeparatorComponent separator
          SectionListProperties.KeyExtractor (fun item _ -> model.ExtractItemKey.Value item)
          KeyboardDismissMode "interactive"
          KeyboardShouldPersistTaps KeyboardShouldPersistTapsProperties.Handled ]

  let private select (props: SelectProps<'item>): React.ReactElement =
    (React.ofType<Select<'item>, _, _> props [])

  let view (model: Model<'item>) (dispatch: Dispatch<Message<'item>>) =
    select { Model = model; Dispatch = dispatch }
