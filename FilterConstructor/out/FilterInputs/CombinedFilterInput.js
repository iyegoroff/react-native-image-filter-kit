import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { compareUnions, equals, GenericParam } from "../fable-core/Util";
import { view as view_5, update as update_5, init } from "./FilterScalarInput";
import { view as view_1, update as update_1, init as init_1 } from "./FilterDistanceInput";
import { view as view_2, update as update_2, init as init_2 } from "./FilterPointInput";
import { view as view_3, update as update_3, init as init_3 } from "./FilterRGBAVectorInput";
import { view as view_4, update as update_4, init as init_4 } from "./FilterBooleanInput";
import { Cmd } from "../fable/cmd";
import List from "../fable-core/List";
export class Shape {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "FilterConstructor.CombinedFilterInput.Shape",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Scalar", GenericParam("scalar")], ["Distance", GenericParam("distance")], ["Point", GenericParam("point")], ["RGBAVector", GenericParam("rgbaVector")], ["Boolean", GenericParam("boolean")]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("FilterConstructor.CombinedFilterInput.Shape", Shape);
export function initScalar(min, max, name) {
  return new Shape(0, init(name, min, max));
}
export function initDistance(toDistance, min, max, name) {
  return new Shape(1, init_1(name, toDistance)(min, max));
}
export function initPoint(toPoint, min_0, min_1, max_0, max_1, name) {
  const min = [min_0, min_1];
  const max = [max_0, max_1];
  return new Shape(2, init_2(name, toPoint)(min, max));
}
export function initRGBAVector(min_0, min_1, min_2, min_3, max_0, max_1, max_2, max_3, name) {
  const min = [min_0, min_1, min_2, min_3];
  const max = [max_0, max_1, max_2, max_3];
  return new Shape(3, init_3(name, min, max));
}
export function initBoolean(name) {
  return new Shape(4, init_4(name, false));
}
export function update(message, model) {
  const matchValue = [model, message];

  if (matchValue[0].tag === 1) {
    if (matchValue[1].tag === 1) {
      const patternInput = update_1(matchValue[1].data, matchValue[0].data);
      return [new Shape(1, patternInput[0]), Cmd.map(function (arg0) {
        return new Shape(1, arg0);
      }, patternInput[1])];
    } else {
      return [model, new List()];
    }
  } else if (matchValue[0].tag === 2) {
    if (matchValue[1].tag === 2) {
      const patternInput_1 = update_2(matchValue[1].data, matchValue[0].data);
      return [new Shape(2, patternInput_1[0]), Cmd.map(function (arg0_1) {
        return new Shape(2, arg0_1);
      }, patternInput_1[1])];
    } else {
      return [model, new List()];
    }
  } else if (matchValue[0].tag === 3) {
    if (matchValue[1].tag === 3) {
      const patternInput_2 = update_3(matchValue[1].data, matchValue[0].data);
      return [new Shape(3, patternInput_2[0]), Cmd.map(function (arg0_2) {
        return new Shape(3, arg0_2);
      }, patternInput_2[1])];
    } else {
      return [model, new List()];
    }
  } else if (matchValue[0].tag === 4) {
    if (matchValue[1].tag === 4) {
      const patternInput_3 = update_4(matchValue[1].data, matchValue[0].data);
      return [new Shape(4, patternInput_3[0]), Cmd.map(function (arg0_3) {
        return new Shape(4, arg0_3);
      }, patternInput_3[1])];
    } else {
      return [model, new List()];
    }
  } else if (matchValue[1].tag === 0) {
    const patternInput_4 = update_5(matchValue[1].data, matchValue[0].data);
    return [new Shape(0, patternInput_4[0]), Cmd.map(function (arg0_4) {
      return new Shape(0, arg0_4);
    }, patternInput_4[1])];
  } else {
    return [model, new List()];
  }
}
export function view(model, dispatch) {
  switch (model.tag) {
    case 1:
      return view_1(model.data, $var1 => dispatch(function (arg0) {
        return new Shape(1, arg0);
      }($var1)));

    case 2:
      return view_2(model.data, $var2 => dispatch(function (arg0_1) {
        return new Shape(2, arg0_1);
      }($var2)));

    case 3:
      return view_3(model.data, $var3 => dispatch(function (arg0_2) {
        return new Shape(3, arg0_2);
      }($var3)));

    case 4:
      return view_4(model.data, $var4 => dispatch(function (arg0_3) {
        return new Shape(4, arg0_3);
      }($var4)));

    default:
      return view_5(model.data, $var5 => dispatch(function (arg0_4) {
        return new Shape(0, arg0_4);
      }($var5)));
  }
}