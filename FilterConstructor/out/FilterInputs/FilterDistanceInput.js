import CurriedLambda from "../fable-core/CurriedLambda";
import { sliderView, update as update_1, Model, init as init_1 } from "./FilterRangeInput";
import { average } from "../Utils";
import { printf } from "../fable-core/String";
export function init(name, toDistance) {
  return CurriedLambda(function (min, max) {
    return init_1(average, toDistance, name, min, max);
  });
}

function updateDistance(model, distance) {
  return new Model(model.Name, distance, model.Min, model.Max, model.Convert);
}

export function update(message, model) {
  return update_1(message, model);
}
export function view(model, dispatch) {
  return sliderView(model, printf("%s"), function (x) {
    return x;
  }, updateDistance, dispatch);
}