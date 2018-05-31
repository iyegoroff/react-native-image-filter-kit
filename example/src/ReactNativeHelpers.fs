module ReactNativeHelpers

open System
open Fable.Import.ReactNative
open Fable.Core
open Fable.Core.JsInterop
open Fable.Import
open Fable.PowerPack

type RN = ReactNative.Globals

type Ref<'t> = ('t -> unit)

module Props =

    [<StringEnum; RequireQualifiedAccess>]
    type ToolbarActionShowStatus =
    | IfRoom
    | Always
    | Never

    [<StringEnum; RequireQualifiedAccess>]
    type Alignment =
    | Auto
    | [<CompiledName("flex-start")>] FlexStart
    | Center
    | [<CompiledName("flex-end")>] FlexEnd
    | Stretch

    [<StringEnum; RequireQualifiedAccess>]
    type ItemAlignment =
    | [<CompiledName("flex-start")>] FlexStart
    | Center
    | [<CompiledName("flex-end")>] FlexEnd
    | Stretch

    [<StringEnum; RequireQualifiedAccess>]
    type TextAlignment =
    | Auto
    | Default
    | Left
    | Center
    | Right
    | Justify

    [<StringEnum; RequireQualifiedAccess>]
    type TextAlignVertical =
    | Auto
    | Top
    | Bottom
    | Center

    [<StringEnum; RequireQualifiedAccess>]
    type JustifyContent =
    | [<CompiledName("flex-start")>] FlexStart
    | Center
    | [<CompiledName("flex-end")>] FlexEnd
    | [<CompiledName("space-between")>] SpaceBetween
    | [<CompiledName("space-around")>] SpaceAround

    [<StringEnum; RequireQualifiedAccess>]
    type FlexDirection =
    | Row
    | [<CompiledName("row-reverse")>] RowReverse
    | Column
    | [<CompiledName("column-reverse")>] ColumnReverse

    [<StringEnum; RequireQualifiedAccess>]
    type FlexWrap =
    | Row
    | [<CompiledName("wrap")>] Wrap
    | Column
    | [<CompiledName("nowrap")>] NoWrap

    [<StringEnum; RequireQualifiedAccess>]
    type KeyboardType =
    | Default
    | [<CompiledName("email-address")>] EmailAddress
    | Numeric
    | [<CompiledName("phone-pad")>] PhonePad
    /// only iOS
    | [<CompiledName("ascii-capable")>] AsciiCapable
    | [<CompiledName("numbers-and-punctuation")>] NumbersAndPunctuation
    | [<CompiledName("url")>] Url
    | [<CompiledName("number-pad")>] NumberPad
    | [<CompiledName("name-phone-pad")>] NamePhonePad
    | [<CompiledName("decimal-pad")>] DecimalPad
    | Twitter
    | [<CompiledName("web-search")>] WebSearch

    [<StringEnum; RequireQualifiedAccess>]
    type Position =
    | Row
    | [<CompiledName("absolute")>] Absolute
    | Column
    | [<CompiledName("relative")>] Relative

    [<StringEnum; RequireQualifiedAccess>]
    type ResizeMode =
    | Contain
    | Cover
    | Stretch
    | Conter
    | Repeat

    [<StringEnum; RequireQualifiedAccess>]
    type ReturnKeyType =
    | Done
    | Go
    | Next
    | Search
    | Send
    | None
    | Previous
    | Default
    | [<CompiledName("emergency-call")>] EmergencyCall
    | Google
    | Join
    | Route
    | Yahoo

    [<StringEnum; RequireQualifiedAccess>]
    type AutoCapitalizeType =
    | None
    | Sentences
    | Words
    | Characters

    [<StringEnum; RequireQualifiedAccess>]
    type KeyboardDismissMode  =
    | None
    | [<CompiledName("on-drag")>] OnDrag

    [<StringEnum; RequireQualifiedAccess>]
    type DrawerLockMode =
    | Unlocked
    | [<CompiledName("locked-closed")>] LockedClosed
    | [<CompiledName("locked-open")>] LockedOpen

    [<StringEnum; RequireQualifiedAccess>]
    type AlignSelf =
        | Auto

    [<StringEnum; RequireQualifiedAccess>]
    type TextDecorationStyle =
        | Solid | Double | Dotted | Dashed

    [<StringEnum; RequireQualifiedAccess>]
    type FontStyle =
        | Normal | Italic

    [<StringEnum; RequireQualifiedAccess>]
    type WritingDirection =
        | Auto | Ltr | Rtl

    [<StringEnum; RequireQualifiedAccess>]
    type ScrollState =
        Idle | Dragging | Settling

    [<StringEnum; RequireQualifiedAccess>]
    type FontWeight =
        | Normal
        | Bold
        | [<CompiledName("100")>] F100
        | [<CompiledName("200")>] F200
        | [<CompiledName("300")>] F300
        | [<CompiledName("400")>] F400
        | [<CompiledName("500")>] F500
        | [<CompiledName("600")>] F600
        | [<CompiledName("700")>] F700
        | [<CompiledName("800")>] F800
        | [<CompiledName("900")>] F900

    [<StringEnum; RequireQualifiedAccess>]
    type TextDecorationLine =
        | None | Underline
        | ``Line-through``
        | ``Underline line-through``

    [<StringEnum; RequireQualifiedAccess>]
    type LineBreakMode =
        | Head | Middle | Tail | Clip

    [<StringEnum; RequireQualifiedAccess>]
    type AutoCapitalize =
        | None | Sentences | Words | Characters

    [<StringEnum; RequireQualifiedAccess>]
    type BackfaceVisibility =
        | Visible | Hidden

    [<StringEnum; RequireQualifiedAccess>]
    type BorderStyle =
        | Solid | Dotted | Dashed

    [<StringEnum; RequireQualifiedAccess>]
    type Overflow =
        | Visible | Hidden

    [<StringEnum; RequireQualifiedAccess>]
    type Behavior =
        | Height | Position | Padding

    [<StringEnum; RequireQualifiedAccess>]
    type NavigationType =
        | Other | Click

    [<StringEnum; RequireQualifiedAccess>]
    type Size =
        | Small | Large

    [<StringEnum; RequireQualifiedAccess>]
    type Mode =
        | Date | Time | Datetime

    [<StringEnum; RequireQualifiedAccess>]
    type DatePickerIOSMode =
        | Dialog | Dropdown

    [<StringEnum; RequireQualifiedAccess>]
    type StyleAttr =
        | Horizontal | Normal | Small | Large | Inverse | SmallInverse | LargeInverse

    [<StringEnum; RequireQualifiedAccess>]
    type ProgressViewStyle =
        | Default | Bar

    [<StringEnum; RequireQualifiedAccess>]
    type AnimationType =
        | None | Slide | Fade

    [<StringEnum; RequireQualifiedAccess>]
    type SystemIcon =
        | Bookmarks | Contacts | Downloads | Favorites | Featured | History | More | ``Most-recent`` | ``Most-viewed`` | Recents | Search | ``Top-rated``

    [<StringEnum; RequireQualifiedAccess>]
    type Dim =
        | Window | Screen

    [<StringEnum; RequireQualifiedAccess>]
    type IndicatorStyle =
        | Default | Black | White

    [<StringEnum; RequireQualifiedAccess>]
    type DecelerationRate =
        | Fast | Normal

    [<StringEnum; RequireQualifiedAccess>]
    type AlertButtonStyle =
        | Default | Cancel | Destructive

    [<StringEnum; RequireQualifiedAccess>]
    type GroupTypes =
        | Album | All | Event | Faces | Library | PhotoStream | SavedPhotos

    [<StringEnum; RequireQualifiedAccess>]
    type AssetType =
        | All | Videos | Photos

    [<StringEnum; RequireQualifiedAccess>]
    type ShowHideTransition =
        | Fade | Slide

    [<StringEnum; RequireQualifiedAccess>]
    type Direction =
        | Horizontal | Vertical

    type IStyle =
        interface end

    type IScrollViewStyle =
        inherit IStyle

    type ISwitchIOSStyle =
        inherit IStyle

    type ITextStyle =
        inherit IStyle

    type ITextStyleIOS =
        inherit IStyle

    type ITextStyleAndroid =
        inherit IStyle

    type IImageStyle =
        inherit IStyle

    type ITransformsStyle =
        inherit IStyle

    type IViewStyle =
        inherit IStyle

    type IFlexStyle =
        inherit IStyle

    type IGestureResponderHandlers =
        interface end

    type IToolbarAndroidProperties =
        interface end

    type ISegmentedControlIOSProperties =
        interface end

    type IWebViewProperties =
        interface end

    type IWebViewPropertiesAndroid =
        inherit IWebViewProperties

    type IWebViewPropertiesIOS =
        inherit IWebViewProperties

    type IDatePickerIOSProperties =
        interface end

    type IDrawerLayoutAndroidProperties =
        interface end

    type IPickerProperties =
        interface end

    type IProgressBarAndroidProperties =
        interface end

    type IProgressViewIOSProperties =
        interface end

    type IRefreshControlProperties =
        interface end

    type ISliderProperties =
        interface end

    type ISliderIOSProperties =
        interface end

    type ITabBarItemProperties =
        interface end

    type ITabBarIOSProperties =
        interface end

    type IListViewProperties =
        interface end

    type IFlatListProperties<'a> =
        interface end

    type IScrollViewProperties =
        inherit IListViewProperties

    type IStatusBarProperties =
        interface end

    type ISwitchProperties =
        interface end

    type IKeyboardAvoidingViewProps =
        interface end

    type IActivityIndicatorProperties =
        interface end

    type IActivityIndicatorIOSProperties =
        interface end

    type IMapViewProperties  =
        interface end

    type IMapViewPropertiesAndroid  =
        inherit IMapViewProperties

    type IViewPropertiesIOS =
        interface end

    type IViewPropertiesAndroid =
        interface end

    type IViewPagerAndroidProperties =
        interface end

    type IViewProperties =
        inherit IViewPropertiesAndroid
        inherit IViewPropertiesIOS
        inherit IToolbarAndroidProperties
        inherit IGestureResponderHandlers
        inherit IViewPagerAndroidProperties
        inherit IKeyboardAvoidingViewProps
        inherit IWebViewProperties
        inherit ISegmentedControlIOSProperties
        inherit IActivityIndicatorProperties
        inherit IActivityIndicatorIOSProperties
        inherit IDatePickerIOSProperties
        inherit IDrawerLayoutAndroidProperties
        inherit IPickerProperties
        inherit IProgressBarAndroidProperties
        inherit IProgressViewIOSProperties
        inherit IRefreshControlProperties
        inherit ISliderProperties
        inherit ISliderIOSProperties
        inherit ITabBarItemProperties
        inherit ITabBarIOSProperties
        inherit IScrollViewProperties
        inherit IStatusBarProperties
        inherit ISwitchProperties
        inherit IMapViewProperties

    type ITouchable =
        inherit IScrollViewProperties
        inherit IMapViewProperties
        inherit IViewProperties

    type TransformsStyle =
        | Transform of obj * obj * obj * obj * obj * obj * obj * obj * obj * obj * obj * obj
        | TransformMatrix of ResizeArray<float>
        | Rotation of float
        | ScaleX of float
        | ScaleY of float
        | TranslateX of float
        | TranslateY of float
        interface ITransformsStyle

    [<Erase>]
    type SizeUnit =
        | Absolute of float | Relative of string

    type FlexStyle =
        | AlignItems of ItemAlignment
        | AlignSelf of Alignment
        | AspectRatio of float
        | BorderBottomWidth of float
        | BorderLeftWidth of float
        | BorderRightWidth of float
        | BorderTopWidth of float
        | BorderWidth of float
        | Bottom of SizeUnit
        | Flex of float
        | FlexDirection of FlexDirection
        | FlexWrap of FlexWrap
        | Height of SizeUnit
        | JustifyContent of JustifyContent
        | Left of SizeUnit
        | MinWidth of SizeUnit
        | MaxWidth of SizeUnit
        | MinHeight of SizeUnit
        | MaxHeight of SizeUnit
        | Margin of SizeUnit
        | MarginBottom of SizeUnit
        | MarginHorizontal of SizeUnit
        | MarginLeft of SizeUnit
        | MarginRight of SizeUnit
        | MarginTop of SizeUnit
        | MarginVertical of SizeUnit
        | Padding of SizeUnit
        | PaddingBottom of SizeUnit
        | PaddingHorizontal of SizeUnit
        | PaddingLeft of SizeUnit
        | PaddingRight of SizeUnit
        | PaddingTop of SizeUnit
        | PaddingVertical of SizeUnit
        | Position of Position
        | Right of SizeUnit
        | Top of SizeUnit
        | Width of SizeUnit
        | ZIndex of float
        interface IFlexStyle


    type ViewStyle =
        | BackfaceVisibility of string
        | BackgroundColor of string
        | BorderBottomColor of string
        | BorderBottomLeftRadius of float
        | BorderBottomRightRadius of float
        | BorderBottomWidth of float
        | BorderColor of string
        | BorderLeftColor of string
        | BorderRadius of float
        | BorderRightColor of string
        | BorderRightWidth of float
        | BorderStyle of BorderStyle
        | BorderTopColor of string
        | BorderTopLeftRadius of float
        | BorderTopRightRadius of float
        | BorderTopWidth of float
        | Opacity of float
        | Overflow of Overflow
        | ShadowColor of string
        | ShadowOffset of obj
        | ShadowOpacity of float
        | ShadowRadius of float
        | Elevation of float
        | TestID of string
        interface IViewStyle

    type Insets =
        | Top of float
        | Left of float
        | Bottom of float
        | Right of float

    type Touchable =
        | OnTouchStart of (GestureResponderEvent -> unit)
        | OnTouchMove of (GestureResponderEvent -> unit)
        | OnTouchEnd of (GestureResponderEvent -> unit)
        | OnTouchCancel of (GestureResponderEvent -> unit)
        | OnTouchEndCapture of (GestureResponderEvent -> unit)
        interface ITouchable

    type LayoutAnimationAnim =
        | Duration of float
        | Delay of float
        | SpringDamping of float
        | InitialVelocity of float
        | Type of string
        | Property of string

    type LayoutAnimationConfig =
        | Delay of float //REQUIRED!
        | Create of LayoutAnimationAnim
        | Update of LayoutAnimationAnim
        | Delete of LayoutAnimationAnim

    type TextStyleIOS =
        | LetterSpacing of float
        | TextDecorationColor of string
        | TextDecorationStyle of TextDecorationStyle
        | WritingDirection of WritingDirection
        interface ITextStyleIOS

    type TextStyleAndroid =
        | TextAlignVertical of TextAlignVertical
        interface ITextStyleAndroid

    type TextStyle =
        | Color of string
        | FontFamily of string
        | FontSize of float
        | FontStyle of FontStyle
        | FontWeight of FontWeight
        | LetterSpacing of float
        | LineHeight of float
        | TextAlign of TextAlignment
        | TextDecorationLine of TextDecorationLine
        | TextDecorationStyle of TextDecorationStyle
        | TextDecorationColor of string
        | TextShadowColor of string
        | TextShadowOffset of obj
        | TextShadowRadius of float
        | TestID of string
        interface ITextStyle

    type ITextPropertiesIOS =
        interface end

    type ITextProperties =
        inherit ITextPropertiesIOS

    type TextPropertiesIOS =
        | AllowFontScaling of bool // REQUIRED!
        | SuppressHighlighting of bool
        interface ITextPropertiesIOS

    type TextProperties =
        | AllowFontScaling of bool
        | LineBreakMode of LineBreakMode
        | NumberOfLines of float
        | OnLayout of Func<LayoutChangeEvent, unit>
        | OnPress of (unit->unit)
        | Style of IStyle list
        | TestID of string
        interface ITextProperties

    type ITextInputIOSProperties =
        interface end

    type ITextInputAndroidProperties =
        interface end

    type ITextInputProperties =
        inherit ITextInputIOSProperties
        inherit ITextInputAndroidProperties

    module TextInput =
        type TextInputIOSProperties =
            | ClearButtonMode of string
            | ClearTextOnFocus of bool
            | EnablesReturnKeyAutomatically of bool
            | OnKeyPress of (unit->unit)
            | SelectionState of obj
            interface ITextInputIOSProperties

        type TextInputAndroidProperties =
            | NumberOfLines of float
            | ReturnKeyLabel of string
            | TextAlign of string
            | TextAlignVertical of string
            | UnderlineColorAndroid of string
            interface ITextInputAndroidProperties

        type TextInputProperties =
            | AutoCapitalize of AutoCapitalize
            | AutoCorrect of bool
            | AutoFocus of bool
            | BlurOnSubmit of bool
            | DefaultValue of string
            | Editable of bool
            | KeyboardType of KeyboardType
            | MaxLength of float
            | Multiline of bool
            | OnBlur of (unit->unit)
            | OnChange of (obj -> unit)
            | OnChangeText of (string -> unit)
            | OnEndEditing of (obj -> unit)
            | OnFocus of (unit->unit)
            | OnLayout of Func<obj, unit>
            | OnSelectionChange of (unit->unit)
            | OnSubmitEditing of Func<obj, unit>
            | Password of bool
            | Placeholder of string
            | PlaceholderTextColor of string
            | ReturnKeyType of ReturnKeyType
            | SecureTextEntry of bool
            | SelectTextOnFocus of bool
            | SelectionColor of string
            | Style of IStyle list
            | TestID of string
            | Value of string
            interface ITextInputProperties

    module Toolbar =
        type ToolbarAndroidProperties =
            | Actions of ToolbarAndroidAction []
            | ContentInsetEnd of float
            | ContentInsetStart of float
            | Logo of obj
            | NavIcon of obj
            | OnIconClicked of (unit->unit)
            | OverflowIcon of obj
            | Rtl of bool
            | Style of IStyle list
            | Subtitle of string
            | SubtitleColor of string
            | TestID of string
            | Title of string
            | TitleColor of string
            | Ref of Ref<ToolbarAndroid>
            interface IToolbarAndroidProperties

    type GestureResponderHandlers =
        | OnStartShouldSetResponder of Func<GestureResponderEvent, bool>
        | OnMoveShouldSetResponder of Func<GestureResponderEvent, bool>
        | OnResponderGrant of Func<GestureResponderEvent, unit>
        | OnResponderReject of Func<GestureResponderEvent, unit>
        | OnResponderMove of Func<GestureResponderEvent, unit>
        | OnResponderRelease of Func<GestureResponderEvent, unit>
        | OnResponderTerminationRequest of Func<GestureResponderEvent, bool>
        | OnResponderTerminate of Func<GestureResponderEvent, unit>
        | OnStartShouldSetResponderCapture of Func<GestureResponderEvent, bool>
        | OnMoveShouldSetResponderCapture of (unit->unit)
        interface IGestureResponderHandlers

    type ViewPropertiesIOS =
        | AccessibilityTraits of U2<string, ResizeArray<string>>
        | ShouldRasterizeIOS of bool
        interface IViewPropertiesIOS

    type ViewPropertiesAndroid =
        | AccessibilityComponentType of string
        | AccessibilityLiveRegion of string
        | Collapsable of bool
        | ImportantForAccessibility of string
        | NeedsOffscreenAlphaCompositing of bool
        | RenderToHardwareTextureAndroid of bool
        interface IViewPropertiesAndroid

    type ViewProperties =
        | AccessibilityLabel of string
        | Accessible of bool
        | HitSlop of obj
        | OnAcccessibilityTap of (unit->unit)
        | OnLayout of Func<LayoutChangeEvent, unit>
        | OnMagicTap of (unit->unit)
        | PointerEvents of PointerEvents
        | RemoveClippedSubviews of bool
        | Style of IStyle list
        | TestID of string
        interface IViewProperties

    type ViewPagerAndroidProperties =
        | InitialPage of int
        | ScrollEnabled of bool
        | OnPageScroll of Func<NativeSyntheticEvent<ViewPagerAndroidOnPageScrollEventData>, unit>
        | OnPageSelected of Func<NativeSyntheticEvent<ViewPagerAndroidOnPageSelectedEventData>, unit>
        | OnPageScrollStateChanged of Func<ScrollState, unit>
        | KeyboardDismissMode of KeyboardDismissMode
        | PageMargin of float
        | Style of IStyle list
        | Ref of Ref<obj>
        interface IViewPagerAndroidProperties

    type KeyboardAvoidingViewProps =
        | Behavior of Behavior
        | KeyboardVerticalOffset of float // REQUIRED!
        | Ref of Ref<obj>
        interface IKeyboardAvoidingViewProps

    type WebViewPropertiesAndroid =
        | JavaScriptEnabled of bool
        | DomStorageEnabled of bool
        interface IWebViewPropertiesAndroid

    type WebViewPropertiesIOS =
        | AllowsInlineMediaPlayback of bool
        | Bounces of bool
        | DecelerationRate of DecelerationRate
        | OnShouldStartLoadWithRequest of Func<WebViewIOSLoadRequestEvent, bool>
        | ScrollEnabled of bool
        interface IWebViewPropertiesIOS

    type WebViewUriSource =
        | Uri of string
        | Method of string
        | Headers of obj
        | Body of string

    type WebViewHtmlSource =
        | Html of string // REQUIRED!
        | BaseUrl of string

    type WebViewProperties =
        | AutomaticallyAdjustContentInsets of bool
        | Bounces of bool
        | ContentInset of Insets
        | Html of string
        | InjectedJavaScript of string
        | OnError of Func<NavState, unit>
        | OnLoad of Func<NavState, unit>
        | OnLoadEnd of Func<NavState, unit>
        | OnLoadStart of Func<NavState, unit>
        | OnNavigationStateChange of Func<NavState, unit>
        | OnShouldStartLoadWithRequest of Func<bool>
        | RenderError of Func<React.ReactElement>
        | RenderLoading of Func<React.ReactElement>
        | ScrollEnabled of bool
        | StartInLoadingState of bool
        | Style of IStyle list
        | Url of string
        | Source of U3<WebViewUriSource, WebViewHtmlSource, float>
        | MediaPlaybackRequiresUserAction of bool
        | ScalesPageToFit of bool
        | Ref of Ref<obj>
        interface IWebViewProperties

    type SegmentedControlIOSProperties =
        | Enabled of bool
        | Momentary of bool
        | OnChange of Func<NativeSyntheticEvent<NativeSegmentedControlIOSChangeEvent>, unit>
        | OnValueChange of Func<string, unit>
        | SelectedIndex of float
        | TintColor of string
        | Values of ResizeArray<string>
        | Ref of Ref<SegmentedControlIOS>
        interface ISegmentedControlIOSProperties

    type NavigatorIOSProperties =
        | BarTintColor of string
        | InitialRoute of Route
        | ItemWrapperStyle of ViewStyle list
        | NavigationBarHidden of bool
        | ShadowHidden of bool
        | TintColor of string
        | TitleTextColor of string
        | Translucent of bool
        | Style of IStyle list

    module ActivityIndicator =
        type ActivityIndicatorProperties =
            | Animating of bool
            | Color of string
            | HidesWhenStopped of bool
            | Size of Size
            | Style of IStyle list
            | Ref of Ref<ActivityIndicator>
            interface IViewProperties


        type ActivityIndicatorIOSProperties =
            | Animating of bool
            | Color of string
            | HidesWhenStopped of bool
            | OnLayout of Func<obj, unit>
            | Size of Size
            | Style of IStyle list
            | Ref of Ref<ActivityIndicatorIOS>
            interface IViewProperties

    type DatePickerIOSProperties =
        | Date of DateTime
        | MaximumDate of DateTime
        | MinimumDate of DateTime
        | MinuteInterval of float
        | Mode of DatePickerIOSMode
        | OnDateChange of Func<DateTime, unit>
        | TimeZoneOffsetInMinutes of float
        | Ref of Ref<DatePickerIOS>
        interface IDatePickerIOSProperties

    type DrawerLayoutAndroidProperties =
        | DrawerBackgroundColor of string
        | DrawerLockMode of DrawerLockMode
        | DrawerPosition of DrawerLayoutAndroidPosition
        | DrawerWidth of float
        | KeyboardDismissMode of KeyboardDismissMode
        | OnDrawerClose of (unit->unit)
        | OnDrawerOpen of (unit->unit)
        | OnDrawerSlide of Func<DrawerSlideEvent, unit>
        | OnDrawerStateChanged of Func<ScrollState, unit>
        | RenderNavigationView of Func<obj>
        | StatusBarBackgroundColor of obj
        | Ref of Ref<obj>
        interface IDrawerLayoutAndroidProperties

    module Picker =
        type PickerIOSItemProperties =
            | Value of U2<string, int>
            | Label of string

        type PickerItemProperties =
            | Label of string // REQUIRED!
            | Value of string
            | Color of string
            | TestID of string

        type PickerPropertiesIOS =
            | ItemStyle of IStyle list
            | Ref of Ref<obj>
            interface IPickerProperties

        type PickerPropertiesAndroid =
            | Enabled of bool
            | Mode of Mode
            | Prompt of string
            | Ref of Ref<obj>
            interface IPickerProperties

        type PickerProperties =
            | OnValueChange of Func<string, int, unit>
            | SelectedValue of string
            | Style of IStyle list
            | TestId of string
            | Ref of Ref<Picker>
            interface IPickerProperties

        type PickerIOSProperties =
            | ItemStyle of ViewStyle list
            interface IPickerProperties

    module ProgressBar =
        type ProgressBarAndroidProperties =
            | Style of IStyle list
            | StyleAttr of StyleAttr
            | Indeterminate of bool
            | Progress of float
            | Color of string
            | TestID of string
            | Ref of Ref<ProgressBarAndroid>
            interface IProgressBarAndroidProperties

        type ProgressViewIOSProperties =
            | Style of IStyle list
            | ProgressViewStyle of ProgressViewStyle
            | Progress of float
            | ProgressTintColor of string
            | TrackTintColor of string
            | ProgressImage of obj
            | TrackImage of obj
            | Ref of Ref<ProgressViewIOS>
            interface IProgressViewIOSProperties

    type RefreshControlPropertiesIOS =
        | TintColor of string
        | Title of string
        | TitleColor of string
        | Ref of Ref<obj>
        interface IRefreshControlProperties


    type RefreshControlPropertiesAndroid =
        | Colors of ResizeArray<string>
        | Enabled of bool
        | ProgressBackgroundColor of string
        | Size of float
        | ProgressViewOffset of float
        | Ref of Ref<obj>
        interface IRefreshControlProperties

    type RefreshControlProperties =
        | OnRefresh of (unit->unit)
        | Refreshing of bool
        | Ref of Ref<RefreshControl>
        interface IRefreshControlProperties

    type SliderPropertiesIOS =
        | MaximumTrackImage of obj
        | MaximumTrackTintColor of string
        | MinimumTrackImage of string
        | MinimumTrackTintColor of string
        | ThumbImage of obj
        | TrackImage of obj
        | Ref of Ref<Slider>
        interface ISliderProperties

    type SliderProperties =
        | Disabled of bool
        | MaximumValue of float
        | MinimumValue of float
        | OnSlidingComplete of Func<float, unit>
        | OnValueChange of Func<float, unit>
        | Step of float
        | Style of IStyle list
        | TestID of string
        | Value of float
        interface ISliderProperties

    type SliderIOSProperties =
        | Disabled of bool
        | MaximumValue of float
        | MaximumTrackTintColor of string
        | MinimumValue of float
        | MinimumTrackImage of obj
        | MinimumTrackTintColor of string
        | OnSlidingComplete of (unit->unit)
        | OnValueChange of Func<float, unit>
        | Step of float
        | Style of IStyle list
        | Value of float
        | Ref of Ref<SliderIOS>
        interface ISliderIOSProperties

    type SwitchIOSProperties =
        | Disabled of bool
        | OnTintColor of string
        | OnValueChange of Func<bool, unit>
        | ThumbTintColor of string
        | TintColor of string
        | Value of bool
        | Style of IStyle list

    type ImageStyle =
        | ResizeMode of string
        | BackfaceVisibility of BackfaceVisibility
        | BorderBottomLeftRadius of float
        | BorderBottomRightRadius of float
        | BackgroundColor of string
        | BorderColor of string
        | BorderWidth of float
        | BorderRadius of float
        | BorderTopLeftRadius of float
        | BorderTopRightRadius of float
        | Overflow of Overflow
        | OverlayColor of string
        | TintColor of string
        | Opacity of float
        interface IImageStyle

    type IImagePropertiesIOS =
        interface end

    type IImageProperties =
        inherit IImagePropertiesIOS

    type IImageSourceProperties =
        interface end

    type ImageSourceProperties =
        | Uri of string
        | IsStatic of bool
        interface IImageSourceProperties

    type ImagePropertiesIOS =
        | AccessibilityLabel of string
        | Accessible of bool
        | CapInsets of Insets
        | DefaultSource of IImageSourceProperties list
        | OnError of Func<obj, unit>
        | OnProgress of (unit->unit)
        interface IImagePropertiesIOS

    type ImageProperties =
        | OnLayout of Func<LayoutChangeEvent, unit>
        | OnLoad of (unit->unit)
        | OnLoadEnd of (unit->unit)
        | OnLoadStart of (unit->unit)
        | ResizeMode of ResizeMode
        | Source of IImageSourceProperties list
        | Style of IStyle list
        | TestID of string
        interface IImageProperties


    type MapViewAnnotation =
        | Latitude of float
        | Longitude of float
        | AnimateDrop of bool
        | Title of string
        | Subtitle of string
        | HasLeftCallout of bool
        | HasRightCallout of bool
        | OnLeftCalloutPress of (unit->unit)
        | OnRightCalloutPress of (unit->unit)
        | Id of string

    type MapViewRegion =
        | Latitude of float
        | Longitude of float
        | LatitudeDelta of float
        | LongitudeDelta of float

    type MapViewOverlay =
        | Coordinates of ResizeArray<obj>
        | LineWidth of float
        | StrokeColor of obj
        | FillColor of obj
        | Id of string

    type MapViewPropertiesIOS =
        | ShowsPointsOfInterest of bool
        | Annotations of ResizeArray<MapViewAnnotation>
        | FollowUserLocation of bool
        | LegalLabelInsets of Insets
        | MapType of string
        | MaxDelta of float
        | MinDelta of float
        | Overlays of ResizeArray<MapViewOverlay>
        | ShowsCompass of bool

    type MapViewPropertiesAndroid =
        | Active of bool
        interface IMapViewPropertiesAndroid

    type MapViewProperties =
        | OnAnnotationPress of (unit->unit)
        | OnRegionChange of Func<MapViewRegion, unit>
        | OnRegionChangeComplete of Func<MapViewRegion, unit>
        | PitchEnabled of bool
        | Region of MapViewRegion
        | RotateEnabled of bool
        | ScrollEnabled of bool
        | ShowsUserLocation of bool
        | Style of IStyle list
        | ZoomEnabled of bool
        | Ref of Ref<obj>
        interface IMapViewProperties

    type ModalProperties =
        | Animated of bool
        | AnimationType of AnimationType
        | Transparent of bool
        | Visible of bool
        | OnRequestClose of (unit->unit)
        | OnShow of Func<NativeSyntheticEvent<obj>, unit>

    type IButtonProperties =
        interface end

    type ButtonProperties =
        | Title of string
        | OnPress of (unit->unit)
        | Disabled of bool
        | Color of string
        | TestID of string
        | HasTVPreferredFocus of bool
        interface IButtonProperties

    type ITouchableHighlightProperties =
        interface end

    type ITouchableOpacityProperties =
        interface end

    type ITouchableNativeFeedbackProperties =
        interface end

    type ITouchableWithoutFeedbackIOSProperties =
        interface end

    type ITouchableWithoutFeedbackAndroidProperties =
        interface end

    type ITouchableWithoutFeedbackProperties =
        inherit ITouchableWithoutFeedbackAndroidProperties
        inherit ITouchableWithoutFeedbackIOSProperties
        inherit ITouchableNativeFeedbackProperties
        inherit ITouchableOpacityProperties
        inherit ITouchableHighlightProperties

    type TouchableWithoutFeedbackAndroidProperties =
        | AccessibilityComponentType of string
        interface ITouchableWithoutFeedbackAndroidProperties

    type TouchableWithoutFeedbackIOSProperties =
        | AccessibilityTraits of U2<string, ResizeArray<string>>
        interface ITouchableWithoutFeedbackIOSProperties

    type TouchableWithoutFeedbackProperties =
        | Accessible of bool
        | DelayLongPress of float
        | DelayPressIn of float
        | DelayPressOut of float
        | Disabled of bool
        | HitSlop of obj
        | OnLayout of Func<LayoutChangeEvent, unit>
        | OnLongPress of (unit->unit)
        | OnPress of (unit->unit)
        | OnPressIn of (unit->unit)
        | OnPressOut of (unit->unit)
        | Style of IStyle list
        | PressRetentionOffset of obj
        interface ITouchableWithoutFeedbackProperties

    type TouchableHighlightProperties =
        | ActiveOpacity of float
        | OnHideUnderlay of (unit->unit)
        | OnShowUnderlay of (unit->unit)
        | Style of IStyle list
        | UnderlayColor of string
        interface ITouchableHighlightProperties

    type TouchableOpacityProperties =
        | ActiveOpacity of float
        interface ITouchableOpacityProperties


    type TouchableNativeFeedbackProperties =
        | Background of obj
        interface ITouchableNativeFeedbackProperties

    type NavigationBarRouteMapper =
        | Title of Func<Route, Navigator, float, NavState, React.ReactElement>
        | LeftButton of Func<Route, Navigator, float, NavState, React.ReactElement>
        | RightButton of Func<Route, Navigator, float, NavState, React.ReactElement>

    type NavigationBarProperties =
        | Navigator of Navigator
        | RouteMapper of NavigationBarRouteMapper
        | NavState of NavState
        | Style of IStyle list

    type INavigatorProperties =
        interface end

    type NavigatorProperties =
        | ConfigureScene of Func<Route, ResizeArray<Route>, SceneConfig>
        | InitialRoute of Route
        | InitialRouteStack of ResizeArray<Route>
        | NavigationBar of React.ReactElement // React.ReactElement option
        | Navigator of Navigator
        | OnDidFocus of (unit->unit)
        | OnWillFocus of (unit->unit)
        | RenderScene of Func<Route, Navigator, React.ReactElement>
        | SceneStyle of ViewStyle list
        | DebugOverlay of bool
        interface INavigatorProperties

    module ToolBar =
        type TabBarItemProperties =
            | Badge of U2<string, float>
            | Icon of U2<obj, string>
            | OnPress of (unit->unit)
            | Selected of bool
            | SelectedIcon of U2<obj, string>
            | Style of IStyle list
            | SystemIcon of SystemIcon
            | Title of string
            | Ref of Ref<obj>
            interface IViewProperties

        type TabBarIOSProperties =
            | BarTintColor of string
            | Style of IStyle list
            | TintColor of string
            | Translucent of bool
            | UnselectedTintColor of string
            | Ref of Ref<obj>
            interface IViewProperties

    type ScrollViewStyle =
        | BackfaceVisibility of BackfaceVisibility
        | BackgroundColor of string
        | BorderColor of string
        | BorderTopColor of string
        | BorderRightColor of string
        | BorderBottomColor of string
        | BorderLeftColor of string
        | BorderRadius of float
        | BorderTopLeftRadius of float
        | BorderTopRightRadius of float
        | BorderBottomLeftRadius of float
        | BorderBottomRightRadius of float
        | BorderStyle of BorderStyle
        | BorderWidth of float
        | BorderTopWidth of float
        | BorderRightWidth of float
        | BorderBottomWidth of float
        | BorderLeftWidth of float
        | Opacity of float
        | Overflow of Overflow
        | ShadowColor of string
        | ShadowOffset of obj
        | ShadowOpacity of float
        | ShadowRadius of float
        | Elevation of float
        interface IScrollViewStyle

    type IScrollViewPropertiesIOS =
        inherit IScrollViewProperties

    type ScrollViewPropertiesIOS =
        | AlwaysBounceHorizontal of bool
        | AlwaysBounceVertical of bool
        | AutomaticallyAdjustContentInsets of bool
        | Bounces of bool
        | BouncesZoom of bool
        | CanCancelContentTouches of bool
        | CenterContent of bool
        | ContentInset of Insets
        | ContentOffset of PointProperties
        | DecelerationRate of DecelerationRate
        | DirectionalLockEnabled of bool
        | IndicatorStyle of IndicatorStyle
        | MaximumZoomScale of float
        | MinimumZoomScale of float
        | OnRefreshStart of (unit->unit)
        | OnScrollAnimationEnd of (unit->unit)
        | ScrollEnabled of bool
        | ScrollEventThrottle of float
        | ScrollIndicatorInsets of Insets
        | ScrollsToTop of bool
        | SnapToAlignment of string
        | SnapToInterval of float
        | StickyHeaderIndices of ResizeArray<float>
        | ZoomScale of float
        interface IScrollViewPropertiesIOS

    type IScrollViewPropertiesAndroid =
        inherit IScrollViewProperties

    type ScrollViewPropertiesAndroid =
        | EndFillColor of string
        | ScrollPerfTag of string
        interface IScrollViewPropertiesAndroid

    [<RequireQualifiedAccess; StringEnum>]
    type KeyboardShouldPersistTapsProperties =
    | Never
    | Always
    | Handled

    type ScrollViewProperties =
        | ContentContainerStyle of IStyle list
        | Horizontal of bool
        | KeyboardDismissMode of string
        | KeyboardShouldPersistTaps of KeyboardShouldPersistTapsProperties
        | OnScroll of Func<obj, unit>
        | PagingEnabled of bool
        | RemoveClippedSubviews of bool
        | ShowsHorizontalScrollIndicator of bool
        | ShowsVerticalScrollIndicator of bool
        | Style of IStyle list
        | RefreshControl of React.ReactElement
        | Ref of Ref<ScrollView>
        | OnContentSizeChange of (float->float->unit)
        interface IScrollViewProperties

    type ListViewProperties<'a> = 
        | DataSource of ListViewDataSource<'a>
        | EnableEmptySections of bool
        | InitialListSize of float
        | OnChangeVisibleRows of Func<ResizeArray<obj>, ResizeArray<obj>, unit>
        | OnEndReached of (unit->unit)
        | OnEndReachedThreshold of float
        | PageSize of float
        | RemoveClippedSubviews of bool
        | RenderFooter of Func<React.ReactElement>
        | RenderHeader of Func<React.ReactElement>
        | RenderRow of Func<'a, U2<string, float>, U2<string, float>, bool, React.ReactElement>
        | RenderScrollComponent of Func<ScrollViewProperties, React.ReactElement>
        | RenderSectionHeader of Func<obj, U2<string, float>, React.ReactElement>
        | RenderSeparator of Func<U2<string, float>, U2<string, float>, bool, React.ReactElement>
        | ScrollRenderAheadDistance of float
        | Ref of Ref<obj>
        interface IListViewProperties

    type FlatListRenderItemSeparator = { highlight : Func<unit, unit>; unhighlight : Func<unit, unit> }
    type FlatListRenderItemInfo<'a> = { item : 'a; index : float; separators : FlatListRenderItemSeparator }

    type GetItemLayoutResult = { length : float; offset : float; index : float }
    
    type ViewToken<'a> = { item : 'a; key : string; index : float; isViewable : bool; section : obj }
    type OnViewableItemsChangedInfo<'a> = { viewableItems : ViewToken<'a> []; changed : ViewToken<'a> [] }

    type ViewabilityConfig = { minimumViewTime : float; viewAreaCoveragePercentThreshold : float; itemVisiblePercentThreshold : float; waitForInteraction : bool }

    type FlatListProperties<'a> =
        | ItemSeparatorComponent of (unit -> React.ReactElement)
        | ListEmptyComponent of React.ReactElement
        | ListFooterComponent of React.ReactElement
        | ListHeaderComponent of React.ReactElement
        | ColumnWrapperStyle of IStyle list
        | ExtraData of obj
        | GetItemLayout of Func<ResizeArray<'a>, GetItemLayoutResult>
        | Horizontal of bool
        | InitialNumToRender of int
        | InitialScrollIndex of float
        | KeyExtractor of Func<'a, int, string>
        | LegacyImplementation of bool
        | NumColumns of int
        | OnEndReached of Func<float, unit>
        | OnEndReachedThreshold of float
        | OnRefresh of Func<unit, unit>
        | OnViewableItemsChanged of Func<OnViewableItemsChangedInfo<'a>, unit>
        | Refreshing of bool
        | RemoveClippedSubviews of bool
        | RenderItem of Func<FlatListRenderItemInfo<'a>, React.ReactElement>
        | ViewabilityConfig of ViewabilityConfig
        | Ref of Ref<obj>
        interface IFlatListProperties<'a>

    type SwipeableListViewProps<'a> =
        | DataSource of SwipeableListViewDataSource<'a> // REQUIRED!
        | MaxSwipeDistance of float
        | RenderRow of Func<'a, U2<string, float>, U2<string, float>, bool, React.ReactElement> // REQUIRED!
        | RenderQuickActions of Func<'a, string, string, React.ReactElement> // REQUIRED!

    type ActionSheetIOSOptions =
        | Title of string
        | Options of ResizeArray<string>
        | CancelButtonIndex of float
        | DestructiveButtonIndex of float
        | Message of string

    type ShareActionSheetIOSOptions =
        | Message of string
        | Url of string


    type DatePickerAndroidOpenOption =
        | Date of U2<DateTime, float>
        | MinDate of U2<DateTime, float>
        | MaxDate of U2<DateTime, float>

    type PanResponderCallbacks =
        | OnMoveShouldSetPanResponder of Func<GestureResponderEvent, PanResponderGestureState, bool>
        | OnStartShouldSetPanResponder of Func<GestureResponderEvent, PanResponderGestureState, unit>
        | OnPanResponderGrant of Func<GestureResponderEvent, PanResponderGestureState, unit>
        | OnPanResponderMove of Func<GestureResponderEvent, PanResponderGestureState, unit>
        | OnPanResponderRelease of Func<GestureResponderEvent, PanResponderGestureState, unit>
        | OnPanResponderTerminate of Func<GestureResponderEvent, PanResponderGestureState, unit>
        | OnMoveShouldSetPanResponderCapture of Func<GestureResponderEvent, PanResponderGestureState, bool>
        | OnStartShouldSetPanResponderCapture of Func<GestureResponderEvent, PanResponderGestureState, bool>
        | OnPanResponderReject of Func<GestureResponderEvent, PanResponderGestureState, unit>
        | OnPanResponderStart of Func<GestureResponderEvent, PanResponderGestureState, unit>
        | OnPanResponderEnd of Func<GestureResponderEvent, PanResponderGestureState, unit>
        | OnPanResponderTerminationRequest of Func<GestureResponderEvent, PanResponderGestureState, bool>

    module StatusBar =
        type StatusBarPropertiesIOS =
            | BarStyle of StatusBarStyle list
            | NetworkActivityIndicatorVisible of bool
            | ShowHideTransition of ShowHideTransition
            interface IStatusBarProperties

        type StatusBarPropertiesAndroid =
            | BackgroundColor of obj
            | Translucent of bool
            interface IStatusBarProperties

    type StatusBarProperties =
        | Animated of bool
        | Hidden of bool
        interface IStatusBarProperties

    type SwitchPropertiesIOS =
        | OnTintColor of string
        | ThumbTintColor of string
        | TintColor of string
        | Ref of Ref<Switch>
        interface ISwitchProperties

    type SwitchProperties =
        | Disabled of bool
        | TestID of string
        | Style of IStyle list
        | Ref of Ref<Switch>
        interface ISwitchProperties

    type NavigationAnimatedViewProps =
        | Route of obj
        | Style of IStyle list
        | RenderOverlay of (obj -> React.ReactElement)
        | ApplyAnimation of (obj * obj -> unit)
        | RenderScene of (obj -> React.ReactElement)


    type INavigationHeaderProps =
        interface end

    type NavigationHeaderProps =
        | RenderTitleComponent of (NavigationTransitionProps -> React.ReactElement)
        | RenderLeftComponent of (NavigationTransitionProps -> React.ReactElement)
        | RenderRightComponent of (NavigationTransitionProps -> React.ReactElement)
        | StatusBarHeight of U2<float,Animated.Value>
        | OnNavigateBack of (unit -> unit)
        interface INavigationHeaderProps

    type INavigationCardStackProps =
        interface end

    type NavigationCardStackProps =
        | Direction of Direction
        | Style of IStyle list
        | EnableGestures of bool
        | GestureResponseDistance of float
        | CardStyle of IStyle list
        | RenderHeader of (NavigationTransitionProps -> React.ReactElement)
        | OnNavigateBack of (unit -> unit)
        interface INavigationCardStackProps

    type IBreadcrumbNavigationBarProperties =
        interface end

    type BreadcrumbNavigationBarProperties =
        | Navigator of Navigator
        | RouteMapper of NavigatorStatic.BreadcrumbNavigationBarRouteMapper
        | NavState of NavState
        | Style of IStyle list
        interface IBreadcrumbNavigationBarProperties

