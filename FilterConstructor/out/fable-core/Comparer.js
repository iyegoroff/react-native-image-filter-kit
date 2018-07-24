import FSymbol from "./Symbol";
import { compare } from "./Util";
export default class Comparer {
  constructor(f) {
    this.Compare = f || compare;
  }
  [FSymbol.reflection]() {
    return { interfaces: ["System.IComparer"] };
  }
}
export function fromEqualityComparer(comparer) {
  // Sometimes IEqualityComparer also implements IComparer
  if (typeof comparer.Compare === "function") {
    return new Comparer(comparer.Compare);
  } else {
    return new Comparer((x, y) => {
      const xhash = comparer.GetHashCode(x);
      const yhash = comparer.GetHashCode(y);
      if (xhash === yhash) {
        return comparer.Equals(x, y) ? 0 : -1;
      } else {
        return xhash < yhash ? -1 : 1;
      }
    });
  }
}