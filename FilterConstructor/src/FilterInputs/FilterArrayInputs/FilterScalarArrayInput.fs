namespace FilterConstructor


module FilterScalarArrayInput =


  type Model = FilterArrayInput.Model<FilterScalarInput.Model, FilterScalarInput.Message>

  type Message = FilterArrayInput.Message<FilterScalarInput.Message>


  let convert (model: Model) =
    ResizeArray (model.Inputs |> List.map (snd >> FilterRangeInput.convert))

  let init name inputs defaultMin defaultMax defaultValue =
    FilterArrayInput.init
      (fun inputName -> FilterScalarInput.init inputName defaultMin defaultMax defaultValue)
      FilterScalarInput.update
      FilterScalarInput.view
      name
      inputs
