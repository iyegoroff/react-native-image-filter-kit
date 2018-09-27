namespace FilterConstructor

open Elmish
open Fable.Import
open Fable.Helpers.ReactNative.Props

module R = Fable.Helpers.React
module RN = Fable.Helpers.ReactNative


module FilterArrayInput =

  type Id = Constants.Id

  type Model<'item, 'message when 'item : equality> =
    { Name: string 
      Inputs: (Id * 'item) list
      InputInit: StructurallyNull<string -> 'item>
      InputUpdate: StructurallyNull<'message -> 'item -> 'item * Cmd<'message>>
      InputView: StructurallyNull<'item -> Dispatch<'message> -> React.ReactElement>
      NextId: Id }

  type Message<'message> =
    | AddInput
    | RemoveInput of Id
    | MoveInputUp of Id
    | MoveInputDown of Id
    | InputMessage of Id * 'message

  let init inputInit inputUpdate inputView name inputs =
    { Name = name
      Inputs = inputs
      InputInit = { Value = inputInit }
      InputUpdate = { Value = inputUpdate }
      InputView = { Value = inputView }
      NextId = 0 }

  let private updateInput model id update =
    match List.tryFind (fun (i, _) -> i = id) model.Inputs with
      | None -> model, []
      | Some (_, input) -> update input

  let update<'item, 'message when 'item : equality>
    (message: Message<'message>)
    (model: Model<'item, 'message>) : Model<'item, 'message> * Cmd<Message<'message>> =

    match message with
    | AddInput ->
      let newInput = model.NextId, (model.InputInit.Value (sprintf "%s.%i" model.Name model.NextId))
      { model with Inputs = model.Inputs @ [ newInput ]
                   NextId = model.NextId + 1 },
      []

    | RemoveInput id ->
      { model with Inputs = List.filter (fun (i, _) -> i = id) model.Inputs }, []

    | InputMessage (id, msg) ->
      (fun input ->
        let input', cmd = model.InputUpdate.Value msg input
        { model with Inputs =
                       List.map (fun (i, m) -> i, if i = id then input' else m) model.Inputs },
        Cmd.map (fun sub -> InputMessage (id, sub)) cmd) |> updateInput model id

    | MoveInputUp id ->
      (fun _ ->
         { model with Inputs = Utils.moveDownAt
                                 (List.findIndex (fun (i, _) -> i = id) model.Inputs)
                                 model.Inputs },
         []) |> updateInput model id
       

    | MoveInputDown id ->
      (fun _ ->
         { model with Inputs = Utils.moveUpAt
                                 (List.findIndex (fun (i, _) -> i = id) model.Inputs)
                                 model.Inputs },
         []) |> updateInput model id

   
  let private containerStyle =
    ViewProperties.Style
      []

  let private inputStyle =
    ViewProperties.Style
      []

  let private inputControls =
    ViewProperties.Style
      [ FlexDirection FlexDirection.Row ]

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
      (model.Inputs |> List.map renderInput)
