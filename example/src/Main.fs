namespace FilterConstructor

open Elmish
open Fable.Helpers.React
open Fable.Helpers.ReactNative
open Fable.Helpers.ReactNative.Props
open SelectModal
open Select
module R = Fable.Helpers.ReactNative


module Main =

  type Id = int

  type Model =
    { FilteredImages: (Id * FilteredImage.Model) list
      DefaultImageSelectModalIsVisible: bool
      DefaultImage: Image.Model
      NextId: Id }

  type Message =
    | AddFilteredImage
    | ChangeAllImages
    | FilteredImageMessage of int * FilteredImage.Message
    | ImageSelectModalMessage of ImageSelectModal.Message


  let init () =
    { FilteredImages = []
      DefaultImageSelectModalIsVisible = false
      DefaultImage = Image.defaultImage
      NextId = 0 },
    Cmd.none

  let update (message: Message) model =
    match message with
    | AddFilteredImage ->
      { model with FilteredImages =
                     (model.NextId, FilteredImage.init model.DefaultImage) :: model.FilteredImages
                   NextId = model.NextId + 1 }, []

    | ChangeAllImages ->
      { model with DefaultImageSelectModalIsVisible = true }, []

    | FilteredImageMessage (id, msg) ->
      match List.tryFind (fun (i, _) -> i = id) model.FilteredImages with
      | None -> model, []
      | Some (_, image) ->
        match msg with
        | FilteredImage.Delete ->
          { model with FilteredImages = List.filter
                                          (fun (i, _) -> i <> id)
                                          model.FilteredImages }, []
        | _ ->
          let image', cmd = FilteredImage.update msg image
          { model with FilteredImages = List.map
                                          (fun (i, m) -> i, if i = id then image' else m)
                                          model.FilteredImages },
          Cmd.map (fun sub -> FilteredImageMessage (id, sub)) cmd

    | ImageSelectModalMessage msg ->
      match msg with
      | SelectMessage (ItemSelected image) ->
        let filteredImages =
          List.map (fun (i, m) -> i, (FilteredImage.selectImage m image)) model.FilteredImages
        { model with DefaultImage = image 
                     FilteredImages = filteredImages }, []
      | Hide ->
        { model with DefaultImageSelectModalIsVisible = false }, []


  let inline containerStyle<'a> =
    ViewProperties.Style
      [ Padding (Dip 15.)
        Flex 1. ]

  let inline gapStyle<'a> =
    ViewProperties.Style
      [ Height (Dip 5.) ]

  // [<Pojo>]
  // type ScrollToConfig = { y: float }

  let view model (dispatch: Dispatch<Message>) =
    let filteredImageDispatch i msg = dispatch <| FilteredImageMessage (i, msg)

    let items =
      List.map (fun (i, c) -> FilteredImage.view c (filteredImageDispatch i)) model.FilteredImages

    // let mutable scrollView: Option<ScrollView> = None

    // let scrollToBottom = fun _ height ->
    //   match scrollView with
    //   | Some ref -> ref.scrollTo(U2.Case2 ({ y = height } :> obj))
    //   | None -> ()

    fragment
      []
      [ ImageSelectModal.view
          model.DefaultImage
          model.DefaultImageSelectModalIsVisible
          (ImageSelectModalMessage >> dispatch)
        R.scrollView
          []
          // [ ScrollViewProperties.OnContentSizeChange scrollToBottom
          //   ScrollViewProperties.Ref (fun ref -> scrollView <- Some ref)]
          [ R.view
              [ containerStyle ]
              [ R.button
                  [ ButtonProperties.Title "Change all images"
                    ButtonProperties.OnPress (fun () -> dispatch ChangeAllImages) ]
                  []
                R.view [ gapStyle ] []
                R.button
                  [ ButtonProperties.Title "Add filtered image"
                    ButtonProperties.OnPress (fun () -> dispatch AddFilteredImage) ]
                  []
                fragment [] [ yield! items ]
                R.view [ gapStyle ] [] ] ] ]