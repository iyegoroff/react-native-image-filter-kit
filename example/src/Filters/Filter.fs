namespace FilterConstructor

open Elmish
open Fable.Import

module R = Fable.Helpers.React
module RN = Fable.Helpers.ReactNative
module RNF = Fable.Helpers.ReactNativeImageFilterKit


module Filter =

  type InputShape<'scalar, 'distance, 'point, 'rgbaVector> =
    | InputAmount of 'scalar
    | InputAngle of 'scalar
    | InputBrightness of 'scalar
    | InputCenter of 'point
    | InputContrast of 'scalar
    | InputIntensity of 'scalar
    | InputLevels of 'scalar
    | InputMinComponents of 'rgbaVector
    | InputMaxComponents of 'rgbaVector
    | InputNoiseLevel of 'scalar
    | InputRadius of 'distance
    | InputSaturation of 'scalar
    | InputScale of 'scalar
    | InputSharpness of 'scalar
    | InputWidth of 'distance

  type InputModel = InputShape<FilterScalarInput.Model,
                               FilterDistanceInput.Model,
                               FilterPointInput.Model,
                               FilterRGBAVectorInput.Model> 

  type Model = InputModel list

  type InputMessage = InputShape<FilterScalarInput.Message,
                                 FilterDistanceInput.Message,
                                 FilterPointInput.Message,
                                 FilterRGBAVectorInput.Message>

  type Message =
    | FilterInputMessage of InputMessage

  let private swapInput inputs newInput =
    List.map
      (fun input ->
         match input, newInput with
         | InputAmount _, InputAmount _ -> newInput
         | InputAmount _, _ -> input
         | InputAngle _, InputAngle _ -> newInput
         | InputAngle _, _ -> input
         | InputBrightness _, InputBrightness _ -> newInput
         | InputBrightness _, _ -> input
         | InputCenter _, InputCenter _ -> newInput
         | InputCenter _, _ -> input
         | InputContrast _, InputContrast _ -> newInput
         | InputContrast _, _ -> input
         | InputIntensity _, InputIntensity _ -> newInput
         | InputIntensity _, _ -> input
         | InputLevels _, InputLevels _ -> newInput
         | InputLevels _, _ -> input
         | InputMinComponents _, InputMinComponents _ -> newInput
         | InputMinComponents _, _ -> input
         | InputMaxComponents _, InputMaxComponents _ -> newInput
         | InputMaxComponents _, _ -> input
         | InputNoiseLevel _, InputNoiseLevel _ -> newInput
         | InputNoiseLevel _, _ -> input
         | InputRadius _, InputRadius _ -> newInput
         | InputRadius _, _ -> input
         | InputSaturation _, InputSaturation _ -> newInput
         | InputSaturation _, _ -> input
         | InputScale _, InputScale _ -> newInput
         | InputScale _, _ -> input
         | InputSharpness _, InputSharpness _ -> newInput
         | InputSharpness _, _ -> input
         | InputWidth _, InputWidth _ -> newInput
         | InputWidth _, _ -> input)
      inputs

  let private updateInput message (model: Model) (toInputModel: 'input -> InputModel) =
    match message with
    | FilterInput.Message.ValueChanged input ->
      swapInput model (toInputModel input), []
    | _ -> model, []

  let update (message: Message) (model: Model) =
    match message with
    | FilterInputMessage msg ->
      match msg with
      | InputAmount msg' -> updateInput msg' model InputAmount
      | InputAngle msg' -> updateInput msg' model InputAngle
      | InputBrightness msg' -> updateInput msg' model InputBrightness
      | InputCenter msg' -> updateInput msg' model InputCenter
      | InputContrast msg' -> updateInput msg' model InputContrast
      | InputIntensity msg' -> updateInput msg' model InputIntensity
      | InputLevels msg' -> updateInput msg' model InputLevels
      | InputMinComponents msg' -> updateInput msg' model InputMinComponents
      | InputMaxComponents msg' -> updateInput msg' model InputMaxComponents
      | InputNoiseLevel msg' -> updateInput msg' model InputNoiseLevel
      | InputRadius msg' -> updateInput msg' model InputRadius
      | InputSaturation msg' -> updateInput msg' model InputSaturation
      | InputScale msg' -> updateInput msg' model InputScale
      | InputSharpness msg' -> updateInput msg' model InputSharpness
      | InputWidth msg' -> updateInput msg' model InputWidth

  let view filterComponent mapInput (model: Model) content =
    filterComponent
      (model |> List.map mapInput |> List.choose id)
      [ content ]

  let controls name (model: Model) (dispatch: Dispatch<Message>) =
    let dispatch' = FilterInputMessage >> dispatch
    let sliders = 
      model
      |> List.map
           (function
            | InputAmount input -> FilterScalarInput.view input (InputAmount >> dispatch')
            | InputAngle input -> FilterScalarInput.view input (InputAngle >> dispatch')
            | InputBrightness input -> FilterScalarInput.view input (InputBrightness >> dispatch')
            | InputCenter input -> FilterPointInput.view input (InputCenter >> dispatch')
            | InputContrast input -> FilterScalarInput.view input (InputContrast >> dispatch')
            | InputIntensity input -> FilterScalarInput.view input (InputIntensity >> dispatch')
            | InputLevels input -> FilterScalarInput.view input (InputLevels >> dispatch')
            | InputMinComponents input ->
              FilterRGBAVectorInput.view input (InputMinComponents >> dispatch')
            | InputMaxComponents input ->
              FilterRGBAVectorInput.view input (InputMaxComponents >> dispatch')
            | InputNoiseLevel input -> FilterScalarInput.view input (InputNoiseLevel >> dispatch')
            | InputRadius input -> FilterDistanceInput.view input (InputRadius >> dispatch')
            | InputSaturation input -> FilterScalarInput.view input (InputSaturation >> dispatch')
            | InputScale input -> FilterScalarInput.view input (InputScale >> dispatch')
            | InputSharpness input -> FilterScalarInput.view input (InputSharpness >> dispatch')
            | InputWidth input -> FilterDistanceInput.view input (InputWidth >> dispatch'))
        
    RN.view
      []
      [ RN.text [] name
        R.fragment [] sliders ]
