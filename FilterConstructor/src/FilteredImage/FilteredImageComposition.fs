namespace FilterConstructor

open Elmish
open Fable.Helpers.ReactNative
open Fable.Helpers.ReactNative.Props
open Fable.Import

module R = Fable.Helpers.React
module RN = Fable.Helpers.ReactNative
module RNP = Fable.Import.ReactNativePortal
module RNF = Fable.Import.ReactNativeImageFilterKit
module RNS = Fable.Helpers.ReactNativeSegmentedControlTab


module FilteredImageComposition =

  type Model' =
    { Filters: FilteredImage.FilterItem list
      Images: ImageNode list }

  and ImageNode =
    | Singular of SingularFilteredImage.Model'
    | Composition of Model'

  type Model = FilteredImage.Model<Model'>

  type Message =
    | Update of ImageNode list
    | FilteredImageMessage of FilteredImage.Message

  let init images =    
    FilteredImage.init
      { Filters = []
        Images = images }

  let private updatedModel (model: Model) filters =
    { model with Image = { model.Image with Filters = filters } }

  let update (message: Message) (model: Model) =
    match message with
    | Update images ->
      { model with Image = { model.Image with Images = images }
                   LoadingStatus = FilteredImage.InProgress 0 }, []

    | FilteredImageMessage msg ->
      FilteredImage.update model msg model.Image.Filters updatedModel FilteredImageMessage

  let rec private image (model: ImageNode) dispatch =
    match model with
    | Singular image' -> SingularFilteredImage.image image' dispatch
    | Composition model' ->
      (List.fold
         (fun child (_, tag, filter) -> CombinedFilter.view tag filter child)
         (model'.Images
          |> List.map (fun image' -> image image' dispatch)
          |> R.fragment [])
         model'.Filters)
    
  let view (model: Model) (dispatch: Dispatch<Message>) =
    let dispatch' = FilteredImageMessage >> dispatch

    R.fragment
      []
      [ FilteredImage.filterPortal model dispatch'
        (FilteredImage.view
           model.Image.Filters
           dispatch'
           [ RN.view
               []
               [ FilteredImage.spinner model
                 image (Composition model.Image) dispatch' ]
             FilteredImage.imageControls None dispatch' ]) ]
