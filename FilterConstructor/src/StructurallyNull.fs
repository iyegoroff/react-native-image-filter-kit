namespace FilterConstructor

// source: https://stackoverflow.com/a/20946801/4134913

[<CustomEquality; NoComparison>]
type StructurallyNull<'T> =
  { Value: 'T }

  override _x.Equals(yobj) =
    match yobj with
    | :? StructurallyNull<'T> as _y -> true
    | _ -> false

  override _x.GetHashCode() = 0
