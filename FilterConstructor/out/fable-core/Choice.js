import FSymbol from "./Symbol";
import { Any } from "./Util";
import { compareUnions, equalsUnions } from "./Util";
export function choice1Of2(v) {
  return new Choice(0, v);
}
export function choice2Of2(v) {
  return new Choice(1, v);
}
export default class Choice {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }
  get valueIfChoice1() {
    return this.tag === 0 ? this.data : null;
  }
  get valueIfChoice2() {
    return this.tag === 1 ? this.data : null;
  }
  Equals(other) {
    return equalsUnions(this, other);
  }
  CompareTo(other) {
    return compareUnions(this, other);
  }
  [FSymbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Core.FSharpChoice",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Choice1Of2", Any], ["Choice2Of2", Any]]
    };
  }
}