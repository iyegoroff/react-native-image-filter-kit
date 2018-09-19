namespace FilterConstructor

open Elmish
open Fable.Helpers.ReactNative
open Fable.Helpers.ReactNative.Props
open Fable.Import
open Fable.PowerPack


module ImageSelectModal =

  type Model = SelectModal.Model<Image.Model>

  type Message =
    | ImageSelectionSucceed of Image.Model
    | ImageSelectionFailed of string
    | ImageSelectionCancelled
    | ShowPicker
    | SelectModalMessage of SelectModal.Message<Image.Model>

  let showMsg =
    SelectModalMessage SelectModal.Show

  let private sections = 
    let generators =
      FilterGroups.generators
      |> Array.map
           (fun (cat, filters) ->
              ({ Select.Items = Array.map Image.Generated filters
                 Select.Title = sprintf "%A" cat }))

    Array.concat
      [ [| { Select.Items = Image.commonImages; Select.Title = "Images" } |]
        generators ]

  let init image =
    SelectModal.init sections (Some image) Image.name (fun _ -> true) Image.equals true

  let update (message: Message) (model: Model) : Model * Cmd<Message> =
    match message with
    | SelectModalMessage msg ->
      let model', cmd = SelectModal.update msg model

      match msg with
      | SelectModal.SelectMessage (Select.ItemSelected (Image.Random _)) ->
        model',
        Cmd.batch
          [ Cmd.ofMsg (ImageSelectionSucceed (Image.random ()));
            Cmd.map SelectModalMessage cmd ]

      | SelectModal.SelectMessage (Select.ItemSelected (Image.FromPicker _)) ->
        model', 
        Cmd.batch
          [ Utils.delayCmd 50 ShowPicker
            Cmd.map SelectModalMessage cmd ]

      | SelectModal.SelectMessage (Select.ItemSelected image) ->
        model',
        Cmd.batch
          [ Cmd.ofMsg (ImageSelectionSucceed image)
            Cmd.map SelectModalMessage cmd ]

      | _ ->
        model', Cmd.map SelectModalMessage cmd

    | ShowPicker ->
      model, Image.pickerCmd ImageSelectionSucceed ImageSelectionCancelled ImageSelectionFailed
    
    | _ ->
      model, []

  let view (model: Model) (dispatch: Dispatch<Message>) =
    SelectModal.view model (SelectModalMessage >> dispatch)
