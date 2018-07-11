namespace FilterConstructor

open Elmish
open Filter
open SelectModal
open Select


module FilterSelectModal =

  type Message = SelectModal.Message<CombinedFilter.Model>


  let view isVisible (dispatch: Dispatch<Message>) =
    SelectModal.view CombinedFilter.availableFilters None CombinedFilter.name (=) isVisible dispatch
