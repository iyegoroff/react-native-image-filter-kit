import { setType } from "./fable-core/Symbol";
import _Symbol from "./fable-core/Symbol";
import { createObj, makeGeneric, equalsRecords, Tuple, Array as _Array } from "./fable-core/Util";
import { view as view_1, init as init_1, selectImage, update as update_1, Message as Message_1, Model as Model_1 } from "./FilteredImage";
import { defaultImage, Model as Model_2 } from "./Image";
import { Message as Message_2 } from "./SelectModal";
import { Cmd } from "./fable/cmd";
import { partition, ofArray } from "./fable-core/List";
import List from "./fable-core/List";
import { tryFind } from "./fable-core/Seq";
import { getValue } from "./fable-core/Option";
import { map } from "./fable-core/Array";
import { Props } from "./Fable.Helpers.ReactNative";
import { Fragment, createElement } from "react";
import { FlatList, Button, View } from "react-native";
import CurriedLambda from "./fable-core/CurriedLambda";
import { WhitePortal, PortalProvider } from "react-native-portal";
import { view as view_2 } from "./ImageSelectModal";
import { imagePortal, filterPortal } from "./Constants";
import { Common } from "./fable/common";
export class Model {
  constructor(filteredImages, defaultImageSelectModalIsVisible, defaultImage, nextId) {
    this.FilteredImages = filteredImages;
    this.DefaultImageSelectModalIsVisible = defaultImageSelectModalIsVisible;
    this.DefaultImage = defaultImage;
    this.NextId = nextId | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "FilterConstructor.Main.Model",
      interfaces: ["FSharpRecord", "System.IEquatable"],
      properties: {
        FilteredImages: _Array(Tuple(["number", Model_1])),
        DefaultImageSelectModalIsVisible: "boolean",
        DefaultImage: Model_2,
        NextId: "number"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("FilterConstructor.Main.Model", Model);
export class Message {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "FilterConstructor.Main.Message",
      interfaces: ["FSharpUnion"],
      cases: [["AddFilteredImage"], ["ChangeAllImages"], ["FilteredImageMessage", "number", Message_1], ["ImageSelectModalMessage", makeGeneric(Message_2, {
        a: Model_2
      })]]
    };
  }

}
setType("FilterConstructor.Main.Message", Message);
export function init() {
  return [new Model([], false, defaultImage, 0), Cmd.none()];
}
export function update(message, model) {
  var FilteredImages;
  var NextId;

  if (message.tag === 1) {
    return [new Model(model.FilteredImages, true, model.DefaultImage, model.NextId), new List()];
  } else if (message.tag === 2) {
    const matchValue = tryFind(function (tupledArg) {
      return tupledArg[0] === message.data[0];
    }, model.FilteredImages);

    if (matchValue != null) {
      const image = getValue(matchValue)[1];

      if (message.data[1].tag === 0) {
        return [new Model(model.FilteredImages.filter(function (tupledArg_1) {
          return tupledArg_1[0] !== message.data[0];
        }), model.DefaultImageSelectModalIsVisible, model.DefaultImage, model.NextId), new List()];
      } else {
        const patternInput = update_1(message.data[1], image);
        return [new Model(map(function (tupledArg_2) {
          return [tupledArg_2[0], tupledArg_2[0] === message.data[0] ? patternInput[0] : tupledArg_2[1]];
        }, model.FilteredImages, Array), model.DefaultImageSelectModalIsVisible, model.DefaultImage, model.NextId), Cmd.map(function (sub) {
          return new Message(2, [message.data[0], sub]);
        }, patternInput[1])];
      }
    } else {
      return [model, new List()];
    }
  } else if (message.tag === 3) {
    if (message.data.tag === 0) {
      return [new Model(model.FilteredImages, false, model.DefaultImage, model.NextId), new List()];
    } else {
      const image_1 = message.data.data.data;
      const filteredImages = map(function (tupledArg_3) {
        return [tupledArg_3[0], selectImage(tupledArg_3[1], image_1)];
      }, model.FilteredImages, Array);
      return [new Model(filteredImages, model.DefaultImageSelectModalIsVisible, image_1, model.NextId), new List()];
    }
  } else {
    return [(FilteredImages = [[model.NextId, init_1(model.DefaultImage)]].concat(model.FilteredImages), NextId = model.NextId + 1 | 0, new Model(FilteredImages, model.DefaultImageSelectModalIsVisible, model.DefaultImage, NextId)), new List()];
  }
}
const separatorStyle = new Props.ViewProperties(8, ofArray([new Props.FlexStyle(20, 1.5)]));
const listContentStyle = new Props.FlatListProperties(5, ofArray([new Props.FlexStyle(37, 1.5 + "%"), new Props.FlexStyle(44, 25)]));
const listStyle = new Props.FlatListProperties(22, ofArray([new Props.ScrollViewStyle(1, "wheat")]));
export function separator() {
  return createElement(View, createObj(ofArray([separatorStyle]), 1));
}
export function view(model, dispatch) {
  var patternInput;

  const filteredImageDispatch = function (i, msg) {
    dispatch(new Message(2, [i, msg]));
  };

  const renderFilteredImage = function (tupledArg) {
    return view_1(tupledArg[1], CurriedLambda(filteredImageDispatch)(tupledArg[0]));
  };

  const listControls = function () {
    return createElement(Fragment, {}, createElement(Button, {
      title: "Change all images",
      onPress: function () {
        dispatch(new Message(1));
      }
    }), createElement(Button, {
      title: "Add filtered image",
      onPress: function () {
        dispatch(new Message(0));
      }
    }));
  };

  return createElement(PortalProvider, {}, view_2(model.DefaultImage, model.DefaultImageSelectModalIsVisible, $var1 => dispatch(function (arg0) {
    return new Message(3, arg0);
  }($var1))), function (name, children) {
    return createElement(WhitePortal, {
      name: name
    }, ...children);
  }(filterPortal, new List()), function (name_1, children_1) {
    return createElement(WhitePortal, {
      name: name_1
    }, ...children_1);
  }(imagePortal, new List()), (patternInput = partition(function (_arg1_1) {
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
  }, ofArray([listContentStyle, listStyle, new Props.FlatListProperties(20, function (item) {
    return Common.lazyView(renderFilteredImage)(item.item);
  }), new Props.FlatListProperties(0, separator), new Props.FlatListProperties(3, listControls), new Props.FlatListProperties(11, function (tupledArg_1, _arg1) {
    return tupledArg_1[0].toString();
  })])), createElement(FlatList, Object.assign({
    data: model.FilteredImages
  }, createObj(patternInput[1], 1), createObj(patternInput[0], 0)))));
}