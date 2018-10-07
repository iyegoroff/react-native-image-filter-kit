namespace FilterConstructor

open Elmish
open Fable.Import
open Fable.Import.ReactNativeImageFilterKit.Props


module CombinedFilterEnumInput =

  type Shape<'tileMode, 'porterDuffMode> =
    | TileMode of 'tileMode
    | PorterDuffMode of 'porterDuffMode

  type Model = Shape<FilterEnumInput.Model<TileMode>,
                     FilterEnumInput.Model<PorterDuffMode>>

  type Message = Shape<FilterEnumInput.Message<TileMode>,
                       FilterEnumInput.Message<PorterDuffMode>>
  
  let private tileModeAvailableValues =
    [ TileMode.CLAMP
      TileMode.REPEAT
      TileMode.CLAMP ]

  let private porterDuffModeAvailableValues =
    [ PorterDuffMode.ADD
      PorterDuffMode.CLEAR
      PorterDuffMode.DARKEN
      PorterDuffMode.DST
      PorterDuffMode.DST_ATOP
      PorterDuffMode.DST_IN
      PorterDuffMode.DST_OUT
      PorterDuffMode.DST_OVER
      PorterDuffMode.LIGHTEN
      PorterDuffMode.MULTIPLY
      PorterDuffMode.OVERLAY
      PorterDuffMode.SCREEN
      PorterDuffMode.SRC
      PorterDuffMode.SRC_ATOP
      PorterDuffMode.SRC_IN
      PorterDuffMode.SRC_OUT
      PorterDuffMode.SRC_OVER
      PorterDuffMode.XOR ]

  let initTileMode value name =
    TileMode (FilterEnumInput.init value tileModeAvailableValues name)

  let initPorterDuffMode value name =
    PorterDuffMode (FilterEnumInput.init value porterDuffModeAvailableValues name)

  let update (message: Message) (model: Model) : Model * Sub<Message> list =
    match (model, message) with
    | TileMode model', TileMode message' ->
      let m, cmd = FilterEnumInput.update message' model'
      (TileMode m), Cmd.map TileMode cmd
    | TileMode _, _ -> model, []

    | PorterDuffMode model', PorterDuffMode message' ->
      let m, cmd = FilterEnumInput.update message' model'
      (PorterDuffMode m), Cmd.map PorterDuffMode cmd
    | PorterDuffMode _, _ -> model, []

  let view (model: Model) (dispatch: Dispatch<Message>) : React.ReactElement =
    match model with
    | TileMode model' -> FilterEnumInput.view model' (TileMode >> dispatch)
    | PorterDuffMode model' -> FilterEnumInput.view model' (PorterDuffMode >> dispatch)
