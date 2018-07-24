import { concat, map as map_1, ofArray } from "../fable-core/List";
import List from "../fable-core/List";
import CurriedLambda from "../fable-core/CurriedLambda";
import { startImmediate, catchAsync } from "../fable-core/Async";
import { singleton } from "../fable-core/AsyncBuilder";
export const Cmd = function (__exports) {
  const none = __exports.none = function () {
    return new List();
  };

  const ofMsg = __exports.ofMsg = function (msg) {
    return ofArray([function (dispatch) {
      dispatch(msg);
    }]);
  };

  const map = __exports.map = function (f, cmd) {
    return map_1(CurriedLambda(function (g) {
      return $var2 => g(function (dispatch) {
        return $var1 => dispatch(f($var1));
      }($var2));
    }), cmd);
  };

  const batch = __exports.batch = function (cmds) {
    return concat(cmds);
  };

  const ofAsync = __exports.ofAsync = function (task, arg, ofSuccess, ofError) {
    const bind = function (dispatch) {
      return function (builder_) {
        return builder_.Delay(function () {
          return builder_.Bind(catchAsync(task(arg)), function (_arg1) {
            dispatch(_arg1.tag === 1 ? ofError(_arg1.data) : ofSuccess(_arg1.data));
            return builder_.Zero();
          });
        });
      }(singleton);
    };

    return ofArray([$var3 => startImmediate(bind($var3))]);
  };

  const ofFunc = __exports.ofFunc = function (task, arg, ofSuccess, ofError) {
    const bind = function (dispatch) {
      try {
        return ($var4 => dispatch(ofSuccess($var4)))(task(arg));
      } catch (x) {
        return ($var5 => dispatch(ofError($var5)))(x);
      }
    };

    return ofArray([bind]);
  };

  const performFunc = __exports.performFunc = function (task, arg, ofSuccess) {
    const bind = function (dispatch) {
      try {
        ($var6 => dispatch(ofSuccess($var6)))(task(arg));
      } catch (x) {}
    };

    return ofArray([bind]);
  };

  const attemptFunc = __exports.attemptFunc = function (task, arg, ofError) {
    const bind = function (dispatch) {
      try {
        task(arg);
      } catch (x) {
        ($var7 => dispatch(ofError($var7)))(x);
      }
    };

    return ofArray([bind]);
  };

  const ofSub = __exports.ofSub = function (sub) {
    return ofArray([sub]);
  };

  const ofPromise = __exports.ofPromise = function (task, arg, ofSuccess, ofError) {
    const bind = function (dispatch) {
      task(arg).then($var9 => dispatch(ofSuccess($var9))).then(void 0, $var8 => dispatch(ofError($var8))), void 0;
    };

    return ofArray([bind]);
  };

  return __exports;
}({});