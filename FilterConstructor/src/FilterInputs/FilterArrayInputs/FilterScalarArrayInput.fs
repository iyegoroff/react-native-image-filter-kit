namespace FilterConstructor


module FilterScalarArrayInput =


  type Model = FilterArrayInput.Model<FilterScalarInput.Model, FilterScalarInput.Message>

  type Message = FilterArrayInput.Message<FilterScalarInput.Message>


  let convert (model: Model) =
    ResizeArray (model.Inputs |> List.map (snd >> FilterRangeInput.convert))

  let init inputs defaultMin defaultMax defaultValue name =
    FilterArrayInput.init
      (fun inputName -> FilterScalarInput.init defaultMin defaultMax defaultValue inputName)
      FilterScalarInput.update
      FilterScalarInput.view
      inputs
      name
