namespace FilterConstructor

open Elmish
open Filter
open SelectModal
open Select


module FilterSelectModal =

  type Message = SelectModal.Message<Filter.Model>


  let view isVisible (dispatch: Dispatch<Message>) =
    SelectModal.view Filter.availableFilters None Filter.name (=) isVisible dispatch
