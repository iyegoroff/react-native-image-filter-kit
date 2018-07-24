import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { Unit, makeGeneric, Tuple, GenericParam, Function as _Function } from "../fable-core/Util";
import { append, ofArray } from "../fable-core/List";
import List from "../fable-core/List";
import CurriedLambda from "../fable-core/CurriedLambda";
import { Cmd } from "./cmd";
import { toConsole, onError as onError_1 } from "./prelude";
import { start } from "../fable-core/MailboxProcessor";
import { iterate } from "../fable-core/Seq";
import { singleton } from "../fable-core/AsyncBuilder";
export class Program {
  constructor(init, update, subscribe, view, setState, onError) {
    this.init = init;
    this.update = update;
    this.subscribe = subscribe;
    this.view = view;
    this.setState = setState;
    this.onError = onError;
  }

  [_Symbol.reflection]() {
    return {
      type: "Elmish.Program",
      interfaces: ["FSharpRecord"],
      properties: {
        init: _Function([GenericParam("arg"), Tuple([GenericParam("model"), makeGeneric(List, {
          T: _Function([_Function([GenericParam("msg"), Unit]), Unit])
        })])]),
        update: _Function([GenericParam("msg"), GenericParam("model"), Tuple([GenericParam("model"), makeGeneric(List, {
          T: _Function([_Function([GenericParam("msg"), Unit]), Unit])
        })])]),
        subscribe: _Function([GenericParam("model"), makeGeneric(List, {
          T: _Function([_Function([GenericParam("msg"), Unit]), Unit])
        })]),
        view: _Function([GenericParam("model"), _Function([GenericParam("msg"), Unit]), GenericParam("view")]),
        setState: _Function([GenericParam("model"), _Function([GenericParam("msg"), Unit]), Unit]),
        onError: _Function([Tuple(["string", Error]), Unit])
      }
    };
  }

}
setType("Elmish.Program", Program);
export const ProgramModule = function (__exports) {
  const mkProgram = __exports.mkProgram = function (init, update, view) {
    const setState = CurriedLambda(function (model) {
      return $var1 => function (value) {
        value, void 0;
      }(CurriedLambda(view)(model)($var1));
    });
    return new Program(init, update, function (_arg1) {
      return Cmd.none();
    }, view, setState, function (tupledArg) {
      onError_1(tupledArg[0], tupledArg[1]);
    });
  };

  const mkSimple = __exports.mkSimple = function (init, update, view) {
    const init_1 = $var2 => {
      return function (state) {
        return [state, Cmd.none()];
      }(init($var2));
    };

    const update_1 = CurriedLambda(function (msg) {
      return $var3 => function (state_1) {
        return [state_1, Cmd.none()];
      }(CurriedLambda(update)(msg)($var3));
    });
    const setState = CurriedLambda(function (model) {
      return $var4 => function (value) {
        value, void 0;
      }(CurriedLambda(view)(model)($var4));
    });
    return new Program(init_1, update_1, function (_arg1) {
      return Cmd.none();
    }, view, setState, function (tupledArg) {
      onError_1(tupledArg[0], tupledArg[1]);
    });
  };

  const withSubscription = __exports.withSubscription = function (subscribe, program) {
    const sub = function (model) {
      return Cmd.batch(ofArray([program.subscribe(model), subscribe(model)]));
    };

    return new Program(program.init, program.update, sub, program.view, program.setState, program.onError);
  };

  const withConsoleTrace = __exports.withConsoleTrace = function (program) {
    const traceInit = function (arg) {
      const patternInput = program.init(arg);
      toConsole("Initial state:", patternInput[0]);
      return [patternInput[0], patternInput[1]];
    };

    const traceUpdate = function (msg, model) {
      toConsole("New message:", msg);
      const patternInput_1 = program.update(msg, model);
      toConsole("Updated state:", patternInput_1[0]);
      return [patternInput_1[0], patternInput_1[1]];
    };

    return new Program(traceInit, traceUpdate, program.subscribe, program.view, program.setState, program.onError);
  };

  const withTrace = __exports.withTrace = function (trace, program) {
    const update = function (msg, model) {
      trace(msg, model);
      return program.update(msg, model);
    };

    return new Program(program.init, update, program.subscribe, program.view, program.setState, program.onError);
  };

  const withErrorHandler = __exports.withErrorHandler = function (onError, program) {
    return new Program(program.init, program.update, program.subscribe, program.view, program.setState, onError);
  };

  const runWith = __exports.runWith = function (arg, program) {
    const patternInput = program.init(arg);
    const inbox = start(function (mb) {
      const loop = function (state) {
        return function (builder_) {
          return builder_.Delay(function () {
            return builder_.Bind(mb.receive(), function (_arg1) {
              let newState;

              try {
                const patternInput_1 = program.update(_arg1, state);
                program.setState(patternInput_1[0], mb.post.bind(mb));
                iterate(function (sub) {
                  sub(mb.post.bind(mb));
                }, patternInput_1[1]);
                newState = patternInput_1[0];
              } catch (ex) {
                program.onError(["Unable to process a message:", ex]);
                newState = state;
              }

              return builder_.ReturnFrom(loop(newState));
            });
          });
        }(singleton);
      };

      return loop(patternInput[0]);
    });
    program.setState(patternInput[0], inbox.post.bind(inbox));
    let sub_1;

    try {
      sub_1 = program.subscribe(patternInput[0]);
    } catch (ex_1) {
      program.onError(["Unable to subscribe:", ex_1]);
      sub_1 = Cmd.none();
    }

    iterate(function (sub_2) {
      sub_2(inbox.post.bind(inbox));
    }, append(sub_1, patternInput[1]));
  };

  const run = __exports.run = function (program) {
    runWith(null, program);
  };

  return __exports;
}({});