import { Program as Program_1, ProgramModule } from "./fable/program";
import { Program } from "./fable/react-native";
import { view, update as update_1, init as init_1 } from "./Main";
import { Cmd } from "./fable/cmd";
import { hmrState, HMRModel, HMRMsg } from "./fable/hmr";
import { ofArray } from "./fable-core/List";
ProgramModule.run(Program.withReactNative("FilterConstructor", (() => {
  const $var1 = ProgramModule.withConsoleTrace(ProgramModule.mkProgram(init_1, update_1, view));

  if (!(module.hot == null)) {
    module.hot.accept(), void 0;
  }

  const map = function (tupledArg) {
    return [tupledArg[0], Cmd.map(function (arg0) {
      return new HMRMsg(0, arg0);
    }, tupledArg[1])];
  };

  const update = function (msg, model_2) {
    var patternInput;
    const patternInput_1 = map(msg.tag === 1 ? [new HMRModel(model_2.HMRCount + 1, model_2.UserModel), Cmd.none()] : (patternInput = $var1.update(msg.data, model_2.UserModel), [new HMRModel(model_2.HMRCount, patternInput[0]), patternInput[1]]));
    hmrState(patternInput_1[0]);
    return [patternInput_1[0], patternInput_1[1]];
  };

  const createModel = function (tupledArg_1) {
    return [new HMRModel(0, tupledArg_1[0]), tupledArg_1[1]];
  };

  const init = hmrState() == null ? $var3 => createModel(($var2 => map($var1.init($var2)))($var3)) : function () {
    return [hmrState(), Cmd.ofMsg(new HMRMsg(1))];
  };

  const subs = function (model_3) {
    return Cmd.batch(ofArray([Cmd.map(function (arg0_1) {
      return new HMRMsg(0, arg0_1);
    }, $var1.subscribe(model_3.UserModel))]));
  };

  const setState = function (model_4, dispatch_1) {
    $var1.setState(model_4.UserModel, $var4 => dispatch_1(function (arg0_2) {
      return new HMRMsg(0, arg0_2);
    }($var4)));
  };

  return new Program_1(init, update, subs, function (model_5, dispatch_2) {
    return $var1.view(model_5.UserModel, $var5 => dispatch_2(function (arg0_3) {
      return new HMRMsg(0, arg0_3);
    }($var5)));
  }, setState, $var1.onError);
})()));