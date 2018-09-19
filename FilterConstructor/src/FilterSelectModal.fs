namespace FilterConstructor

open Fable.Import


module FilterSelectModal =

  type Model = SelectModal.Model<CombinedFilter.Model>

  type Message = SelectModal.Message<CombinedFilter.Model>

  let showMsg =
    SelectModal.Show

  let private sections filters = 
    filters
    |> Array.map
         (fun (group, models) -> { Select.Items = models; Select.Title = sprintf "%A" group })

  let private singularFilterSections =
    sections FilterGroups.singularFilters

  let private compositionFilterSections = 
    sections FilterGroups.compositionFilters

  let initSingular = 
    SelectModal.init singularFilterSections None CombinedFilter.name (fun _ -> true) (=) false

  let initComposition imagesAmount =
    SelectModal.init
      compositionFilterSections
      None
      CombinedFilter.name
      (fun filter -> imagesAmount >= CombinedFilter.requiredImagesAmount filter)
      (=)
      false

  let update =
    SelectModal.update

  let view =
    SelectModal.view
