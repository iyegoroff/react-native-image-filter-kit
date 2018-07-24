import { createElement, Component } from "react";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { equals, extendInfo } from "../fable-core/Util";
import CurriedLambda from "../fable-core/CurriedLambda";
export const Components = function (__exports) {
  const LazyView = __exports.LazyView = class LazyView extends Component {
    [_Symbol.reflection]() {
      return extendInfo(LazyView, {
        type: "Elmish.React.Components.LazyView",
        interfaces: [],
        properties: {}
      });
    }

    constructor(props) {
      super(props);
    }

    shouldComponentUpdate(nextProps, _nextState) {
      return !this.props.equal(this.props.model, nextProps.model);
    }

    render() {
      return this.props.render();
    }

  };
  setType("Elmish.React.Components.LazyView", LazyView);
  return __exports;
}({});
export const Common = function (__exports) {
  const lazyViewWith = __exports.lazyViewWith = function (equal, view, state) {
    var render;
    return createElement(Components.LazyView, (render = function () {
      return view(state);
    }, {
      model: state,
      render: render,
      equal: equal
    }));
  };

  const lazyView2With = __exports.lazyView2With = function (equal, view, state, dispatch) {
    var render;
    return createElement(Components.LazyView, (render = function () {
      return view(state, dispatch);
    }, {
      model: state,
      render: render,
      equal: equal
    }));
  };

  const lazyView3With = __exports.lazyView3With = function (equal, view, state1, state2, dispatch) {
    var render;
    return createElement(Components.LazyView, (render = function () {
      return view(state1, state2, dispatch);
    }, {
      model: [state1, state2],
      render: render,
      equal: equal
    }));
  };

  const lazyView = __exports.lazyView = function (view) {
    var equal;
    return CurriedLambda((equal = equals, function (state) {
      return lazyViewWith(equal, view, state);
    }));
  };

  const lazyView2 = __exports.lazyView2 = function (view) {
    var equal;
    return CurriedLambda((equal = equals, function (state, dispatch) {
      return lazyView2With(equal, view, state, dispatch);
    }));
  };

  const lazyView3 = __exports.lazyView3 = function (view) {
    var equal;
    return CurriedLambda((equal = equals, function (state1, state2, dispatch) {
      return lazyView3With(equal, view, state1, state2, dispatch);
    }));
  };

  return __exports;
}({});