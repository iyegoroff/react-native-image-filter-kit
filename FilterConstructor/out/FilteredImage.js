import { setType } from "./fable-core/Symbol";
import _Symbol from "./fable-core/Symbol";
import { source, Model as Model_1 } from "./Image";
import { createObj, equalsRecords, Interface, Tuple, makeGeneric } from "./fable-core/Util";
import { reverse, filter as filter_2, map as map_1, ofArray, append } from "./fable-core/List";
import List from "./fable-core/List";
import { view as view_1, controls as controls_1, init as init_1, Model as Model_2 } from "./Filters/CombinedFilter";
import { update as update_1, Message as Message_2, Input } from "./Filters/Filter";
import { Shape } from "./FilterInputs/CombinedFilterInput";
import { Model as Model_3 } from "./FilterInputs/FilterRangeInput";
import { Model as Model_4 } from "./FilterInputs/FilterBooleanInput";
import { Message as Message_1 } from "./SelectModal";
import { map } from "./fable-core/Array";
import { fold, findIndex, tryFind, tryFindIndex } from "./fable-core/Seq";
import { getValue } from "./fable-core/Option";
import { moveDownAt, moveUpAt } from "./Utils";
import { Cmd } from "./fable/cmd";
import { Props } from "./Fable.Helpers.ReactNative";
import { filterPortal, imagePortal, imageHeight } from "./Constants";
import { Fragment, createElement } from "react";
import { Button, ActivityIndicator, View, Image } from "react-native";
import { BlackPortal } from "react-native-portal";
import { view as view_2 } from "./ImageSelectModal";
import { view as view_3 } from "./FilterSelectModal";
import react_native_segmented_control_tab from "react-native-segmented-control-tab";
import { Props as Props_1 } from "./fable/Fable.Import.ReactNativeSegmentedControlTab";
export class Model {
  constructor(image, filters, imageSelectModalIsVisible, filterSelectModalIsVisible, selectedResizeMode, nextId) {
    this.Image = image;
    this.Filters = filters;
    this.ImageSelectModalIsVisible = imageSelectModalIsVisible;
    this.FilterSelectModalIsVisible = filterSelectModalIsVisible;
    this.SelectedResizeMode = selectedResizeMode;
    this.NextId = nextId | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "FilterConstructor.FilteredImage.Model",
      interfaces: ["FSharpRecord", "System.IEquatable"],
      properties: {
        Image: Model_1,
        Filters: makeGeneric(List, {
          T: Tuple(["number", Model_2, makeGeneric(List, {
            T: Tuple([Input, makeGeneric(Shape, {
              scalar: makeGeneric(Model_3, {
                v: "number",
                r: "number"
              }),
              distance: makeGeneric(Model_3, {
                v: Interface("Fable.Helpers.ReactNativeImageFilterKit.Props.IDistance"),
                r: "number"
              }),
              point: makeGeneric(Model_3, {
                v: Interface("Fable.Helpers.ReactNativeImageFilterKit.Props.IPoint"),
                r: Tuple(["number", "number"])
              }),
              rgbaVector: makeGeneric(Model_3, {
                v: Interface("Fable.Helpers.ReactNativeImageFilterKit.Props.IRGBAVector"),
                r: Tuple(["number", "number", "number", "number"])
              }),
              boolean: Model_4
            })])
          })])
        }),
        ImageSelectModalIsVisible: "boolean",
        FilterSelectModalIsVisible: "boolean",
        SelectedResizeMode: "string",
        NextId: "number"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("FilterConstructor.FilteredImage.Model", Model);
export class Message {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "FilterConstructor.FilteredImage.Message",
      interfaces: ["FSharpUnion"],
      cases: [["Delete"], ["ImageSelectModalMessage", makeGeneric(Message_1, {
        a: Model_1
      })], ["SelectImage"], ["FilterSelectModalMessage", makeGeneric(Message_1, {
        a: Model_2
      })], ["SelectFilter"], ["FilterMessage", "number", Message_2], ["ResizeModeChanged", "number"]]
    };
  }

}
setType("FilterConstructor.FilteredImage.Message", Message);
const resizeModes = ["contain", "cover", "stretch", "center", "repeat"];
const resizeControlValues = Array.from(map(function (value) {
  return value;
}, resizeModes, Array));
export function init(image) {
  return new Model(image, new List(), false, false, "contain", 0);
}
export function selectImage(model, image) {
  return new Model(image, model.Filters, model.ImageSelectModalIsVisible, model.FilterSelectModalIsVisible, model.SelectedResizeMode, model.NextId);
}
export function resizeControlIndex(model) {
  const matchValue = tryFindIndex(function (x) {
    return x === model.SelectedResizeMode;
  }, resizeModes);

  if (matchValue == null) {
    return 0;
  } else {
    return getValue(matchValue) | 0;
  }
}
export function update(message, model) {
  var Filters;
  var NextId;
  var SelectedResizeMode;

  switch (message.tag) {
    case 1:
      if (message.data.tag === 0) {
        return [new Model(model.Image, model.Filters, false, model.FilterSelectModalIsVisible, model.SelectedResizeMode, model.NextId), new List()];
      } else {
        const image = message.data.data.data;
        return [selectImage(model, image), new List()];
      }

    case 2:
      return [new Model(model.Image, model.Filters, true, model.FilterSelectModalIsVisible, model.SelectedResizeMode, model.NextId), new List()];

    case 3:
      if (message.data.tag === 0) {
        return [new Model(model.Image, model.Filters, model.ImageSelectModalIsVisible, false, model.SelectedResizeMode, model.NextId), new List()];
      } else {
        const filter = message.data.data.data;
        return [(Filters = append(model.Filters, ofArray([[model.NextId, filter, init_1(filter)]])), NextId = model.NextId + 1 | 0, new Model(model.Image, Filters, model.ImageSelectModalIsVisible, model.FilterSelectModalIsVisible, model.SelectedResizeMode, NextId)), new List()];
      }

    case 4:
      return [new Model(model.Image, model.Filters, model.ImageSelectModalIsVisible, true, model.SelectedResizeMode, model.NextId), new List()];

    case 5:
      const matchValue = tryFind(function (tupledArg) {
        return tupledArg[0] === message.data[0];
      }, model.Filters);

      if (matchValue != null) {
        const filter_1 = getValue(matchValue)[2];
        const patternInput = update_1(message.data[1], filter_1);
        const filters = map_1(function (tupledArg_1) {
          return [tupledArg_1[0], tupledArg_1[1], tupledArg_1[0] === message.data[0] ? patternInput[0] : tupledArg_1[2]];
        }, model.Filters);
        const filters_ = message.data[1].tag === 3 ? filter_2(function (tupledArg_2) {
          return tupledArg_2[0] !== message.data[0];
        }, filters) : message.data[1].tag === 2 ? moveUpAt(findIndex(function (tupledArg_3) {
          return tupledArg_3[0] === message.data[0];
        }, filters), filters) : message.data[1].tag === 1 ? moveDownAt(findIndex(function (tupledArg_4) {
          return tupledArg_4[0] === message.data[0];
        }, filters), filters) : filters;
        return [new Model(model.Image, filters_, model.ImageSelectModalIsVisible, model.FilterSelectModalIsVisible, model.SelectedResizeMode, model.NextId), Cmd.map(function (sub) {
          return new Message(5, [message.data[0], sub]);
        }, patternInput[1])];
      } else {
        return [model, new List()];
      }

    case 6:
      return [(SelectedResizeMode = resizeModes[message.data], new Model(model.Image, model.Filters, model.ImageSelectModalIsVisible, model.FilterSelectModalIsVisible, SelectedResizeMode, model.NextId)), new List()];

    default:
      return [model, new List()];
  }
}
export const containerStyle = new Props.ViewProperties(8, ofArray([new Props.FlexStyle(30, 5), new Props.FlexStyle(37, 5), new Props.ScrollViewStyle(13, 2), new Props.ScrollViewStyle(7, 3), new Props.ScrollViewStyle(1, "white")]));
export const imageStyle = new Props.ImageProperties(7, ofArray([new Props.FlexStyle(24, 5), new Props.FlexStyle(50, 100 + "%"), new Props.FlexStyle(20, imageHeight)]));
export const controlsStyle = new Props.ViewProperties(8, ofArray([new Props.FlexStyle(16, "row"), new Props.FlexStyle(21, "space-between")]));
export const spinnerStyle = new Props.ViewProperties(8, ofArray([new Props.FlexStyle(46, "absolute"), new Props.FlexStyle(50, 100 + "%"), new Props.FlexStyle(20, imageHeight), new Props.FlexStyle(22, 5), new Props.FlexStyle(49, 5)]));
export function controls(model, dispatch) {
  return createElement(Fragment, {}, ...map_1(function (tupledArg) {
    return controls_1(tupledArg[1])(tupledArg[2], function (msg) {
      dispatch([tupledArg[0], msg]);
    });
  }, reverse(model.Filters)));
}
export function filteredImage(model) {
  return fold(function (child, tupledArg) {
    return view_1(tupledArg[1])(tupledArg[2], child);
  }, createElement(Image, createObj(ofArray([imageStyle, new Props.ImageProperties(5, model.SelectedResizeMode), new Props.ImageProperties(6, source(model.Image))]), 1)), model.Filters);
}
export function view(model, dispatch) {
  return createElement(Fragment, {}, function (name, children) {
    return createElement(BlackPortal, {
      name: name
    }, ...children);
  }(imagePortal, ofArray([view_2(model.Image, model.ImageSelectModalIsVisible, $var1 => dispatch(function (arg0) {
    return new Message(1, arg0);
  }($var1)))])), function (name_1, children_1) {
    return createElement(BlackPortal, {
      name: name_1
    }, ...children_1);
  }(filterPortal, ofArray([view_3(model.FilterSelectModalIsVisible, $var2 => dispatch(function (arg0_1) {
    return new Message(3, arg0_1);
  }($var2)))])), createElement(View, createObj(ofArray([containerStyle, new Props.ActivityIndicator.ActivityIndicatorProperties(3, "large")]), 1), controls(model, $var3 => dispatch(function (tupledArg) {
    return new Message(5, [tupledArg[0], tupledArg[1]]);
  }($var3))), createElement(View, {}, createElement(ActivityIndicator, createObj(ofArray([spinnerStyle]), 1)), filteredImage(model)), createElement(react_native_segmented_control_tab, ofArray([new Props_1.SegmentedControlTabProps(0, resizeControlValues), new Props_1.SegmentedControlTabProps(15, $var4 => dispatch(function (arg0_2) {
    return new Message(6, arg0_2);
  }($var4))), new Props_1.SegmentedControlTabProps(1, resizeControlIndex(model))])), createElement(View, createObj(ofArray([controlsStyle]), 1), createElement(Button, {
    title: "Add filter",
    onPress: function () {
      dispatch(new Message(4));
    }
  }), createElement(Button, {
    title: "Change image",
    onPress: function () {
      dispatch(new Message(2));
    }
  }), createElement(Button, {
    title: "Delete",
    color: "red",
    onPress: function () {
      dispatch(new Message(0));
    }
  }))));
}