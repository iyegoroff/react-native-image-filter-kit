import CurriedLambda from "../fable-core/CurriedLambda";
import { sliderView, update as update_1, Model, init as init_1 } from "./FilterRangeInput";
import { average } from "../Utils";
import { printf } from "../fable-core/String";
export const init = CurriedLambda((() => {
  const convert = function (x) {
    return x;
  };

  return function (name, min, max) {
    return init_1(average, convert, name, min, max);
  };
})());

function updateScalar(model, scalar) {
  return new Model(model.Name, scalar, model.Min, model.Max, model.Convert);
}

export function update(message, model) {
  return update_1(message, model);
}
export function view(model, dispatch) {
  return sliderView(model, printf("%s"), function (x) {
    return x;
  }, updateScalar, dispatch);
}