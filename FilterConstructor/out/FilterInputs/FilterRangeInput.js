import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { equals, Function as _Function, GenericParam } from "../fable-core/Util";
import { view, Message as Message_1 } from "./FilterInputSlider";
import { Cmd } from "../fable/cmd";
import List from "../fable-core/List";
import { toText } from "../fable-core/String";
import CurriedLambda from "../fable-core/CurriedLambda";
export class Model {
  constructor(name, value, min, max, convert) {
    this.Name = name;
    this.Value = value;
    this.Min = min;
    this.Max = max;
    this.Convert = convert;
  }

  [_Symbol.reflection]() {
    return {
      type: "FilterConstructor.FilterRangeInput.Model",
      interfaces: ["FSharpRecord"],
      properties: {
        Name: "string",
        Value: GenericParam("r"),
        Min: GenericParam("r"),
        Max: GenericParam("r"),
        Convert: _Function([GenericParam("r"), GenericParam("v")])
      }
    };
  }

  GetHashCode() {
    return 0;
  }

  Equals(yObj) {
    if (yObj instanceof Model) {
      if ((this.Name === yObj.Name ? equals(this.Value, yObj.Value) : false) ? equals(this.Min, yObj.Min) : false) {
        return equals(this.Max, yObj.Max);
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

}
setType("FilterConstructor.FilterRangeInput.Model", Model);
export class Message {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "FilterConstructor.FilterRangeInput.Message",
      interfaces: ["FSharpUnion"],
      cases: [["ValueChanged", GenericParam("model")], ["FilterInputSliderMessage", _Function(["number", GenericParam("model")]), Message_1]]
    };
  }

}
setType("FilterConstructor.FilterRangeInput.Message", Message);
export function init(average, convert, name, min, max) {
  return new Model(name, average(min, max), min, max, convert);
}
export function update(message, model) {
  if (message.tag === 1) {
    return [model, Cmd.ofMsg(new Message(0, message.data[0](message.data[1].data)))];
  } else {
    return [message.data, new List()];
  }
}
export function sliderView(model, namePattern, extractValue, updateValue, dispatch) {
  return view(toText(namePattern)(model.Name), "", extractValue(model.Value), extractValue(model.Min), extractValue(model.Max), function (msg) {
    dispatch(new Message(1, [CurriedLambda(updateValue)(model), msg]));
  });
}