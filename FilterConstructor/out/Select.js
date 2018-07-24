import { setType } from "./fable-core/Symbol";
import _Symbol from "./fable-core/Symbol";
import { createObj, compareUnions, equals as equals_1, GenericParam } from "./fable-core/Util";
import { Platform, Props } from "./Fable.Helpers.ReactNative";
import { partition, ofArray } from "./fable-core/List";
import List from "./fable-core/List";
import { createElement } from "react";
import { FlatList, Text as _Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import CurriedLambda from "./fable-core/CurriedLambda";
import { getValue } from "./fable-core/Option";
import { Common } from "./fable/common";
export class Message {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "FilterConstructor.Select.Message",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["ItemSelected", GenericParam("a")]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals_1(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("FilterConstructor.Select.Message", Message);
const itemStyle = new Props.ViewProperties(8, ofArray([new Props.FlexStyle(37, 15)]));
const selectedStyle = new Props.TextProperties(5, ofArray([new Props.TextStyle(4, "bold"), new Props.TextStyle(8, "underline")]));
const separatorStyle = new Props.ViewProperties(8, ofArray([new Props.FlexStyle(20, 1), new Props.FlexStyle(50, 95 + "%"), new Props.FlexStyle(2, "center"), new Props.ScrollViewStyle(1, "lightgray")]));

function separator() {
  return createElement(View, createObj(ofArray([separatorStyle]), 1));
}

const touchable = CurriedLambda(Platform.select(ofArray([new Platform.OS(0, CurriedLambda(function (onPress) {
  const props = ofArray([new Props.TouchableWithoutFeedbackProperties(8, onPress)]);
  return function (children) {
    return createElement(TouchableOpacity, createObj(props, 1), ...children);
  };
})), new Platform.OS(1, CurriedLambda(function (onPress_1) {
  const props_1 = ofArray([new Props.TouchableWithoutFeedbackProperties(8, onPress_1)]);
  return function (children_1) {
    return createElement(TouchableNativeFeedback, createObj(props_1, 1), ...children_1);
  };
}))])));
export function view(items, selected, itemKey, equals, dispatch) {
  const renderItem = function (item) {
    let style;
    const $var1 = selected != null ? equals(item, getValue(selected)) ? [0, getValue(selected)] : [1] : [1];

    switch ($var1[0]) {
      case 0:
        style = ofArray([selectedStyle]);
        break;

      case 1:
        style = new List();
        break;
    }

    return touchable(function () {
      dispatch(new Message(0, item));
    }, ofArray([createElement(View, createObj(ofArray([itemStyle]), 1), createElement(_Text, createObj(style, 1), itemKey(item)))]));
  };

  const patternInput = partition(function (_arg1_1) {
    switch (_arg1_1.tag) {
      case 0:
        return true;

      case 1:
        return true;

      case 2:
        return true;

      case 3:
        return true;

      default:
        return false;
    }
  }, ofArray([new Props.FlatListProperties(20, function (item_1) {
    return Common.lazyView(renderItem)(item_1.item);
  }), new Props.FlatListProperties(0, separator), new Props.FlatListProperties(6, selected), new Props.FlatListProperties(11, function (item_2, _arg1) {
    return itemKey(item_2);
  })]));
  return createElement(FlatList, Object.assign({
    data: items
  }, createObj(patternInput[1], 1), createObj(patternInput[0], 0)));
}