open Props
module R = Fable.Helpers.React

[<Emit("require($0)")>]
// Use `require` to load a local image
let inline localImage (path:string) : IImageSourceProperties list = jsNative

let inline createElement(c: React.ComponentClass<'T>, props: 'P list, children: React.ReactElement list) =
    R.createElement (c, keyValueList CaseRules.LowerFirst props, children)

let inline internal createElementWithObjProps(c: React.ComponentClass<'T>, props: obj, children: React.ReactElement list) =
    R.createElement (c, props, children)

let inline text (props:TextProperties list) (text:string): React.ReactElement =
    createElement(RN.Text, props, [R.str text])

let inline textInput (props: ITextInputProperties list) (text:string): React.ReactElement =
    let valueProp = TextInput.TextInputProperties.Value text :> ITextInputProperties
    createElement(RN.TextInput, valueProp :: props, [])

let inline createToolbarAction(title:string,showStatus:ToolbarActionShowStatus) : ToolbarAndroidAction =
    createObj [
        "title" ==> title
        "show" ==> showStatus
    ]

let inline createToolbarActionWithIcon(title:string,icon: IImageSourceProperties list,showStatus:ToolbarActionShowStatus) : ToolbarAndroidAction =
    createObj [
        "title" ==> title
        "icon" ==> icon
        "show" ==> showStatus
    ]

let inline toolbarAndroid (props:IToolbarAndroidProperties list) (onActionSelected:int -> unit) : React.ReactElement =
    createElementWithObjProps(
        RN.ToolbarAndroid,
        !!JS.Object.assign(
            createObj ["onActionSelected" ==> onActionSelected],
            keyValueList CaseRules.LowerFirst props), [])

let inline keyboardAvoidingView (props:IKeyboardAvoidingViewProps list) (children: React.ReactElement list): React.ReactElement =
    createElement(
      RN.KeyboardAvoidingView,
      props,
      children)

let inline view (props: IViewProperties list) (children: React.ReactElement list): React.ReactElement =
    createElement(
        RN.View,
        props,
        children)

let inline webView (props:IWebViewProperties list) : React.ReactElement =
    createElement(
      RN.WebView,
      props, [])

let inline segmentedControlIOS (props:ISegmentedControlIOSProperties list) : React.ReactElement =
    createElement(
      RN.SegmentedControlIOS,
      props, [])

let inline activityIndicator (props:IActivityIndicatorProperties list) : React.ReactElement =
    createElement(
      RN.ActivityIndicator,
      props, [])

let inline activityIndicatorIOS (props:IActivityIndicatorIOSProperties list) : React.ReactElement =
    createElement(
      RN.ActivityIndicatorIOS,
      props, [])

let inline datePickerIOS (props:IDatePickerIOSProperties list) : React.ReactElement =
    createElement(
      RN.DatePickerIOS,
      props, [])

let inline drawerLayoutAndroid (props:IDrawerLayoutAndroidProperties list) (renderNavigationView: unit -> React.ReactElement) (children: React.ReactElement list): React.ReactElement =
    createElementWithObjProps(
      RN.DrawerLayoutAndroid,
      !!JS.Object.assign(
            createObj ["renderNavigationView" ==> renderNavigationView],
            keyValueList CaseRules.LowerFirst props),
      children)

let inline pickerIOSItem (props:Picker.PickerIOSItemProperties list) : React.ReactElement =
    createElement(
      RN.PickerIOS.Item,
      props, [])

let inline pickerItem (props:Picker.PickerItemProperties list) : React.ReactElement =
    createElement(
      RN.Picker.Item,
      props, [])

let inline picker (props:IPickerProperties list) (children:React.ReactElement list): React.ReactElement =
    createElement(
      RN.Picker,
      props,
      children)

let inline pickerIOS (props:Picker.PickerIOSProperties list) (children:React.ReactElement list): React.ReactElement =
    createElement(
      RN.PickerIOS,
      props,
      children)

let inline progressBarAndroid (props:IProgressBarAndroidProperties list) : React.ReactElement =
    createElement(
      RN.ProgressBarAndroid,
      props, [])

let inline progressViewIOS (props:IProgressViewIOSProperties list) : React.ReactElement =
    createElement(
      RN.ProgressViewIOS,
      props, [])

let inline refreshControl (props:IRefreshControlProperties list) : React.ReactElement =
    createElement(
      RN.RefreshControl,
      props, [])

let inline slider (props:ISliderProperties list) : React.ReactElement =
    createElement(
      RN.Slider,
      props, [])

let inline sliderIOS (props:ISliderIOSProperties list) : React.ReactElement =
    createElement(
      RN.SliderIOS,
      props, [])

let inline switchIOS (props:SwitchIOSProperties list) : React.ReactElement =
    createElement(
      RN.SwitchIOS,
      props, [])

let inline image (props:IImageProperties list) : React.ReactElement =
    createElement(
      RN.Image,
      props, [])

let inline imageWithChild (props: IImageProperties list) (child: React.ReactElement) : React.ReactElement =
    createElement(
        RN.Image,
        props,
        [child])

let inline listView<'a> (dataSource:ListViewDataSource<'a>) (props: IListViewProperties list)  : React.ReactElement =
    createElementWithObjProps(
      RN.ListView,
      !!JS.Object.assign(
            createObj ["dataSource" ==> dataSource],
            keyValueList CaseRules.LowerFirst props), [])

