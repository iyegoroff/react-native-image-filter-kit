import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { createObj, compareUnions, equals } from "../fable-core/Util";
import { Props } from "../Fable.Helpers.ReactNative";
import { ofArray } from "../fable-core/List";
import { createElement } from "react";
import { Slider, Text as _Text, View } from "react-native";
import { printf, toText } from "../fable-core/String";
export class Message {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "FilterConstructor.FilterInputSlider.Message",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["ValueChanged", "number"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("FilterConstructor.FilterInputSlider.Message", Message);
const containerStyle = new Props.ViewProperties(8, ofArray([new Props.ScrollViewStyle(13, 1), new Props.ScrollViewStyle(7, 3), new Props.FlexStyle(37, 3), new Props.FlexStyle(24, 3), new Props.ScrollViewStyle(1, "white")]));
const rangeLegendStyle = new Props.ViewProperties(8, ofArray([new Props.FlexStyle(16, "row"), new Props.FlexStyle(21, "space-between")]));
export function view(name, suffix, value, min, max, dispatch) {
  return createElement(View, createObj(ofArray([containerStyle]), 1), createElement(_Text, {}, toText(printf("%s %.2f"))(name, value)), createElement(Slider, {
    maximumValue: max,
    minimumValue: min,
    step: (min - max) / 100,
    value: value,
    onSlidingComplete: $var1 => dispatch(function (arg0) {
      return new Message(0, arg0);
    }($var1))
  }), createElement(View, createObj(ofArray([rangeLegendStyle]), 1), createElement(_Text, {}, toText(printf("%.2f%s"))(min, suffix)), createElement(_Text, {}, toText(printf("%.2f%s"))(max, suffix))));
}