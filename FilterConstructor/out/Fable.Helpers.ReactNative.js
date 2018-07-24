import { setType } from "./fable-core/Symbol";
import _Symbol from "./fable-core/Symbol";
import { createObj, comparePrimitives, Tuple, compareRecords, equalsRecords, GenericParam, Array as _Array, makeGeneric, Unit, Any, Interface, Function as _Function, compareUnions, equals } from "./fable-core/Util";
import { ofArray } from "./fable-core/List";
import List from "./fable-core/List";
import { Buffer } from "buffer";
import { Platform as Platform_1, AsyncStorage, ToastAndroid, ImageEditor as ImageEditor_1, ImageStore as ImageStore_1, NetInfo as NetInfo_1, Alert as Alert_1, Linking as Linking_1, BackHandler as BackHandler_1 } from "react-native";
import { map } from "./fable-core/Seq";
import { makeSome } from "./fable-core/Option";
import { toJson, ofJson } from "./fable-core/Serialize";
export const Props = function (__exports) {
  const WebViewPropertiesAndroid = __exports.WebViewPropertiesAndroid = class WebViewPropertiesAndroid {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.WebViewPropertiesAndroid",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable", "Fable.Helpers.ReactNative.Props.IWebViewPropertiesAndroid"],
        cases: [["JavaScriptEnabled", "boolean"], ["DomStorageEnabled", "boolean"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

    CompareTo(other) {
      return compareUnions(this, other) | 0;
    }

  };
  setType("Fable.Helpers.ReactNative.Props.WebViewPropertiesAndroid", WebViewPropertiesAndroid);
  const WebViewPropertiesIOS = __exports.WebViewPropertiesIOS = class WebViewPropertiesIOS {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.WebViewPropertiesIOS",
        interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.IWebViewPropertiesIOS"],
        cases: [["AllowsInlineMediaPlayback", "boolean"], ["Bounces", "boolean"], ["DecelerationRate", "string"], ["OnShouldStartLoadWithRequest", _Function([Interface("Fable.Import.ReactNative.WebViewIOSLoadRequestEvent"), "boolean"])], ["ScrollEnabled", "boolean"]]
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.WebViewPropertiesIOS", WebViewPropertiesIOS);
  const WebViewBundleSource = __exports.WebViewBundleSource = class WebViewBundleSource {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.WebViewBundleSource",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Uri", "string"], ["Method", "string"], ["Headers", Any], ["Cache", Interface("Fable.Import.ReactNative.ImageStatic")], ["Body", "string"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNative.Props.WebViewBundleSource", WebViewBundleSource);
  const WebViewHtmlSource = __exports.WebViewHtmlSource = class WebViewHtmlSource {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.WebViewHtmlSource",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: [["Html", "string"], ["BaseUrl", "string"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

    CompareTo(other) {
      return compareUnions(this, other) | 0;
    }

  };
  setType("Fable.Helpers.ReactNative.Props.WebViewHtmlSource", WebViewHtmlSource);
  const WebViewProperties = __exports.WebViewProperties = class WebViewProperties {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.WebViewProperties",
        interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.IWebViewProperties"],
        cases: [["AutomaticallyAdjustContentInsets", "boolean"], ["Bounces", "boolean"], ["ContentInset", Interface("Fable.Import.ReactNative.Insets")], ["Html", "string"], ["InjectedJavaScript", "string"], ["OnError", _Function([Interface("Fable.Import.ReactNative.NavState"), Unit])], ["OnLoad", _Function([Interface("Fable.Import.ReactNative.NavState"), Unit])], ["OnLoadEnd", _Function([Interface("Fable.Import.ReactNative.NavState"), Unit])], ["OnLoadStart", _Function([Interface("Fable.Import.ReactNative.NavState"), Unit])], ["OnNavigationStateChange", _Function([Interface("Fable.Import.ReactNative.NavState"), Unit])], ["OnShouldStartLoadWithRequest", _Function([Any, "boolean"])], ["RenderError", _Function([Unit, Interface("Fable.Import.React.ReactElement")])], ["RenderLoading", _Function([Unit, Interface("Fable.Import.React.ReactElement")])], ["ScrollEnabled", "boolean"], ["StartInLoadingState", "boolean"], ["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["Url", "string"], ["Source", Any], ["MediaPlaybackRequiresUserAction", "boolean"], ["ScalesPageToFit", "boolean"], ["Ref", _Function([Any, Unit])]]
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.WebViewProperties", WebViewProperties);
  const ImageURISourceProperties = __exports.ImageURISourceProperties = class ImageURISourceProperties {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.ImageURISourceProperties",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Uri", "string"], ["Bundle", "string"], ["Method", "string"], ["Headers", Any], ["Body", "string"], ["Cache", "string"], ["Width", "number"], ["Height", "number"], ["Scale", "number"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNative.Props.ImageURISourceProperties", ImageURISourceProperties);
  const ImageSource = __exports.ImageSource = class ImageSource {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.ImageSource",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Remote", makeGeneric(List, {
          T: ImageURISourceProperties
        })], ["Local", "string"], ["RemoteList", makeGeneric(List, {
          T: makeGeneric(List, {
            T: ImageURISourceProperties
          })
        })]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNative.Props.ImageSource", ImageSource);
  const TransformsStyle = __exports.TransformsStyle = class TransformsStyle {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.TransformsStyle",
        interfaces: ["FSharpUnion", "System.IEquatable", "Fable.Helpers.ReactNative.Props.ITransformsStyle"],
        cases: [["Transform", Any, Any, Any, Any, Any, Any, Any, Any, Any, Any, Any, Any], ["TransformMatrix", _Array(Float64Array, true)], ["Rotation", "number"], ["ScaleX", "number"], ["ScaleY", "number"], ["TranslateX", "number"], ["TranslateY", "number"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNative.Props.TransformsStyle", TransformsStyle);
  const FlexStyle = __exports.FlexStyle = class FlexStyle {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.FlexStyle",
        interfaces: ["FSharpUnion", "System.IEquatable", "Fable.Helpers.ReactNative.Props.IFlexStyle"],
        cases: [["AlignContent", "string"], ["AlignItems", "string"], ["AlignSelf", "string"], ["AspectRatio", "number"], ["BorderBottomWidth", "number"], ["BorderEndWidth", "number"], ["BorderLeftWidth", "number"], ["BorderRightWidth", "number"], ["BorderStartWidth", "number"], ["BorderTopWidth", "number"], ["BorderWidth", "number"], ["Bottom", Interface("Fable.Helpers.ReactNative.Props.ISizeUnit")], ["Display", "string"], ["End", Interface("Fable.Helpers.ReactNative.Props.ISizeUnit")], ["Flex", "number"], ["FlexBasis", Interface("Fable.Helpers.ReactNative.Props.ISizeUnit")], ["FlexDirection", "string"], ["FlexGrow", "number"], ["FlexShrink", "number"], ["FlexWrap", "string"], ["Height", Interface("Fable.Helpers.ReactNative.Props.ISizeUnit")], ["JustifyContent", "string"], ["Left", Interface("Fable.Helpers.ReactNative.Props.ISizeUnit")], ["Margin", Interface("Fable.Helpers.ReactNative.Props.ISizeUnit")], ["MarginBottom", Interface("Fable.Helpers.ReactNative.Props.ISizeUnit")], ["MarginEnd", Interface("Fable.Helpers.ReactNative.Props.ISizeUnit")], ["MarginHorizontal", Interface("Fable.Helpers.ReactNative.Props.ISizeUnit")], ["MarginLeft", Interface("Fable.Helpers.ReactNative.Props.ISizeUnit")], ["MarginRight", Interface("Fable.Helpers.ReactNative.Props.ISizeUnit")], ["MarginStart", Interface("Fable.Helpers.ReactNative.Props.ISizeUnit")], ["MarginTop", Interface("Fable.Helpers.ReactNative.Props.ISizeUnit")], ["MarginVertical", Interface("Fable.Helpers.ReactNative.Props.ISizeUnit")], ["MaxHeight", Interface("Fable.Helpers.ReactNative.Props.ISizeUnit")], ["MaxWidth", Interface("Fable.Helpers.ReactNative.Props.ISizeUnit")], ["MinHeight", Interface("Fable.Helpers.ReactNative.Props.ISizeUnit")], ["MinWidth", Interface("Fable.Helpers.ReactNative.Props.ISizeUnit")], ["Overflow", "string"], ["Padding", Interface("Fable.Helpers.ReactNative.Props.ISizeUnit")], ["PaddingBottom", Interface("Fable.Helpers.ReactNative.Props.ISizeUnit")], ["PaddingEnd", Interface("Fable.Helpers.ReactNative.Props.ISizeUnit")], ["PaddingHorizontal", Interface("Fable.Helpers.ReactNative.Props.ISizeUnit")], ["PaddingLeft", Interface("Fable.Helpers.ReactNative.Props.ISizeUnit")], ["PaddingRight", Interface("Fable.Helpers.ReactNative.Props.ISizeUnit")], ["PaddingStart", Interface("Fable.Helpers.ReactNative.Props.ISizeUnit")], ["PaddingTop", Interface("Fable.Helpers.ReactNative.Props.ISizeUnit")], ["PaddingVertical", Interface("Fable.Helpers.ReactNative.Props.ISizeUnit")], ["Position", "string"], ["Right", Interface("Fable.Helpers.ReactNative.Props.ISizeUnit")], ["Start", Interface("Fable.Helpers.ReactNative.Props.ISizeUnit")], ["Top", Interface("Fable.Helpers.ReactNative.Props.ISizeUnit")], ["Width", Interface("Fable.Helpers.ReactNative.Props.ISizeUnit")], ["ZIndex", "number"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNative.Props.FlexStyle", FlexStyle);
  const ViewStyle = __exports.ViewStyle = class ViewStyle {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.ViewStyle",
        interfaces: ["FSharpUnion", "System.IEquatable", "Fable.Helpers.ReactNative.Props.IViewStyle"],
        cases: [["BackfaceVisibility", "string"], ["BackgroundColor", "string"], ["BorderBottomColor", "string"], ["BorderBottomEndRadius", "number"], ["BorderBottomLeftRadius", "number"], ["BorderBottomRightRadius", "number"], ["BorderBottomStartRadius", "number"], ["BorderBottomWidth", "number"], ["BorderColor", "string"], ["BorderEndColor", "string"], ["BorderLeftColor", "string"], ["BorderLeftWidth", "number"], ["BorderRadius", "number"], ["BorderRightColor", "string"], ["BorderRightWidth", "number"], ["BorderStartColor", "string"], ["BorderStyle", "string"], ["BorderTopColor", "string"], ["BorderTopEndRadius", "number"], ["BorderTopLeftRadius", "number"], ["BorderTopRightRadius", "number"], ["BorderTopStartRadius", "number"], ["BorderTopWidth", "number"], ["BorderWidth", "number"], ["Opacity", "number"], ["ShadowColor", "string"], ["ShadowOffset", Any], ["ShadowOpacity", "number"], ["ShadowRadius", "number"], ["Elevation", "number"], ["TestID", "string"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNative.Props.ViewStyle", ViewStyle);
  const Insets = __exports.Insets = class Insets {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.Insets",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: [["Top", "number"], ["Left", "number"], ["Bottom", "number"], ["Right", "number"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

    CompareTo(other) {
      return compareUnions(this, other) | 0;
    }

  };
  setType("Fable.Helpers.ReactNative.Props.Insets", Insets);
  const Touchable = __exports.Touchable = class Touchable {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.Touchable",
        interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.ITouchable"],
        cases: [["OnTouchStart", _Function([Interface("Fable.Import.ReactNative.GestureResponderEvent"), Unit])], ["OnTouchMove", _Function([Interface("Fable.Import.ReactNative.GestureResponderEvent"), Unit])], ["OnTouchEnd", _Function([Interface("Fable.Import.ReactNative.GestureResponderEvent"), Unit])], ["OnTouchCancel", _Function([Interface("Fable.Import.ReactNative.GestureResponderEvent"), Unit])], ["OnTouchEndCapture", _Function([Interface("Fable.Import.ReactNative.GestureResponderEvent"), Unit])]]
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.Touchable", Touchable);
  const LayoutAnimationAnim = __exports.LayoutAnimationAnim = class LayoutAnimationAnim {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.LayoutAnimationAnim",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: [["Duration", "number"], ["Delay", "number"], ["SpringDamping", "number"], ["InitialVelocity", "number"], ["Type", "string"], ["Property", "string"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

    CompareTo(other) {
      return compareUnions(this, other) | 0;
    }

  };
  setType("Fable.Helpers.ReactNative.Props.LayoutAnimationAnim", LayoutAnimationAnim);
  const LayoutAnimationConfig = __exports.LayoutAnimationConfig = class LayoutAnimationConfig {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.LayoutAnimationConfig",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: [["Delay", "number"], ["Create", LayoutAnimationAnim], ["Update", LayoutAnimationAnim], ["Delete", LayoutAnimationAnim]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

    CompareTo(other) {
      return compareUnions(this, other) | 0;
    }

  };
  setType("Fable.Helpers.ReactNative.Props.LayoutAnimationConfig", LayoutAnimationConfig);
  const TextStyleIOS = __exports.TextStyleIOS = class TextStyleIOS {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.TextStyleIOS",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable", "Fable.Helpers.ReactNative.Props.ITextStyleIOS"],
        cases: [["LetterSpacing", "number"], ["TextDecorationColor", "string"], ["TextDecorationStyle", "string"], ["WritingDirection", "string"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

    CompareTo(other) {
      return compareUnions(this, other) | 0;
    }

  };
  setType("Fable.Helpers.ReactNative.Props.TextStyleIOS", TextStyleIOS);
  const TextStyleAndroid = __exports.TextStyleAndroid = class TextStyleAndroid {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.TextStyleAndroid",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable", "Fable.Helpers.ReactNative.Props.ITextStyleAndroid"],
        cases: [["TextAlignVertical", "string"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

    CompareTo(other) {
      return compareUnions(this, other) | 0;
    }

  };
  setType("Fable.Helpers.ReactNative.Props.TextStyleAndroid", TextStyleAndroid);
  const TextStyle = __exports.TextStyle = class TextStyle {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.TextStyle",
        interfaces: ["FSharpUnion", "System.IEquatable", "Fable.Helpers.ReactNative.Props.ITextStyle"],
        cases: [["Color", "string"], ["FontFamily", "string"], ["FontSize", "number"], ["FontStyle", "string"], ["FontWeight", "string"], ["LetterSpacing", "number"], ["LineHeight", "number"], ["TextAlign", "string"], ["TextDecorationLine", "string"], ["TextDecorationStyle", "string"], ["TextDecorationColor", "string"], ["TextShadowColor", "string"], ["TextShadowOffset", Any], ["TextShadowRadius", "number"], ["TestID", "string"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNative.Props.TextStyle", TextStyle);
  const TextPropertiesIOS = __exports.TextPropertiesIOS = class TextPropertiesIOS {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.TextPropertiesIOS",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable", "Fable.Helpers.ReactNative.Props.ITextPropertiesIOS"],
        cases: [["AllowFontScaling", "boolean"], ["SuppressHighlighting", "boolean"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

    CompareTo(other) {
      return compareUnions(this, other) | 0;
    }

  };
  setType("Fable.Helpers.ReactNative.Props.TextPropertiesIOS", TextPropertiesIOS);
  const TextProperties = __exports.TextProperties = class TextProperties {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.TextProperties",
        interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.ITextProperties"],
        cases: [["AllowFontScaling", "boolean"], ["LineBreakMode", "string"], ["NumberOfLines", "number"], ["OnLayout", _Function([Interface("Fable.Import.ReactNative.LayoutChangeEvent"), Unit])], ["OnPress", _Function([Unit, Unit])], ["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["TestID", "string"]]
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.TextProperties", TextProperties);

  const TextInput = __exports.TextInput = function (__exports) {
    const TextInputIOSProperties = __exports.TextInputIOSProperties = class TextInputIOSProperties {
      constructor(tag, data) {
        this.tag = tag | 0;
        this.data = data;
      }

      [_Symbol.reflection]() {
        return {
          type: "Fable.Helpers.ReactNative.Props.TextInput.TextInputIOSProperties",
          interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.ITextInputIOSProperties"],
          cases: [["ClearButtonMode", "string"], ["ClearTextOnFocus", "boolean"], ["EnablesReturnKeyAutomatically", "boolean"], ["OnKeyPress", _Function([Unit, Unit])], ["SelectionState", Any]]
        };
      }

    };
    setType("Fable.Helpers.ReactNative.Props.TextInput.TextInputIOSProperties", TextInputIOSProperties);
    const TextInputAndroidProperties = __exports.TextInputAndroidProperties = class TextInputAndroidProperties {
      constructor(tag, data) {
        this.tag = tag | 0;
        this.data = data;
      }

      [_Symbol.reflection]() {
        return {
          type: "Fable.Helpers.ReactNative.Props.TextInput.TextInputAndroidProperties",
          interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable", "Fable.Helpers.ReactNative.Props.ITextInputAndroidProperties"],
          cases: [["NumberOfLines", "number"], ["ReturnKeyLabel", "string"], ["TextAlign", "string"], ["TextAlignVertical", "string"], ["UnderlineColorAndroid", "string"]]
        };
      }

      Equals(other) {
        return this === other || this.tag === other.tag && equals(this.data, other.data);
      }

      CompareTo(other) {
        return compareUnions(this, other) | 0;
      }

    };
    setType("Fable.Helpers.ReactNative.Props.TextInput.TextInputAndroidProperties", TextInputAndroidProperties);
    const TextInputProperties = __exports.TextInputProperties = class TextInputProperties {
      constructor(tag, data) {
        this.tag = tag | 0;
        this.data = data;
      }

      [_Symbol.reflection]() {
        return {
          type: "Fable.Helpers.ReactNative.Props.TextInput.TextInputProperties",
          interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.ITextInputProperties"],
          cases: [["AutoCapitalize", "string"], ["AutoCorrect", "boolean"], ["AutoFocus", "boolean"], ["BlurOnSubmit", "boolean"], ["DefaultValue", "string"], ["Editable", "boolean"], ["KeyboardType", "string"], ["MaxLength", "number"], ["Multiline", "boolean"], ["OnBlur", _Function([Unit, Unit])], ["OnChange", _Function([Any, Unit])], ["OnChangeText", _Function(["string", Unit])], ["OnEndEditing", _Function([Any, Unit])], ["OnFocus", _Function([Unit, Unit])], ["OnLayout", _Function([Any, Unit])], ["OnSelectionChange", _Function([Unit, Unit])], ["OnSubmitEditing", _Function([Any, Unit])], ["Password", "boolean"], ["Placeholder", "string"], ["PlaceholderTextColor", "string"], ["ReturnKeyType", "string"], ["SecureTextEntry", "boolean"], ["SelectTextOnFocus", "boolean"], ["SelectionColor", "string"], ["Style", makeGeneric(List, {
            T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
          })], ["TestID", "string"], ["Value", "string"]]
        };
      }

    };
    setType("Fable.Helpers.ReactNative.Props.TextInput.TextInputProperties", TextInputProperties);
    return __exports;
  }({});

  const Toolbar = __exports.Toolbar = function (__exports) {
    const ToolbarAndroidProperties = __exports.ToolbarAndroidProperties = class ToolbarAndroidProperties {
      constructor(tag, data) {
        this.tag = tag | 0;
        this.data = data;
      }

      [_Symbol.reflection]() {
        return {
          type: "Fable.Helpers.ReactNative.Props.Toolbar.ToolbarAndroidProperties",
          interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.IToolbarAndroidProperties"],
          cases: [["Actions", _Array(Any)], ["ContentInsetEnd", "number"], ["ContentInsetStart", "number"], ["Logo", Interface("Fable.Helpers.ReactNative.Props.IImageSource")], ["NavIcon", Interface("Fable.Helpers.ReactNative.Props.IImageSource")], ["OnIconClicked", _Function([Unit, Unit])], ["OverflowIcon", Interface("Fable.Helpers.ReactNative.Props.IImageSource")], ["Rtl", "boolean"], ["Style", makeGeneric(List, {
            T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
          })], ["Subtitle", "string"], ["SubtitleColor", "string"], ["TestID", "string"], ["Title", "string"], ["TitleColor", "string"], ["Ref", _Function([Interface("Fable.Import.ReactNative.ToolbarAndroidStatic"), Unit])]]
        };
      }

    };
    setType("Fable.Helpers.ReactNative.Props.Toolbar.ToolbarAndroidProperties", ToolbarAndroidProperties);
    return __exports;
  }({});

  const GestureResponderHandlers = __exports.GestureResponderHandlers = class GestureResponderHandlers {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.GestureResponderHandlers",
        interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.IGestureResponderHandlers"],
        cases: [["OnStartShouldSetResponder", _Function([Interface("Fable.Import.ReactNative.GestureResponderEvent"), "boolean"])], ["OnMoveShouldSetResponder", _Function([Interface("Fable.Import.ReactNative.GestureResponderEvent"), "boolean"])], ["OnResponderGrant", _Function([Interface("Fable.Import.ReactNative.GestureResponderEvent"), Unit])], ["OnResponderReject", _Function([Interface("Fable.Import.ReactNative.GestureResponderEvent"), Unit])], ["OnResponderMove", _Function([Interface("Fable.Import.ReactNative.GestureResponderEvent"), Unit])], ["OnResponderRelease", _Function([Interface("Fable.Import.ReactNative.GestureResponderEvent"), Unit])], ["OnResponderTerminationRequest", _Function([Interface("Fable.Import.ReactNative.GestureResponderEvent"), "boolean"])], ["OnResponderTerminate", _Function([Interface("Fable.Import.ReactNative.GestureResponderEvent"), Unit])], ["OnStartShouldSetResponderCapture", _Function([Interface("Fable.Import.ReactNative.GestureResponderEvent"), "boolean"])], ["OnMoveShouldSetResponderCapture", _Function([Interface("Fable.Import.ReactNative.GestureResponderEvent"), Unit])]]
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.GestureResponderHandlers", GestureResponderHandlers);
  const ViewPropertiesIOS = __exports.ViewPropertiesIOS = class ViewPropertiesIOS {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.ViewPropertiesIOS",
        interfaces: ["FSharpUnion", "System.IEquatable", "Fable.Helpers.ReactNative.Props.IViewPropertiesIOS"],
        cases: [["AccessibilityTraits", Any], ["ShouldRasterizeIOS", "boolean"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNative.Props.ViewPropertiesIOS", ViewPropertiesIOS);
  const ViewPropertiesAndroid = __exports.ViewPropertiesAndroid = class ViewPropertiesAndroid {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.ViewPropertiesAndroid",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable", "Fable.Helpers.ReactNative.Props.IViewPropertiesAndroid"],
        cases: [["AccessibilityComponentType", "string"], ["AccessibilityLiveRegion", "string"], ["Collapsable", "boolean"], ["ImportantForAccessibility", "string"], ["NeedsOffscreenAlphaCompositing", "boolean"], ["RenderToHardwareTextureAndroid", "boolean"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

    CompareTo(other) {
      return compareUnions(this, other) | 0;
    }

  };
  setType("Fable.Helpers.ReactNative.Props.ViewPropertiesAndroid", ViewPropertiesAndroid);
  const ViewProperties = __exports.ViewProperties = class ViewProperties {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.ViewProperties",
        interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.IViewProperties"],
        cases: [["AccessibilityLabel", "string"], ["Accessible", "boolean"], ["HitSlop", Any], ["OnAcccessibilityTap", _Function([Unit, Unit])], ["OnLayout", _Function([Interface("Fable.Import.ReactNative.LayoutChangeEvent"), Unit])], ["OnMagicTap", _Function([Unit, Unit])], ["PointerEvents", "string"], ["RemoveClippedSubviews", "boolean"], ["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["TestID", "string"]]
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.ViewProperties", ViewProperties);
  const ViewPagerAndroidProperties = __exports.ViewPagerAndroidProperties = class ViewPagerAndroidProperties {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.ViewPagerAndroidProperties",
        interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.IViewPagerAndroidProperties"],
        cases: [["InitialPage", "number"], ["ScrollEnabled", "boolean"], ["OnPageScroll", _Function([Interface("Fable.Import.ReactNative.NativeSyntheticEvent"), Unit])], ["OnPageSelected", _Function([Interface("Fable.Import.ReactNative.NativeSyntheticEvent"), Unit])], ["OnPageScrollStateChanged", _Function(["string", Unit])], ["KeyboardDismissMode", "string"], ["PageMargin", "number"], ["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["Ref", _Function([Any, Unit])]]
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.ViewPagerAndroidProperties", ViewPagerAndroidProperties);
  const KeyboardAvoidingViewProps = __exports.KeyboardAvoidingViewProps = class KeyboardAvoidingViewProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.KeyboardAvoidingViewProps",
        interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.IKeyboardAvoidingViewProps"],
        cases: [["Behavior", "string"], ["KeyboardVerticalOffset", "number"], ["Ref", _Function([Any, Unit])]]
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.KeyboardAvoidingViewProps", KeyboardAvoidingViewProps);
  const SegmentedControlIOSProperties = __exports.SegmentedControlIOSProperties = class SegmentedControlIOSProperties {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.SegmentedControlIOSProperties",
        interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.ISegmentedControlIOSProperties"],
        cases: [["Enabled", "boolean"], ["Momentary", "boolean"], ["OnChange", _Function([Interface("Fable.Import.ReactNative.NativeSyntheticEvent"), Unit])], ["OnValueChange", _Function(["string", Unit])], ["SelectedIndex", "number"], ["TintColor", "string"], ["Values", _Array("string")], ["Ref", _Function([Interface("Fable.Import.ReactNative.SegmentedControlIOSStatic"), Unit])]]
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.SegmentedControlIOSProperties", SegmentedControlIOSProperties);
  const NavigatorIOSProperties = __exports.NavigatorIOSProperties = class NavigatorIOSProperties {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.NavigatorIOSProperties",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["BarTintColor", "string"], ["InitialRoute", Interface("Fable.Import.ReactNative.Route")], ["ItemWrapperStyle", makeGeneric(List, {
          T: ViewStyle
        })], ["NavigationBarHidden", "boolean"], ["ShadowHidden", "boolean"], ["TintColor", "string"], ["TitleTextColor", "string"], ["Translucent", "boolean"], ["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNative.Props.NavigatorIOSProperties", NavigatorIOSProperties);

  const ActivityIndicator = __exports.ActivityIndicator = function (__exports) {
    const ActivityIndicatorProperties = __exports.ActivityIndicatorProperties = class ActivityIndicatorProperties {
      constructor(tag, data) {
        this.tag = tag | 0;
        this.data = data;
      }

      [_Symbol.reflection]() {
        return {
          type: "Fable.Helpers.ReactNative.Props.ActivityIndicator.ActivityIndicatorProperties",
          interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.IViewProperties"],
          cases: [["Animating", "boolean"], ["Color", "string"], ["HidesWhenStopped", "boolean"], ["Size", "string"], ["Style", makeGeneric(List, {
            T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
          })], ["Ref", _Function([Interface("Fable.Import.ReactNative.ActivityIndicatorStatic"), Unit])]]
        };
      }

    };
    setType("Fable.Helpers.ReactNative.Props.ActivityIndicator.ActivityIndicatorProperties", ActivityIndicatorProperties);
    const ActivityIndicatorIOSProperties = __exports.ActivityIndicatorIOSProperties = class ActivityIndicatorIOSProperties {
      constructor(tag, data) {
        this.tag = tag | 0;
        this.data = data;
      }

      [_Symbol.reflection]() {
        return {
          type: "Fable.Helpers.ReactNative.Props.ActivityIndicator.ActivityIndicatorIOSProperties",
          interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.IViewProperties"],
          cases: [["Animating", "boolean"], ["Color", "string"], ["HidesWhenStopped", "boolean"], ["OnLayout", _Function([Any, Unit])], ["Size", "string"], ["Style", makeGeneric(List, {
            T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
          })], ["Ref", _Function([Interface("Fable.Import.ReactNative.ActivityIndicatorIOSStatic"), Unit])]]
        };
      }

    };
    setType("Fable.Helpers.ReactNative.Props.ActivityIndicator.ActivityIndicatorIOSProperties", ActivityIndicatorIOSProperties);
    return __exports;
  }({});

  const DatePickerIOSProperties = __exports.DatePickerIOSProperties = class DatePickerIOSProperties {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.DatePickerIOSProperties",
        interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.IDatePickerIOSProperties"],
        cases: [["Date", Date], ["MaximumDate", Date], ["MinimumDate", Date], ["MinuteInterval", "number"], ["Mode", "string"], ["OnDateChange", _Function([Date, Unit])], ["TimeZoneOffsetInMinutes", "number"], ["Ref", _Function([Interface("Fable.Import.ReactNative.DatePickerIOSStatic"), Unit])]]
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.DatePickerIOSProperties", DatePickerIOSProperties);
  const DrawerLayoutAndroidProperties = __exports.DrawerLayoutAndroidProperties = class DrawerLayoutAndroidProperties {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.DrawerLayoutAndroidProperties",
        interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.IDrawerLayoutAndroidProperties"],
        cases: [["DrawerBackgroundColor", "string"], ["DrawerLockMode", "string"], ["DrawerPosition", Interface("Fable.Import.ReactNative.DrawerLayoutAndroidPosition")], ["DrawerWidth", "number"], ["KeyboardDismissMode", "string"], ["OnDrawerClose", _Function([Unit, Unit])], ["OnDrawerOpen", _Function([Unit, Unit])], ["OnDrawerSlide", _Function([Interface("Fable.Import.ReactNative.DrawerSlideEvent"), Unit])], ["OnDrawerStateChanged", _Function(["string", Unit])], ["RenderNavigationView", _Function([Unit, Any])], ["StatusBarBackgroundColor", Any], ["Ref", _Function([Any, Unit])]]
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.DrawerLayoutAndroidProperties", DrawerLayoutAndroidProperties);

  const Picker = __exports.Picker = function (__exports) {
    const PickerIOSItemProperties = __exports.PickerIOSItemProperties = class PickerIOSItemProperties {
      constructor(tag, data) {
        this.tag = tag | 0;
        this.data = data;
      }

      [_Symbol.reflection]() {
        return {
          type: "Fable.Helpers.ReactNative.Props.Picker.PickerIOSItemProperties",
          interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
          cases: [["Value", Any], ["Label", "string"]]
        };
      }

      Equals(other) {
        return this === other || this.tag === other.tag && equals(this.data, other.data);
      }

      CompareTo(other) {
        return compareUnions(this, other) | 0;
      }

    };
    setType("Fable.Helpers.ReactNative.Props.Picker.PickerIOSItemProperties", PickerIOSItemProperties);
    const PickerItemProperties = __exports.PickerItemProperties = class PickerItemProperties {
      constructor(tag, data) {
        this.tag = tag | 0;
        this.data = data;
      }

      [_Symbol.reflection]() {
        return {
          type: "Fable.Helpers.ReactNative.Props.Picker.PickerItemProperties",
          interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
          cases: [["Label", "string"], ["Value", "string"], ["Color", "string"], ["TestID", "string"]]
        };
      }

      Equals(other) {
        return this === other || this.tag === other.tag && equals(this.data, other.data);
      }

      CompareTo(other) {
        return compareUnions(this, other) | 0;
      }

    };
    setType("Fable.Helpers.ReactNative.Props.Picker.PickerItemProperties", PickerItemProperties);
    const PickerPropertiesIOS = __exports.PickerPropertiesIOS = class PickerPropertiesIOS {
      constructor(tag, data) {
        this.tag = tag | 0;
        this.data = data;
      }

      [_Symbol.reflection]() {
        return {
          type: "Fable.Helpers.ReactNative.Props.Picker.PickerPropertiesIOS",
          interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.IPickerProperties"],
          cases: [["ItemStyle", makeGeneric(List, {
            T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
          })], ["Ref", _Function([Any, Unit])]]
        };
      }

    };
    setType("Fable.Helpers.ReactNative.Props.Picker.PickerPropertiesIOS", PickerPropertiesIOS);
    const PickerPropertiesAndroid = __exports.PickerPropertiesAndroid = class PickerPropertiesAndroid {
      constructor(tag, data) {
        this.tag = tag | 0;
        this.data = data;
      }

      [_Symbol.reflection]() {
        return {
          type: "Fable.Helpers.ReactNative.Props.Picker.PickerPropertiesAndroid",
          interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.IPickerProperties"],
          cases: [["Enabled", "boolean"], ["Mode", "string"], ["Prompt", "string"], ["Ref", _Function([Any, Unit])]]
        };
      }

    };
    setType("Fable.Helpers.ReactNative.Props.Picker.PickerPropertiesAndroid", PickerPropertiesAndroid);
    const PickerProperties = __exports.PickerProperties = class PickerProperties {
      constructor(tag, data) {
        this.tag = tag | 0;
        this.data = data;
      }

      [_Symbol.reflection]() {
        return {
          type: "Fable.Helpers.ReactNative.Props.Picker.PickerProperties",
          interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.IPickerProperties"],
          cases: [["OnValueChange", _Function(["string", "number", Unit])], ["SelectedValue", "string"], ["Style", makeGeneric(List, {
            T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
          })], ["TestId", "string"], ["Ref", _Function([Interface("Fable.Import.ReactNative.PickerStatic"), Unit])]]
        };
      }

    };
    setType("Fable.Helpers.ReactNative.Props.Picker.PickerProperties", PickerProperties);
    const PickerIOSProperties = __exports.PickerIOSProperties = class PickerIOSProperties {
      constructor(tag, data) {
        this.tag = tag | 0;
        this.data = data;
      }

      [_Symbol.reflection]() {
        return {
          type: "Fable.Helpers.ReactNative.Props.Picker.PickerIOSProperties",
          interfaces: ["FSharpUnion", "System.IEquatable", "Fable.Helpers.ReactNative.Props.IPickerProperties"],
          cases: [["ItemStyle", makeGeneric(List, {
            T: ViewStyle
          })]]
        };
      }

      Equals(other) {
        return this === other || this.tag === other.tag && equals(this.data, other.data);
      }

    };
    setType("Fable.Helpers.ReactNative.Props.Picker.PickerIOSProperties", PickerIOSProperties);
    return __exports;
  }({});

  const ProgressBar = __exports.ProgressBar = function (__exports) {
    const ProgressBarAndroidProperties = __exports.ProgressBarAndroidProperties = class ProgressBarAndroidProperties {
      constructor(tag, data) {
        this.tag = tag | 0;
        this.data = data;
      }

      [_Symbol.reflection]() {
        return {
          type: "Fable.Helpers.ReactNative.Props.ProgressBar.ProgressBarAndroidProperties",
          interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.IProgressBarAndroidProperties"],
          cases: [["Style", makeGeneric(List, {
            T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
          })], ["StyleAttr", "string"], ["Indeterminate", "boolean"], ["Progress", "number"], ["Color", "string"], ["TestID", "string"], ["Ref", _Function([Interface("Fable.Import.ReactNative.ProgressBarAndroidStatic"), Unit])]]
        };
      }

    };
    setType("Fable.Helpers.ReactNative.Props.ProgressBar.ProgressBarAndroidProperties", ProgressBarAndroidProperties);
    const ProgressViewIOSProperties = __exports.ProgressViewIOSProperties = class ProgressViewIOSProperties {
      constructor(tag, data) {
        this.tag = tag | 0;
        this.data = data;
      }

      [_Symbol.reflection]() {
        return {
          type: "Fable.Helpers.ReactNative.Props.ProgressBar.ProgressViewIOSProperties",
          interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.IProgressViewIOSProperties"],
          cases: [["Style", makeGeneric(List, {
            T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
          })], ["ProgressViewStyle", "string"], ["Progress", "number"], ["ProgressTintColor", "string"], ["TrackTintColor", "string"], ["ProgressImage", Interface("Fable.Helpers.ReactNative.Props.IImageSource")], ["TrackImage", Interface("Fable.Helpers.ReactNative.Props.IImageSource")], ["Ref", _Function([Interface("Fable.Import.ReactNative.ProgressViewIOSStatic"), Unit])]]
        };
      }

    };
    setType("Fable.Helpers.ReactNative.Props.ProgressBar.ProgressViewIOSProperties", ProgressViewIOSProperties);
    return __exports;
  }({});

  const RefreshControlPropertiesIOS = __exports.RefreshControlPropertiesIOS = class RefreshControlPropertiesIOS {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.RefreshControlPropertiesIOS",
        interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.IRefreshControlProperties"],
        cases: [["TintColor", "string"], ["Title", "string"], ["TitleColor", "string"], ["Ref", _Function([Any, Unit])]]
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.RefreshControlPropertiesIOS", RefreshControlPropertiesIOS);
  const RefreshControlPropertiesAndroid = __exports.RefreshControlPropertiesAndroid = class RefreshControlPropertiesAndroid {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.RefreshControlPropertiesAndroid",
        interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.IRefreshControlProperties"],
        cases: [["Colors", _Array("string")], ["Enabled", "boolean"], ["ProgressBackgroundColor", "string"], ["Size", "number"], ["ProgressViewOffset", "number"], ["Ref", _Function([Any, Unit])]]
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.RefreshControlPropertiesAndroid", RefreshControlPropertiesAndroid);
  const RefreshControlProperties = __exports.RefreshControlProperties = class RefreshControlProperties {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.RefreshControlProperties",
        interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.IRefreshControlProperties"],
        cases: [["OnRefresh", _Function([Unit, Unit])], ["Refreshing", "boolean"], ["Ref", _Function([Interface("Fable.Import.ReactNative.RefreshControlStatic"), Unit])]]
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.RefreshControlProperties", RefreshControlProperties);
  const SliderIOSProperties = __exports.SliderIOSProperties = class SliderIOSProperties {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.SliderIOSProperties",
        interfaces: ["FSharpUnion", "System.IEquatable", "Fable.Helpers.ReactNative.Props.ISliderIOSProperties"],
        cases: [["TrackImage", Interface("Fable.Helpers.ReactNative.Props.IImageSource")], ["MinimumTrackImage", Interface("Fable.Helpers.ReactNative.Props.IImageSource")], ["MaximumTrackImage", Interface("Fable.Helpers.ReactNative.Props.IImageSource")], ["ThumbImage", Interface("Fable.Helpers.ReactNative.Props.IImageSource")]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNative.Props.SliderIOSProperties", SliderIOSProperties);
  const SliderAndroidProperties = __exports.SliderAndroidProperties = class SliderAndroidProperties {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.SliderAndroidProperties",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable", "Fable.Helpers.ReactNative.Props.ISliderAndroidProperties"],
        cases: [["ThumbTintColor", "string"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

    CompareTo(other) {
      return compareUnions(this, other) | 0;
    }

  };
  setType("Fable.Helpers.ReactNative.Props.SliderAndroidProperties", SliderAndroidProperties);
  const SliderProperties = __exports.SliderProperties = class SliderProperties {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.SliderProperties",
        interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.ISliderProperties"],
        cases: [["Disabled", "boolean"], ["MaximumTrackTintColor", "string"], ["MaximumValue", "number"], ["MinimumTrackTintColor", "string"], ["MinimumValue", "number"], ["OnSlidingComplete", _Function(["number", Unit])], ["OnValueChange", _Function(["number", Unit])], ["Step", "number"], ["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["TestID", "string"], ["Value", "number"], ["Ref", _Function([Interface("Fable.Import.ReactNative.SliderStatic"), Unit])]]
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.SliderProperties", SliderProperties);
  const SwitchProperties = __exports.SwitchProperties = class SwitchProperties {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.SwitchProperties",
        interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.ISwitchProperties"],
        cases: [["Disabled", "boolean"], ["OnTintColor", "string"], ["OnValueChange", _Function(["boolean", Unit])], ["ThumbTintColor", "string"], ["TintColor", "string"], ["Value", "boolean"], ["TestID", "string"], ["Ref", _Function([Interface("Fable.Import.ReactNative.SwitchStatic"), Unit])]]
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.SwitchProperties", SwitchProperties);
  const ImageStyle = __exports.ImageStyle = class ImageStyle {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.ImageStyle",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable", "Fable.Helpers.ReactNative.Props.IImageStyle"],
        cases: [["ResizeMode", "string"], ["BackfaceVisibility", "string"], ["BorderBottomLeftRadius", "number"], ["BorderBottomRightRadius", "number"], ["BackgroundColor", "string"], ["BorderColor", "string"], ["BorderWidth", "number"], ["BorderRadius", "number"], ["BorderTopLeftRadius", "number"], ["BorderTopRightRadius", "number"], ["Overflow", "string"], ["OverlayColor", "string"], ["TintColor", "string"], ["Opacity", "number"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

    CompareTo(other) {
      return compareUnions(this, other) | 0;
    }

  };
  setType("Fable.Helpers.ReactNative.Props.ImageStyle", ImageStyle);
  const ImagePropertiesIOS = __exports.ImagePropertiesIOS = class ImagePropertiesIOS {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.ImagePropertiesIOS",
        interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.IImagePropertiesIOS"],
        cases: [["AccessibilityLabel", "string"], ["Accessible", "boolean"], ["CapInsets", Insets], ["DefaultSource", Interface("Fable.Helpers.ReactNative.Props.IImageSource")], ["OnError", _Function([Any, Unit])], ["OnProgress", _Function([Unit, Unit])]]
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.ImagePropertiesIOS", ImagePropertiesIOS);
  const ImageProperties = __exports.ImageProperties = class ImageProperties {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.ImageProperties",
        interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.IImageProperties"],
        cases: [["OnLayout", _Function([Interface("Fable.Import.ReactNative.LayoutChangeEvent"), Unit])], ["OnLoad", _Function([Unit, Unit])], ["OnLoadEnd", _Function([Unit, Unit])], ["OnLoadStart", _Function([Unit, Unit])], ["ResizeMode", "string"], ["Source", Interface("Fable.Helpers.ReactNative.Props.IImageSource")], ["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["TestID", "string"]]
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.ImageProperties", ImageProperties);
  const MapViewAnnotation = __exports.MapViewAnnotation = class MapViewAnnotation {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.MapViewAnnotation",
        interfaces: ["FSharpUnion"],
        cases: [["Latitude", "number"], ["Longitude", "number"], ["AnimateDrop", "boolean"], ["Title", "string"], ["Subtitle", "string"], ["HasLeftCallout", "boolean"], ["HasRightCallout", "boolean"], ["OnLeftCalloutPress", _Function([Unit, Unit])], ["OnRightCalloutPress", _Function([Unit, Unit])], ["Id", "string"]]
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.MapViewAnnotation", MapViewAnnotation);
  const MapViewRegion = __exports.MapViewRegion = class MapViewRegion {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.MapViewRegion",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: [["Latitude", "number"], ["Longitude", "number"], ["LatitudeDelta", "number"], ["LongitudeDelta", "number"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

    CompareTo(other) {
      return compareUnions(this, other) | 0;
    }

  };
  setType("Fable.Helpers.ReactNative.Props.MapViewRegion", MapViewRegion);
  const MapViewOverlay = __exports.MapViewOverlay = class MapViewOverlay {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.MapViewOverlay",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Coordinates", _Array(Any)], ["LineWidth", "number"], ["StrokeColor", Any], ["FillColor", Any], ["Id", "string"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNative.Props.MapViewOverlay", MapViewOverlay);
  const MapViewPropertiesIOS = __exports.MapViewPropertiesIOS = class MapViewPropertiesIOS {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.MapViewPropertiesIOS",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["ShowsPointsOfInterest", "boolean"], ["Annotations", _Array(MapViewAnnotation)], ["FollowUserLocation", "boolean"], ["LegalLabelInsets", Insets], ["MapType", "string"], ["MaxDelta", "number"], ["MinDelta", "number"], ["Overlays", _Array(MapViewOverlay)], ["ShowsCompass", "boolean"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNative.Props.MapViewPropertiesIOS", MapViewPropertiesIOS);
  const MapViewPropertiesAndroid = __exports.MapViewPropertiesAndroid = class MapViewPropertiesAndroid {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.MapViewPropertiesAndroid",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable", "Fable.Helpers.ReactNative.Props.IMapViewPropertiesAndroid"],
        cases: [["Active", "boolean"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

    CompareTo(other) {
      return compareUnions(this, other) | 0;
    }

  };
  setType("Fable.Helpers.ReactNative.Props.MapViewPropertiesAndroid", MapViewPropertiesAndroid);
  const MapViewProperties = __exports.MapViewProperties = class MapViewProperties {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.MapViewProperties",
        interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.IMapViewProperties"],
        cases: [["OnAnnotationPress", _Function([Unit, Unit])], ["OnRegionChange", _Function([MapViewRegion, Unit])], ["OnRegionChangeComplete", _Function([MapViewRegion, Unit])], ["PitchEnabled", "boolean"], ["Region", MapViewRegion], ["RotateEnabled", "boolean"], ["ScrollEnabled", "boolean"], ["ShowsUserLocation", "boolean"], ["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["ZoomEnabled", "boolean"], ["Ref", _Function([Any, Unit])]]
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.MapViewProperties", MapViewProperties);
  const ModalProperties = __exports.ModalProperties = class ModalProperties {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.ModalProperties",
        interfaces: ["FSharpUnion"],
        cases: [["Animated", "boolean"], ["AnimationType", "string"], ["Transparent", "boolean"], ["Visible", "boolean"], ["OnRequestClose", _Function([Unit, Unit])], ["OnShow", _Function([Interface("Fable.Import.ReactNative.NativeSyntheticEvent"), Unit])]]
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.ModalProperties", ModalProperties);
  const ButtonProperties = __exports.ButtonProperties = class ButtonProperties {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.ButtonProperties",
        interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.IButtonProperties"],
        cases: [["Title", "string"], ["OnPress", _Function([Unit, Unit])], ["Disabled", "boolean"], ["Color", "string"], ["TestID", "string"], ["HasTVPreferredFocus", "boolean"]]
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.ButtonProperties", ButtonProperties);
  const TouchableWithoutFeedbackAndroidProperties = __exports.TouchableWithoutFeedbackAndroidProperties = class TouchableWithoutFeedbackAndroidProperties {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.TouchableWithoutFeedbackAndroidProperties",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable", "Fable.Helpers.ReactNative.Props.ITouchableWithoutFeedbackAndroidProperties"],
        cases: [["AccessibilityComponentType", "string"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

    CompareTo(other) {
      return compareUnions(this, other) | 0;
    }

  };
  setType("Fable.Helpers.ReactNative.Props.TouchableWithoutFeedbackAndroidProperties", TouchableWithoutFeedbackAndroidProperties);
  const TouchableWithoutFeedbackIOSProperties = __exports.TouchableWithoutFeedbackIOSProperties = class TouchableWithoutFeedbackIOSProperties {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.TouchableWithoutFeedbackIOSProperties",
        interfaces: ["FSharpUnion", "System.IEquatable", "Fable.Helpers.ReactNative.Props.ITouchableWithoutFeedbackIOSProperties"],
        cases: [["AccessibilityTraits", Any]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNative.Props.TouchableWithoutFeedbackIOSProperties", TouchableWithoutFeedbackIOSProperties);
  const TouchableWithoutFeedbackProperties = __exports.TouchableWithoutFeedbackProperties = class TouchableWithoutFeedbackProperties {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.TouchableWithoutFeedbackProperties",
        interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.ITouchableWithoutFeedbackProperties"],
        cases: [["Accessible", "boolean"], ["DelayLongPress", "number"], ["DelayPressIn", "number"], ["DelayPressOut", "number"], ["Disabled", "boolean"], ["HitSlop", Any], ["OnLayout", _Function([Interface("Fable.Import.ReactNative.LayoutChangeEvent"), Unit])], ["OnLongPress", _Function([Unit, Unit])], ["OnPress", _Function([Unit, Unit])], ["OnPressIn", _Function([Unit, Unit])], ["OnPressOut", _Function([Unit, Unit])], ["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["PressRetentionOffset", Any]]
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.TouchableWithoutFeedbackProperties", TouchableWithoutFeedbackProperties);
  const TouchableHighlightProperties = __exports.TouchableHighlightProperties = class TouchableHighlightProperties {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.TouchableHighlightProperties",
        interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.ITouchableHighlightProperties"],
        cases: [["ActiveOpacity", "number"], ["OnHideUnderlay", _Function([Unit, Unit])], ["OnShowUnderlay", _Function([Unit, Unit])], ["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["UnderlayColor", "string"]]
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.TouchableHighlightProperties", TouchableHighlightProperties);
  const TouchableOpacityProperties = __exports.TouchableOpacityProperties = class TouchableOpacityProperties {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.TouchableOpacityProperties",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable", "Fable.Helpers.ReactNative.Props.ITouchableOpacityProperties"],
        cases: [["ActiveOpacity", "number"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

    CompareTo(other) {
      return compareUnions(this, other) | 0;
    }

  };
  setType("Fable.Helpers.ReactNative.Props.TouchableOpacityProperties", TouchableOpacityProperties);
  const TouchableNativeFeedbackProperties = __exports.TouchableNativeFeedbackProperties = class TouchableNativeFeedbackProperties {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.TouchableNativeFeedbackProperties",
        interfaces: ["FSharpUnion", "System.IEquatable", "Fable.Helpers.ReactNative.Props.ITouchableNativeFeedbackProperties"],
        cases: [["Background", Any]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNative.Props.TouchableNativeFeedbackProperties", TouchableNativeFeedbackProperties);
  const NavigationBarRouteMapper = __exports.NavigationBarRouteMapper = class NavigationBarRouteMapper {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.NavigationBarRouteMapper",
        interfaces: ["FSharpUnion"],
        cases: [["Title", _Function([Interface("Fable.Import.ReactNative.Route"), Interface("Fable.Import.ReactNative.NavigatorStatic"), "number", Interface("Fable.Import.ReactNative.NavState"), Interface("Fable.Import.React.ReactElement")])], ["LeftButton", _Function([Interface("Fable.Import.ReactNative.Route"), Interface("Fable.Import.ReactNative.NavigatorStatic"), "number", Interface("Fable.Import.ReactNative.NavState"), Interface("Fable.Import.React.ReactElement")])], ["RightButton", _Function([Interface("Fable.Import.ReactNative.Route"), Interface("Fable.Import.ReactNative.NavigatorStatic"), "number", Interface("Fable.Import.ReactNative.NavState"), Interface("Fable.Import.React.ReactElement")])]]
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.NavigationBarRouteMapper", NavigationBarRouteMapper);
  const NavigationBarProperties = __exports.NavigationBarProperties = class NavigationBarProperties {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.NavigationBarProperties",
        interfaces: ["FSharpUnion"],
        cases: [["Navigator", Interface("Fable.Import.ReactNative.NavigatorStatic")], ["RouteMapper", NavigationBarRouteMapper], ["NavState", Interface("Fable.Import.ReactNative.NavState")], ["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })]]
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.NavigationBarProperties", NavigationBarProperties);
  const NavigatorProperties = __exports.NavigatorProperties = class NavigatorProperties {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.NavigatorProperties",
        interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.INavigatorProperties"],
        cases: [["ConfigureScene", _Function([Interface("Fable.Import.ReactNative.Route"), _Array(Interface("Fable.Import.ReactNative.Route")), Interface("Fable.Import.ReactNative.SceneConfig")])], ["InitialRoute", Interface("Fable.Import.ReactNative.Route")], ["InitialRouteStack", _Array(Interface("Fable.Import.ReactNative.Route"))], ["NavigationBar", Interface("Fable.Import.React.ReactElement")], ["Navigator", Interface("Fable.Import.ReactNative.NavigatorStatic")], ["OnDidFocus", _Function([Unit, Unit])], ["OnWillFocus", _Function([Unit, Unit])], ["RenderScene", _Function([Interface("Fable.Import.ReactNative.Route"), Interface("Fable.Import.ReactNative.NavigatorStatic"), Interface("Fable.Import.React.ReactElement")])], ["SceneStyle", makeGeneric(List, {
          T: ViewStyle
        })], ["DebugOverlay", "boolean"]]
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.NavigatorProperties", NavigatorProperties);

  const ToolBar = __exports.ToolBar = function (__exports) {
    const TabBarItemProperties = __exports.TabBarItemProperties = class TabBarItemProperties {
      constructor(tag, data) {
        this.tag = tag | 0;
        this.data = data;
      }

      [_Symbol.reflection]() {
        return {
          type: "Fable.Helpers.ReactNative.Props.ToolBar.TabBarItemProperties",
          interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.IViewProperties"],
          cases: [["Badge", Any], ["Icon", Any], ["OnPress", _Function([Unit, Unit])], ["Selected", "boolean"], ["SelectedIcon", Any], ["Style", makeGeneric(List, {
            T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
          })], ["SystemIcon", "string"], ["Title", "string"], ["Ref", _Function([Any, Unit])]]
        };
      }

    };
    setType("Fable.Helpers.ReactNative.Props.ToolBar.TabBarItemProperties", TabBarItemProperties);
    const TabBarIOSProperties = __exports.TabBarIOSProperties = class TabBarIOSProperties {
      constructor(tag, data) {
        this.tag = tag | 0;
        this.data = data;
      }

      [_Symbol.reflection]() {
        return {
          type: "Fable.Helpers.ReactNative.Props.ToolBar.TabBarIOSProperties",
          interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.IViewProperties"],
          cases: [["BarTintColor", "string"], ["Style", makeGeneric(List, {
            T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
          })], ["TintColor", "string"], ["Translucent", "boolean"], ["UnselectedTintColor", "string"], ["Ref", _Function([Any, Unit])]]
        };
      }

    };
    setType("Fable.Helpers.ReactNative.Props.ToolBar.TabBarIOSProperties", TabBarIOSProperties);
    return __exports;
  }({});

  const ScrollViewStyle = __exports.ScrollViewStyle = class ScrollViewStyle {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.ScrollViewStyle",
        interfaces: ["FSharpUnion", "System.IEquatable", "Fable.Helpers.ReactNative.Props.IScrollViewStyle"],
        cases: [["BackfaceVisibility", "string"], ["BackgroundColor", "string"], ["BorderColor", "string"], ["BorderTopColor", "string"], ["BorderRightColor", "string"], ["BorderBottomColor", "string"], ["BorderLeftColor", "string"], ["BorderRadius", "number"], ["BorderTopLeftRadius", "number"], ["BorderTopRightRadius", "number"], ["BorderBottomLeftRadius", "number"], ["BorderBottomRightRadius", "number"], ["BorderStyle", "string"], ["BorderWidth", "number"], ["BorderTopWidth", "number"], ["BorderRightWidth", "number"], ["BorderBottomWidth", "number"], ["BorderLeftWidth", "number"], ["Opacity", "number"], ["Overflow", "string"], ["ShadowColor", "string"], ["ShadowOffset", Any], ["ShadowOpacity", "number"], ["ShadowRadius", "number"], ["Elevation", "number"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNative.Props.ScrollViewStyle", ScrollViewStyle);
  const ScrollViewPropertiesIOS = __exports.ScrollViewPropertiesIOS = class ScrollViewPropertiesIOS {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.ScrollViewPropertiesIOS",
        interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.IScrollViewPropertiesIOS"],
        cases: [["AlwaysBounceHorizontal", "boolean"], ["AlwaysBounceVertical", "boolean"], ["AutomaticallyAdjustContentInsets", "boolean"], ["Bounces", "boolean"], ["BouncesZoom", "boolean"], ["CanCancelContentTouches", "boolean"], ["CenterContent", "boolean"], ["ContentInset", Insets], ["ContentOffset", Interface("Fable.Import.ReactNative.PointProperties")], ["DecelerationRate", "string"], ["DirectionalLockEnabled", "boolean"], ["IndicatorStyle", "string"], ["MaximumZoomScale", "number"], ["MinimumZoomScale", "number"], ["OnRefreshStart", _Function([Unit, Unit])], ["OnScrollAnimationEnd", _Function([Unit, Unit])], ["ScrollEnabled", "boolean"], ["ScrollEventThrottle", "number"], ["ScrollIndicatorInsets", Insets], ["ScrollsToTop", "boolean"], ["SnapToAlignment", "string"], ["SnapToInterval", "number"], ["StickyHeaderIndices", _Array(Float64Array, true)], ["ZoomScale", "number"]]
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.ScrollViewPropertiesIOS", ScrollViewPropertiesIOS);
  const ScrollViewPropertiesAndroid = __exports.ScrollViewPropertiesAndroid = class ScrollViewPropertiesAndroid {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.ScrollViewPropertiesAndroid",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable", "Fable.Helpers.ReactNative.Props.IScrollViewPropertiesAndroid"],
        cases: [["EndFillColor", "string"], ["ScrollPerfTag", "string"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

    CompareTo(other) {
      return compareUnions(this, other) | 0;
    }

  };
  setType("Fable.Helpers.ReactNative.Props.ScrollViewPropertiesAndroid", ScrollViewPropertiesAndroid);
  const ScrollViewProperties = __exports.ScrollViewProperties = class ScrollViewProperties {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.ScrollViewProperties",
        interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.IScrollViewProperties"],
        cases: [["ContentContainerStyle", makeGeneric(List, {
          T: ViewStyle
        })], ["Horizontal", "boolean"], ["KeyboardDismissMode", "string"], ["KeyboardShouldPersistTaps", "string"], ["OnScroll", _Function([Any, Unit])], ["PagingEnabled", "boolean"], ["RemoveClippedSubviews", "boolean"], ["ShowsHorizontalScrollIndicator", "boolean"], ["ShowsVerticalScrollIndicator", "boolean"], ["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["RefreshControl", Interface("Fable.Import.React.ReactElement")], ["Ref", _Function([Interface("Fable.Import.ReactNative.ScrollViewStatic"), Unit])]]
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.ScrollViewProperties", ScrollViewProperties);
  const ListViewProperties = __exports.ListViewProperties = class ListViewProperties {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.ListViewProperties",
        interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.IListViewProperties"],
        cases: [["DataSource", Interface("Fable.Import.ReactNative.ListViewDataSource")], ["EnableEmptySections", "boolean"], ["InitialListSize", "number"], ["OnChangeVisibleRows", _Function([_Array(Any), _Array(Any), Unit])], ["OnEndReached", _Function([Unit, Unit])], ["OnEndReachedThreshold", "number"], ["PageSize", "number"], ["RemoveClippedSubviews", "boolean"], ["RenderFooter", _Function([Unit, Interface("Fable.Import.React.ReactElement")])], ["RenderHeader", _Function([Unit, Interface("Fable.Import.React.ReactElement")])], ["RenderRow", _Function([GenericParam("a"), Any, Any, "boolean", Interface("Fable.Import.React.ReactElement")])], ["RenderScrollComponent", _Function([ScrollViewProperties, Interface("Fable.Import.React.ReactElement")])], ["RenderSectionHeader", _Function([Any, Any, Interface("Fable.Import.React.ReactElement")])], ["RenderSeparator", _Function([Any, Any, "boolean", Interface("Fable.Import.React.ReactElement")])], ["ScrollRenderAheadDistance", "number"], ["Ref", _Function([Any, Unit])]]
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.ListViewProperties", ListViewProperties);
  const FlatListRenderItemSeparator = __exports.FlatListRenderItemSeparator = class FlatListRenderItemSeparator {
    constructor(highlight, unhighlight) {
      this.highlight = highlight;
      this.unhighlight = unhighlight;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.FlatListRenderItemSeparator",
        interfaces: ["FSharpRecord"],
        properties: {
          highlight: _Function([Unit, Unit]),
          unhighlight: _Function([Unit, Unit])
        }
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.FlatListRenderItemSeparator", FlatListRenderItemSeparator);
  const FlatListRenderItemInfo = __exports.FlatListRenderItemInfo = class FlatListRenderItemInfo {
    constructor(item, index, separators) {
      this.item = item;
      this.index = index;
      this.separators = separators;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.FlatListRenderItemInfo",
        interfaces: ["FSharpRecord"],
        properties: {
          item: GenericParam("a"),
          index: "number",
          separators: FlatListRenderItemSeparator
        }
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.FlatListRenderItemInfo", FlatListRenderItemInfo);
  const GetItemLayoutResult = __exports.GetItemLayoutResult = class GetItemLayoutResult {
    constructor(length, offset, index) {
      this.length = length;
      this.offset = offset;
      this.index = index;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.GetItemLayoutResult",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          length: "number",
          offset: "number",
          index: "number"
        }
      };
    }

    Equals(other) {
      return equalsRecords(this, other);
    }

    CompareTo(other) {
      return compareRecords(this, other) | 0;
    }

  };
  setType("Fable.Helpers.ReactNative.Props.GetItemLayoutResult", GetItemLayoutResult);
  const ViewToken = __exports.ViewToken = class ViewToken {
    constructor(item, key, index, isViewable, section) {
      this.item = item;
      this.key = key;
      this.index = index;
      this.isViewable = isViewable;
      this.section = section;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.ViewToken",
        interfaces: ["FSharpRecord", "System.IEquatable"],
        properties: {
          item: GenericParam("a"),
          key: "string",
          index: "number",
          isViewable: "boolean",
          section: Any
        }
      };
    }

    Equals(other) {
      return equalsRecords(this, other);
    }

  };
  setType("Fable.Helpers.ReactNative.Props.ViewToken", ViewToken);
  const OnViewableItemsChangedInfo = __exports.OnViewableItemsChangedInfo = class OnViewableItemsChangedInfo {
    constructor(viewableItems, changed) {
      this.viewableItems = viewableItems;
      this.changed = changed;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.OnViewableItemsChangedInfo",
        interfaces: ["FSharpRecord", "System.IEquatable"],
        properties: {
          viewableItems: _Array(makeGeneric(ViewToken, {
            a: GenericParam("a")
          })),
          changed: _Array(makeGeneric(ViewToken, {
            a: GenericParam("a")
          }))
        }
      };
    }

    Equals(other) {
      return equalsRecords(this, other);
    }

  };
  setType("Fable.Helpers.ReactNative.Props.OnViewableItemsChangedInfo", OnViewableItemsChangedInfo);
  const ViewabilityConfig = __exports.ViewabilityConfig = class ViewabilityConfig {
    constructor(minimumViewTime, viewAreaCoveragePercentThreshold, itemVisiblePercentThreshold, waitForInteraction) {
      this.minimumViewTime = minimumViewTime;
      this.viewAreaCoveragePercentThreshold = viewAreaCoveragePercentThreshold;
      this.itemVisiblePercentThreshold = itemVisiblePercentThreshold;
      this.waitForInteraction = waitForInteraction;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.ViewabilityConfig",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          minimumViewTime: "number",
          viewAreaCoveragePercentThreshold: "number",
          itemVisiblePercentThreshold: "number",
          waitForInteraction: "boolean"
        }
      };
    }

    Equals(other) {
      return equalsRecords(this, other);
    }

    CompareTo(other) {
      return compareRecords(this, other) | 0;
    }

  };
  setType("Fable.Helpers.ReactNative.Props.ViewabilityConfig", ViewabilityConfig);
  const FlatListProperties = __exports.FlatListProperties = class FlatListProperties {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.FlatListProperties",
        interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.IFlatListProperties"],
        cases: [["ItemSeparatorComponent", _Function([Unit, Interface("Fable.Import.React.ReactElement")])], ["ListEmptyComponent", _Function([Unit, Interface("Fable.Import.React.ReactElement")])], ["ListFooterComponent", _Function([Unit, Interface("Fable.Import.React.ReactElement")])], ["ListHeaderComponent", _Function([Unit, Interface("Fable.Import.React.ReactElement")])], ["ColumnWrapperStyle", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["ContentContainerStyle", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["ExtraData", Any], ["GetItemLayout", _Function([_Array(GenericParam("a")), GetItemLayoutResult])], ["Horizontal", "boolean"], ["InitialNumToRender", "number"], ["InitialScrollIndex", "number"], ["KeyExtractor", _Function([GenericParam("a"), "number", "string"])], ["LegacyImplementation", "boolean"], ["NumColumns", "number"], ["OnEndReached", _Function(["number", Unit])], ["OnEndReachedThreshold", "number"], ["OnRefresh", _Function([Unit, Unit])], ["OnViewableItemsChanged", _Function([makeGeneric(OnViewableItemsChangedInfo, {
          a: GenericParam("a")
        }), Unit])], ["Refreshing", "boolean"], ["RemoveClippedSubviews", "boolean"], ["RenderItem", _Function([makeGeneric(FlatListRenderItemInfo, {
          a: GenericParam("a")
        }), Interface("Fable.Import.React.ReactElement")])], ["ScrollEnabled", "boolean"], ["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["ViewabilityConfig", ViewabilityConfig], ["Ref", _Function([Any, Unit])]]
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.FlatListProperties", FlatListProperties);
  const SwipeableListViewProps = __exports.SwipeableListViewProps = class SwipeableListViewProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.SwipeableListViewProps",
        interfaces: ["FSharpUnion"],
        cases: [["DataSource", Interface("Fable.Import.ReactNative.SwipeableListViewDataSource")], ["MaxSwipeDistance", "number"], ["RenderRow", _Function([GenericParam("a"), Any, Any, "boolean", Interface("Fable.Import.React.ReactElement")])], ["RenderQuickActions", _Function([GenericParam("a"), "string", "string", Interface("Fable.Import.React.ReactElement")])]]
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.SwipeableListViewProps", SwipeableListViewProps);
  const ActionSheetIOSOptions = __exports.ActionSheetIOSOptions = class ActionSheetIOSOptions {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.ActionSheetIOSOptions",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Title", "string"], ["Options", _Array("string")], ["CancelButtonIndex", "number"], ["DestructiveButtonIndex", "number"], ["Message", "string"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNative.Props.ActionSheetIOSOptions", ActionSheetIOSOptions);
  const ShareActionSheetIOSOptions = __exports.ShareActionSheetIOSOptions = class ShareActionSheetIOSOptions {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.ShareActionSheetIOSOptions",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: [["Message", "string"], ["Url", "string"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

    CompareTo(other) {
      return compareUnions(this, other) | 0;
    }

  };
  setType("Fable.Helpers.ReactNative.Props.ShareActionSheetIOSOptions", ShareActionSheetIOSOptions);
  const DatePickerAndroidOpenOption = __exports.DatePickerAndroidOpenOption = class DatePickerAndroidOpenOption {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.DatePickerAndroidOpenOption",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: [["Date", Any], ["MinDate", Any], ["MaxDate", Any]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

    CompareTo(other) {
      return compareUnions(this, other) | 0;
    }

  };
  setType("Fable.Helpers.ReactNative.Props.DatePickerAndroidOpenOption", DatePickerAndroidOpenOption);
  const PanResponderCallbacks = __exports.PanResponderCallbacks = class PanResponderCallbacks {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.PanResponderCallbacks",
        interfaces: ["FSharpUnion"],
        cases: [["OnMoveShouldSetPanResponder", _Function([Interface("Fable.Import.ReactNative.GestureResponderEvent"), Interface("Fable.Import.ReactNative.PanResponderGestureState"), "boolean"])], ["OnStartShouldSetPanResponder", _Function([Interface("Fable.Import.ReactNative.GestureResponderEvent"), Interface("Fable.Import.ReactNative.PanResponderGestureState"), Unit])], ["OnPanResponderGrant", _Function([Interface("Fable.Import.ReactNative.GestureResponderEvent"), Interface("Fable.Import.ReactNative.PanResponderGestureState"), Unit])], ["OnPanResponderMove", _Function([Interface("Fable.Import.ReactNative.GestureResponderEvent"), Interface("Fable.Import.ReactNative.PanResponderGestureState"), Unit])], ["OnPanResponderRelease", _Function([Interface("Fable.Import.ReactNative.GestureResponderEvent"), Interface("Fable.Import.ReactNative.PanResponderGestureState"), Unit])], ["OnPanResponderTerminate", _Function([Interface("Fable.Import.ReactNative.GestureResponderEvent"), Interface("Fable.Import.ReactNative.PanResponderGestureState"), Unit])], ["OnMoveShouldSetPanResponderCapture", _Function([Interface("Fable.Import.ReactNative.GestureResponderEvent"), Interface("Fable.Import.ReactNative.PanResponderGestureState"), "boolean"])], ["OnStartShouldSetPanResponderCapture", _Function([Interface("Fable.Import.ReactNative.GestureResponderEvent"), Interface("Fable.Import.ReactNative.PanResponderGestureState"), "boolean"])], ["OnPanResponderReject", _Function([Interface("Fable.Import.ReactNative.GestureResponderEvent"), Interface("Fable.Import.ReactNative.PanResponderGestureState"), Unit])], ["OnPanResponderStart", _Function([Interface("Fable.Import.ReactNative.GestureResponderEvent"), Interface("Fable.Import.ReactNative.PanResponderGestureState"), Unit])], ["OnPanResponderEnd", _Function([Interface("Fable.Import.ReactNative.GestureResponderEvent"), Interface("Fable.Import.ReactNative.PanResponderGestureState"), Unit])], ["OnPanResponderTerminationRequest", _Function([Interface("Fable.Import.ReactNative.GestureResponderEvent"), Interface("Fable.Import.ReactNative.PanResponderGestureState"), "boolean"])]]
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.PanResponderCallbacks", PanResponderCallbacks);

  const StatusBar = __exports.StatusBar = function (__exports) {
    const StatusBarPropertiesIOS = __exports.StatusBarPropertiesIOS = class StatusBarPropertiesIOS {
      constructor(tag, data) {
        this.tag = tag | 0;
        this.data = data;
      }

      [_Symbol.reflection]() {
        return {
          type: "Fable.Helpers.ReactNative.Props.StatusBar.StatusBarPropertiesIOS",
          interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable", "Fable.Helpers.ReactNative.Props.IStatusBarProperties"],
          cases: [["BarStyle", makeGeneric(List, {
            T: "string"
          })], ["NetworkActivityIndicatorVisible", "boolean"], ["ShowHideTransition", "string"]]
        };
      }

      Equals(other) {
        return this === other || this.tag === other.tag && equals(this.data, other.data);
      }

      CompareTo(other) {
        return compareUnions(this, other) | 0;
      }

    };
    setType("Fable.Helpers.ReactNative.Props.StatusBar.StatusBarPropertiesIOS", StatusBarPropertiesIOS);
    const StatusBarPropertiesAndroid = __exports.StatusBarPropertiesAndroid = class StatusBarPropertiesAndroid {
      constructor(tag, data) {
        this.tag = tag | 0;
        this.data = data;
      }

      [_Symbol.reflection]() {
        return {
          type: "Fable.Helpers.ReactNative.Props.StatusBar.StatusBarPropertiesAndroid",
          interfaces: ["FSharpUnion", "System.IEquatable", "Fable.Helpers.ReactNative.Props.IStatusBarProperties"],
          cases: [["BackgroundColor", Any], ["Translucent", "boolean"]]
        };
      }

      Equals(other) {
        return this === other || this.tag === other.tag && equals(this.data, other.data);
      }

    };
    setType("Fable.Helpers.ReactNative.Props.StatusBar.StatusBarPropertiesAndroid", StatusBarPropertiesAndroid);
    return __exports;
  }({});

  const StatusBarProperties = __exports.StatusBarProperties = class StatusBarProperties {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.StatusBarProperties",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable", "Fable.Helpers.ReactNative.Props.IStatusBarProperties"],
        cases: [["Animated", "boolean"], ["Hidden", "boolean"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

    CompareTo(other) {
      return compareUnions(this, other) | 0;
    }

  };
  setType("Fable.Helpers.ReactNative.Props.StatusBarProperties", StatusBarProperties);
  const NavigationAnimatedViewProps = __exports.NavigationAnimatedViewProps = class NavigationAnimatedViewProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.NavigationAnimatedViewProps",
        interfaces: ["FSharpUnion"],
        cases: [["Route", Any], ["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["RenderOverlay", _Function([Any, Interface("Fable.Import.React.ReactElement")])], ["ApplyAnimation", _Function([Tuple([Any, Any]), Unit])], ["RenderScene", _Function([Any, Interface("Fable.Import.React.ReactElement")])]]
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.NavigationAnimatedViewProps", NavigationAnimatedViewProps);
  const NavigationHeaderProps = __exports.NavigationHeaderProps = class NavigationHeaderProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.NavigationHeaderProps",
        interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.INavigationHeaderProps"],
        cases: [["RenderTitleComponent", _Function([Interface("Fable.Import.ReactNative.NavigationTransitionProps"), Interface("Fable.Import.React.ReactElement")])], ["RenderLeftComponent", _Function([Interface("Fable.Import.ReactNative.NavigationTransitionProps"), Interface("Fable.Import.React.ReactElement")])], ["RenderRightComponent", _Function([Interface("Fable.Import.ReactNative.NavigationTransitionProps"), Interface("Fable.Import.React.ReactElement")])], ["StatusBarHeight", Any], ["OnNavigateBack", _Function([Unit, Unit])]]
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.NavigationHeaderProps", NavigationHeaderProps);
  const NavigationCardStackProps = __exports.NavigationCardStackProps = class NavigationCardStackProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.NavigationCardStackProps",
        interfaces: ["FSharpUnion", "Fable.Helpers.ReactNative.Props.INavigationCardStackProps"],
        cases: [["Direction", "string"], ["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["EnableGestures", "boolean"], ["GestureResponseDistance", "number"], ["CardStyle", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["RenderHeader", _Function([Interface("Fable.Import.ReactNative.NavigationTransitionProps"), Interface("Fable.Import.React.ReactElement")])], ["OnNavigateBack", _Function([Unit, Unit])]]
      };
    }

  };
  setType("Fable.Helpers.ReactNative.Props.NavigationCardStackProps", NavigationCardStackProps);
  const BreadcrumbNavigationBarProperties = __exports.BreadcrumbNavigationBarProperties = class BreadcrumbNavigationBarProperties {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Props.BreadcrumbNavigationBarProperties",
        interfaces: ["FSharpUnion", "System.IEquatable", "Fable.Helpers.ReactNative.Props.IBreadcrumbNavigationBarProperties"],
        cases: [["Navigator", Interface("Fable.Import.ReactNative.NavigatorStatic")], ["RouteMapper", Interface("Fable.Import.ReactNative.NavigatorStaticModule.BreadcrumbNavigationBarRouteMapper")], ["NavState", Interface("Fable.Import.ReactNative.NavState")], ["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNative.Props.BreadcrumbNavigationBarProperties", BreadcrumbNavigationBarProperties);
  return __exports;
}({});
export const encode = Buffer;
export function encodeBase64(text) {
  return Buffer.from(text).toString("base64");
}
export function encodeAscii(text) {
  return Buffer.from(text).toString("ascii");
}
const BackHandler = BackHandler_1;
export function removeOnHardwareBackPressHandler(onHardwareBackPress) {
  BackHandler_1.removeEventListener("hardwareBackPress", onHardwareBackPress), void 0;
}
export function setOnHardwareBackPressHandler(onHardwareBackPress) {
  BackHandler_1.addEventListener("hardwareBackPress", onHardwareBackPress), void 0;
}
export function exitApp() {
  BackHandler_1.exitApp(), void 0;
}
const Linking = Linking_1;
export function openUrl(url) {
  Linking_1.openURL(url), void 0;
}
export const Alert = function (__exports) {
  const Alert = Alert_1;

  const createButton = function (label, callback) {
    return {
      text: label,
      onPress: callback
    };
  };

  const alert = __exports.alert = function (title, message, buttons) {
    Alert_1.alert(title, message, Array.from(map(function (tupledArg) {
      return createButton(tupledArg[0], tupledArg[1]);
    }, buttons))), void 0;
  };

  const alertWithOneButton = __exports.alertWithOneButton = function (title, message, okText, onOk) {
    alert(title, message, ofArray([[okText, onOk]])), void 0;
  };

  const alertWithTwoButtons = __exports.alertWithTwoButtons = function (title, message, cancelText, onCancel, okText, onOk) {
    alert(title, message, ofArray([[cancelText, onCancel], [okText, onOk]])), void 0;
  };

  const confirm = __exports.confirm = function (title, message, cancelText, okText) {
    return new Promise(function (onSuccess, onError) {
      const onError_1 = function () {
        onError(new Error("Cancelled"));
      };

      alertWithTwoButtons(title, message, cancelText, onError_1, okText, onSuccess);
    });
  };

  return __exports;
}({});
export const NetInfo = function (__exports) {
  const NetInfo = NetInfo_1;

  const getConnectionType = __exports.getConnectionType = function () {
    return NetInfo_1.fetch();
  };

  return __exports;
}({});
export const ImageStore = function (__exports) {
  const ImageStore = ImageStore_1;

  const getBase64ForTag = __exports.getBase64ForTag = function (uri) {
    return new Promise(function (onSuccess, onError) {
      ImageStore_1.getBase64ForTag(uri, onSuccess, onError), void 0;
    });
  };

  const addImageFromBase64 = __exports.addImageFromBase64 = function (imageData) {
    return new Promise(function (onSuccess, onError) {
      ImageStore_1.addImageFromBase64(imageData, onSuccess, onError), void 0;
    });
  };

  return __exports;
}({});
export const ImageEditor = function (__exports) {
  const ResizeMode = __exports.ResizeMode = class ResizeMode {
    constructor(tag) {
      this.tag = tag | 0;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.ImageEditor.ResizeMode",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: [["Contain"], ["Cover"], ["Stretch"]]
      };
    }

    Equals(other) {
      return this.tag === other.tag;
    }

    CompareTo(other) {
      return comparePrimitives(this.tag, other.tag);
    }

  };
  setType("Fable.Helpers.ReactNative.ImageEditor.ResizeMode", ResizeMode);
  const CropData = __exports.CropData = class CropData {
    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.ImageEditor.CropData",
        properties: {}
      };
    }

    constructor() {
      this.data = {};
    }

    SetSize(width, height) {
      const size = {
        width: width,
        height: height
      };
      this.data.size = size;
      return this;
    }

    SetDisplaySize(width, height) {
      const size = {
        width: width,
        height: height
      };
      this.data.displaySize = size;
      return this;
    }

    SetOffset(x, y) {
      const offset = {
        x: x,
        y: y
      };
      this.data.offset = offset;
      return this;
    }

    SetResizeMode(mode) {
      if (mode.tag === 1) {
        this.data.displaysize = "cover";
      } else if (mode.tag === 2) {
        this.data.displaysize = "stretch";
      } else {
        this.data.displaysize = "contain";
      }

      return this;
    }

  };
  setType("Fable.Helpers.ReactNative.ImageEditor.CropData", CropData);
  const ImageEditor = ImageEditor_1;

  const cropImage = __exports.cropImage = function (uri, cropData) {
    return new Promise(function (onSuccess, onError) {
      ImageEditor_1.cropImage(uri, cropData.data, onSuccess, onError), void 0;
    });
  };

  return __exports;
}({});
export const Toast = function (__exports) {
  const Toast = ToastAndroid;

  const showShort = __exports.showShort = function (message) {
    return ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const showLong = __exports.showLong = function (message) {
    return ToastAndroid.show(message, ToastAndroid.LONG);
  };

  return __exports;
}({});
export const Storage = function (__exports) {
  const getItem = __exports.getItem = function (key) {
    return AsyncStorage.getItem(key).then(function (_arg1) {
      return _arg1 == null ? null : _arg1;
    });
  };

  const load = __exports.load = function (key, _genArgs) {
    return AsyncStorage.getItem(key).then(function (_arg1) {
      return _arg1 == null ? null : makeSome(ofJson(_arg1, {
        T: _genArgs.a
      }));
    });
  };

  const setItem = __exports.setItem = function (k, v) {
    return AsyncStorage.setItem(k, v);
  };

  const save = __exports.save = function (k, v, _genArgs) {
    return AsyncStorage.setItem(k, toJson(v));
  };

  return __exports;
}({});
export const Platform = function (__exports) {
  const OS = __exports.OS = class OS {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNative.Platform.OS",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: [["Ios", GenericParam("a")], ["Android", GenericParam("a")], ["Macos", GenericParam("a")], ["Windows", GenericParam("a")], ["Web", GenericParam("a")], ["Default", GenericParam("a")]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

    CompareTo(other) {
      return compareUnions(this, other) | 0;
    }

  };
  setType("Fable.Helpers.ReactNative.Platform.OS", OS);

  const select = __exports.select = function (specifics) {
    return Platform_1.select(createObj(specifics, 1));
  };

  return __exports;
}({});