module ImageSelectModal

open Elmish
open ReactNativeHelpers.Props
module R = ReactNativeHelpers


type Model = 
  { imageSelect: ImageSelect.Model
    isVisible: bool }

type Message =
  | Show
  | Hide
  | ImageSelected of ImageSelect.ImageModel
  | ImageSelectMessage of ImageSelect.Message


let init image =
  { imageSelect = ImageSelect.init image
    isVisible = false }

let inline selectedImage model =
  model.imageSelect.selectedImage.source

let update (message: Message) model =
  match message with
  | Show ->
    { model with isVisible = true }, []

  | Hide ->
    { model with isVisible = false }, []
  
  | ImageSelectMessage msg ->
    let imageSelect, cmd = ImageSelect.update msg model.imageSelect
    let imageSelectCommand = Cmd.map ImageSelectMessage cmd
    let commands = match msg with
                   | ImageSelect.SelectImage image -> Cmd.batch [ imageSelectCommand
                                                                  Cmd.ofMsg (ImageSelected image)
                                                                  Cmd.ofMsg Hide ]
                   | _ -> imageSelectCommand
    { model with imageSelect = imageSelect }, commands

  | ImageSelected _ ->
    model, []
  

let view model (dispatch: Dispatch<Message>) =
  R.modal
    [ Visible model.isVisible
      OnRequestClose (fun () -> dispatch Hide) ]
    [ ImageSelect.view model.imageSelect (ImageSelectMessage >> dispatch) ]
