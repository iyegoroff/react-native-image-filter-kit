namespace FilterConstructor

open Elmish
open Fable.Helpers.ReactNative
open Select
open Fable.Import


module FilterSelectModal =

  type Message = SelectModal.Message<CombinedFilter.Model>

  let private sections = 
    CombinedFilter.availableFilters
    |> Array.map (fun (group, models) -> section models [] { title = sprintf "%A" group })

  let view isVisible (dispatch: Dispatch<Message>) =
    SelectModal.view sections None CombinedFilter.name (=) isVisible dispatch
