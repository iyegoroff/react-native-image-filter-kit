namespace FilterConstructor

open Fable.Import.ReactNative

module Constants =

  type Id = int
  
  let imageHeight = (Globals.Dimensions.get "screen").height * 0.5
  let filterPortal = "filterPortal"
  let imagePortal = "imagePortal"

  let screenSize () =
    Globals.Dimensions.get("screen")
