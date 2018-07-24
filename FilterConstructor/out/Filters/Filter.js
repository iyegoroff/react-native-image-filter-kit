import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { createObj, Tuple, Interface, makeGeneric, comparePrimitives } from "../fable-core/Util";
import { view as view_1, update as update_1, Shape } from "../FilterInputs/CombinedFilterInput";
import { Model, Message as Message_1 } from "../FilterInputs/FilterRangeInput";
import { Message as Message_2 } from "../FilterInputs/FilterBooleanInput";
import { choose, ofArray, map } from "../fable-core/List";
import List from "../fable-core/List";
import { printf, toText } from "../fable-core/String";
import { tryFind } from "../fable-core/Seq";
import { getValue } from "../fable-core/Option";
import { Cmd } from "../fable/cmd";
import { Props } from "../Fable.Helpers.ReactNative";
import { Fragment, createElement } from "react";
import { Button, Text as _Text, View } from "react-native";
export class Input {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "FilterConstructor.Filter.Input",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["InputAmount"], ["InputAngle"], ["InputBrightness"], ["InputCenter"], ["InputContrast"], ["InputIntensity"], ["InputLevels"], ["InputMinComponents"], ["InputMaxComponents"], ["InputNoiseLevel"], ["InputRadius"], ["InputSaturation"], ["InputScale"], ["InputSharpness"], ["InputWidth"], ["InputRVector"], ["InputGVector"], ["InputBVector"], ["InputAVector"], ["InputBiasVector"], ["Value"], ["ResizeOutput"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("FilterConstructor.Filter.Input", Input);
export class Message {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "FilterConstructor.Filter.Message",
      interfaces: ["FSharpUnion"],
      cases: [["FilterInputMessage", Input, makeGeneric(Shape, {
        scalar: makeGeneric(Message_1, {
          model: makeGeneric(Model, {
            v: "number",
            r: "number"
          })
        }),
        distance: makeGeneric(Message_1, {
          model: makeGeneric(Model, {
            v: Interface("Fable.Helpers.ReactNativeImageFilterKit.Props.IDistance"),
            r: "number"
          })
        }),
        point: makeGeneric(Message_1, {
          model: makeGeneric(Model, {
            v: Interface("Fable.Helpers.ReactNativeImageFilterKit.Props.IPoint"),
            r: Tuple(["number", "number"])
          })
        }),
        rgbaVector: makeGeneric(Message_1, {
          model: makeGeneric(Model, {
            v: Interface("Fable.Helpers.ReactNativeImageFilterKit.Props.IRGBAVector"),
            r: Tuple(["number", "number", "number", "number"])
          })
        }),
        boolean: Message_2
      })], ["MoveUp"], ["MoveDown"], ["Delete"]]
    };
  }

}
setType("FilterConstructor.Filter.Message", Message);
export function init(inputs) {
  return map(function (tupledArg) {
    return [tupledArg[0], tupledArg[1](toText(printf("%A"))(tupledArg[0]))];
  }, inputs);
}
export function update(message, model) {
  const $var1 = message.tag === 1 ? [1] : message.tag === 2 ? [1] : message.tag === 3 ? [1] : [0];

  switch ($var1[0]) {
    case 0:
      const matchValue = tryFind(function (tupledArg) {
        return message.data[0].Equals(tupledArg[0]);
      }, model);

      if (matchValue == null) {
        return [model, new List()];
      } else {
        const inputModel = getValue(matchValue)[1];
        const patternInput = update_1(message.data[1], inputModel);
        return [map(function (tupledArg_1) {
          return [tupledArg_1[0], message.data[0].Equals(tupledArg_1[0]) ? patternInput[0] : tupledArg_1[1]];
        }, model), Cmd.map(function (sub) {
          return new Message(0, [message.data[0], sub]);
        }, patternInput[1])];
      }

    case 1:
      return [model, new List()];
  }
}
const controlsContainer = new Props.ViewProperties(8, ofArray([new Props.FlexStyle(40, 3), new Props.FlexStyle(44, 3), new Props.FlexStyle(24, 2), new Props.ScrollViewStyle(7, 3), new Props.ScrollViewStyle(13, 1), new Props.ScrollViewStyle(1, "gainsboro")]));
const titleStyle = new Props.TextProperties(5, ofArray([new Props.TextStyle(4, "bold")]));
const controlButtonsStyle = new Props.ViewProperties(8, ofArray([new Props.FlexStyle(16, "row"), new Props.FlexStyle(21, "space-between")]));
export function view(filterComponent, mapInput, model, content) {
  return filterComponent(choose(function (x) {
    return x;
  }, function (list) {
    return map(mapInput, list);
  }(model)), ofArray([content]));
}
export function controls(name, model, dispatch) {
  const dispatch_ = $var2 => {
    return dispatch(function (tupledArg) {
      return new Message(0, [tupledArg[0], tupledArg[1]]);
    }($var2));
  };

  const sliders = map(function (tupledArg_1) {
    return view_1(tupledArg_1[1], function (msg) {
      dispatch_([tupledArg_1[0], msg]);
    });
  }, model);
  return createElement(View, createObj(ofArray([controlsContainer]), 1), createElement(_Text, createObj(ofArray([titleStyle]), 1), name), createElement(Fragment, {}, ...sliders), createElement(View, createObj(ofArray([controlButtonsStyle]), 1), createElement(Button, {
    title: "Move Up",
    onPress: function () {
      dispatch(new Message(1));
    }
  }), createElement(Button, {
    title: "Move Down",
    onPress: function () {
      dispatch(new Message(2));
    }
  }), createElement(Button, {
    title: "Delete",
    color: "red",
    onPress: function () {
      dispatch(new Message(3));
    }
  })));
}