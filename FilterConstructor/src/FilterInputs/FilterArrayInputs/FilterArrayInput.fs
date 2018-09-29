namespace FilterConstructor

open Elmish
open Fable.Import
open Fable.Helpers.ReactNative
open Fable.Helpers.ReactNative.Props

module R = Fable.Helpers.React
module RN = Fable.Helpers.ReactNative


module FilterArrayInput =

  type Model<'item, 'message when 'item : equality> =
    { Name: string 
      Inputs: (Id * 'item) list
      InputInit: StructurallyNull<Name -> 'item>
      InputUpdate: StructurallyNull<'message -> 'item -> 'item * Cmd<'message>>
      InputView: StructurallyNull<'item -> Dispatch<'message> -> React.ReactElement>
      NextId: Id }

  type Message<'message> =
    | AddInput
    | RemoveInput of Id
    | MoveInputUp of Id
    | MoveInputDown of Id
    | InputMessage of Id * 'message

  let private inputName name id =
    Name (sprintf "%s.%i" name id)

  let init inputInit inputUpdate inputView inputs (Name name) =
    { Name = name
      Inputs = inputs |> List.mapi (fun idx input -> idx, input (inputName name idx))
      InputInit = { Value = inputInit }
      InputUpdate = { Value = inputUpdate }
      InputView = { Value = inputView }
      NextId = inputs.Length }

  let private updateInput model id update =
    match List.tryFind (fun (i, _) -> i = id) model.Inputs with
      | None -> model, []
      | Some (_, input) -> update input

  let update<'item, 'message when 'item : equality>
    (message: Message<'message>)
    (model: Model<'item, 'message>) : Model<'item, 'message> * Cmd<Message<'message>> =

    match message with
    | AddInput ->
      let newInput = model.NextId, (model.InputInit.Value (inputName model.Name model.NextId))
      { model with Inputs = model.Inputs @ [ newInput ]
                   NextId = model.NextId + 1 },
      []

    | RemoveInput id ->
      { model with Inputs = List.filter (fun (i, _) -> i <> id) model.Inputs }, []

    | InputMessage (id, msg) ->
      (fun input ->
        let input', cmd = model.InputUpdate.Value msg input
        { model with Inputs =
                       List.map (fun (i, m) -> i, if i = id then input' else m) model.Inputs },
        Cmd.map (fun sub -> InputMessage (id, sub)) cmd) |> updateInput model id

    | MoveInputUp id ->
      (fun _ ->
         { model with Inputs = Utils.moveUpAt
                                 (List.findIndex (fun (i, _) -> i = id) model.Inputs)
                                 model.Inputs },
         []) |> updateInput model id
       

    | MoveInputDown id ->
      (fun _ ->
         { model with Inputs = Utils.moveDownAt
                                 (List.findIndex (fun (i, _) -> i = id) model.Inputs)
                                 model.Inputs },
         []) |> updateInput model id

   
  let private containerStyle =
    ViewProperties.Style
      [ BorderWidth 1.
        BorderRadius 3.
        Padding (dip 3.)
        MarginBottom (dip 3.)
        BackgroundColor "white" ]

  let private inputStyle =
    ViewProperties.Style
      [ BorderWidth 1.
        BorderRadius 3.
        Padding (dip 3.)
        MarginBottom (dip 3.)
        BackgroundColor "lightgray" ]

  let private inputControls =
    ViewProperties.Style
      [ FlexDirection FlexDirection.Row
        JustifyContent JustifyContent.SpaceBetween ]

  let view<'item, 'message when 'item : equality>
    (model: Model<'item, 'message>)
    (dispatch: Dispatch<Message<'message>>) =

    let renderInput (id, input) =
      RN.view
        [ inputStyle
          Key (string id) ]
        [ model.InputView.Value input (fun msg -> dispatch (InputMessage (id, msg)))
          RN.view
            [ inputControls ]
            [ RN.button
                [ ButtonProperties.Title "Move Up"
                  ButtonProperties.OnPress (fun _ -> dispatch (MoveInputUp id)) ]
                []
              RN.button
                [ ButtonProperties.Title "Move Down"
                  ButtonProperties.OnPress (fun _ -> dispatch (MoveInputDown id)) ]
                []
              RN.button
                [ ButtonProperties.Title "Delete"
                  ButtonProperties.Color "red"
                  ButtonProperties.OnPress (fun _ -> dispatch (RemoveInput id)) ]
                [] ] ]

    RN.view
      [ containerStyle ]
      [ RN.text [] (sprintf "%s" model.Name)
        (model.Inputs |> List.map renderInput |> R.fragment [])
        RN.button
          [ ButtonProperties.Title "Add Input"
            ButtonProperties.OnPress (fun _ -> dispatch AddInput) ]
          [] ]
