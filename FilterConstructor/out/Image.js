import { setType } from "./fable-core/Symbol";
import _Symbol from "./fable-core/Symbol";
import { equals as equals_1, equalsRecords, Interface } from "./fable-core/Util";
import { printf, toText } from "./fable-core/String";
import { imageHeight } from "./Constants";

class Model_ {
  constructor(name, source) {
    this.Name = name;
    this.Source = source;
  }

  [_Symbol.reflection]() {
    return {
      type: "FilterConstructor.Image.Model'",
      interfaces: ["FSharpRecord", "System.IEquatable"],
      properties: {
        Name: "string",
        Source: Interface("Fable.Helpers.ReactNative.Props.IImageSource")
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}

export { Model_ as Model$27$ };
setType("FilterConstructor.Image.Model'", Model_);
export class Model {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "FilterConstructor.Image.Model",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["Concrete", Model_], ["Random", Model_]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals_1(this.data, other.data);
  }

}
setType("FilterConstructor.Image.Model", Model);

function _ImageModel_(_arg1) {
  if (_arg1.tag === 1) {
    return _arg1.data;
  } else {
    return _arg1.data;
  }
}

export { _ImageModel_ as $7C$ImageModel$7C$ };
export function name(_arg1) {
  const activePatternResult8405 = _ImageModel_(_arg1);

  return activePatternResult8405.Name;
}
export function source(_arg1) {
  const activePatternResult8407 = _ImageModel_(_arg1);

  return activePatternResult8407.Source;
}
export function equals(first, second) {
  const matchValue = [first, second];
  const $var1 = matchValue[0].tag === 1 ? matchValue[1].tag === 1 ? [0] : [1] : [1];

  switch ($var1[0]) {
    case 0:
      return true;

    case 1:
      return first.Equals(second);
  }
}
export function random() {
  const id = Math.round(Math.random() * 992);
  const timestamp = Date.now();
  const uri = toText(printf("https://picsum.photos/%f?image=%f&t=%f"))(imageHeight, id, timestamp);
  return new Model(1, new Model_("Random", {
    uri: uri
  }));
}
export const defaultImage = new Model(0, new Model_("Parrot", require("../parrot.png")));
export const availableImages = [defaultImage, new Model(0, new Model_("React logo", {
  uri: "https://pbs.twimg.com/profile_images/446356636710363136/OYIaJ1KK_400x400.png"
})), new Model(0, new Model_("Triangle", {
  uri: "http://thumbnails.visually.netdna-cdn.com/BizarreSierpinskiTriangle_510736b6b60fa.png"
})), random()];