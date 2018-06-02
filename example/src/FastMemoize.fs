module FastMemoize

open Fable.Core

[<Import("default","fast-memoize"); Emit("$0")>]
let Memoize<'A1, 'T> :('A1 -> 'T) -> ('A1 -> 'T) = jsNative

[<Import("default","fast-memoize"); Emit("$0")>]
let Memoize2<'A1, 'A2, 'T> :('A1 * 'A2 -> 'T) -> ('A1 -> 'A2 -> 'T) = jsNative

[<Import("default","fast-memoize"); Emit("$0")>]
let Memoize3<'A1, 'A2, 'A3, 'T> :('A1 * 'A2 * 'A3 -> 'T) -> ('A1 -> 'A2 -> 'A3 -> 'T) = jsNative

[<Import("default","fast-memoize"); Emit("$0")>]
let Memoize4<'A1, 'A2, 'A3, 'A4, 'T> :('A1 * 'A2 * 'A3 * 'A4 -> 'T) -> ('A1 -> 'A2 -> 'A3 -> 'A4 -> 'T) = jsNative
