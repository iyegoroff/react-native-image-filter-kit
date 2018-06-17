namespace Fable.Import

open Fable.Core
open Fable.Import.ReactNative

[<Erase>]
module ReactNativePortal =

    type BlackPortalProps =
      abstract name: string with get, set

    and BlackPortalStatic =
      inherit React.ComponentClass<BlackPortalProps>

    and BlackPortal =
      BlackPortalStatic

    and WhitePortalProps<'a> =
      abstract name: string with get, set
      abstract childrenProps: 'a option with get, set

    and WhitePortalStatic<'a> =
      inherit React.ComponentClass<WhitePortalProps<'a>>

    and WhitePortal<'a> =
      WhitePortalStatic<'a>

    and PortalProviderStatic =
      inherit React.ComponentClass<Unit>

    and PortalProvider =
      PortalProviderStatic

    type Globals =
      [<Import("BlackPortal", "react-native-portal")>] static member BlackPortal with get(): BlackPortalStatic = jsNative and set(v: BlackPortalStatic): unit = jsNative
      [<Import("WhitePortal", "react-native-portal")>] static member WhitePortal with get(): WhitePortalStatic<obj> = jsNative and set(v: WhitePortalStatic<obj>): unit = jsNative
      [<Import("PortalProvider", "react-native-portal")>] static member PortalProvider with get(): PortalProviderStatic = jsNative and set(v: PortalProviderStatic): unit = jsNative
