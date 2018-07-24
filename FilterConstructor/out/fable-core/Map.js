import Comparer from "./Comparer";
import List from "./ListClass";
import { ofArray as listOfArray } from "./ListClass";
import { getValue, makeSome } from "./Option";
import { map as seqMap } from "./Seq";
import { fold as seqFold } from "./Seq";
import { pick as seqPick } from "./Seq";
import { tryPick as seqTryPick } from "./Seq";
import { compareWith as seqCompareWith } from "./Seq";
import FSymbol from "./Symbol";
import { toString } from "./Util";
import { equals } from "./Util";
import { compare } from "./Util";
// ----------------------------------------------
// These functions belong to Seq.ts but are
// implemented here to prevent cyclic dependencies
export function groupBy(f, xs) {
  const keys = [];
  const iter = xs[Symbol.iterator]();
  let acc = create();
  let cur = iter.next();
  while (!cur.done) {
    const k = f(cur.value);
    const vs = tryFind(k, acc);
    if (vs == null) {
      keys.push(k);
      acc = add(k, [cur.value], acc);
    } else {
      getValue(vs).push(cur.value);
    }
    cur = iter.next();
  }
  return keys.map(k => [k, acc.get(k)]);
}
export function countBy(f, xs) {
  return groupBy(f, xs).map(kv => [kv[0], kv[1].length]);
}
export class MapTree {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }
}
function tree_sizeAux(acc, m) {
  sizeAux: while (true) {
    if (m.tag === 1) {
      return acc + 1 | 0;
    } else if (m.tag === 2) {
      acc = tree_sizeAux(acc + 1, m.data[2]);
      m = m.data[3];
      continue sizeAux;
    } else {
      return acc | 0;
    }
  }
}
function tree_size(x) {
  return tree_sizeAux(0, x);
}
function tree_empty() {
  return new MapTree(0);
}
function tree_height(_arg1) {
  return _arg1.tag === 1 ? 1 : _arg1.tag === 2 ? _arg1.data[4] : 0;
}
function tree_isEmpty(m) {
  return m.tag === 0 ? true : false;
}
function tree_mk(l, k, v, r) {
  const matchValue = l.tag === 0 ? r.tag === 0 ? 0 : 1 : 1;
  switch (matchValue) {
    case 0:
      return new MapTree(1, [k, v]);
    case 1:
      const hl = tree_height(l) | 0;
      const hr = tree_height(r) | 0;
      const m = (hl < hr ? hr : hl) | 0;
      return new MapTree(2, [k, v, l, r, m + 1]);
  }
  throw new Error("internal error: Map.tree_mk");
}
function tree_rebalance(t1, k, v, t2) {
  const t1h = tree_height(t1);
  const t2h = tree_height(t2);
  if (t2h > t1h + 2) {
    if (t2.tag === 2) {
      if (tree_height(t2.data[2]) > t1h + 1) {
        if (t2.data[2].tag === 2) {
          return tree_mk(tree_mk(t1, k, v, t2.data[2].data[2]), t2.data[2].data[0], t2.data[2].data[1], tree_mk(t2.data[2].data[3], t2.data[0], t2.data[1], t2.data[3]));
        } else {
          throw new Error("rebalance");
        }
      } else {
        return tree_mk(tree_mk(t1, k, v, t2.data[2]), t2.data[0], t2.data[1], t2.data[3]);
      }
    } else {
      throw new Error("rebalance");
    }
  } else {
    if (t1h > t2h + 2) {
      if (t1.tag === 2) {
        if (tree_height(t1.data[3]) > t2h + 1) {
          if (t1.data[3].tag === 2) {
            return tree_mk(tree_mk(t1.data[2], t1.data[0], t1.data[1], t1.data[3].data[2]), t1.data[3].data[0], t1.data[3].data[1], tree_mk(t1.data[3].data[3], k, v, t2));
          } else {
            throw new Error("rebalance");
          }
        } else {
          return tree_mk(t1.data[2], t1.data[0], t1.data[1], tree_mk(t1.data[3], k, v, t2));
        }
      } else {
        throw new Error("rebalance");
      }
    } else {
      return tree_mk(t1, k, v, t2);
    }
  }
}
function tree_add(comparer, k, v, m) {
  if (m.tag === 1) {
    const c = comparer.Compare(k, m.data[0]);
    if (c < 0) {
      return new MapTree(2, [k, v, new MapTree(0), m, 2]);
    } else if (c === 0) {
      return new MapTree(1, [k, v]);
    }
    return new MapTree(2, [k, v, m, new MapTree(0), 2]);
  } else if (m.tag === 2) {
    const c = comparer.Compare(k, m.data[0]);
    if (c < 0) {
      return tree_rebalance(tree_add(comparer, k, v, m.data[2]), m.data[0], m.data[1], m.data[3]);
    } else if (c === 0) {
      return new MapTree(2, [k, v, m.data[2], m.data[3], m.data[4]]);
    }
    return tree_rebalance(m.data[2], m.data[0], m.data[1], tree_add(comparer, k, v, m.data[3]));
  }
  return new MapTree(1, [k, v]);
}
function tree_find(comparer, k, m) {
  const res = tree_tryFind(comparer, k, m);
  if (res == null) {
    throw new Error("key not found: " + k);
  }
  return getValue(res);
}
function tree_tryFind(comparer, k, m) {
  tryFind: while (true) {
    if (m.tag === 1) {
      const c = comparer.Compare(k, m.data[0]) | 0;
      if (c === 0) {
        return makeSome(m.data[1]);
      } else {
        return null;
      }
    } else if (m.tag === 2) {
      const c_1 = comparer.Compare(k, m.data[0]) | 0;
      if (c_1 < 0) {
        comparer = comparer;
        k = k;
        m = m.data[2];
        continue tryFind;
      } else if (c_1 === 0) {
        return makeSome(m.data[1]);
      } else {
        comparer = comparer;
        k = k;
        m = m.data[3];
        continue tryFind;
      }
    } else {
      return null;
    }
  }
}
function tree_partition1(comparer, f, k, v, acc1, acc2) {
  return f(k, v) ? [tree_add(comparer, k, v, acc1), acc2] : [acc1, tree_add(comparer, k, v, acc2)];
}
function tree_partitionAux(comparer, f, s, acc_0, acc_1) {
  const acc = [acc_0, acc_1];
  if (s.tag === 1) {
    return tree_partition1(comparer, f, s.data[0], s.data[1], acc[0], acc[1]);
  } else if (s.tag === 2) {
    const acc_2 = tree_partitionAux(comparer, f, s.data[3], acc[0], acc[1]);
    const acc_3 = tree_partition1(comparer, f, s.data[0], s.data[1], acc_2[0], acc_2[1]);
    return tree_partitionAux(comparer, f, s.data[2], acc_3[0], acc_3[1]);
  }
  return acc;
}
function tree_partition(comparer, f, s) {
  return tree_partitionAux(comparer, f, s, tree_empty(), tree_empty());
}
function tree_filter1(comparer, f, k, v, acc) {
  return f(k, v) ? tree_add(comparer, k, v, acc) : acc;
}
function tree_filterAux(comparer, f, s, acc) {
  return s.tag === 1 ? tree_filter1(comparer, f, s.data[0], s.data[1], acc) : s.tag === 2 ? tree_filterAux(comparer, f, s.data[3], tree_filter1(comparer, f, s.data[0], s.data[1], tree_filterAux(comparer, f, s.data[2], acc))) : acc;
}
function tree_filter(comparer, f, s) {
  return tree_filterAux(comparer, f, s, tree_empty());
}
function tree_spliceOutSuccessor(m) {
  if (m.tag === 1) {
    return [m.data[0], m.data[1], new MapTree(0)];
  } else if (m.tag === 2) {
    if (m.data[2].tag === 0) {
      return [m.data[0], m.data[1], m.data[3]];
    } else {
      const kvl = tree_spliceOutSuccessor(m.data[2]);
      return [kvl[0], kvl[1], tree_mk(kvl[2], m.data[0], m.data[1], m.data[3])];
    }
  }
  throw new Error("internal error: Map.spliceOutSuccessor");
}
function tree_remove(comparer, k, m) {
  if (m.tag === 1) {
    const c = comparer.Compare(k, m.data[0]);
    if (c === 0) {
      return new MapTree(0);
    } else {
      return m;
    }
  } else if (m.tag === 2) {
    const c = comparer.Compare(k, m.data[0]);
    if (c < 0) {
      return tree_rebalance(tree_remove(comparer, k, m.data[2]), m.data[0], m.data[1], m.data[3]);
    } else if (c === 0) {
      if (m.data[2].tag === 0) {
        return m.data[3];
      } else {
        if (m.data[3].tag === 0) {
          return m.data[2];
        } else {
          const input = tree_spliceOutSuccessor(m.data[3]);
          return tree_mk(m.data[2], input[0], input[1], input[2]);
        }
      }
    } else {
      return tree_rebalance(m.data[2], m.data[0], m.data[1], tree_remove(comparer, k, m.data[3]));
    }
  } else {
    return tree_empty();
  }
}
function tree_mem(comparer, k, m) {
  mem: while (true) {
    if (m.tag === 1) {
      return comparer.Compare(k, m.data[0]) === 0;
    } else if (m.tag === 2) {
      const c = comparer.Compare(k, m.data[0]) | 0;
      if (c < 0) {
        comparer = comparer;
        k = k;
        m = m.data[2];
        continue mem;
      } else if (c === 0) {
        return true;
      } else {
        comparer = comparer;
        k = k;
        m = m.data[3];
        continue mem;
      }
    } else {
      return false;
    }
  }
}
function tree_iter(f, m) {
  if (m.tag === 1) {
    f(m.data[0], m.data[1]);
  } else if (m.tag === 2) {
    tree_iter(f, m.data[2]);
    f(m.data[0], m.data[1]);
    tree_iter(f, m.data[3]);
  }
}
function tree_tryPick(f, m) {
  if (m.tag === 1) {
    return f(m.data[0], m.data[1]);
  } else if (m.tag === 2) {
    const matchValue = tree_tryPick(f, m.data[2]);
    if (matchValue == null) {
      const matchValue_1 = f(m.data[0], m.data[1]);
      if (matchValue_1 == null) {
        return tree_tryPick(f, m.data[3]);
      } else {
        const res = matchValue_1;
        return res;
      }
    } else {
      return matchValue;
    }
  } else {
    return null;
  }
}
function tree_exists(f, m) {
  return m.tag === 1 ? f(m.data[0], m.data[1]) : m.tag === 2 ? (tree_exists(f, m.data[2]) ? true : f(m.data[0], m.data[1])) ? true : tree_exists(f, m.data[3]) : false;
}
function tree_forall(f, m) {
  return m.tag === 1 ? f(m.data[0], m.data[1]) : m.tag === 2 ? (tree_forall(f, m.data[2]) ? f(m.data[0], m.data[1]) : false) ? tree_forall(f, m.data[3]) : false : true;
}
function tree_mapi(f, m) {
  return m.tag === 1 ? new MapTree(1, [m.data[0], f(m.data[0], m.data[1])]) : m.tag === 2 ? new MapTree(2, [m.data[0], f(m.data[0], m.data[1]), tree_mapi(f, m.data[2]), tree_mapi(f, m.data[3]), m.data[4]]) : tree_empty();
}
function tree_foldBack(f, m, x) {
  return m.tag === 1 ? f(m.data[0], m.data[1], x) : m.tag === 2 ? tree_foldBack(f, m.data[2], f(m.data[0], m.data[1], tree_foldBack(f, m.data[3], x))) : x;
}
function tree_fold(f, x, m) {
  return m.tag === 1 ? f(x, m.data[0], m.data[1]) : m.tag === 2 ? tree_fold(f, f(tree_fold(f, x, m.data[2]), m.data[0], m.data[1]), m.data[3]) : x;
}
// function tree_foldFromTo(
//     comparer: IComparer<any>, lo: any, hi: any,
//     f: (k:any, v: any, acc: any) => any, m: MapTree, x: any): any {
//   if (m.tag === 1) {
//     var cLoKey = comparer.Compare(lo, m.data[0]);
//     var cKeyHi = comparer.Compare(m.data[0], hi);
//     var x_1 = (cLoKey <= 0 ? cKeyHi <= 0 : false) ? f(m.data[0], m.data[1], x) : x;
//     return x_1;
//   } else if (m.tag === 2) {
//     var cLoKey = comparer.Compare(lo, m.data[0]);
//     var cKeyHi = comparer.Compare(m.data[0], hi);
//     var x_1 = cLoKey < 0 ? tree_foldFromTo(comparer, lo, hi, f, m.data[2], x) : x;
//     var x_2 = (cLoKey <= 0 ? cKeyHi <= 0 : false) ? f(m.data[0], m.data[1], x_1) : x_1;
//     var x_3 = cKeyHi < 0 ? tree_foldFromTo(comparer, lo, hi, f, m.data[3], x_2) : x_2;
//     return x_3;
//   }
//   return x;
// }
// function tree_foldSection(
//     comparer: IComparer<any>, lo: any, hi: any,
//     f: (k: any, v: any, acc: any) => any, m: MapTree, x: any) {
//   return comparer.Compare(lo, hi) === 1 ? x : tree_foldFromTo(comparer, lo, hi, f, m, x);
// }
// function tree_loop(m: MapTree, acc: any): List<[any,any]> {
//   return m.tag === 1
//     ? new List([m.data[0], m.data[1]], acc)
//     : m.tag === 2
//       ? tree_loop(m.data[2], new List([m.data[0], m.data[1]], tree_loop(m.data[3], acc)))
//       : acc;
// }
// function tree_toList(m: MapTree) {
//   return tree_loop(m, new List());
// }
// function tree_toArray(m: MapTree) {
//   return Array.from(tree_toList(m));
// }
// function tree_ofList(comparer: IComparer<any>, l: List<[any,any]>) {
//   return Seq.fold((acc: MapTree, tupledArg: [any, any]) => {
//     return tree_add(comparer, tupledArg[0], tupledArg[1], acc);
//   }, tree_empty(), l);
// }
function tree_mkFromEnumerator(comparer, acc, e) {
  let cur = e.next();
  while (!cur.done) {
    acc = tree_add(comparer, cur.value[0], cur.value[1], acc);
    cur = e.next();
  }
  return acc;
}
// function tree_ofArray(comparer: IComparer<any>, arr: ArrayLike<[any,any]>) {
//   var res = tree_empty();
//   for (var i = 0; i <= arr.length - 1; i++) {
//     res = tree_add(comparer, arr[i][0], arr[i][1], res);
//   }
//   return res;
// }
function tree_ofSeq(comparer, c) {
  const ie = c[Symbol.iterator]();
  return tree_mkFromEnumerator(comparer, tree_empty(), ie);
}
// function tree_copyToArray(s: MapTree, arr: ArrayLike<any>, i: number) {
//   tree_iter((x, y) => { arr[i++] = [x, y]; }, s);
// }
function tree_collapseLHS(stack) {
  if (stack.tail != null) {
    if (stack.head.tag === 1) {
      return stack;
    } else if (stack.head.tag === 2) {
      return tree_collapseLHS(listOfArray([stack.head.data[2], new MapTree(1, [stack.head.data[0], stack.head.data[1]]), stack.head.data[3]], stack.tail));
    } else {
      return tree_collapseLHS(stack.tail);
    }
  } else {
    return new List();
  }
}
function tree_mkIterator(s) {
  return { stack: tree_collapseLHS(new List(s, new List())), started: false };
}
function tree_moveNext(i) {
  function current(it) {
    if (it.stack.tail == null) {
      return null;
    } else if (it.stack.head.tag === 1) {
      return [it.stack.head.data[0], it.stack.head.data[1]];
    }
    throw new Error("Please report error: Map iterator, unexpected stack for current");
  }
  if (i.started) {
    if (i.stack.tail == null) {
      return { done: true, value: null };
    } else {
      if (i.stack.head.tag === 1) {
        i.stack = tree_collapseLHS(i.stack.tail);
        return {
          done: i.stack.tail == null,
          value: current(i)
        };
      } else {
        throw new Error("Please report error: Map iterator, unexpected stack for moveNext");
      }
    }
  } else {
    i.started = true;
    return {
      done: i.stack.tail == null,
      value: current(i)
    };
  }
}
export default class FableMap {
  /** Do not call, use Map.create instead. */
  constructor() {
    return;
  }
  ToString() {
    return "map [" + Array.from(this).map(x => toString(x)).join("; ") + "]";
  }
  Equals(m2) {
    return this.CompareTo(m2) === 0;
  }
  CompareTo(m2) {
    return this === m2 ? 0 : seqCompareWith((kvp1, kvp2) => {
      const c = this.comparer.Compare(kvp1[0], kvp2[0]);
      return c !== 0 ? c : compare(kvp1[1], kvp2[1]);
    }, this, m2);
  }
  [Symbol.iterator]() {
    const i = tree_mkIterator(this.tree);
    return {
      next: () => tree_moveNext(i)
    };
  }
  entries() {
    return this[Symbol.iterator]();
  }
  keys() {
    return seqMap(kv => kv[0], this);
  }
  values() {
    return seqMap(kv => kv[1], this);
  }
  get(k) {
    return tree_find(this.comparer, k, this.tree);
  }
  has(k) {
    return tree_mem(this.comparer, k, this.tree);
  }
  /** Mutating method */
  set(k, v) {
    this.tree = tree_add(this.comparer, k, v, this.tree);
  }
  /** Mutating method */
  delete(k) {
    // TODO: Is calculating the size twice is more performant than calling tree_mem?
    const oldSize = tree_size(this.tree);
    this.tree = tree_remove(this.comparer, k, this.tree);
    return oldSize > tree_size(this.tree);
  }
  /** Mutating method */
  clear() {
    this.tree = tree_empty();
  }
  get size() {
    return tree_size(this.tree);
  }
  [FSymbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Collections.FSharpMap",
      interfaces: ["System.IEquatable", "System.IComparable", "System.Collections.Generic.IDictionary"]
    };
  }
}
function from(comparer, tree) {
  const map = new FableMap();
  map.tree = tree;
  map.comparer = comparer || new Comparer();
  return map;
}
export function create(ie, comparer) {
  comparer = comparer || new Comparer();
  return from(comparer, ie ? tree_ofSeq(comparer, ie) : tree_empty());
}
export function add(k, v, map) {
  return from(map.comparer, tree_add(map.comparer, k, v, map.tree));
}
export function remove(item, map) {
  return from(map.comparer, tree_remove(map.comparer, item, map.tree));
}
export function containsValue(v, map) {
  return seqFold((acc, k) => acc || equals(map.get(k), v), false, map.keys());
}
export function tryGetValue(map, key, defaultValue) {
  return map.has(key) ? [true, map.get(key)] : [false, defaultValue];
}
export function exists(f, map) {
  return tree_exists(f, map.tree);
}
export function find(k, map) {
  return tree_find(map.comparer, k, map.tree);
}
export function tryFind(k, map) {
  return tree_tryFind(map.comparer, k, map.tree);
}
export function filter(f, map) {
  return from(map.comparer, tree_filter(map.comparer, f, map.tree));
}
export function fold(f, seed, map) {
  return tree_fold(f, seed, map.tree);
}
export function foldBack(f, map, seed) {
  return tree_foldBack(f, map.tree, seed);
}
export function forAll(f, map) {
  return tree_forall(f, map.tree);
}
export function isEmpty(map) {
  return tree_isEmpty(map.tree);
}
export function iterate(f, map) {
  tree_iter(f, map.tree);
}
export function map(f, map) {
  return from(map.comparer, tree_mapi(f, map.tree));
}
export function partition(f, map) {
  const rs = tree_partition(map.comparer, f, map.tree);
  return [from(map.comparer, rs[0]), from(map.comparer, rs[1])];
}
export function findKey(f, map) {
  return seqPick(kv => f(kv[0], kv[1]) ? makeSome(kv[0]) : null, map);
}
export function tryFindKey(f, map) {
  return seqTryPick(kv => f(kv[0], kv[1]) ? makeSome(kv[0]) : null, map);
}
export function pick(f, map) {
  const res = tryPick(f, map);
  if (res != null) {
    return getValue(res);
  }
  throw new Error("key not found");
}
export function tryPick(f, map) {
  return tree_tryPick(f, map.tree);
}