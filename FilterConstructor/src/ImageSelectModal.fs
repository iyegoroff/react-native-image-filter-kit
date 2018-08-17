namespace FilterConstructor

open Elmish
open Fable.Helpers.ReactNative
open Fable.Helpers.ReactNative.Props
open Fable.Helpers.ReactNativeImagePicker
open Fable.Import
open Fable.PowerPack
open Select


module ImageSelectModal =

  type Message =
    | Hide
    | ImageSelectionSucceed of Image.Model
    | ImageSelectionFailed of string
    | ImageSelectionCancelled

  let private sections = 
    [| section Image.availableImages [] { title = "Images" } |]

  let view image isVisible (dispatch: Dispatch<Message>) =
    let dispatch' =
      function
      | (SelectModal.SelectMessage (Select.ItemSelected (Image.Random _))) ->
        dispatch (ImageSelectionSucceed (Image.random ()))

      | (SelectModal.SelectMessage (Select.ItemSelected (Image.Concrete image))) ->
        dispatch (ImageSelectionSucceed (Image.Concrete image))

      | (SelectModal.SelectMessage (Select.ItemSelected (Image.FromPicker _))) ->
        showImagePickerAsync []
        |> Promise.map
             (Option.fold
               (fun _ uri ->
                  ImageSelectionSucceed (Image.fromPicker (Some (remoteImage [ Uri uri ]))))
               ImageSelectionCancelled)
        |> Promise.eitherEnd
             dispatch
             (fun (e: System.Exception) -> dispatch (ImageSelectionFailed e.Message))

      | SelectModal.Hide ->
        dispatch Hide

    SelectModal.view sections (Some image) Image.name (=) isVisible dispatch'
