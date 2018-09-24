namespace FilterConstructor

open System

module JSGenerator =

  let private imports = "__IMPORTS__"
  let private matrices = "__MATRICES__"
  let private props = "__PROPS__"

  let private (|Template|Line|Imports|Props|Matrices|) (input: string) =
    if input.IndexOf "\n" <> -1 then
      Template (input.Split ([|"\n"|], StringSplitOptions.None))

    elif input.IndexOf imports <> -1 then
      Imports (input.Replace (imports, ""))

    elif input.IndexOf props <> -1 then
      Props (input.Replace (props, ""))

    elif input.IndexOf matrices <> -1 then
      Matrices (input.Replace (matrices, ""))

    else
      Line input

  let private importName filter =
    (CombinedFilter.name filter).ToCharArray ()
    |> Array.mapi (fun i v -> if i = 0 then Char.ToLower v else v)
    |> String.Concat

  let private inputValue (input: CombinedFilterInput.Model) =
    match input with
    | CombinedFilterInput.Boolean value -> (sprintf "%b" value.Value)
    | CombinedFilterInput.Scalar value -> (sprintf "%.2f" value.Value)
    | CombinedFilterInput.Color value -> (sprintf "'%s'" value.Value)
    | CombinedFilterInput.Distance value -> (sprintf "'%A'" (value.Convert value.Value))
    | CombinedFilterInput.RGBAVector value -> (sprintf "%A" (value.Convert value.Value))
    | CombinedFilterInput.Point value -> (sprintf "%A" (value.Convert value.Value))
    | CombinedFilterInput.Offset value -> (sprintf "%A" (value.Convert value.Value))

  let run (selectedFilters: (CombinedFilter.Model * Filter.Model) list): string =
    let selectedFilters =
      selectedFilters
      |> List.mapFold
           (fun (map: Map<string, int>) (filter, value) -> 
              let name = (importName filter)
              let id = 1 + defaultArg (map.TryFind name) 0
              (name, value, id), Map.add name id map)
           Map.empty
      |> fst
      |> List.map (fun (name, value, id) -> (name, value, if id = 1 then "" else (string id)))

    "stub"

    // let rec generate =
    //   function
    //   | Template lines ->
    //     lines
    //     |> Array.map generate
    //     |> String.concat "\n"

    //   | Imports padding ->
    //     selectedFilters
    //     |> List.map (fun (name, _, _) -> name)
    //     |> List.distinct
    //     |> String.concat (sprintf ",\n%s" padding)
    //     |> sprintf "%s%s" padding

    //   | Props padding ->
    //     selectedFilters
    //     |> List.filter (fun (_, values, _) -> values.Length > 0)
    //     |> List.collect (fun (name, values, id) -> List.map (fun value -> name, value, id) values)
    //     |> List.map
    //          (fun (name, (inputName, input), id) ->
    //             match inputName with
    //             | Filter.Value -> sprintf "%s%s: %sValue%s = %s," name id name id (inputValue input)
    //             | _ -> sprintf "%s%A%s = %s" name inputName id (inputValue input))
    //     |> String.concat (sprintf "\n%s" padding)
    //     |> sprintf "%s%s" padding

    //   | Matrices padding ->
    //     selectedFilters
    //     |> List.map
    //          (fun (name, value, id) ->
    //             match value with
    //             | Some _ -> (sprintf "%s(%sValue%s)" name name id)
    //             | None -> (sprintf "%s()" name))
    //     |> String.concat (sprintf ",\n%s" padding)
    //     |> sprintf "%s%s" padding

    //   | Line input -> input

    // generate JSTemplate.template
