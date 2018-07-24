import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { createObj, compareUnions, equals, compareRecords, equalsRecords } from "../fable-core/Util";
import { ofArray } from "../fable-core/List";
import List from "../fable-core/List";
import { Props } from "../Fable.Helpers.ReactNative";
import { createElement } from "react";
import { Switch, Text as _Text, View } from "react-native";
import { printf, toText } from "../fable-core/String";
export class Model {
  constructor(name, value) {
    this.Name = name;
    this.Value = value;
  }

  [_Symbol.reflection]() {
    return {
      type: "FilterConstructor.FilterBooleanInput.Model",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        Name: "string",
        Value: "boolean"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

}
setType("FilterConstructor.FilterBooleanInput.Model", Model);
export class Message {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "FilterConstructor.FilterBooleanInput.Message",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["ValueChanged", "boolean"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("FilterConstructor.FilterBooleanInput.Message", Message);
export function init(name, value) {
  return new Model(name, value);
}
export function update(message, model) {
  return [new Model(model.Name, message.data), new List()];
}
const containerStyle = new Props.ViewProperties(8, ofArray([new Props.ScrollViewStyle(13, 1), new Props.ScrollViewStyle(7, 3), new Props.FlexStyle(37, 3), new Props.FlexStyle(24, 3), new Props.FlexStyle(16, "row"), new Props.FlexStyle(21, "space-between"), new Props.FlexStyle(1, "center"), new Props.ScrollViewStyle(1, "white")]));
export function view(model, dispatch) {
  return createElement(View, createObj(ofArray([containerStyle]), 1), createElement(_Text, {}, toText(printf("%s %b"))(model.Name, model.Value)), createElement(Switch, {
    value: model.Value,
    onValueChange: $var1 => dispatch(function (arg0) {
      return new Message(0, arg0);
    }($var1))
  }));
}