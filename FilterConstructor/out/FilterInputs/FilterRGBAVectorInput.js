import { average } from "../Utils";
import CurriedLambda from "../fable-core/CurriedLambda";
import { sliderView, update as update_1, Model, init as init_1 } from "./FilterRangeInput";
import { Fragment, createElement } from "react";
import { printf } from "../fable-core/String";

function averageRGBAVector(r0, g0, b0, a0, r1, g1, b1, a1) {
  return [average(r0, r1), average(g0, g1), average(b0, b1), average(a0, a1)];
}

export const init = CurriedLambda(function (name, min, max) {
  return init_1(function (tupledArg, tupledArg_1) {
    return averageRGBAVector(tupledArg[0], tupledArg[1], tupledArg[2], tupledArg[3], tupledArg_1[0], tupledArg_1[1], tupledArg_1[2], tupledArg_1[3]);
  }, function (tupledArg_2) {
    return [tupledArg_2[0], tupledArg_2[1], tupledArg_2[2], tupledArg_2[3]];
  }, name, min, max);
});

function updateRGBAVectorR(model, r) {
  const Value = [r, model.Value[1], model.Value[2], model.Value[3]];
  return new Model(model.Name, Value, model.Min, model.Max, model.Convert);
}

function updateRGBAVectorG(model, g) {
  const Value = [model.Value[0], g, model.Value[2], model.Value[3]];
  return new Model(model.Name, Value, model.Min, model.Max, model.Convert);
}

function updateRGBAVectorB(model, b) {
  const Value = [model.Value[0], model.Value[1], b, model.Value[3]];
  return new Model(model.Name, Value, model.Min, model.Max, model.Convert);
}

function updateRGBAVectorA(model, a) {
  const Value = [model.Value[0], model.Value[1], model.Value[2], a];
  return new Model(model.Name, Value, model.Min, model.Max, model.Convert);
}

export function update(message, model) {
  return update_1(message, model);
}
export function view(model, dispatch) {
  return createElement(Fragment, {}, sliderView(model, printf("%s.r"), function (tupledArg) {
    return tupledArg[0];
  }, updateRGBAVectorR, dispatch), sliderView(model, printf("%s.g"), function (tupledArg_1) {
    return tupledArg_1[1];
  }, updateRGBAVectorG, dispatch), sliderView(model, printf("%s.b"), function (tupledArg_2) {
    return tupledArg_2[2];
  }, updateRGBAVectorB, dispatch), sliderView(model, printf("%s.a"), function (tupledArg_3) {
    return tupledArg_3[3];
  }, updateRGBAVectorA, dispatch));
}