namespace FilterConstructor

open Fable.Helpers.ReactNative.Props
open Fable.Helpers.ReactNative
open Fable.Import

module Image =

  type Model' =
    { Name: string
      Source: IImageSource option }

  type Model =
    | Concrete of Model'
    | Random of Model'
    | FromPicker of Model'

  
  let defaultImage =
    Concrete { Name = "Parrot"
               Source = Some (localImage "${entryDir}/../img/parrot.png") }

  let random () =
    let id = JS.Math.round (JS.Math.random () * 992.)
    let timestamp = JS.Date.now ()
    let uri = sprintf "https://picsum.photos/%f?image=%f&t=%f" Constants.imageHeight id timestamp
    Random { Name = "Random"
             Source = Some (remoteImage [ Uri uri ]) }

  let fromPicker source =
    FromPicker { Name = "Pick image"
                 Source = source }

  let availableImages =
    [| defaultImage
       Concrete { Name = "React logo"
                  Source = Some (remoteImage [ Uri "https://tinyurl.com/y8xs3ehd" ]) }
       Concrete { Name = "Triangle"
                  Source = Some (remoteImage [ Uri "https://tinyurl.com/ycedtewy" ]) }
       random ()
       fromPicker None
       Concrete { Name = "Text"
                  Source = Some (localImage "${entryDir}/../img/text.png") }
       Concrete { Name = "Black circle"
                  Source = Some (localImage "${entryDir}/../img/black-circle.png") }
       Concrete { Name = "Black star"
                  Source = Some (localImage "${entryDir}/../img/black-star.png") }
       Concrete { Name = "Blue circle"
                  Source = Some (localImage "${entryDir}/../img/blue-circle.png") }
       Concrete { Name = "Blue star"
                  Source = Some (localImage "${entryDir}/../img/blue-star.png") }
       Concrete { Name = "Gradient circle"
                  Source = Some (localImage "${entryDir}/../img/gradient-circle.png") }
       Concrete { Name = "Gradient star"
                  Source = Some (localImage "${entryDir}/../img/gradient-star.png") }
       Concrete { Name = "Green circle"
                  Source = Some (localImage "${entryDir}/../img/green-circle.png") }
       Concrete { Name = "Green star"
                  Source = Some (localImage "${entryDir}/../img/green-star.png") }
       Concrete { Name = "Red circle"
                  Source = Some (localImage "${entryDir}/../img/red-circle.png") }
       Concrete { Name = "Red star"
                  Source = Some (localImage "${entryDir}/../img/red-star.png") }
       Concrete { Name = "White circle"
                  Source = Some (localImage "${entryDir}/../img/white-circle.png") }
       Concrete { Name = "White star"
                  Source = Some (localImage "${entryDir}/../img/white-star.png") } |]

  let equals first second =
    function
    | (Random _), (Random _) -> true
    | (FromPicker _), (FromPicker _) -> true
    | _ -> first = second
  
  let source =
    function
    | Concrete image
    | Random image
    | FromPicker image -> image.Source

  let name =
    function
    | Concrete image
    | Random image
    | FromPicker image -> image.Name
