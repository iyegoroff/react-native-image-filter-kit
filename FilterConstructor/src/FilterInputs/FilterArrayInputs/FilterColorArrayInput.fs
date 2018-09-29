namespace FilterConstructor


module FilterColorArrayInput =

  type Model = FilterArrayInput.Model<FilterColorInput.Model, FilterColorInput.Message>

  type Message = FilterArrayInput.Message<FilterColorInput.Message>

  let convert (model: Model) =
    ResizeArray (model.Inputs |> List.map (fun (_, color) -> color.Value))

  let init inputs defaultValue name =
    FilterArrayInput.init
      (fun inputName -> FilterColorInput.init defaultValue inputName)
      FilterColorInput.update
      FilterColorInput.view
      inputs
      name