let inline flatList<'a> (data:'a []) (props: FlatListProperties<'a> list)  : React.ReactElement =
    let pascalCaseProps, camelCaseProps =
      List.partition (function
                        | ItemSeparatorComponent _ -> true
                        | ListEmptyComponent _ -> true
                        | ListFooterComponent _ -> true
                        | ListHeaderComponent _ -> true
                        | _ -> false)
                      props

    createElementWithObjProps(
      RN.FlatList,
      !!JS.Object.assign(
            createObj ["data" ==> data],
            keyValueList CaseRules.LowerFirst camelCaseProps,
            keyValueList CaseRules.None pascalCaseProps), [])

let inline mapView (props:IMapViewProperties list) (children: React.ReactElement list): React.ReactElement =
    createElement(
      RN.MapView,
      props,
      children)

let inline modal (props:ModalProperties list) (children: React.ReactElement list): React.ReactElement =
    createElement(
      RN.Modal,
      props,
      children)

let inline button (props:IButtonProperties list) (children: React.ReactElement list) : React.ReactElement =
    createElement(
      RN.Button,
      props,
      children)

let inline touchableWithoutFeedback (props:ITouchableWithoutFeedbackProperties list) (children: React.ReactElement list): React.ReactElement =
    createElement(
      RN.TouchableWithoutFeedback,
      props,
      children)

let inline touchableHighlight (props:ITouchableHighlightProperties list) (children: React.ReactElement list) : React.ReactElement =
    createElement(
      RN.TouchableHighlight,
      props,
      children)

let inline touchableHighlightWithChild (props:ITouchableHighlightProperties list) (child: React.ReactElement): React.ReactElement =
    createElement(
      RN.TouchableHighlight,
      props,
      [child])

let inline touchableOpacity (props:ITouchableOpacityProperties list) (children: React.ReactElement list): React.ReactElement =
    createElement(
      RN.TouchableOpacity,
      props,
      children)

let inline touchableNativeFeedback (props:ITouchableNativeFeedbackProperties list) (children: React.ReactElement list): React.ReactElement =
    createElement(
      RN.TouchableNativeFeedback,
      props,
      children)

let inline viewPagerAndroid (props: IViewPagerAndroidProperties list) (children: React.ReactElement list) : React.ReactElement =
    createElement(
        RN.ViewPagerAndroid,
        props,
        children)

let inline navigator (props:INavigatorProperties list) : React.ReactElement =
    createElement(
      RN.Navigator,
      props, [])

let inline styleSheet (props:StyleSheetProperties list) : React.ReactElement =
    createElement(
      RN.StyleSheet,
      props, [])

let inline tabBarItem (props:ITabBarItemProperties list) : React.ReactElement =
    createElement(
      RN.TabBarIOS.Item,
      props, [])

let inline tabBarIOS (props:ITabBarIOSProperties list) : React.ReactElement =
    createElement(
      RN.TabBarIOS,
      props, [])

let inline scrollView (props:IScrollViewProperties list) (children: React.ReactElement list) : React.ReactElement =
    createElement(
      RN.ScrollView,
      props,
      children)

let inline swipeableListView (props:SwipeableListViewProps<_> list) : React.ReactElement =
    createElement(
      RN.SwipeableListView,
      props, [])

let inline statusBar (props:IStatusBarProperties list) : React.ReactElement =
    createElement(
      RN.StatusBar,
      props, [])

let inline switch (props:ISwitchProperties list) (onValueChange: bool -> unit) (value:bool) : React.ReactElement =
    createElementWithObjProps(
      RN.Switch,
      !!JS.Object.assign(
            createObj ["onValueChange" ==> onValueChange
                       "value" ==> value],
            keyValueList CaseRules.LowerFirst props), [])

let inline navigationHeader (props:INavigationHeaderProps list) (rendererProps:NavigationTransitionProps): React.ReactElement =
    createElementWithObjProps(
      RN.NavigationExperimental.Header,
      !!JS.Object.assign(keyValueList CaseRules.LowerFirst props, rendererProps), [])

let inline navigationState (index:int) (routes:NavigationRoute list): NavigationState =
    !!createObj ["index" ==> index
                 "routes" ==> Array.ofList routes]

let inline navigationRoute (key:string) (title:string option): NavigationRoute =
    !!createObj ["key" ==> key
                 "title" ==> title]

let inline navigationCardStack (navigationState: NavigationState)
                        (renderScene: NavigationTransitionProps -> React.ReactElement)
                        (props:INavigationCardStackProps list): React.ReactElement =
    createElementWithObjProps(
      RN.NavigationExperimental.CardStack,
      !!JS.Object.assign(
            createObj ["renderScene" ==> renderScene
                       "navigationState" ==> navigationState],
            keyValueList CaseRules.LowerFirst props), [])

let inline navigationContainer (props:NavigationContainerProps list) : React.ReactElement =
    createElement(
      RN.NavigationContainer,
      props, [])

let inline navigationRootContainer (props:NavigationRootContainerProps list) : React.ReactElement =
    createElement(
      RN.NavigationRootContainer,
      props, [])

let inline navigationBar (props:NavigationBarProperties list) : React.ReactElement =
    createElement(
      NavigatorStatic.Globals.NavigationBar,
      props, [])

let inline breadcrumbNavigationBar (props:IBreadcrumbNavigationBarProperties list) : React.ReactElement =
    createElement(
      NavigatorStatic.Globals.BreadcrumbNavigationBar,
      props, [])

let inline emptyDataSource<'a>() : ListViewDataSource<'a> =
    !!RN.ListView.DataSource.Create(
        !!createObj ["rowHasChanged" ==> fun r1 r2 -> r1 <> r2])

let inline newDataSource<'a> (elements:'a []) =
    emptyDataSource<'a>().cloneWithRows(!!elements)

