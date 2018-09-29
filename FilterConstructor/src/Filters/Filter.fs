namespace FilterConstructor

open Elmish
open Fable.Helpers.ReactNative
open Fable.Helpers.ReactNative.Props
open Fable.Import
open Fable.Import.ReactNative
open Fable.Helpers.ReactNative.Props
open Fable.Import.ReactNative

module R = Fable.Helpers.React
module RN = Fable.Helpers.ReactNative
module RNF = Fable.Import.ReactNativeImageFilterKit

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
    | InputPower
    | InputRadius
    | InputSaturation
    | InputScale
    | InputSharpness
    | InputWidth
    | InputRVector
    | InputGVector
    | InputBVector
    | InputAVector
    | InputBiasVector
    | InputRedCoefficients
    | InputGreenCoefficients
    | InputBlueCoefficients
    | InputAlphaCoefficients
    | InputEV
    | InputNeutral
    | InputTargetNeutral
    | InputPoint0
    | InputPoint1
    | InputPoint2
    | InputPoint3
    | InputPoint4
    | InputColor
    | InputNRNoiseLevel
    | InputNRSharpness
    | InputEdgeIntensity
    | InputThreshold
    | Value
    | Desaturation
    | Toned
    | LightColor
    | DarkColor
    | BlurRadius
    | Iterations
    | Mul
    | Add
    | Red
    | Green
    | Blue
    | Alpha
    | Color
    | X0
    | Y0
    | X1
    | Y1
    | Colors
    | Locations
    | Tile
    | CenterX
    | CenterY
    | Radius
    | TileMode
    | Stops
    | Cx
    | Cy
    | Positions
    | ResizeOutput

  type Model =
    { Inputs: (Input * CombinedFilterInput.Model) list
      InputsAreCollapsed: bool }

  type Message =
    | FilterInputMessage of Input * CombinedFilterInput.Message
    | MoveUp
    | MoveDown
    | Delete
    | ToggleInputsCollapse

  let init inputs : Model =
    { Inputs = List.map (fun (input, toModel) -> input, toModel (Name (sprintf "%A" input))) inputs
      InputsAreCollapsed = false }

  let update (message: Message) (model: Model) : Model * Sub<Message> list =
    match message with
    | FilterInputMessage (input, msg) ->
      match List.tryFind (fun (id, _) -> input = id) model.Inputs with
      | Some (_, inputModel) ->
        let inputModel', cmd = CombinedFilterInput.update msg inputModel
        { model with Inputs = List.map
                                (fun (id, m) -> id, if input = id then inputModel' else m)
                                model.Inputs },
        Cmd.map (fun sub -> FilterInputMessage (input, sub)) cmd
      | None -> model, []

    | MoveUp
    | MoveDown
    | Delete -> model, []

    | ToggleInputsCollapse ->
      { model with InputsAreCollapsed = not model.InputsAreCollapsed }, []

  let private controlsContainer =
    ViewProperties.Style
      [ Padding (dip 3.)
        MarginBottom (dip 2.)
        BorderRadius 3. 
        BorderWidth 1. 
        BackgroundColor "gainsboro" ]

  let private titleStyle =
    TextProperties.Style
      [ FontWeight FontWeight.Bold ]

  let private controlButtonsStyle =
    ViewProperties.Style
      [ FlexDirection FlexDirection.Row
        JustifyContent JustifyContent.SpaceBetween ]

  let private expandIconStyle =
    ImageProperties.Style
      [ Height (pct 100.)
        Width (dip 15.) ]

  let private collapseIconStyle =
    ImageProperties.Style
      [ Height (pct 100.)
        Width (dip 15.) ]

  let private headerStyle =
    ViewProperties.Style
      [ FlexDirection FlexDirection.Row
        JustifyContent JustifyContent.SpaceBetween ]

  let view filterComponent mapInput (model: Model) content =
    filterComponent
      (model.Inputs |> List.map mapInput |> List.choose id)
      [ content ]

  let controls name isPersistent (model: Model) (dispatch: Dispatch<Message>) =
    let dispatch' = FilterInputMessage >> dispatch
    let sliders = 
      List.map
        (fun (input, inputModel) ->
           CombinedFilterInput.view inputModel (fun msg -> dispatch' (input, msg)))
        model.Inputs
        
    RN.view
      [ controlsContainer ]
      [ RN.touchableOpacity
          [ OnPress (fun _ -> dispatch ToggleInputsCollapse) ]
          [ RN.view
              [ headerStyle ]
              [ RN.text [ titleStyle ] name
                RN.image
                  [ Source (localImage "${entryDir}/../img/expand.png")
                    expandIconStyle
                    ResizeMode ResizeMode.Contain ] ] ]
        R.fragment [] sliders
        (if isPersistent then
           R.fragment [] []
         else
           RN.view
             [ controlButtonsStyle ]
             [ RN.button
                 [ ButtonProperties.Title "Move Up"
                   ButtonProperties.OnPress (fun () -> dispatch MoveUp) ]
                 []
               RN.button
                 [ ButtonProperties.Title "Move Down"
                   ButtonProperties.OnPress (fun () -> dispatch MoveDown) ]
                 []
               RN.button
                 [ ButtonProperties.Title "Delete"
                   ButtonProperties.Color "red"
                   ButtonProperties.OnPress (fun () -> dispatch Delete) ]
                 [] ]) ]
