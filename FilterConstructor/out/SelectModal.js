import { setType } from "./fable-core/Symbol";
import _Symbol from "./fable-core/Symbol";
import { view as view_1, Message as Message_1 } from "./Select";
import { compareUnions, equals as equals_1, makeGeneric, GenericParam } from "./fable-core/Util";
import { createElement } from "react";
import { Modal } from "react-native";
export class Message {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "FilterConstructor.SelectModal.Message",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Hide"], ["SelectMessage", makeGeneric(Message_1, {
        a: GenericParam("a")
      })]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals_1(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("FilterConstructor.SelectModal.Message", Message);
export function view(items, selected, itemKey, equals, isVisible, dispatch) {
  return createElement(Modal, {
    visible: isVisible,
    onRequestClose: function () {
      dispatch(new Message(0));
    }
  }, view_1(items, selected, itemKey, equals, function (msg) {
    dispatch(new Message(1, msg));
    dispatch(new Message(0));
  }));
}