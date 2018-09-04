namespace FilterConstructor

open Elmish
open Fable.Helpers.ReactNative
open Select
open Fable.Import


module FilterSelectModal =

  type Message = SelectModal.Message<CombinedFilter.Model>

  let private sections filters = 
    filters
    |> Array.map (fun (group, models) -> section models [] { title = sprintf "%A" group })

  let private singularFilterSections =
    sections FilterGroups.singularFilters

  let private combinationFilterSections = 
    sections FilterGroups.compositionFilters

  let singularFiltersView isVisible (dispatch: Dispatch<Message>) =
    SelectModal.view
      singularFilterSections
      None
      CombinedFilter.name
      (fun _ -> true)
      (=)
      isVisible
      dispatch

  let compositionFiltersView isVisible imagesAmount (dispatch: Dispatch<Message>) =
    SelectModal.view
      combinationFilterSections
      None
      CombinedFilter.name
      (fun filter -> (CombinedFilter.requiredImagesAmount filter) >= imagesAmount)
      (=)
      isVisible
      dispatch
