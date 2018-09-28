namespace FilterConstructor

open Fable.Import.ReactNativeImageFilterKit.Props
open Fable.Import


module EnumConverters =
  
  let tileMode tile =
    if "REPEAT" = tile then REPEAT
    else if "MIRROR" = tile then MIRROR
    else CLAMP