import { extendInfo, createAtom } from "../fable-core/Util";
import { Component } from "react";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { getValue } from "../fable-core/Option";
import { AppRegistry as AppRegistry_1 } from "react-native";
import { Program as Program_1 } from "./program";
export const Components = function (__exports) {
  let appState = __exports.appState = createAtom(null);
  const App = __exports.App = class App extends Component {
    [_Symbol.reflection]() {
      return extendInfo(App, {
        type: "Elmish.ReactNative.Components.App",
        interfaces: [],
        properties: {}
      });
    }

    constructor(props) {
      var setState;
      var objectArg;
      super(props);
      this["init@16-1"] = 1;

      if (appState() != null) {
        const state = getValue(appState());
        appState((setState = (objectArg = this, arg00 => {
          this.state = arg00;
        }), {
          render: state.render,
          setState: setState
        }));
        this.state = state;
      } else {
        throw new Error("was Elmish.ReactNative.Program.withReactNative called?");
      }
    }

    componentDidMount() {
      var inputRecord;
      var setState;
      return appState((inputRecord = getValue(appState()), setState = arg00 => {
        this.setState(arg00);
      }, {
        render: inputRecord.render,
        setState: setState
      }));
    }

    componentWillUnmount() {
      var inputRecord;
      var setState;
      return appState((inputRecord = getValue(appState()), setState = value => {
        value, void 0;
      }, {
        render: this.state.render,
        setState: setState
      }));
    }

    render() {
      return this.state.render();
    }

  };
  setType("Elmish.ReactNative.Components.App", App);
  return __exports;
}({});
export const AppRegistry = AppRegistry_1;
export const Program = function (__exports) {
  const withReactNative = __exports.withReactNative = function (appKey, program) {
    AppRegistry_1.registerComponent(appKey, function () {
      return Components.App;
    });

    const render = function (m, d) {
      if (Components.appState() != null) {
        const state = getValue(Components.appState());
        state.setState({
          render: function () {
            return program.view(m, d);
          },
          setState: state.setState
        });
      } else {
        Components.appState({
          render: function () {
            return program.view(m, d);
          },
          setState: function (value) {
            value, void 0;
          }
        });
      }
    };

    return new Program_1(program.init, program.update, program.subscribe, program.view, render, program.onError);
  };

  return __exports;
}({});