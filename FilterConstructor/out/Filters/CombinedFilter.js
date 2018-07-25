import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { createObj, comparePrimitives } from "../fable-core/Util";
import CurriedLambda from "../fable-core/CurriedLambda";
import { printf, toText } from "../fable-core/String";
import { controls as controls_1, view as view_1, Input, init as init_1 } from "./Filter";
import { ofArray } from "../fable-core/List";
import List from "../fable-core/List";
import { initRGBAVector, initPoint, initBoolean, initDistance, initScalar } from "../FilterInputs/CombinedFilterInput";
import { Props } from "../Fable.Helpers.ReactNativeImageFilterKit";
import { createElement } from "react";
import { Normal, CICrystallize, CIUnsharpMask, CISharpenLuminance, CICircularWrap, CICircleSplashDistortion, CIBumpDistortionLinear, CIBumpDistortion, CIDotScreen, CICircularScreen, CIVibrance, CIColorPosterize, CIColorInvert, CIVignetteEffect, CIPhotoEffectTransfer, CIPhotoEffectTonal, CIPhotoEffectProcess, CIPhotoEffectNoir, CIPhotoEffectMono, CIPhotoEffectInstant, CIPhotoEffectFade, CIPhotoEffectChrome, CIMinimumComponent, CIMaximumComponent, CIMaskToAlpha, CIHueAdjust, CIColorMatrix, CIColorControls, CIColorClamp, CIZoomBlur, CINoiseReduction, CIMotionBlur, CIMedianFilter, CIGaussianBlur, CIDiscBlur, CIBoxBlur, BlurMaskFilter, Achromatomaly, Achromatopsia, Tritanopia, Deuteranopia, Protanopia, Tritanomaly, Deuteranomaly, Protanomaly, Threshold, Tint, Temperature, Contrast, Exposure, Brightness, Cool, Warm, Nightvision, Sepia, Grayscale, Invert, LuminanceToAlpha, HueRotate, Saturate } from "react-native-image-filter-kit";
import { getValue } from "../fable-core/Option";
import { concat } from "../fable-core/Seq";
import { Platform } from "../Fable.Helpers.ReactNative";
export class Model {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "FilterConstructor.CombinedFilter.Model",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Normal"], ["Saturate"], ["HueRotate"], ["LuminanceToAlpha"], ["Invert"], ["Grayscale"], ["Sepia"], ["Nightvision"], ["Warm"], ["Cool"], ["Brightness"], ["Exposure"], ["Contrast"], ["Temperature"], ["Tint"], ["Threshold"], ["Protanomaly"], ["Deuteranomaly"], ["Tritanomaly"], ["Protanopia"], ["Deuteranopia"], ["Tritanopia"], ["Achromatopsia"], ["Achromatomaly"], ["BlurMaskFilter"], ["CIBoxBlur"], ["CIDiscBlur"], ["CIGaussianBlur"], ["CIMedianFilter"], ["CIMotionBlur"], ["CINoiseReduction"], ["CIZoomBlur"], ["CIColorClamp"], ["CIColorControls"], ["CIColorMatrix"], ["CIHueAdjust"], ["CIMaskToAlpha"], ["CIMaximumComponent"], ["CIMinimumComponent"], ["CIPhotoEffectChrome"], ["CIPhotoEffectFade"], ["CIPhotoEffectInstant"], ["CIPhotoEffectMono"], ["CIPhotoEffectNoir"], ["CIPhotoEffectProcess"], ["CIPhotoEffectTonal"], ["CIPhotoEffectTransfer"], ["CIVignetteEffect"], ["CIColorInvert"], ["CIColorPosterize"], ["CIVibrance"], ["CICircularScreen"], ["CIDotScreen"], ["CIBumpDistortion"], ["CIBumpDistortionLinear"], ["CICircleSplashDistortion"], ["CICircularWrap"], ["CISharpenLuminance"], ["CIUnsharpMask"], ["CICrystallize"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("FilterConstructor.CombinedFilter.Model", Model);
export const name = CurriedLambda(toText(printf("%A")));

function toPoint(x, y) {
  return {
    x: x + "w",
    y: y + "h"
  };
}

export function init(model) {
  var toDistance;
  var toDistance_1;
  var toDistance_2;
  var toDistance_3;
  var max;
  var toDistance_4;
  var max_1;
  var toDistance_5;
  var toDistance_6;
  var max_2;
  var toDistance_7;
  var toDistance_8;
  var toDistance_9;
  var max_3;
  var toDistance_10;
  var toDistance_11;
  var max_4;
  var toDistance_12;
  var toDistance_13;

  switch (model.tag) {
    case 1:
      return init_1(ofArray([[new Input(20), function (name_1) {
        return initScalar(-10, 10, name_1);
      }]]));

    case 2:
      return init_1(ofArray([[new Input(20), function (name_2) {
        return initScalar(-10, 10, name_2);
      }]]));

    case 3:
      return init_1(new List());

    case 4:
      return init_1(new List());

    case 5:
      return init_1(new List());

    case 6:
      return init_1(new List());

    case 7:
      return init_1(new List());

    case 8:
      return init_1(new List());

    case 9:
      return init_1(new List());

    case 10:
      return init_1(ofArray([[new Input(20), function (name_3) {
        return initScalar(-10, 10, name_3);
      }]]));

    case 11:
      return init_1(ofArray([[new Input(20), function (name_4) {
        return initScalar(-10, 10, name_4);
      }]]));

    case 12:
      return init_1(ofArray([[new Input(20), function (name_5) {
        return initScalar(-10, 10, name_5);
      }]]));

    case 13:
      return init_1(ofArray([[new Input(20), function (name_6) {
        return initScalar(-10, 10, name_6);
      }]]));

    case 14:
      return init_1(ofArray([[new Input(20), function (name_7) {
        return initScalar(-10, 10, name_7);
      }]]));

    case 15:
      return init_1(ofArray([[new Input(20), function (name_8) {
        return initScalar(-10, 10, name_8);
      }]]));

    case 16:
      return init_1(new List());

    case 17:
      return init_1(new List());

    case 18:
      return init_1(new List());

    case 19:
      return init_1(new List());

    case 20:
      return init_1(new List());

    case 21:
      return init_1(new List());

    case 22:
      return init_1(new List());

    case 23:
      return init_1(new List());

    case 24:
      return init_1(ofArray([[new Input(21), function (name_9) {
        return initScalar(0, 100, name_9);
      }]]));

    case 25:
      return init_1(ofArray([[new Input(10), (toDistance = function (arg00) {
        return arg00 + "max";
      }, function (name_10) {
        return initDistance(toDistance, 0, 50, name_10);
      })], [new Input(22), initBoolean]]));

    case 26:
      return init_1(ofArray([[new Input(10), (toDistance_1 = function (arg00_1) {
        return arg00_1 + "max";
      }, function (name_12) {
        return initDistance(toDistance_1, 0, 50, name_12);
      })], [new Input(22), initBoolean]]));

    case 27:
      return init_1(ofArray([[new Input(10), (toDistance_2 = function (arg00_2) {
        return arg00_2 + "max";
      }, function (name_14) {
        return initDistance(toDistance_2, 0, 50, name_14);
      })], [new Input(22), initBoolean]]));

    case 28:
      return init_1(new List());

    case 29:
      return init_1(ofArray([[new Input(10), (toDistance_3 = function (arg00_3) {
        return arg00_3 + "max";
      }, function (name_16) {
        return initDistance(toDistance_3, 0, 50, name_16);
      })], [new Input(1), (max = 2 * 3.141592653589793, function (name_17) {
        return initScalar(0, max, name_17);
      })], [new Input(22), initBoolean]]));

    case 30:
      return init_1(ofArray([[new Input(9), function (name_19) {
        return initScalar(0, 1, name_19);
      }], [new Input(13), function (name_20) {
        return initScalar(0, 1, name_20);
      }]]));

    case 31:
      return init_1(ofArray([[new Input(3), function (name_21) {
        return initPoint(function (tupledArg) {
          return toPoint(tupledArg[0], tupledArg[1]);
        }, 0, 0, 100, 100, name_21);
      }], [new Input(0), (toDistance_4 = function (arg00_4) {
        return arg00_4 + "max";
      }, function (name_22) {
        return initDistance(toDistance_4, 0, 100, name_22);
      })], [new Input(22), initBoolean]]));

    case 32:
      return init_1(ofArray([[new Input(7), function (name_24) {
        return initRGBAVector(0, 0, 0, 0, 1, 1, 1, 1, name_24);
      }], [new Input(8), function (name_25) {
        return initRGBAVector(0, 0, 0, 0, 1, 1, 1, 1, name_25);
      }]]));

    case 33:
      return init_1(ofArray([[new Input(11), function (name_26) {
        return initScalar(0, 10, name_26);
      }], [new Input(2), function (name_27) {
        return initScalar(0, 10, name_27);
      }], [new Input(4), function (name_28) {
        return initScalar(0, 10, name_28);
      }]]));

    case 34:
      return init_1(ofArray([[new Input(15), function (name_29) {
        return initRGBAVector(0, 0, 0, 0, 1, 1, 1, 1, name_29);
      }], [new Input(16), function (name_30) {
        return initRGBAVector(0, 0, 0, 0, 1, 1, 1, 1, name_30);
      }], [new Input(17), function (name_31) {
        return initRGBAVector(0, 0, 0, 0, 1, 1, 1, 1, name_31);
      }], [new Input(18), function (name_32) {
        return initRGBAVector(0, 0, 0, 0, 1, 1, 1, 1, name_32);
      }], [new Input(19), function (name_33) {
        return initRGBAVector(0, 0, 0, 0, 1, 1, 1, 1, name_33);
      }]]));

    case 35:
      return init_1(ofArray([[new Input(1), (max_1 = 2 * 3.141592653589793, function (name_34) {
        return initScalar(0, max_1, name_34);
      })]]));

    case 36:
      return init_1(new List());

    case 37:
      return init_1(new List());

    case 38:
      return init_1(new List());

    case 39:
      return init_1(new List());

    case 40:
      return init_1(new List());

    case 41:
      return init_1(new List());

    case 42:
      return init_1(new List());

    case 43:
      return init_1(new List());

    case 44:
      return init_1(new List());

    case 45:
      return init_1(new List());

    case 46:
      return init_1(new List());

    case 47:
      return init_1(ofArray([[new Input(3), function (name_35) {
        return initPoint(function (tupledArg_1) {
          return toPoint(tupledArg_1[0], tupledArg_1[1]);
        }, 0, 0, 100, 100, name_35);
      }], [new Input(5), function (name_36) {
        return initScalar(0, 1, name_36);
      }], [new Input(10), (toDistance_5 = function (arg00_5) {
        return arg00_5 + "max";
      }, function (name_37) {
        return initDistance(toDistance_5, 0, 100, name_37);
      })]]));

    case 48:
      return init_1(new List());

    case 49:
      return init_1(ofArray([[new Input(6), function (name_38) {
        return initScalar(0, 10, name_38);
      }]]));

    case 50:
      return init_1(ofArray([[new Input(0), function (name_39) {
        return initScalar(-1, 1, name_39);
      }]]));

    case 51:
      return init_1(ofArray([[new Input(3), function (name_40) {
        return initPoint(function (tupledArg_2) {
          return toPoint(tupledArg_2[0], tupledArg_2[1]);
        }, 0, 0, 100, 100, name_40);
      }], [new Input(13), function (name_41) {
        return initScalar(0, 1, name_41);
      }], [new Input(14), (toDistance_6 = function (arg00_6) {
        return arg00_6 + "max";
      }, function (name_42) {
        return initDistance(toDistance_6, 0, 100, name_42);
      })]]));

    case 52:
      return init_1(ofArray([[new Input(3), function (name_43) {
        return initPoint(function (tupledArg_3) {
          return toPoint(tupledArg_3[0], tupledArg_3[1]);
        }, 0, 0, 100, 100, name_43);
      }], [new Input(1), (max_2 = 2 * 3.141592653589793, function (name_44) {
        return initScalar(0, max_2, name_44);
      })], [new Input(13), function (name_45) {
        return initScalar(0, 1, name_45);
      }], [new Input(14), (toDistance_7 = function (arg00_7) {
        return arg00_7 + "max";
      }, function (name_46) {
        return initDistance(toDistance_7, 0, 50, name_46);
      })]]));

    case 53:
      return init_1(ofArray([[new Input(3), function (name_47) {
        return initPoint(function (tupledArg_4) {
          return toPoint(tupledArg_4[0], tupledArg_4[1]);
        }, 0, 0, 100, 100, name_47);
      }], [new Input(10), (toDistance_8 = function (arg00_8) {
        return arg00_8 + "max";
      }, function (name_48) {
        return initDistance(toDistance_8, 0, 100, name_48);
      })], [new Input(12), function (name_49) {
        return initScalar(-2, 2, name_49);
      }], [new Input(22), initBoolean]]));

    case 54:
      return init_1(ofArray([[new Input(3), function (name_51) {
        return initPoint(function (tupledArg_5) {
          return toPoint(tupledArg_5[0], tupledArg_5[1]);
        }, 0, 0, 100, 100, name_51);
      }], [new Input(10), (toDistance_9 = function (arg00_9) {
        return arg00_9 + "max";
      }, function (name_52) {
        return initDistance(toDistance_9, 0, 100, name_52);
      })], [new Input(12), function (name_53) {
        return initScalar(-2, 2, name_53);
      }], [new Input(1), (max_3 = 2 * 3.141592653589793, function (name_54) {
        return initScalar(0, max_3, name_54);
      })]]));

    case 55:
      return init_1(ofArray([[new Input(3), function (name_55) {
        return initPoint(function (tupledArg_6) {
          return toPoint(tupledArg_6[0], tupledArg_6[1]);
        }, 0, 0, 100, 100, name_55);
      }], [new Input(10), (toDistance_10 = function (arg00_10) {
        return arg00_10 + "max";
      }, function (name_56) {
        return initDistance(toDistance_10, 0, 100, name_56);
      })]]));

    case 56:
      return init_1(ofArray([[new Input(3), function (name_57) {
        return initPoint(function (tupledArg_7) {
          return toPoint(tupledArg_7[0], tupledArg_7[1]);
        }, 0, 0, 100, 100, name_57);
      }], [new Input(10), (toDistance_11 = function (arg00_11) {
        return arg00_11 + "max";
      }, function (name_58) {
        return initDistance(toDistance_11, 0, 100, name_58);
      })], [new Input(1), (max_4 = 2 * 3.141592653589793, function (name_59) {
        return initScalar(0, max_4, name_59);
      })], [new Input(22), initBoolean]]));

    case 57:
      return init_1(ofArray([[new Input(13), function (name_61) {
        return initScalar(0, 100, name_61);
      }]]));

    case 58:
      return init_1(ofArray([[new Input(10), (toDistance_12 = function (arg00_12) {
        return arg00_12 + "max";
      }, function (name_62) {
        return initDistance(toDistance_12, 0, 50, name_62);
      })], [new Input(5), function (name_63) {
        return initScalar(0, 10, name_63);
      }]]));

    case 59:
      return init_1(ofArray([[new Input(10), (toDistance_13 = function (arg00_13) {
        return arg00_13 + "max";
      }, function (name_64) {
        return initDistance(toDistance_13, 0, 50, name_64);
      })], [new Input(3), function (name_65) {
        return initPoint(function (tupledArg_8) {
          return toPoint(tupledArg_8[0], tupledArg_8[1]);
        }, 0, 0, 100, 100, name_65);
      }]]));

    default:
      return init_1(new List());
  }
}

function _ResizeOutput___(_arg1_0, _arg1_1) {
  const _arg1 = [_arg1_0, _arg1_1];
  const $var1 = _arg1[0].tag === 22 ? _arg1[1].tag === 4 ? [0] : [1] : [1];

  switch ($var1[0]) {
    case 0:
      const input = _arg1[1].data;
      return input.Value;

    case 1:
      return null;
  }
}

function emptyView(filter) {
  var mapInput;
  return CurriedLambda((mapInput = function (_arg1) {
    return null;
  }, function (model, content) {
    return view_1(filter, mapInput, model, content);
  }));
}

export function view(_arg1) {
  return CurriedLambda((() => {
    switch (_arg1.tag) {
      case 1:
        const mapInput = function (_arg2) {
          const $var2 = _arg2[0].tag === 20 ? _arg2[1].tag === 0 ? [0] : [1] : [1];

          switch ($var2[0]) {
            case 0:
              const input = _arg2[1].data;
              return new Props.SaturateProps(1, input.Convert(input.Value));

            case 1:
              return null;
          }
        };

        return function (model, content) {
          return view_1(function (props, children) {
            return createElement(Saturate, createObj(props, 1), ...children);
          }, mapInput, model, content);
        };

      case 2:
        const mapInput_1 = function (_arg3) {
          const $var3 = _arg3[0].tag === 20 ? _arg3[1].tag === 0 ? [0] : [1] : [1];

          switch ($var3[0]) {
            case 0:
              const input_1 = _arg3[1].data;
              return new Props.HueRotateProps(1, input_1.Convert(input_1.Value));

            case 1:
              return null;
          }
        };

        return function (model_1, content_1) {
          return view_1(function (props_1, children_1) {
            return createElement(HueRotate, createObj(props_1, 1), ...children_1);
          }, mapInput_1, model_1, content_1);
        };

      case 3:
        return emptyView(function (props_2, children_2) {
          return createElement(LuminanceToAlpha, createObj(props_2, 1), ...children_2);
        });

      case 4:
        return emptyView(function (props_3, children_3) {
          return createElement(Invert, createObj(props_3, 1), ...children_3);
        });

      case 5:
        return emptyView(function (props_4, children_4) {
          return createElement(Grayscale, createObj(props_4, 1), ...children_4);
        });

      case 6:
        return emptyView(function (props_5, children_5) {
          return createElement(Sepia, createObj(props_5, 1), ...children_5);
        });

      case 7:
        return emptyView(function (props_6, children_6) {
          return createElement(Nightvision, createObj(props_6, 1), ...children_6);
        });

      case 8:
        return emptyView(function (props_7, children_7) {
          return createElement(Warm, createObj(props_7, 1), ...children_7);
        });

      case 9:
        return emptyView(function (props_8, children_8) {
          return createElement(Cool, createObj(props_8, 1), ...children_8);
        });

      case 10:
        const mapInput_2 = function (_arg4) {
          const $var4 = _arg4[0].tag === 20 ? _arg4[1].tag === 0 ? [0] : [1] : [1];

          switch ($var4[0]) {
            case 0:
              const input_2 = _arg4[1].data;
              return new Props.BrightnessProps(1, input_2.Convert(input_2.Value));

            case 1:
              return null;
          }
        };

        return function (model_2, content_2) {
          return view_1(function (props_9, children_9) {
            return createElement(Brightness, createObj(props_9, 1), ...children_9);
          }, mapInput_2, model_2, content_2);
        };

      case 11:
        const mapInput_3 = function (_arg5) {
          const $var5 = _arg5[0].tag === 20 ? _arg5[1].tag === 0 ? [0] : [1] : [1];

          switch ($var5[0]) {
            case 0:
              const input_3 = _arg5[1].data;
              return new Props.ExposureProps(1, input_3.Convert(input_3.Value));

            case 1:
              return null;
          }
        };

        return function (model_3, content_3) {
          return view_1(function (props_10, children_10) {
            return createElement(Exposure, createObj(props_10, 1), ...children_10);
          }, mapInput_3, model_3, content_3);
        };

      case 12:
        const mapInput_4 = function (_arg6) {
          const $var6 = _arg6[0].tag === 20 ? _arg6[1].tag === 0 ? [0] : [1] : [1];

          switch ($var6[0]) {
            case 0:
              const input_4 = _arg6[1].data;
              return new Props.ContrastProps(1, input_4.Convert(input_4.Value));

            case 1:
              return null;
          }
        };

        return function (model_4, content_4) {
          return view_1(function (props_11, children_11) {
            return createElement(Contrast, createObj(props_11, 1), ...children_11);
          }, mapInput_4, model_4, content_4);
        };

      case 13:
        const mapInput_5 = function (_arg7) {
          const $var7 = _arg7[0].tag === 20 ? _arg7[1].tag === 0 ? [0] : [1] : [1];

          switch ($var7[0]) {
            case 0:
              const input_5 = _arg7[1].data;
              return new Props.TemperatureProps(1, input_5.Convert(input_5.Value));

            case 1:
              return null;
          }
        };

        return function (model_5, content_5) {
          return view_1(function (props_12, children_12) {
            return createElement(Temperature, createObj(props_12, 1), ...children_12);
          }, mapInput_5, model_5, content_5);
        };

      case 14:
        const mapInput_6 = function (_arg8) {
          const $var8 = _arg8[0].tag === 20 ? _arg8[1].tag === 0 ? [0] : [1] : [1];

          switch ($var8[0]) {
            case 0:
              const input_6 = _arg8[1].data;
              return new Props.TintProps(1, input_6.Convert(input_6.Value));

            case 1:
              return null;
          }
        };

        return function (model_6, content_6) {
          return view_1(function (props_13, children_13) {
            return createElement(Tint, createObj(props_13, 1), ...children_13);
          }, mapInput_6, model_6, content_6);
        };

      case 15:
        const mapInput_7 = function (_arg9) {
          const $var9 = _arg9[0].tag === 20 ? _arg9[1].tag === 0 ? [0] : [1] : [1];

          switch ($var9[0]) {
            case 0:
              const input_7 = _arg9[1].data;
              return new Props.ThresholdProps(1, input_7.Convert(input_7.Value));

            case 1:
              return null;
          }
        };

        return function (model_7, content_7) {
          return view_1(function (props_14, children_14) {
            return createElement(Threshold, createObj(props_14, 1), ...children_14);
          }, mapInput_7, model_7, content_7);
        };

      case 16:
        return emptyView(function (props_15, children_15) {
          return createElement(Protanomaly, createObj(props_15, 1), ...children_15);
        });

      case 17:
        return emptyView(function (props_16, children_16) {
          return createElement(Deuteranomaly, createObj(props_16, 1), ...children_16);
        });

      case 18:
        return emptyView(function (props_17, children_17) {
          return createElement(Tritanomaly, createObj(props_17, 1), ...children_17);
        });

      case 19:
        return emptyView(function (props_18, children_18) {
          return createElement(Protanopia, createObj(props_18, 1), ...children_18);
        });

      case 20:
        return emptyView(function (props_19, children_19) {
          return createElement(Deuteranopia, createObj(props_19, 1), ...children_19);
        });

      case 21:
        return emptyView(function (props_20, children_20) {
          return createElement(Tritanopia, createObj(props_20, 1), ...children_20);
        });

      case 22:
        return emptyView(function (props_21, children_21) {
          return createElement(Achromatopsia, createObj(props_21, 1), ...children_21);
        });

      case 23:
        return emptyView(function (props_22, children_22) {
          return createElement(Achromatomaly, createObj(props_22, 1), ...children_22);
        });

      case 24:
        const mapInput_8 = function (_arg10) {
          const $var10 = _arg10[0].tag === 21 ? _arg10[1].tag === 0 ? [0] : [1] : [1];

          switch ($var10[0]) {
            case 0:
              const input_8 = _arg10[1].data;
              return new Props.BlurMaskFilterProps(1, input_8.Convert(input_8.Value));

            case 1:
              return null;
          }
        };

        return function (model_8, content_8) {
          return view_1(function (props_23, children_23) {
            return createElement(BlurMaskFilter, createObj(props_23, 1), ...children_23);
          }, mapInput_8, model_8, content_8);
        };

      case 25:
        const mapInput_9 = function (_arg11) {
          let $var11;

          if (_arg11[0].tag === 10) {
            if (_arg11[1].tag === 1) {
              $var11 = [0, _arg11[1].data];
            } else {
              const activePatternResult471274 = _ResizeOutput___(_arg11[0], _arg11[1]);

              if (activePatternResult471274 != null) {
                $var11 = [1, getValue(activePatternResult471274)];
              } else {
                $var11 = [2];
              }
            }
          } else {
            const activePatternResult471275 = _ResizeOutput___(_arg11[0], _arg11[1]);

            if (activePatternResult471275 != null) {
              $var11 = [1, getValue(activePatternResult471275)];
            } else {
              $var11 = [2];
            }
          }

          switch ($var11[0]) {
            case 0:
              return new Props.CIBoxBlurProps(2, $var11[1].Convert($var11[1].Value));

            case 1:
              return new Props.CIBoxBlurProps(1, $var11[1]);

            case 2:
              return null;
          }
        };

        return function (model_9, content_9) {
          return view_1(function (props_24, children_24) {
            return createElement(CIBoxBlur, createObj(props_24, 1), ...children_24);
          }, mapInput_9, model_9, content_9);
        };

      case 26:
        const mapInput_10 = function (_arg12) {
          let $var12;

          if (_arg12[0].tag === 10) {
            if (_arg12[1].tag === 1) {
              $var12 = [0, _arg12[1].data];
            } else {
              const activePatternResult471277 = _ResizeOutput___(_arg12[0], _arg12[1]);

              if (activePatternResult471277 != null) {
                $var12 = [1, getValue(activePatternResult471277)];
              } else {
                $var12 = [2];
              }
            }
          } else {
            const activePatternResult471278 = _ResizeOutput___(_arg12[0], _arg12[1]);

            if (activePatternResult471278 != null) {
              $var12 = [1, getValue(activePatternResult471278)];
            } else {
              $var12 = [2];
            }
          }

          switch ($var12[0]) {
            case 0:
              return new Props.CIDiscBlurProps(2, $var12[1].Convert($var12[1].Value));

            case 1:
              return new Props.CIDiscBlurProps(1, $var12[1]);

            case 2:
              return null;
          }
        };

        return function (model_10, content_10) {
          return view_1(function (props_25, children_25) {
            return createElement(CIDiscBlur, createObj(props_25, 1), ...children_25);
          }, mapInput_10, model_10, content_10);
        };

      case 27:
        const mapInput_11 = function (_arg13) {
          let $var13;

          if (_arg13[0].tag === 10) {
            if (_arg13[1].tag === 1) {
              $var13 = [0, _arg13[1].data];
            } else {
              const activePatternResult471280 = _ResizeOutput___(_arg13[0], _arg13[1]);

              if (activePatternResult471280 != null) {
                $var13 = [1, getValue(activePatternResult471280)];
              } else {
                $var13 = [2];
              }
            }
          } else {
            const activePatternResult471281 = _ResizeOutput___(_arg13[0], _arg13[1]);

            if (activePatternResult471281 != null) {
              $var13 = [1, getValue(activePatternResult471281)];
            } else {
              $var13 = [2];
            }
          }

          switch ($var13[0]) {
            case 0:
              return new Props.CIGaussianBlurProps(2, $var13[1].Convert($var13[1].Value));

            case 1:
              return new Props.CIGaussianBlurProps(1, $var13[1]);

            case 2:
              return null;
          }
        };

        return function (model_11, content_11) {
          return view_1(function (props_26, children_26) {
            return createElement(CIGaussianBlur, createObj(props_26, 1), ...children_26);
          }, mapInput_11, model_11, content_11);
        };

      case 28:
        return emptyView(function (props_27, children_27) {
          return createElement(CIMedianFilter, createObj(props_27, 1), ...children_27);
        });

      case 29:
        const mapInput_12 = function (_arg14) {
          let $var14;

          if (_arg14[0].tag === 10) {
            if (_arg14[1].tag === 1) {
              $var14 = [0, _arg14[1].data];
            } else {
              const activePatternResult471283 = _ResizeOutput___(_arg14[0], _arg14[1]);

              if (activePatternResult471283 != null) {
                $var14 = [2, getValue(activePatternResult471283)];
              } else {
                $var14 = [3];
              }
            }
          } else if (_arg14[0].tag === 1) {
            if (_arg14[1].tag === 0) {
              $var14 = [1, _arg14[1].data];
            } else {
              const activePatternResult471284 = _ResizeOutput___(_arg14[0], _arg14[1]);

              if (activePatternResult471284 != null) {
                $var14 = [2, getValue(activePatternResult471284)];
              } else {
                $var14 = [3];
              }
            }
          } else {
            const activePatternResult471285 = _ResizeOutput___(_arg14[0], _arg14[1]);

            if (activePatternResult471285 != null) {
              $var14 = [2, getValue(activePatternResult471285)];
            } else {
              $var14 = [3];
            }
          }

          switch ($var14[0]) {
            case 0:
              return new Props.CIMotionBlurProps(2, $var14[1].Convert($var14[1].Value));

            case 1:
              return new Props.CIMotionBlurProps(3, $var14[1].Convert($var14[1].Value));

            case 2:
              return new Props.CIMotionBlurProps(1, $var14[1]);

            case 3:
              return null;
          }
        };

        return function (model_12, content_12) {
          return view_1(function (props_28, children_28) {
            return createElement(CIMotionBlur, createObj(props_28, 1), ...children_28);
          }, mapInput_12, model_12, content_12);
        };

      case 30:
        const mapInput_13 = function (_arg15) {
          const $var15 = _arg15[0].tag === 9 ? _arg15[1].tag === 0 ? [0] : [2] : _arg15[0].tag === 13 ? _arg15[1].tag === 0 ? [1] : [2] : [2];

          switch ($var15[0]) {
            case 0:
              const input_9 = _arg15[1].data;
              return new Props.CINoiseReductionProps(1, input_9.Convert(input_9.Value));

            case 1:
              const input_10 = _arg15[1].data;
              return new Props.CINoiseReductionProps(2, input_10.Convert(input_10.Value));

            case 2:
              return null;
          }
        };

        return function (model_13, content_13) {
          return view_1(function (props_29, children_29) {
            return createElement(CINoiseReduction, createObj(props_29, 1), ...children_29);
          }, mapInput_13, model_13, content_13);
        };

      case 31:
        const mapInput_14 = function (_arg16) {
          let $var16;

          if (_arg16[0].tag === 3) {
            if (_arg16[1].tag === 2) {
              $var16 = [0, _arg16[1].data];
            } else {
              const activePatternResult471288 = _ResizeOutput___(_arg16[0], _arg16[1]);

              if (activePatternResult471288 != null) {
                $var16 = [2, getValue(activePatternResult471288)];
              } else {
                $var16 = [3];
              }
            }
          } else if (_arg16[0].tag === 0) {
            if (_arg16[1].tag === 1) {
              $var16 = [1, _arg16[1].data];
            } else {
              const activePatternResult471289 = _ResizeOutput___(_arg16[0], _arg16[1]);

              if (activePatternResult471289 != null) {
                $var16 = [2, getValue(activePatternResult471289)];
              } else {
                $var16 = [3];
              }
            }
          } else {
            const activePatternResult471290 = _ResizeOutput___(_arg16[0], _arg16[1]);

            if (activePatternResult471290 != null) {
              $var16 = [2, getValue(activePatternResult471290)];
            } else {
              $var16 = [3];
            }
          }

          switch ($var16[0]) {
            case 0:
              return new Props.CIZoomBlurProps(2, $var16[1].Convert($var16[1].Value));

            case 1:
              return new Props.CIZoomBlurProps(3, $var16[1].Convert($var16[1].Value));

            case 2:
              return new Props.CIZoomBlurProps(1, $var16[1]);

            case 3:
              return null;
          }
        };

        return function (model_14, content_14) {
          return view_1(function (props_30, children_30) {
            return createElement(CIZoomBlur, createObj(props_30, 1), ...children_30);
          }, mapInput_14, model_14, content_14);
        };

      case 32:
        const mapInput_15 = function (_arg17) {
          const $var17 = _arg17[0].tag === 7 ? _arg17[1].tag === 3 ? [0] : [2] : _arg17[0].tag === 8 ? _arg17[1].tag === 3 ? [1] : [2] : [2];

          switch ($var17[0]) {
            case 0:
              const input_11 = _arg17[1].data;
              return new Props.CIColorClampProps(1, input_11.Convert(input_11.Value));

            case 1:
              const input_12 = _arg17[1].data;
              return new Props.CIColorClampProps(2, input_12.Convert(input_12.Value));

            case 2:
              return null;
          }
        };

        return function (model_15, content_15) {
          return view_1(function (props_31, children_31) {
            return createElement(CIColorClamp, createObj(props_31, 1), ...children_31);
          }, mapInput_15, model_15, content_15);
        };

      case 33:
        const mapInput_16 = function (_arg18) {
          const $var18 = _arg18[0].tag === 11 ? _arg18[1].tag === 0 ? [0] : [3] : _arg18[0].tag === 2 ? _arg18[1].tag === 0 ? [1] : [3] : _arg18[0].tag === 4 ? _arg18[1].tag === 0 ? [2] : [3] : [3];

          switch ($var18[0]) {
            case 0:
              const input_13 = _arg18[1].data;
              return new Props.CIColorControlsProps(1, input_13.Convert(input_13.Value));

            case 1:
              const input_14 = _arg18[1].data;
              return new Props.CIColorControlsProps(2, input_14.Convert(input_14.Value));

            case 2:
              const input_15 = _arg18[1].data;
              return new Props.CIColorControlsProps(3, input_15.Convert(input_15.Value));

            case 3:
              return null;
          }
        };

        return function (model_16, content_16) {
          return view_1(function (props_32, children_32) {
            return createElement(CIColorControls, createObj(props_32, 1), ...children_32);
          }, mapInput_16, model_16, content_16);
        };

      case 34:
        const mapInput_17 = function (_arg19) {
          const $var19 = _arg19[0].tag === 15 ? _arg19[1].tag === 3 ? [0] : [5] : _arg19[0].tag === 16 ? _arg19[1].tag === 3 ? [1] : [5] : _arg19[0].tag === 17 ? _arg19[1].tag === 3 ? [2] : [5] : _arg19[0].tag === 18 ? _arg19[1].tag === 3 ? [3] : [5] : _arg19[0].tag === 19 ? _arg19[1].tag === 3 ? [4] : [5] : [5];

          switch ($var19[0]) {
            case 0:
              const input_16 = _arg19[1].data;
              return new Props.CIColorMatrixProps(1, input_16.Convert(input_16.Value));

            case 1:
              const input_17 = _arg19[1].data;
              return new Props.CIColorMatrixProps(2, input_17.Convert(input_17.Value));

            case 2:
              const input_18 = _arg19[1].data;
              return new Props.CIColorMatrixProps(3, input_18.Convert(input_18.Value));

            case 3:
              const input_19 = _arg19[1].data;
              return new Props.CIColorMatrixProps(4, input_19.Convert(input_19.Value));

            case 4:
              const input_20 = _arg19[1].data;
              return new Props.CIColorMatrixProps(5, input_20.Convert(input_20.Value));

            case 5:
              return null;
          }
        };

        return function (model_17, content_17) {
          return view_1(function (props_33, children_33) {
            return createElement(CIColorMatrix, createObj(props_33, 1), ...children_33);
          }, mapInput_17, model_17, content_17);
        };

      case 35:
        const mapInput_18 = function (_arg20) {
          const $var20 = _arg20[0].tag === 1 ? _arg20[1].tag === 0 ? [0] : [1] : [1];

          switch ($var20[0]) {
            case 0:
              const input_21 = _arg20[1].data;
              return new Props.CIHueAdjustProps(1, input_21.Convert(input_21.Value));

            case 1:
              return null;
          }
        };

        return function (model_18, content_18) {
          return view_1(function (props_34, children_34) {
            return createElement(CIHueAdjust, createObj(props_34, 1), ...children_34);
          }, mapInput_18, model_18, content_18);
        };

      case 36:
        return emptyView(function (props_35, children_35) {
          return createElement(CIMaskToAlpha, createObj(props_35, 1), ...children_35);
        });

      case 37:
        return emptyView(function (props_36, children_36) {
          return createElement(CIMaximumComponent, createObj(props_36, 1), ...children_36);
        });

      case 38:
        return emptyView(function (props_37, children_37) {
          return createElement(CIMinimumComponent, createObj(props_37, 1), ...children_37);
        });

      case 39:
        return emptyView(function (props_38, children_38) {
          return createElement(CIPhotoEffectChrome, createObj(props_38, 1), ...children_38);
        });

      case 40:
        return emptyView(function (props_39, children_39) {
          return createElement(CIPhotoEffectFade, createObj(props_39, 1), ...children_39);
        });

      case 41:
        return emptyView(function (props_40, children_40) {
          return createElement(CIPhotoEffectInstant, createObj(props_40, 1), ...children_40);
        });

      case 42:
        return emptyView(function (props_41, children_41) {
          return createElement(CIPhotoEffectMono, createObj(props_41, 1), ...children_41);
        });

      case 43:
        return emptyView(function (props_42, children_42) {
          return createElement(CIPhotoEffectNoir, createObj(props_42, 1), ...children_42);
        });

      case 44:
        return emptyView(function (props_43, children_43) {
          return createElement(CIPhotoEffectProcess, createObj(props_43, 1), ...children_43);
        });

      case 45:
        return emptyView(function (props_44, children_44) {
          return createElement(CIPhotoEffectTonal, createObj(props_44, 1), ...children_44);
        });

      case 46:
        return emptyView(function (props_45, children_45) {
          return createElement(CIPhotoEffectTransfer, createObj(props_45, 1), ...children_45);
        });

      case 47:
        const mapInput_19 = function (_arg21) {
          const $var21 = _arg21[0].tag === 3 ? _arg21[1].tag === 2 ? [0] : [3] : _arg21[0].tag === 5 ? _arg21[1].tag === 0 ? [1] : [3] : _arg21[0].tag === 10 ? _arg21[1].tag === 1 ? [2] : [3] : [3];

          switch ($var21[0]) {
            case 0:
              const input_22 = _arg21[1].data;
              return new Props.CIVignetteEffectProps(1, input_22.Convert(input_22.Value));

            case 1:
              const input_23 = _arg21[1].data;
              return new Props.CIVignetteEffectProps(2, input_23.Convert(input_23.Value));

            case 2:
              const input_24 = _arg21[1].data;
              return new Props.CIVignetteEffectProps(3, input_24.Convert(input_24.Value));

            case 3:
              return null;
          }
        };

        return function (model_19, content_19) {
          return view_1(function (props_46, children_46) {
            return createElement(CIVignetteEffect, createObj(props_46, 1), ...children_46);
          }, mapInput_19, model_19, content_19);
        };

      case 48:
        return emptyView(function (props_47, children_47) {
          return createElement(CIColorInvert, createObj(props_47, 1), ...children_47);
        });

      case 49:
        const mapInput_20 = function (_arg22) {
          const $var22 = _arg22[0].tag === 6 ? _arg22[1].tag === 0 ? [0] : [1] : [1];

          switch ($var22[0]) {
            case 0:
              const input_25 = _arg22[1].data;
              return new Props.CIColorPosterizeProps(1, input_25.Convert(input_25.Value));

            case 1:
              return null;
          }
        };

        return function (model_20, content_20) {
          return view_1(function (props_48, children_48) {
            return createElement(CIColorPosterize, createObj(props_48, 1), ...children_48);
          }, mapInput_20, model_20, content_20);
        };

      case 50:
        const mapInput_21 = function (_arg23) {
          const $var23 = _arg23[0].tag === 0 ? _arg23[1].tag === 0 ? [0] : [1] : [1];

          switch ($var23[0]) {
            case 0:
              const input_26 = _arg23[1].data;
              return new Props.CIVibranceProps(1, input_26.Convert(input_26.Value));

            case 1:
              return null;
          }
        };

        return function (model_21, content_21) {
          return view_1(function (props_49, children_49) {
            return createElement(CIVibrance, createObj(props_49, 1), ...children_49);
          }, mapInput_21, model_21, content_21);
        };

      case 51:
        const mapInput_22 = function (_arg24) {
          const $var24 = _arg24[0].tag === 3 ? _arg24[1].tag === 2 ? [0] : [3] : _arg24[0].tag === 13 ? _arg24[1].tag === 0 ? [1] : [3] : _arg24[0].tag === 14 ? _arg24[1].tag === 1 ? [2] : [3] : [3];

          switch ($var24[0]) {
            case 0:
              const input_27 = _arg24[1].data;
              return new Props.CICircularScreenProps(1, input_27.Convert(input_27.Value));

            case 1:
              const input_28 = _arg24[1].data;
              return new Props.CICircularScreenProps(2, input_28.Convert(input_28.Value));

            case 2:
              const input_29 = _arg24[1].data;
              return new Props.CICircularScreenProps(3, input_29.Convert(input_29.Value));

            case 3:
              return null;
          }
        };

        return function (model_22, content_22) {
          return view_1(function (props_50, children_50) {
            return createElement(CICircularScreen, createObj(props_50, 1), ...children_50);
          }, mapInput_22, model_22, content_22);
        };

      case 52:
        const mapInput_23 = function (_arg25) {
          const $var25 = _arg25[0].tag === 3 ? _arg25[1].tag === 2 ? [0] : [4] : _arg25[0].tag === 1 ? _arg25[1].tag === 0 ? [1] : [4] : _arg25[0].tag === 13 ? _arg25[1].tag === 0 ? [2] : [4] : _arg25[0].tag === 14 ? _arg25[1].tag === 1 ? [3] : [4] : [4];

          switch ($var25[0]) {
            case 0:
              const input_30 = _arg25[1].data;
              return new Props.CIDotScreenProps(1, input_30.Convert(input_30.Value));

            case 1:
              const input_31 = _arg25[1].data;
              return new Props.CIDotScreenProps(2, input_31.Convert(input_31.Value));

            case 2:
              const input_32 = _arg25[1].data;
              return new Props.CIDotScreenProps(3, input_32.Convert(input_32.Value));

            case 3:
              const input_33 = _arg25[1].data;
              return new Props.CIDotScreenProps(4, input_33.Convert(input_33.Value));

            case 4:
              return null;
          }
        };

        return function (model_23, content_23) {
          return view_1(function (props_51, children_51) {
            return createElement(CIDotScreen, createObj(props_51, 1), ...children_51);
          }, mapInput_23, model_23, content_23);
        };

      case 53:
        const mapInput_24 = function (_arg26) {
          let $var26;

          if (_arg26[0].tag === 3) {
            if (_arg26[1].tag === 2) {
              $var26 = [0, _arg26[1].data];
            } else {
              const activePatternResult471301 = _ResizeOutput___(_arg26[0], _arg26[1]);

              if (activePatternResult471301 != null) {
                $var26 = [3, getValue(activePatternResult471301)];
              } else {
                $var26 = [4];
              }
            }
          } else if (_arg26[0].tag === 10) {
            if (_arg26[1].tag === 1) {
              $var26 = [1, _arg26[1].data];
            } else {
              const activePatternResult471302 = _ResizeOutput___(_arg26[0], _arg26[1]);

              if (activePatternResult471302 != null) {
                $var26 = [3, getValue(activePatternResult471302)];
              } else {
                $var26 = [4];
              }
            }
          } else if (_arg26[0].tag === 12) {
            if (_arg26[1].tag === 0) {
              $var26 = [2, _arg26[1].data];
            } else {
              const activePatternResult471303 = _ResizeOutput___(_arg26[0], _arg26[1]);

              if (activePatternResult471303 != null) {
                $var26 = [3, getValue(activePatternResult471303)];
              } else {
                $var26 = [4];
              }
            }
          } else {
            const activePatternResult471304 = _ResizeOutput___(_arg26[0], _arg26[1]);

            if (activePatternResult471304 != null) {
              $var26 = [3, getValue(activePatternResult471304)];
            } else {
              $var26 = [4];
            }
          }

          switch ($var26[0]) {
            case 0:
              return new Props.CIBumpDistortionProps(2, $var26[1].Convert($var26[1].Value));

            case 1:
              return new Props.CIBumpDistortionProps(3, $var26[1].Convert($var26[1].Value));

            case 2:
              return new Props.CIBumpDistortionProps(4, $var26[1].Convert($var26[1].Value));

            case 3:
              return new Props.CIBumpDistortionProps(1, $var26[1]);

            case 4:
              return null;
          }
        };

        return function (model_24, content_24) {
          return view_1(function (props_52, children_52) {
            return createElement(CIBumpDistortion, createObj(props_52, 1), ...children_52);
          }, mapInput_24, model_24, content_24);
        };

      case 54:
        const mapInput_25 = function (_arg27) {
          const $var27 = _arg27[0].tag === 3 ? _arg27[1].tag === 2 ? [0] : [4] : _arg27[0].tag === 10 ? _arg27[1].tag === 1 ? [1] : [4] : _arg27[0].tag === 12 ? _arg27[1].tag === 0 ? [2] : [4] : _arg27[0].tag === 1 ? _arg27[1].tag === 0 ? [3] : [4] : [4];

          switch ($var27[0]) {
            case 0:
              const input_34 = _arg27[1].data;
              return new Props.CIBumpDistortionLinearProps(1, input_34.Convert(input_34.Value));

            case 1:
              const input_35 = _arg27[1].data;
              return new Props.CIBumpDistortionLinearProps(2, input_35.Convert(input_35.Value));

            case 2:
              const input_36 = _arg27[1].data;
              return new Props.CIBumpDistortionLinearProps(3, input_36.Convert(input_36.Value));

            case 3:
              const input_37 = _arg27[1].data;
              return new Props.CIBumpDistortionLinearProps(4, input_37.Convert(input_37.Value));

            case 4:
              return null;
          }
        };

        return function (model_25, content_25) {
          return view_1(function (props_53, children_53) {
            return createElement(CIBumpDistortionLinear, createObj(props_53, 1), ...children_53);
          }, mapInput_25, model_25, content_25);
        };

      case 55:
        const mapInput_26 = function (_arg28) {
          const $var28 = _arg28[0].tag === 3 ? _arg28[1].tag === 2 ? [0] : [2] : _arg28[0].tag === 10 ? _arg28[1].tag === 1 ? [1] : [2] : [2];

          switch ($var28[0]) {
            case 0:
              const input_38 = _arg28[1].data;
              return new Props.CICircleSplashDistortionProps(1, input_38.Convert(input_38.Value));

            case 1:
              const input_39 = _arg28[1].data;
              return new Props.CICircleSplashDistortionProps(2, input_39.Convert(input_39.Value));

            case 2:
              return null;
          }
        };

        return function (model_26, content_26) {
          return view_1(function (props_54, children_54) {
            return createElement(CICircleSplashDistortion, createObj(props_54, 1), ...children_54);
          }, mapInput_26, model_26, content_26);
        };

      case 56:
        const mapInput_27 = function (_arg29) {
          let $var29;

          if (_arg29[0].tag === 3) {
            if (_arg29[1].tag === 2) {
              $var29 = [0, _arg29[1].data];
            } else {
              const activePatternResult471308 = _ResizeOutput___(_arg29[0], _arg29[1]);

              if (activePatternResult471308 != null) {
                $var29 = [3, getValue(activePatternResult471308)];
              } else {
                $var29 = [4];
              }
            }
          } else if (_arg29[0].tag === 10) {
            if (_arg29[1].tag === 1) {
              $var29 = [1, _arg29[1].data];
            } else {
              const activePatternResult471309 = _ResizeOutput___(_arg29[0], _arg29[1]);

              if (activePatternResult471309 != null) {
                $var29 = [3, getValue(activePatternResult471309)];
              } else {
                $var29 = [4];
              }
            }
          } else if (_arg29[0].tag === 1) {
            if (_arg29[1].tag === 0) {
              $var29 = [2, _arg29[1].data];
            } else {
              const activePatternResult471310 = _ResizeOutput___(_arg29[0], _arg29[1]);

              if (activePatternResult471310 != null) {
                $var29 = [3, getValue(activePatternResult471310)];
              } else {
                $var29 = [4];
              }
            }
          } else {
            const activePatternResult471311 = _ResizeOutput___(_arg29[0], _arg29[1]);

            if (activePatternResult471311 != null) {
              $var29 = [3, getValue(activePatternResult471311)];
            } else {
              $var29 = [4];
            }
          }

          switch ($var29[0]) {
            case 0:
              return new Props.CICircularWrapProps(2, $var29[1].Convert($var29[1].Value));

            case 1:
              return new Props.CICircularWrapProps(3, $var29[1].Convert($var29[1].Value));

            case 2:
              return new Props.CICircularWrapProps(4, $var29[1].Convert($var29[1].Value));

            case 3:
              return new Props.CICircularWrapProps(1, $var29[1]);

            case 4:
              return null;
          }
        };

        return function (model_27, content_27) {
          return view_1(function (props_55, children_55) {
            return createElement(CICircularWrap, createObj(props_55, 1), ...children_55);
          }, mapInput_27, model_27, content_27);
        };

      case 57:
        const mapInput_28 = function (_arg30) {
          const $var30 = _arg30[0].tag === 13 ? _arg30[1].tag === 0 ? [0] : [1] : [1];

          switch ($var30[0]) {
            case 0:
              const input_40 = _arg30[1].data;
              return new Props.CISharpenLuminanceProps(1, input_40.Convert(input_40.Value));

            case 1:
              return null;
          }
        };

        return function (model_28, content_28) {
          return view_1(function (props_56, children_56) {
            return createElement(CISharpenLuminance, createObj(props_56, 1), ...children_56);
          }, mapInput_28, model_28, content_28);
        };

      case 58:
        const mapInput_29 = function (_arg31) {
          const $var31 = _arg31[0].tag === 10 ? _arg31[1].tag === 1 ? [0] : [2] : _arg31[0].tag === 5 ? _arg31[1].tag === 0 ? [1] : [2] : [2];

          switch ($var31[0]) {
            case 0:
              const input_41 = _arg31[1].data;
              return new Props.CIUnsharpMaskProps(1, input_41.Convert(input_41.Value));

            case 1:
              const input_42 = _arg31[1].data;
              return new Props.CIUnsharpMaskProps(2, input_42.Convert(input_42.Value));

            case 2:
              return null;
          }
        };

        return function (model_29, content_29) {
          return view_1(function (props_57, children_57) {
            return createElement(CIUnsharpMask, createObj(props_57, 1), ...children_57);
          }, mapInput_29, model_29, content_29);
        };

      case 59:
        const mapInput_30 = function (_arg32) {
          const $var32 = _arg32[0].tag === 10 ? _arg32[1].tag === 1 ? [0] : [2] : _arg32[0].tag === 3 ? _arg32[1].tag === 2 ? [1] : [2] : [2];

          switch ($var32[0]) {
            case 0:
              const input_43 = _arg32[1].data;
              return new Props.CICrystallizeProps(1, input_43.Convert(input_43.Value));

            case 1:
              const input_44 = _arg32[1].data;
              return new Props.CICrystallizeProps(2, input_44.Convert(input_44.Value));

            case 2:
              return null;
          }
        };

        return function (model_30, content_30) {
          return view_1(function (props_58, children_58) {
            return createElement(CICrystallize, createObj(props_58, 1), ...children_58);
          }, mapInput_30, model_30, content_30);
        };

      default:
        return emptyView(function (props_59, children_59) {
          return createElement(Normal, createObj(props_59, 1), ...children_59);
        });
    }
  })());
}
export function controls(_arg1) {
  return CurriedLambda((() => {
    switch (_arg1.tag) {
      case 1:
        const name_1 = name(new Model(1));
        return function (model, dispatch) {
          return controls_1(name_1, model, dispatch);
        };

      case 2:
        const name_2 = name(new Model(2));
        return function (model_1, dispatch_1) {
          return controls_1(name_2, model_1, dispatch_1);
        };

      case 3:
        const name_3 = name(new Model(3));
        return function (model_2, dispatch_2) {
          return controls_1(name_3, model_2, dispatch_2);
        };

      case 4:
        const name_4 = name(new Model(4));
        return function (model_3, dispatch_3) {
          return controls_1(name_4, model_3, dispatch_3);
        };

      case 5:
        const name_5 = name(new Model(5));
        return function (model_4, dispatch_4) {
          return controls_1(name_5, model_4, dispatch_4);
        };

      case 6:
        const name_6 = name(new Model(6));
        return function (model_5, dispatch_5) {
          return controls_1(name_6, model_5, dispatch_5);
        };

      case 7:
        const name_7 = name(new Model(7));
        return function (model_6, dispatch_6) {
          return controls_1(name_7, model_6, dispatch_6);
        };

      case 8:
        const name_8 = name(new Model(8));
        return function (model_7, dispatch_7) {
          return controls_1(name_8, model_7, dispatch_7);
        };

      case 9:
        const name_9 = name(new Model(9));
        return function (model_8, dispatch_8) {
          return controls_1(name_9, model_8, dispatch_8);
        };

      case 10:
        const name_10 = name(new Model(10));
        return function (model_9, dispatch_9) {
          return controls_1(name_10, model_9, dispatch_9);
        };

      case 11:
        const name_11 = name(new Model(11));
        return function (model_10, dispatch_10) {
          return controls_1(name_11, model_10, dispatch_10);
        };

      case 12:
        const name_12 = name(new Model(12));
        return function (model_11, dispatch_11) {
          return controls_1(name_12, model_11, dispatch_11);
        };

      case 13:
        const name_13 = name(new Model(13));
        return function (model_12, dispatch_12) {
          return controls_1(name_13, model_12, dispatch_12);
        };

      case 14:
        const name_14 = name(new Model(14));
        return function (model_13, dispatch_13) {
          return controls_1(name_14, model_13, dispatch_13);
        };

      case 15:
        const name_15 = name(new Model(15));
        return function (model_14, dispatch_14) {
          return controls_1(name_15, model_14, dispatch_14);
        };

      case 16:
        const name_16 = name(new Model(16));
        return function (model_15, dispatch_15) {
          return controls_1(name_16, model_15, dispatch_15);
        };

      case 17:
        const name_17 = name(new Model(17));
        return function (model_16, dispatch_16) {
          return controls_1(name_17, model_16, dispatch_16);
        };

      case 18:
        const name_18 = name(new Model(18));
        return function (model_17, dispatch_17) {
          return controls_1(name_18, model_17, dispatch_17);
        };

      case 19:
        const name_19 = name(new Model(19));
        return function (model_18, dispatch_18) {
          return controls_1(name_19, model_18, dispatch_18);
        };

      case 20:
        const name_20 = name(new Model(20));
        return function (model_19, dispatch_19) {
          return controls_1(name_20, model_19, dispatch_19);
        };

      case 21:
        const name_21 = name(new Model(21));
        return function (model_20, dispatch_20) {
          return controls_1(name_21, model_20, dispatch_20);
        };

      case 22:
        const name_22 = name(new Model(22));
        return function (model_21, dispatch_21) {
          return controls_1(name_22, model_21, dispatch_21);
        };

      case 23:
        const name_23 = name(new Model(23));
        return function (model_22, dispatch_22) {
          return controls_1(name_23, model_22, dispatch_22);
        };

      case 24:
        const name_24 = name(new Model(24));
        return function (model_23, dispatch_23) {
          return controls_1(name_24, model_23, dispatch_23);
        };

      case 25:
        const name_25 = name(new Model(25));
        return function (model_24, dispatch_24) {
          return controls_1(name_25, model_24, dispatch_24);
        };

      case 26:
        const name_26 = name(new Model(26));
        return function (model_25, dispatch_25) {
          return controls_1(name_26, model_25, dispatch_25);
        };

      case 27:
        const name_27 = name(new Model(27));
        return function (model_26, dispatch_26) {
          return controls_1(name_27, model_26, dispatch_26);
        };

      case 28:
        const name_28 = name(new Model(28));
        return function (model_27, dispatch_27) {
          return controls_1(name_28, model_27, dispatch_27);
        };

      case 29:
        const name_29 = name(new Model(29));
        return function (model_28, dispatch_28) {
          return controls_1(name_29, model_28, dispatch_28);
        };

      case 30:
        const name_30 = name(new Model(30));
        return function (model_29, dispatch_29) {
          return controls_1(name_30, model_29, dispatch_29);
        };

      case 31:
        const name_31 = name(new Model(31));
        return function (model_30, dispatch_30) {
          return controls_1(name_31, model_30, dispatch_30);
        };

      case 32:
        const name_32 = name(new Model(32));
        return function (model_31, dispatch_31) {
          return controls_1(name_32, model_31, dispatch_31);
        };

      case 33:
        const name_33 = name(new Model(33));
        return function (model_32, dispatch_32) {
          return controls_1(name_33, model_32, dispatch_32);
        };

      case 34:
        const name_34 = name(new Model(34));
        return function (model_33, dispatch_33) {
          return controls_1(name_34, model_33, dispatch_33);
        };

      case 35:
        const name_35 = name(new Model(35));
        return function (model_34, dispatch_34) {
          return controls_1(name_35, model_34, dispatch_34);
        };

      case 36:
        const name_36 = name(new Model(36));
        return function (model_35, dispatch_35) {
          return controls_1(name_36, model_35, dispatch_35);
        };

      case 37:
        const name_37 = name(new Model(37));
        return function (model_36, dispatch_36) {
          return controls_1(name_37, model_36, dispatch_36);
        };

      case 38:
        const name_38 = name(new Model(38));
        return function (model_37, dispatch_37) {
          return controls_1(name_38, model_37, dispatch_37);
        };

      case 39:
        const name_39 = name(new Model(39));
        return function (model_38, dispatch_38) {
          return controls_1(name_39, model_38, dispatch_38);
        };

      case 40:
        const name_40 = name(new Model(40));
        return function (model_39, dispatch_39) {
          return controls_1(name_40, model_39, dispatch_39);
        };

      case 41:
        const name_41 = name(new Model(41));
        return function (model_40, dispatch_40) {
          return controls_1(name_41, model_40, dispatch_40);
        };

      case 42:
        const name_42 = name(new Model(42));
        return function (model_41, dispatch_41) {
          return controls_1(name_42, model_41, dispatch_41);
        };

      case 43:
        const name_43 = name(new Model(43));
        return function (model_42, dispatch_42) {
          return controls_1(name_43, model_42, dispatch_42);
        };

      case 44:
        const name_44 = name(new Model(44));
        return function (model_43, dispatch_43) {
          return controls_1(name_44, model_43, dispatch_43);
        };

      case 45:
        const name_45 = name(new Model(45));
        return function (model_44, dispatch_44) {
          return controls_1(name_45, model_44, dispatch_44);
        };

      case 46:
        const name_46 = name(new Model(46));
        return function (model_45, dispatch_45) {
          return controls_1(name_46, model_45, dispatch_45);
        };

      case 47:
        const name_47 = name(new Model(47));
        return function (model_46, dispatch_46) {
          return controls_1(name_47, model_46, dispatch_46);
        };

      case 48:
        const name_48 = name(new Model(48));
        return function (model_47, dispatch_47) {
          return controls_1(name_48, model_47, dispatch_47);
        };

      case 49:
        const name_49 = name(new Model(49));
        return function (model_48, dispatch_48) {
          return controls_1(name_49, model_48, dispatch_48);
        };

      case 50:
        const name_50 = name(new Model(50));
        return function (model_49, dispatch_49) {
          return controls_1(name_50, model_49, dispatch_49);
        };

      case 51:
        const name_51 = name(new Model(51));
        return function (model_50, dispatch_50) {
          return controls_1(name_51, model_50, dispatch_50);
        };

      case 52:
        const name_52 = name(new Model(52));
        return function (model_51, dispatch_51) {
          return controls_1(name_52, model_51, dispatch_51);
        };

      case 53:
        const name_53 = name(new Model(53));
        return function (model_52, dispatch_52) {
          return controls_1(name_53, model_52, dispatch_52);
        };

      case 54:
        const name_54 = name(new Model(54));
        return function (model_53, dispatch_53) {
          return controls_1(name_54, model_53, dispatch_53);
        };

      case 55:
        const name_55 = name(new Model(55));
        return function (model_54, dispatch_54) {
          return controls_1(name_55, model_54, dispatch_54);
        };

      case 56:
        const name_56 = name(new Model(56));
        return function (model_55, dispatch_55) {
          return controls_1(name_56, model_55, dispatch_55);
        };

      case 57:
        const name_57 = name(new Model(57));
        return function (model_56, dispatch_56) {
          return controls_1(name_57, model_56, dispatch_56);
        };

      case 58:
        const name_58 = name(new Model(58));
        return function (model_57, dispatch_57) {
          return controls_1(name_58, model_57, dispatch_57);
        };

      case 59:
        const name_59 = name(new Model(59));
        return function (model_58, dispatch_58) {
          return controls_1(name_59, model_58, dispatch_58);
        };

      default:
        const name_60 = name(new Model(0));
        return function (model_59, dispatch_59) {
          return controls_1(name_60, model_59, dispatch_59);
        };
    }
  })());
}
const availableCommonFilters = [new Model(0), new Model(1), new Model(2), new Model(3), new Model(4), new Model(5), new Model(6), new Model(7), new Model(8), new Model(9), new Model(10), new Model(11), new Model(12), new Model(13), new Model(14), new Model(15), new Model(16), new Model(17), new Model(18), new Model(19), new Model(20), new Model(21), new Model(22), new Model(23)];
const availableAndroidFilters = Array.from(concat(ofArray([availableCommonFilters, [new Model(24)]])));
const availableIosFilters = Array.from(concat(ofArray([availableCommonFilters, [new Model(0), new Model(1), new Model(2), new Model(3), new Model(4), new Model(5), new Model(6), new Model(7), new Model(8), new Model(9), new Model(10), new Model(11), new Model(12), new Model(13), new Model(14), new Model(15), new Model(16), new Model(17), new Model(18), new Model(19), new Model(20), new Model(21), new Model(22), new Model(23), new Model(25), new Model(26), new Model(27), new Model(28), new Model(29), new Model(30), new Model(31), new Model(32), new Model(33), new Model(34), new Model(35), new Model(36), new Model(37), new Model(38), new Model(39), new Model(40), new Model(41), new Model(42), new Model(43), new Model(44), new Model(45), new Model(46), new Model(47), new Model(48), new Model(49), new Model(50), new Model(51), new Model(52), new Model(53), new Model(54), new Model(55), new Model(56), new Model(57), new Model(58), new Model(59)]])));
export const availableFilters = Platform.select(ofArray([new Platform.OS(0, availableIosFilters), new Platform.OS(1, availableAndroidFilters)]));