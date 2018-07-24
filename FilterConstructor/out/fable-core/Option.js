import { compare, equals, toString } from "./Util";
export class Some {
  constructor(value) {
    this.value = value;
  }
  // We don't prefix it with "Some" for consistency with erased options
  ToString() {
    return toString(this.value);
  }
  Equals(other) {
    if (other == null) {
      return false;
    } else {
      return equals(this.value, other instanceof Some ? other.value : other);
    }
  }
  CompareTo(other) {
    if (other == null) {
      return 1;
    } else {
      return compare(this.value, other instanceof Some ? other.value : other);
    }
  }
}
export function makeSome(x) {
  return x == null || x instanceof Some ? new Some(x) : x;
}
export function getValue(x, acceptNull) {
  if (x == null) {
    if (!acceptNull) {
      throw new Error("Option has no value");
    }
    return null;
  } else {
    return x instanceof Some ? x.value : x;
  }
}
export function defaultArg(arg, defaultValue, f) {
  return arg == null ? defaultValue : f != null ? f(getValue(arg)) : getValue(arg);
}
export function defaultArgWith(arg, defThunk) {
  return arg == null ? defThunk() : getValue(arg);
}
export function filter(predicate, arg) {
  return arg != null ? !predicate(getValue(arg)) ? null : arg : arg;
}