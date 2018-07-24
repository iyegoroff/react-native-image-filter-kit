import { setType } from "./fable-core/Symbol";
import _Symbol from "./fable-core/Symbol";
import { equals, Array as _Array, Interface, makeGeneric } from "./fable-core/Util";
import List from "./fable-core/List";
export const Props = function (__exports) {
  const ColorMatrixProps = __exports.ColorMatrixProps = class ColorMatrixProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.ColorMatrixProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["Matrix", _Array(Float64Array, true)]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.ColorMatrixProps", ColorMatrixProps);
  const NormalProps = __exports.NormalProps = class NormalProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.NormalProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.NormalProps", NormalProps);
  const SaturateProps = __exports.SaturateProps = class SaturateProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.SaturateProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["Value", "number"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.SaturateProps", SaturateProps);
  const HueRotateProps = __exports.HueRotateProps = class HueRotateProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.HueRotateProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["Value", "number"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.HueRotateProps", HueRotateProps);
  const LuminanceToAlphaProps = __exports.LuminanceToAlphaProps = class LuminanceToAlphaProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.LuminanceToAlphaProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.LuminanceToAlphaProps", LuminanceToAlphaProps);
  const InvertProps = __exports.InvertProps = class InvertProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.InvertProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.InvertProps", InvertProps);
  const GrayscaleProps = __exports.GrayscaleProps = class GrayscaleProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.GrayscaleProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.GrayscaleProps", GrayscaleProps);
  const SepiaProps = __exports.SepiaProps = class SepiaProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.SepiaProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.SepiaProps", SepiaProps);
  const NightvisionProps = __exports.NightvisionProps = class NightvisionProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.NightvisionProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.NightvisionProps", NightvisionProps);
  const WarmProps = __exports.WarmProps = class WarmProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.WarmProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.WarmProps", WarmProps);
  const CoolProps = __exports.CoolProps = class CoolProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.CoolProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.CoolProps", CoolProps);
  const BrightnessProps = __exports.BrightnessProps = class BrightnessProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.BrightnessProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["Value", "number"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.BrightnessProps", BrightnessProps);
  const ExposureProps = __exports.ExposureProps = class ExposureProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.ExposureProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["Value", "number"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.ExposureProps", ExposureProps);
  const ContrastProps = __exports.ContrastProps = class ContrastProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.ContrastProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["Value", "number"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.ContrastProps", ContrastProps);
  const TemperatureProps = __exports.TemperatureProps = class TemperatureProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.TemperatureProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["Value", "number"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.TemperatureProps", TemperatureProps);
  const TintProps = __exports.TintProps = class TintProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.TintProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["Value", "number"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.TintProps", TintProps);
  const ThresholdProps = __exports.ThresholdProps = class ThresholdProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.ThresholdProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["Value", "number"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.ThresholdProps", ThresholdProps);
  const ProtanomalyProps = __exports.ProtanomalyProps = class ProtanomalyProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.ProtanomalyProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.ProtanomalyProps", ProtanomalyProps);
  const DeuteranomalyProps = __exports.DeuteranomalyProps = class DeuteranomalyProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.DeuteranomalyProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.DeuteranomalyProps", DeuteranomalyProps);
  const TritanomalyProps = __exports.TritanomalyProps = class TritanomalyProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.TritanomalyProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.TritanomalyProps", TritanomalyProps);
  const ProtanopiaProps = __exports.ProtanopiaProps = class ProtanopiaProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.ProtanopiaProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.ProtanopiaProps", ProtanopiaProps);
  const DeuteranopiaProps = __exports.DeuteranopiaProps = class DeuteranopiaProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.DeuteranopiaProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.DeuteranopiaProps", DeuteranopiaProps);
  const TritanopiaProps = __exports.TritanopiaProps = class TritanopiaProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.TritanopiaProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.TritanopiaProps", TritanopiaProps);
  const AchromatopsiaProps = __exports.AchromatopsiaProps = class AchromatopsiaProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.AchromatopsiaProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.AchromatopsiaProps", AchromatopsiaProps);
  const AchromatomalyProps = __exports.AchromatomalyProps = class AchromatomalyProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.AchromatomalyProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.AchromatomalyProps", AchromatomalyProps);
  const CIBoxBlurProps = __exports.CIBoxBlurProps = class CIBoxBlurProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.CIBoxBlurProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["ResizeOutput", "boolean"], ["InputRadius", Interface("Fable.Helpers.ReactNativeImageFilterKit.Props.IDistance")]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.CIBoxBlurProps", CIBoxBlurProps);
  const CIGaussianBlurProps = __exports.CIGaussianBlurProps = class CIGaussianBlurProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.CIGaussianBlurProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["ResizeOutput", "boolean"], ["InputRadius", Interface("Fable.Helpers.ReactNativeImageFilterKit.Props.IDistance")]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.CIGaussianBlurProps", CIGaussianBlurProps);
  const CIDiscBlurProps = __exports.CIDiscBlurProps = class CIDiscBlurProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.CIDiscBlurProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["ResizeOutput", "boolean"], ["InputRadius", Interface("Fable.Helpers.ReactNativeImageFilterKit.Props.IDistance")]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.CIDiscBlurProps", CIDiscBlurProps);
  const CIMedianFilterProps = __exports.CIMedianFilterProps = class CIMedianFilterProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.CIMedianFilterProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.CIMedianFilterProps", CIMedianFilterProps);
  const CIMotionBlurProps = __exports.CIMotionBlurProps = class CIMotionBlurProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.CIMotionBlurProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["ResizeOutput", "boolean"], ["InputRadius", Interface("Fable.Helpers.ReactNativeImageFilterKit.Props.IDistance")], ["InputAngle", "number"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.CIMotionBlurProps", CIMotionBlurProps);
  const CINoiseReductionProps = __exports.CINoiseReductionProps = class CINoiseReductionProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.CINoiseReductionProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["InputNoiseLevel", "number"], ["InputSharpness", "number"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.CINoiseReductionProps", CINoiseReductionProps);
  const CIZoomBlurProps = __exports.CIZoomBlurProps = class CIZoomBlurProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.CIZoomBlurProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["ResizeOutput", "boolean"], ["InputCenter", Interface("Fable.Helpers.ReactNativeImageFilterKit.Props.IPoint")], ["InputAmount", Interface("Fable.Helpers.ReactNativeImageFilterKit.Props.IDistance")]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.CIZoomBlurProps", CIZoomBlurProps);
  const CIColorControlsProps = __exports.CIColorControlsProps = class CIColorControlsProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.CIColorControlsProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["InputSaturation", "number"], ["InputBrightness", "number"], ["InputContrast", "number"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.CIColorControlsProps", CIColorControlsProps);
  const CIColorMatrixProps = __exports.CIColorMatrixProps = class CIColorMatrixProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.CIColorMatrixProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["InputRVector", Interface("Fable.Helpers.ReactNativeImageFilterKit.Props.IRGBAVector")], ["InputGVector", Interface("Fable.Helpers.ReactNativeImageFilterKit.Props.IRGBAVector")], ["InputBVector", Interface("Fable.Helpers.ReactNativeImageFilterKit.Props.IRGBAVector")], ["InputAVector", Interface("Fable.Helpers.ReactNativeImageFilterKit.Props.IRGBAVector")], ["InputBiasVector", Interface("Fable.Helpers.ReactNativeImageFilterKit.Props.IRGBAVector")]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.CIColorMatrixProps", CIColorMatrixProps);
  const CIHueAdjustProps = __exports.CIHueAdjustProps = class CIHueAdjustProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.CIHueAdjustProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["InputAngle", "number"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.CIHueAdjustProps", CIHueAdjustProps);
  const CIColorClampProps = __exports.CIColorClampProps = class CIColorClampProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.CIColorClampProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["InputMinComponents", Interface("Fable.Helpers.ReactNativeImageFilterKit.Props.IRGBAVector")], ["InputMaxComponents", Interface("Fable.Helpers.ReactNativeImageFilterKit.Props.IRGBAVector")]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.CIColorClampProps", CIColorClampProps);
  const CIMaskToAlphaProps = __exports.CIMaskToAlphaProps = class CIMaskToAlphaProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.CIMaskToAlphaProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.CIMaskToAlphaProps", CIMaskToAlphaProps);
  const CIMaximumComponentProps = __exports.CIMaximumComponentProps = class CIMaximumComponentProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.CIMaximumComponentProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.CIMaximumComponentProps", CIMaximumComponentProps);
  const CIMinimumComponentProps = __exports.CIMinimumComponentProps = class CIMinimumComponentProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.CIMinimumComponentProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.CIMinimumComponentProps", CIMinimumComponentProps);
  const CIPhotoEffectChromeProps = __exports.CIPhotoEffectChromeProps = class CIPhotoEffectChromeProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.CIPhotoEffectChromeProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.CIPhotoEffectChromeProps", CIPhotoEffectChromeProps);
  const CIPhotoEffectFadeProps = __exports.CIPhotoEffectFadeProps = class CIPhotoEffectFadeProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.CIPhotoEffectFadeProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.CIPhotoEffectFadeProps", CIPhotoEffectFadeProps);
  const CIPhotoEffectInstantProps = __exports.CIPhotoEffectInstantProps = class CIPhotoEffectInstantProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.CIPhotoEffectInstantProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.CIPhotoEffectInstantProps", CIPhotoEffectInstantProps);
  const CIPhotoEffectMonoProps = __exports.CIPhotoEffectMonoProps = class CIPhotoEffectMonoProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.CIPhotoEffectMonoProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.CIPhotoEffectMonoProps", CIPhotoEffectMonoProps);
  const CIPhotoEffectNoirProps = __exports.CIPhotoEffectNoirProps = class CIPhotoEffectNoirProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.CIPhotoEffectNoirProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.CIPhotoEffectNoirProps", CIPhotoEffectNoirProps);
  const CIPhotoEffectProcessProps = __exports.CIPhotoEffectProcessProps = class CIPhotoEffectProcessProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.CIPhotoEffectProcessProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.CIPhotoEffectProcessProps", CIPhotoEffectProcessProps);
  const CIPhotoEffectTonalProps = __exports.CIPhotoEffectTonalProps = class CIPhotoEffectTonalProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.CIPhotoEffectTonalProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.CIPhotoEffectTonalProps", CIPhotoEffectTonalProps);
  const CIPhotoEffectTransferProps = __exports.CIPhotoEffectTransferProps = class CIPhotoEffectTransferProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.CIPhotoEffectTransferProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.CIPhotoEffectTransferProps", CIPhotoEffectTransferProps);
  const CIVignetteEffectProps = __exports.CIVignetteEffectProps = class CIVignetteEffectProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.CIVignetteEffectProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["InputCenter", Interface("Fable.Helpers.ReactNativeImageFilterKit.Props.IPoint")], ["InputIntensity", "number"], ["InputRadius", Interface("Fable.Helpers.ReactNativeImageFilterKit.Props.IDistance")]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.CIVignetteEffectProps", CIVignetteEffectProps);
  const CIColorInvertProps = __exports.CIColorInvertProps = class CIColorInvertProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.CIColorInvertProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.CIColorInvertProps", CIColorInvertProps);
  const CIColorPosterizeProps = __exports.CIColorPosterizeProps = class CIColorPosterizeProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.CIColorPosterizeProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["InputLevels", "number"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.CIColorPosterizeProps", CIColorPosterizeProps);
  const CIVibranceProps = __exports.CIVibranceProps = class CIVibranceProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.CIVibranceProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["InputAmount", "number"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.CIVibranceProps", CIVibranceProps);
  const CICircularScreenProps = __exports.CICircularScreenProps = class CICircularScreenProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.CICircularScreenProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["InputCenter", Interface("Fable.Helpers.ReactNativeImageFilterKit.Props.IPoint")], ["InputSharpness", "number"], ["InputWidth", Interface("Fable.Helpers.ReactNativeImageFilterKit.Props.IDistance")]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.CICircularScreenProps", CICircularScreenProps);
  const CIDotScreenProps = __exports.CIDotScreenProps = class CIDotScreenProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.CIDotScreenProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["InputCenter", Interface("Fable.Helpers.ReactNativeImageFilterKit.Props.IPoint")], ["InputAngle", "number"], ["InputSharpness", "number"], ["InputWidth", Interface("Fable.Helpers.ReactNativeImageFilterKit.Props.IDistance")]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.CIDotScreenProps", CIDotScreenProps);
  const CIBumpDistortionProps = __exports.CIBumpDistortionProps = class CIBumpDistortionProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.CIBumpDistortionProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["ResizeOutput", "boolean"], ["InputCenter", Interface("Fable.Helpers.ReactNativeImageFilterKit.Props.IPoint")], ["InputRadius", Interface("Fable.Helpers.ReactNativeImageFilterKit.Props.IDistance")], ["InputScale", "number"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.CIBumpDistortionProps", CIBumpDistortionProps);
  const CIBumpDistortionLinearProps = __exports.CIBumpDistortionLinearProps = class CIBumpDistortionLinearProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.CIBumpDistortionLinearProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["InputCenter", Interface("Fable.Helpers.ReactNativeImageFilterKit.Props.IPoint")], ["InputRadius", Interface("Fable.Helpers.ReactNativeImageFilterKit.Props.IDistance")], ["InputScale", "number"], ["InputAngle", "number"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.CIBumpDistortionLinearProps", CIBumpDistortionLinearProps);
  const CICircleSplashDistortionProps = __exports.CICircleSplashDistortionProps = class CICircleSplashDistortionProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.CICircleSplashDistortionProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["InputCenter", Interface("Fable.Helpers.ReactNativeImageFilterKit.Props.IPoint")], ["InputRadius", Interface("Fable.Helpers.ReactNativeImageFilterKit.Props.IDistance")]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.CICircleSplashDistortionProps", CICircleSplashDistortionProps);
  const CICircularWrapProps = __exports.CICircularWrapProps = class CICircularWrapProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.CICircularWrapProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["ResizeOutput", "boolean"], ["InputCenter", Interface("Fable.Helpers.ReactNativeImageFilterKit.Props.IPoint")], ["InputRadius", Interface("Fable.Helpers.ReactNativeImageFilterKit.Props.IDistance")], ["InputAngle", "number"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.CICircularWrapProps", CICircularWrapProps);
  const CISharpenLuminanceProps = __exports.CISharpenLuminanceProps = class CISharpenLuminanceProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.CISharpenLuminanceProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["InputSharpness", "number"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.CISharpenLuminanceProps", CISharpenLuminanceProps);
  const CIUnsharpMaskProps = __exports.CIUnsharpMaskProps = class CIUnsharpMaskProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.CIUnsharpMaskProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["InputRadius", Interface("Fable.Helpers.ReactNativeImageFilterKit.Props.IDistance")], ["InputIntensity", "number"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.CIUnsharpMaskProps", CIUnsharpMaskProps);
  const CICrystallizeProps = __exports.CICrystallizeProps = class CICrystallizeProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.CICrystallizeProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })], ["InputRadius", Interface("Fable.Helpers.ReactNativeImageFilterKit.Props.IDistance")], ["InputCenter", Interface("Fable.Helpers.ReactNativeImageFilterKit.Props.IPoint")]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.CICrystallizeProps", CICrystallizeProps);
  const AndroidTestFilterProps = __exports.AndroidTestFilterProps = class AndroidTestFilterProps {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Helpers.ReactNativeImageFilterKit.Props.AndroidTestFilterProps",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Style", makeGeneric(List, {
          T: Interface("Fable.Helpers.ReactNative.Props.IStyle")
        })]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Fable.Helpers.ReactNativeImageFilterKit.Props.AndroidTestFilterProps", AndroidTestFilterProps);
  return __exports;
}({});
export class Distance {
  [_Symbol.reflection]() {
    return {
      type: "Fable.Helpers.ReactNativeImageFilterKit.Distance",
      properties: {}
    };
  }

}
setType("Fable.Helpers.ReactNativeImageFilterKit.Distance", Distance);