let inline updateDataSource<'a> (data:'a []) (dataSource : ListViewDataSource<'a>) : ListViewDataSource<'a> =
    dataSource.cloneWithRows(!!data)

[<Import("Buffer","buffer")>]
[<Emit("$0.from($1).toString($2)")>]
let encode (text: string, encoding:string) : string = jsNative

let encodeBase64 (text: string) : string = encode(text,"base64")
let encodeAscii (text: string) : string = encode(text,"ascii")

    
[<Import("BackHandler","react-native")>]
let private BackHandler = obj()

let removeOnHardwareBackPressHandler (onHardwareBackPress: unit -> bool): unit =
    BackHandler?removeEventListener("hardwareBackPress", onHardwareBackPress) |> ignore

let setOnHardwareBackPressHandler (onHardwareBackPress: unit -> bool): unit =
    BackHandler?addEventListener("hardwareBackPress", onHardwareBackPress) |> ignore


let exitApp (): unit =
    BackHandler?exitApp() |> ignore

[<Import("Linking","react-native")>]
let private Linking = obj()

/// Opens the given URL
let openUrl (url:string) : unit =
    Linking?openURL(url) |> ignore

module Alert =
    [<Import("Alert","react-native")>]
    let private Alert = obj()

    let private createButton(label:string,callback:unit -> unit) =
        createObj [
            "text" ==> label
            "onPress" ==> callback
        ]

    /// Shows an alert with many buttons
    let alert (title:string,message:string,buttons: (string * (unit -> unit)) seq) : unit =
        Alert?alert( title, message, Seq.map createButton buttons |> Seq.toArray ) |> ignore

    /// Shows an alert button with one button
    let alertWithOneButton (title:string,message:string,okText:string,onOk:unit -> unit) : unit =
        alert( title, message, [ okText,onOk ]) |> ignore

    /// Shows an alert button with two buttons
    let alertWithTwoButtons (title:string,message:string,cancelText:string,onCancel:unit -> unit,okText:string,onOk:unit -> unit) : unit =
        alert( title, message, [ (cancelText,onCancel); (okText,onOk) ]) |> ignore

    let confirm (title:string,message:string,cancelText:string,okText:string) =
        Promise.create(fun onSuccess onError ->
            let onError() = onError(new Exception("Cancelled"))
            alertWithTwoButtons (title,message,cancelText,onError,okText,onSuccess)
        )

module NetInfo =
    [<Import("NetInfo","react-native")>]
    let private NetInfo = obj()

    open Fable.Import.JS
    open Fable.Import.Browser

    let getConnectionType() : Promise<string> =
        !!NetInfo?fetch()

/// ImageStore contains functions which help to deal with image data on the device.
module ImageStore =
    [<Import("ImageStore","react-native")>]
    let private ImageStore = obj()

    /// Retrieves the base64-encoded data for an image in the ImageStore. If the specified URI does not match an image in the store, an exception will be raised.
    let getBase64ForTag uri : JS.Promise<string> =
        Promise.create(fun onSuccess onError ->
            ImageStore?getBase64ForTag(uri, onSuccess, onError) |> ignore
        )

    /// Stores a base64-encoded image in the ImageStore, and returns a URI that can be used to access or display the image later.
    /// Images are stored in memory only, and must be manually deleted when you are finished with them by calling removeImageForTag().
    let addImageFromBase64 imageData : JS.Promise<string> =
        Promise.create(fun onSuccess onError ->
            ImageStore?addImageFromBase64(imageData, onSuccess, onError) |> ignore
        )
        
/// ImageEditor contains functions which help to deal with image data.
module ImageEditor =
    [<RequireQualifiedAccess>]
    type ResizeMode =
    | Contain
    | Cover
    | Stretch

    type CropData() =
        let data = createObj [  ]

        member this.SetSize(width:int,height:int) =
            let size = 
                createObj
                    [ "width" ==> width
                      "height" ==> height ]

            data?size <- size
            this

        member this.SetDisplaySize(width:int,height:int) =
            let size = 
                createObj
                    [ "width" ==> width
                      "height" ==> height ]

            data?displaySize <- size
            this

        member this.SetOffset(x:int,y:int) =
            let offset = 
                createObj
                    [ "x" ==> x
                      "y" ==> y ]

            data?offset <- offset
            this

        member this.SetResizeMode(mode:ResizeMode) =

            data?displaysize <- 
                match mode with
                | ResizeMode.Contain -> "contain"
                | ResizeMode.Cover -> "cover"
                | ResizeMode.Stretch -> "stretch"
            this


    [<Import("ImageEditor","react-native")>]
    let private ImageEditor = obj()

    /// Crop the image specified by the URI param. If URI points to a remote image, it will be downloaded automatically. 
    /// If the image cannot be loaded/downloaded, the failure callback will be called.
    let cropImage (uri:string) (cropData:CropData) : JS.Promise<string> =
        Promise.create(fun onSuccess onError ->
            ImageEditor?cropImage(uri, cropData?data, onSuccess, onError) |> ignore
        )

module Toast =
    [<Import("ToastAndroid","react-native")>]
    let private Toast = obj()

    /// Shows a toast with short duration
    let showShort (message:string) : unit =
        !!Toast?show(message,Toast?SHORT)

    /// Shows a toast with long duration
    let showLong (message:string) : unit =
        !!Toast?show(message,Toast?LONG)

module Storage =
    open Fable.Core.JsInterop

    /// Loads a value as string with the given key from the local device storage.
    /// Returns None if the key is not found.
    let getItem (key:string) : JS.Promise<string option> =
        Globals.AsyncStorage.getItem key
        |> Promise.map (function
            | null -> Option.None
            | v -> Some v)

    /// Loads a value with the given key from the local device storage.
    /// Returns None if the key is not found.
    let [<PassGenerics>] load<'a> (key:string) : JS.Promise<'a option> =
        Globals.AsyncStorage.getItem key
        |> Promise.map (function
            | null -> Option.None
            | v -> Some (ofJson v))

    /// Saves a value with the given key to the local device storage.
    let setItem (k:string) (v:string): JS.Promise<unit> =
        !!Globals.AsyncStorage.setItem(k,v)

    /// Saves a value with the given key to the local device storage.
    let [<PassGenerics>] save<'a> (k:string) (v:'a): JS.Promise<unit> =
        !!Globals.AsyncStorage.setItem(k, toJson v)

