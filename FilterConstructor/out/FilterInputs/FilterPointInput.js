import { average } from "../Utils";
import CurriedLambda from "../fable-core/CurriedLambda";
import { sliderView, update as update_1, Model, init as init_1 } from "./FilterRangeInput";
import { Fragment, createElement } from "react";
import { printf } from "../fable-core/String";

function averagePoint(x1, y1, x2, y2) {
  return [average(x1, x2), average(y1, y2)];
}

export function init(name, toPoint) {
  return CurriedLambda(function (min, max) {
    return init_1(function (tupledArg, tupledArg_1) {
      return averagePoint(tupledArg[0], tupledArg[1], tupledArg_1[0], tupledArg_1[1]);
    }, toPoint, name, min, max);
  });
}

function updatePointX(model, x) {
  const Value = [x, model.Value[1]];
  return new Model(model.Name, Value, model.Min, model.Max, model.Convert);
}

function updatePointY(model, y) {
  const Value = [model.Value[0], y];
  return new Model(model.Name, Value, model.Min, model.Max, model.Convert);
}

export function update(message, model) {
  return update_1(message, model);
}
export function view(model, dispatch) {
  return createElement(Fragment, {}, sliderView(model, printf("%s.x"), function (tuple) {
    return tuple[0];
  }, updatePointX, dispatch), sliderView(model, printf("%s.y"), function (tuple_1) {
    return tuple_1[1];
  }, updatePointY, dispatch));
}