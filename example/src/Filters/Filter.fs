namespace FilterConstructor

open Elmish
open Fable.Helpers.ReactNative
open Fable.Helpers.ReactNative.Props

module R = Fable.Helpers.React
module RN = Fable.Helpers.ReactNative
module RNF = Fable.Helpers.ReactNativeImageFilterKit


module Filter =

  type Input =
    | InputAmount
    | InputAngle
    | InputBrightness
    | InputCenter
    | InputContrast
    | InputIntensity
    | InputLevels
    | InputMinComponents
    | InputMaxComponents
    | InputNoiseLevel
    | InputRadius
    | InputSaturation
    | InputScale
    | InputSharpness
    | InputWidth

  type Model = (Input * CombinedFilterInput.Model) list

  type Message =
    | FilterInputMessage of Input * CombinedFilterInput.Message

  let init inputs : Model =
    List.map (fun (input, toModel) -> input, toModel (sprintf "%A" input)) inputs

  let update (message: Message) (model: Model) : Model * Sub<Message> list =
    match message with
    | FilterInputMessage (input, msg) ->
      match List.tryFind (fun (id, _) -> input = id) model with
      | Some (_, inputModel) ->
        let inputModel', cmd = CombinedFilterInput.update msg inputModel
        List.map (fun (id, m) -> id, if input = id then inputModel' else m) model,
        Cmd.map (fun sub -> FilterInputMessage (input, sub)) cmd
      | None -> model, []

  let private controlsContainer =
    ViewProperties.Style
      [ PaddingHorizontal (Dip 3.)
        PaddingTop (Dip 3.)
        MarginBottom (Dip 2.)
        BorderRadius 3. 
        BorderWidth 1. ]

  let view filterComponent mapInput (model: Model) content =
    filterComponent
      (model |> List.map mapInput |> List.choose id)
      [ content ]

  let controls name (model: Model) (dispatch: Dispatch<Message>) =
    let dispatch' = FilterInputMessage >> dispatch
    let sliders = 
      List.map
        (fun (input, inputModel) ->
           CombinedFilterInput.view inputModel (fun msg -> dispatch' (input, msg)))
        model
        
    RN.view
      [ controlsContainer ]
      [ RN.text [] name
        R.fragment [] sliders ]
