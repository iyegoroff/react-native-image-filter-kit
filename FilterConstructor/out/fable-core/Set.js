// tslint:disable:max-line-length
import Comparer from "./Comparer";
import List from "./List";
import { ofArray as listOfArray } from "./List";
import { exists as seqExists } from "./Seq";
import { forAll as seqForAll } from "./Seq";
import { reduce as seqReduce } from "./Seq";
import { scan as seqScan } from "./Seq";
import { choose as seqChoose } from "./Seq";
import { iterate as seqIterate } from "./Seq";
import { fold as seqFold } from "./Seq";
import FSymbol from "./Symbol";
import { toString } from "./Util";
// ----------------------------------------------
// These functions belong to Seq.ts but are
// implemented here to prevent cyclic dependencies
export function distinctBy(f, xs) {
  return seqChoose(tup => tup[0], seqScan((tup, x) => {
    const acc = tup[1];
    const k = f(x);
    return acc.has(k) ? [null, acc] : [x, add(k, acc)];
  }, [null, create()], xs));
}
export function distinct(xs) {
  return distinctBy(x => x, xs);
}
export class SetTree {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }
}
const tree_tolerance = 2;
function tree_countAux(s, acc) {
  countAux: while (true) {
    if (s.tag === 1) {
      return acc + 1 | 0;
    } else if (s.tag === 0) {
      return acc | 0;
    } else {
      const _var5 = s.data[1];
      acc = tree_countAux(s.data[2], acc + 1);
      s = _var5;
      continue countAux;
    }
  }
}
function tree_count(s) {
  return tree_countAux(s, 0);
}
function tree_SetOne(n) {
  return new SetTree(1, [n]);
}
function tree_SetNode(x, l, r, h) {
  return new SetTree(2, [x, l, r, h]);
}
function tree_height(t) {
  return t.tag === 1 ? 1 : t.tag === 2 ? t.data[3] : 0;
}
function tree_mk(l, k, r) {
  const matchValue = l.tag === 0 ? r.tag === 0 ? 0 : 1 : 1;
  switch (matchValue) {
    case 0:
      return tree_SetOne(k);
    case 1:
      const hl = tree_height(l) | 0;
      const hr = tree_height(r) | 0;
      const m = (hl < hr ? hr : hl) | 0;
      return tree_SetNode(k, l, r, m + 1);
  }
  throw new Error("internal error: Set.tree_mk");
}
function tree_rebalance(t1, k, t2) {
  const t1h = tree_height(t1);
  const t2h = tree_height(t2);
  if (t2h > t1h + tree_tolerance) {
    if (t2.tag === 2) {
      if (tree_height(t2.data[1]) > t1h + 1) {
        if (t2.data[1].tag === 2) {
          return tree_mk(tree_mk(t1, k, t2.data[1].data[1]), t2.data[1].data[0], tree_mk(t2.data[1].data[2], t2.data[0], t2.data[2]));
        } else {
          throw new Error("rebalance");
        }
      } else {
        return tree_mk(tree_mk(t1, k, t2.data[1]), t2.data[0], t2.data[2]);
      }
    } else {
      throw new Error("rebalance");
    }
  } else {
    if (t1h > t2h + tree_tolerance) {
      if (t1.tag === 2) {
        if (tree_height(t1.data[2]) > t2h + 1) {
          if (t1.data[2].tag === 2) {
            return tree_mk(tree_mk(t1.data[1], t1.data[0], t1.data[2].data[1]), t1.data[2].data[0], tree_mk(t1.data[2].data[2], k, t2));
          } else {
            throw new Error("rebalance");
          }
        } else {
          return tree_mk(t1.data[1], t1.data[0], tree_mk(t1.data[2], k, t2));
        }
      } else {
        throw new Error("rebalance");
      }
    } else {
      return tree_mk(t1, k, t2);
    }
  }
}
function tree_add(comparer, k, t) {
  if (t.tag === 1) {
    const c = comparer.Compare(k, t.data[0]);
    if (c < 0) {
      return tree_SetNode(k, new SetTree(0), t, 2);
    } else if (c === 0) {
      return t;
    } else {
      return tree_SetNode(k, t, new SetTree(0), 2);
    }
  } else if (t.tag === 0) {
    return tree_SetOne(k);
  } else {
    const c = comparer.Compare(k, t.data[0]);
    if (c < 0) {
      return tree_rebalance(tree_add(comparer, k, t.data[1]), t.data[0], t.data[2]);
    } else if (c === 0) {
      return t;
    } else {
      return tree_rebalance(t.data[1], t.data[0], tree_add(comparer, k, t.data[2]));
    }
  }
}
function tree_balance(comparer, t1, k, t2) {
  const matchValue = t1.tag === 1 ? t2.tag === 0 ? [1, t1] : t2.tag === 1 ? [2, t1.data[0], t2] : [2, t1.data[0], t2] : t1.tag === 2 ? t2.tag === 1 ? [3, t2.data[0], t1] : t2.tag === 2 ? [4, t1.data[3], t2.data[3], t1.data[0], t2.data[0], t1.data[1], t1.data[2], t2.data[1], t2.data[2]] : [1, t1] : [0, t2];
  switch (matchValue[0]) {
    case 0:
      return tree_add(comparer, k, matchValue[1]);
    case 1:
      return tree_add(comparer, k, matchValue[1]);
    case 2:
      return tree_add(comparer, k, tree_add(comparer, matchValue[1], matchValue[2]));
    case 3:
      return tree_add(comparer, k, tree_add(comparer, matchValue[1], matchValue[2]));
    case 4:
      if (matchValue[1] + tree_tolerance < matchValue[2]) {
        return tree_rebalance(tree_balance(comparer, t1, k, matchValue[7]), matchValue[4], matchValue[8]);
      } else if (matchValue[2] + tree_tolerance < matchValue[1]) {
        return tree_rebalance(matchValue[5], matchValue[3], tree_balance(comparer, matchValue[6], k, t2));
      } else {
        return tree_mk(t1, k, t2);
      }
  }
  throw new Error("internal error: Set.tree_balance");
}
function tree_split(comparer, pivot, t) {
  if (t.tag === 1) {
    const c = comparer.Compare(t.data[0], pivot);
    if (c < 0) {
      return [t, false, new SetTree(0)];
    } else if (c === 0) {
      return [new SetTree(0), true, new SetTree(0)];
    } else {
      return [new SetTree(0), false, t];
    }
  } else if (t.tag === 0) {
    return [new SetTree(0), false, new SetTree(0)];
  } else {
    const c = comparer.Compare(pivot, t.data[0]);
    if (c < 0) {
      const patternInput = tree_split(comparer, pivot, t.data[1]);
      return [patternInput[0], patternInput[1], tree_balance(comparer, patternInput[2], t.data[0], t.data[2])];
    } else if (c === 0) {
      return [t.data[1], true, t.data[2]];
    } else {
      const patternInput = tree_split(comparer, pivot, t.data[2]);
      return [tree_balance(comparer, t.data[1], t.data[0], patternInput[0]), patternInput[1], patternInput[2]];
    }
  }
}
function tree_spliceOutSuccessor(t) {
  if (t.tag === 1) {
    return [t.data[0], new SetTree(0)];
  } else if (t.tag === 2) {
    if (t.data[1].tag === 0) {
      return [t.data[0], t.data[2]];
    } else {
      const patternInput = tree_spliceOutSuccessor(t.data[1]);
      return [patternInput[0], tree_mk(patternInput[1], t.data[0], t.data[2])];
    }
  } else {
    throw new Error("internal error: Map.spliceOutSuccessor");
  }
}
function tree_remove(comparer, k, t) {
  if (t.tag === 1) {
    const c = comparer.Compare(k, t.data[0]);
    if (c === 0) {
      return new SetTree(0);
    } else {
      return t;
    }
  } else if (t.tag === 2) {
    const c = comparer.Compare(k, t.data[0]);
    if (c < 0) {
      return tree_rebalance(tree_remove(comparer, k, t.data[1]), t.data[0], t.data[2]);
    } else if (c === 0) {
      const matchValue = [t.data[1], t.data[2]];
      if (matchValue[0].tag === 0) {
        return t.data[2];
      } else if (matchValue[1].tag === 0) {
        return t.data[1];
      } else {
        const patternInput = tree_spliceOutSuccessor(t.data[2]);
        return tree_mk(t.data[1], patternInput[0], patternInput[1]);
      }
    } else {
      return tree_rebalance(t.data[1], t.data[0], tree_remove(comparer, k, t.data[2]));
    }
  } else {
    return t;
  }
}
function tree_mem(comparer, k, t) {
  mem: while (true) {
    if (t.tag === 1) {
      return comparer.Compare(k, t.data[0]) === 0;
    } else if (t.tag === 0) {
      return false;
    } else {
      const c = comparer.Compare(k, t.data[0]) | 0;
      if (c < 0) {
        comparer = comparer;
        k = k;
        t = t.data[1];
        continue mem;
      } else if (c === 0) {
        return true;
      } else {
        comparer = comparer;
        k = k;
        t = t.data[2];
        continue mem;
      }
    }
  }
}
function tree_iter(f, t) {
  if (t.tag === 1) {
    f(t.data[0]);
  } else if (t.tag !== 0) {
    tree_iter(f, t.data[1]);
    f(t.data[0]);
    tree_iter(f, t.data[2]);
  }
}
function tree_foldBack(f, m, x) {
  return m.tag === 1 ? f(m.data[0], x) : m.tag === 0 ? x : tree_foldBack(f, m.data[1], f(m.data[0], tree_foldBack(f, m.data[2], x)));
}
function tree_fold(f, x, m) {
  if (m.tag === 1) {
    return f(x, m.data[0]);
  } else if (m.tag === 0) {
    return x;
  } else {
    const x_1 = tree_fold(f, x, m.data[1]);
    const x_2 = f(x_1, m.data[0]);
    return tree_fold(f, x_2, m.data[2]);
  }
}
function tree_forall(f, m) {
  return m.tag === 1 ? f(m.data[0]) : m.tag === 0 ? true : (f(m.data[0]) ? tree_forall(f, m.data[1]) : false) ? tree_forall(f, m.data[2]) : false;
}
function tree_exists(f, m) {
  return m.tag === 1 ? f(m.data[0]) : m.tag === 0 ? false : (f(m.data[0]) ? true : tree_exists(f, m.data[1])) ? true : tree_exists(f, m.data[2]);
}
function tree_isEmpty(m) {
  return m.tag === 0 ? true : false;
}
function tree_subset(comparer, a, b) {
  return tree_forall(x => tree_mem(comparer, x, b), a);
}
function tree_psubset(comparer, a, b) {
  return tree_forall(x => tree_mem(comparer, x, b), a) ? tree_exists(x => !tree_mem(comparer, x, a), b) : false;
}
function tree_filterAux(comparer, f, s, acc) {
  if (s.tag === 1) {
    if (f(s.data[0])) {
      return tree_add(comparer, s.data[0], acc);
    } else {
      return acc;
    }
  } else if (s.tag === 0) {
    return acc;
  } else {
    const acc_1 = f(s.data[0]) ? tree_add(comparer, s.data[0], acc) : acc;
    return tree_filterAux(comparer, f, s.data[1], tree_filterAux(comparer, f, s.data[2], acc_1));
  }
}
function tree_filter(comparer, f, s) {
  return tree_filterAux(comparer, f, s, new SetTree(0));
}
function tree_diffAux(comparer, m, acc) {
  diffAux: while (true) {
    if (m.tag === 1) {
      return tree_remove(comparer, m.data[0], acc);
    } else if (m.tag === 0) {
      return acc;
    } else {
      const _var6 = comparer;
      const _var7 = m.data[1];
      acc = tree_diffAux(comparer, m.data[2], tree_remove(comparer, m.data[0], acc));
      comparer = _var6;
      m = _var7;
      continue diffAux;
    }
  }
}
function tree_diff(comparer, a, b) {
  return tree_diffAux(comparer, b, a);
}
function tree_union(comparer, t1, t2) {
  const matchValue = t1.tag === 0 ? [1, t2] : t1.tag === 1 ? t2.tag === 0 ? [2, t1] : t2.tag === 1 ? [3, t1.data[0], t2] : [3, t1.data[0], t2] : t2.tag === 0 ? [2, t1] : t2.tag === 1 ? [4, t2.data[0], t1] : [0, t1.data[3], t2.data[3], t1.data[0], t2.data[0], t1.data[1], t1.data[2], t2.data[1], t2.data[2]];
  switch (matchValue[0]) {
    case 0:
      if (matchValue[1] > matchValue[2]) {
        const patternInput = tree_split(comparer, matchValue[3], t2);
        return tree_balance(comparer, tree_union(comparer, matchValue[5], patternInput[0]), matchValue[3], tree_union(comparer, matchValue[6], patternInput[2]));
      } else {
        const patternInput_1 = tree_split(comparer, matchValue[4], t1);
        return tree_balance(comparer, tree_union(comparer, matchValue[7], patternInput_1[0]), matchValue[4], tree_union(comparer, matchValue[8], patternInput_1[2]));
      }
    case 1:
      return matchValue[1];
    case 2:
      return matchValue[1];
    case 3:
      return tree_add(comparer, matchValue[1], matchValue[2]);
    case 4:
      return tree_add(comparer, matchValue[1], matchValue[2]);
  }
  throw new Error("internal error: Set.tree_union");
}
function tree_intersectionAux(comparer, b, m, acc) {
  intersectionAux: while (true) {
    if (m.tag === 1) {
      if (tree_mem(comparer, m.data[0], b)) {
        return tree_add(comparer, m.data[0], acc);
      } else {
        return acc;
      }
    } else if (m.tag === 0) {
      return acc;
    } else {
      const acc_1 = tree_intersectionAux(comparer, b, m.data[2], acc);
      const acc_2 = tree_mem(comparer, m.data[0], b) ? tree_add(comparer, m.data[0], acc_1) : acc_1;
      comparer = comparer;
      b = b;
      m = m.data[1];
      acc = acc_2;
      continue intersectionAux;
    }
  }
}
function tree_intersection(comparer, a, b) {
  return tree_intersectionAux(comparer, b, a, new SetTree(0));
}
function tree_partition1(comparer, f, k, acc1, acc2) {
  return f(k) ? [tree_add(comparer, k, acc1), acc2] : [acc1, tree_add(comparer, k, acc2)];
}
function tree_partitionAux(comparer, f, s, acc_0, acc_1) {
  const acc = [acc_0, acc_1];
  if (s.tag === 1) {
    return tree_partition1(comparer, f, s.data[0], acc[0], acc[1]);
  } else if (s.tag === 0) {
    return acc;
  } else {
    const acc_2 = tree_partitionAux(comparer, f, s.data[2], acc[0], acc[1]);
    const acc_3 = tree_partition1(comparer, f, s.data[0], acc_2[0], acc_2[1]);
    return tree_partitionAux(comparer, f, s.data[1], acc_3[0], acc_3[1]);
  }
}
function tree_partition(comparer, f, s) {
  return tree_partitionAux(comparer, f, s, new SetTree(0), new SetTree(0));
}
// function tree_$MatchSetNode$MatchSetEmpty$(s: SetTree) {
//   return s.tag === 1 ? new Choice("Choice1Of2", [[s.data[0], new SetTree(0), new SetTree(0)]]) : s.tag === 0 ? new Choice("Choice2Of2", [null]) : new Choice("Choice1Of2", [[s.data[0], s.data[1], s.data[2]]]);
// }
function tree_minimumElementAux(s, n) {
  return s.tag === 1 ? s.data[0] : s.tag === 0 ? n : tree_minimumElementAux(s.data[1], s.data[0]);
}
function tree_minimumElementOpt(s) {
  return s.tag === 1 ? s.data[0] : s.tag === 0 ? null : tree_minimumElementAux(s.data[1], s.data[0]);
}
function tree_maximumElementAux(s, n) {
  return s.tag === 1 ? s.data[0] : s.tag === 0 ? n : tree_maximumElementAux(s.data[2], s.data[0]);
}
function tree_maximumElementOpt(s) {
  return s.tag === 1 ? s.data[0] : s.tag === 0 ? null : tree_maximumElementAux(s.data[2], s.data[0]);
}
function tree_minimumElement(s) {
  const matchValue = tree_minimumElementOpt(s);
  if (matchValue == null) {
    throw new Error("Set contains no elements");
  } else {
    return matchValue;
  }
}
function tree_maximumElement(s) {
  const matchValue = tree_maximumElementOpt(s);
  if (matchValue == null) {
    throw new Error("Set contains no elements");
  } else {
    return matchValue;
  }
}
function tree_collapseLHS(stack) {
  collapseLHS: while (true) {
    if (stack.tail != null) {
      if (stack.head.tag === 1) {
        return stack;
      } else if (stack.head.tag === 2) {
        stack = listOfArray([stack.head.data[1], tree_SetOne(stack.head.data[0]), stack.head.data[2]], stack.tail);
        continue collapseLHS;
      } else {
        stack = stack.tail;
        continue collapseLHS;
      }
    } else {
      return new List();
    }
  }
}
function tree_mkIterator(s) {
  return { stack: tree_collapseLHS(new List(s, new List())), started: false };
}
// function tree_notStarted() {
//   throw new Error("Enumeration not started");
// };
// var alreadyFinished = $exports.alreadyFinished = function () {
//   throw new Error("Enumeration already started");
// };
function tree_moveNext(i) {
  function current(it) {
    if (it.stack.tail == null) {
      return null;
    } else if (it.stack.head.tag === 1) {
      return it.stack.head.data[0];
    }
    throw new Error("Please report error: Set iterator, unexpected stack for current");
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
        throw new Error("Please report error: Set iterator, unexpected stack for moveNext");
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
function tree_compareStacks(comparer, l1, l2) {
  compareStacks: while (true) {
    const matchValue = l1.tail != null ? l2.tail != null ? l2.head.tag === 1 ? l1.head.tag === 1 ? [4, l1.head.data[0], l2.head.data[0], l1.tail, l2.tail] : l1.head.tag === 2 ? l1.head.data[1].tag === 0 ? [6, l1.head.data[1], l1.head.data[0], l1.head.data[2], l2.head.data[0], l1.tail, l2.tail] : [9, l1.head.data[0], l1.head.data[1], l1.head.data[2], l1.tail] : [10, l2.head.data[0], l2.tail] : l2.head.tag === 2 ? l2.head.data[1].tag === 0 ? l1.head.tag === 1 ? [5, l1.head.data[0], l2.head.data[0], l2.head.data[2], l1.tail, l2.tail] : l1.head.tag === 2 ? l1.head.data[1].tag === 0 ? [7, l1.head.data[0], l1.head.data[2], l2.head.data[0], l2.head.data[2], l1.tail, l2.tail] : [9, l1.head.data[0], l1.head.data[1], l1.head.data[2], l1.tail] : [11, l2.head.data[0], l2.head.data[1], l2.head.data[2], l2.tail] : l1.head.tag === 1 ? [8, l1.head.data[0], l1.tail] : l1.head.tag === 2 ? [9, l1.head.data[0], l1.head.data[1], l1.head.data[2], l1.tail] : [11, l2.head.data[0], l2.head.data[1], l2.head.data[2], l2.tail] : l1.head.tag === 1 ? [8, l1.head.data[0], l1.tail] : l1.head.tag === 2 ? [9, l1.head.data[0], l1.head.data[1], l1.head.data[2], l1.tail] : [3, l1.tail, l2.tail] : [2] : l2.tail != null ? [1] : [0];
    switch (matchValue[0]) {
      case 0:
        return 0;
      case 1:
        return -1;
      case 2:
        return 1;
      case 3:
        comparer = comparer;
        l1 = matchValue[1];
        l2 = matchValue[2];
        continue compareStacks;
      case 4:
        const c = comparer.Compare(matchValue[1], matchValue[2]) | 0;
        if (c !== 0) {
          return c | 0;
        } else {
          comparer = comparer;
          l1 = matchValue[3];
          l2 = matchValue[4];
          continue compareStacks;
        }
      case 5:
        const c_1 = comparer.Compare(matchValue[1], matchValue[2]) | 0;
        if (c_1 !== 0) {
          return c_1 | 0;
        } else {
          comparer = comparer;
          l1 = new List(new SetTree(0), matchValue[4]);
          l2 = new List(matchValue[3], matchValue[5]);
          continue compareStacks;
        }
      case 6:
        const c_2 = comparer.Compare(matchValue[2], matchValue[4]) | 0;
        if (c_2 !== 0) {
          return c_2 | 0;
        } else {
          comparer = comparer;
          l1 = new List(matchValue[3], matchValue[5]);
          l2 = new List(matchValue[1], matchValue[6]);
          continue compareStacks;
        }
      case 7:
        const c_3 = comparer.Compare(matchValue[1], matchValue[3]) | 0;
        if (c_3 !== 0) {
          return c_3 | 0;
        } else {
          comparer = comparer;
          l1 = new List(matchValue[2], matchValue[5]);
          l2 = new List(matchValue[4], matchValue[6]);
          continue compareStacks;
        }
      case 8:
        comparer = comparer;
        l1 = listOfArray([new SetTree(0), tree_SetOne(matchValue[1])], matchValue[2]);
        l2 = l2;
        continue compareStacks;
      case 9:
        comparer = comparer;
        l1 = listOfArray([matchValue[2], tree_SetNode(matchValue[1], new SetTree(0), matchValue[3], 0)], matchValue[4]);
        l2 = l2;
        continue compareStacks;
      case 10:
        comparer = comparer;
        l1 = l1;
        l2 = listOfArray([new SetTree(0), tree_SetOne(matchValue[1])], matchValue[2]);
        continue compareStacks;
      case 11:
        comparer = comparer;
        l1 = l1;
        l2 = listOfArray([matchValue[2], tree_SetNode(matchValue[1], new SetTree(0), matchValue[3], 0)], matchValue[4]);
        continue compareStacks;
    }
  }
}
function tree_compare(comparer, s1, s2) {
  if (s1.tag === 0) {
    return s2.tag === 0 ? 0 : -1;
  } else {
    return s2.tag === 0 ? 1 : tree_compareStacks(comparer, listOfArray([s1]), listOfArray([s2]));
  }
}
function tree_mkFromEnumerator(comparer, acc, e) {
  let cur = e.next();
  while (!cur.done) {
    acc = tree_add(comparer, cur.value, acc);
    cur = e.next();
  }
  return acc;
}
function tree_ofSeq(comparer, c) {
  const ie = c[Symbol.iterator]();
  return tree_mkFromEnumerator(comparer, new SetTree(0), ie);
}
export default class FableSet {
  /** Do not call, use Set.create instead. */
  constructor() {
    return;
  }
  ToString() {
    return "set [" + Array.from(this).map(x => toString(x)).join("; ") + "]";
  }
  Equals(s2) {
    return this.CompareTo(s2) === 0;
  }
  CompareTo(s2) {
    return this === s2 ? 0 : tree_compare(this.comparer, this.tree, s2.tree);
  }
  [Symbol.iterator]() {
    const i = tree_mkIterator(this.tree);
    return {
      next: () => tree_moveNext(i)
    };
  }
  values() {
    return this[Symbol.iterator]();
  }
  has(v) {
    return tree_mem(this.comparer, v, this.tree);
  }
  /** Mutating method */
  add(v) {
    this.tree = tree_add(this.comparer, v, this.tree);
    return this;
  }
  /** Mutating method */
  delete(v) {
    // TODO: Is calculating the size twice is more performant than calling tree_mem?
    const oldSize = tree_count(this.tree);
    this.tree = tree_remove(this.comparer, v, this.tree);
    return oldSize > tree_count(this.tree);
  }
  /** Mutating method */
  clear() {
    this.tree = new SetTree(0);
  }
  get size() {
    return tree_count(this.tree);
  }
  [FSymbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Collections.FSharpSet",
      interfaces: ["System.IEquatable", "System.IComparable"]
    };
  }
}
function from(comparer, tree) {
  const s = new FableSet();
  s.tree = tree;
  s.comparer = comparer || new Comparer();
  return s;
}
export function create(ie, comparer) {
  comparer = comparer || new Comparer();
  return from(comparer, ie ? tree_ofSeq(comparer, ie) : new SetTree(0));
}
export function isEmpty(s) {
  return tree_isEmpty(s.tree);
}
export function add(item, s) {
  return from(s.comparer, tree_add(s.comparer, item, s.tree));
}
export function addInPlace(item, s) {
  return s.has(item) ? false : (s.add(item), true);
}
export function remove(item, s) {
  return from(s.comparer, tree_remove(s.comparer, item, s.tree));
}
export function union(set1, set2) {
  return set2.tree.tag === 0 ? set1 : set1.tree.tag === 0 ? set2 : from(set1.comparer, tree_union(set1.comparer, set1.tree, set2.tree));
}
export function op_Addition(set1, set2) {
  return union(set1, set2);
}
export function unionInPlace(set1, set2) {
  seqIterate(x => {
    set1.add(x);
  }, set2);
}
export function unionMany(sets) {
  // Pass args as union(s, acc) instead of union(acc, s)
  // to discard the comparer of the first empty set
  return seqFold((acc, s) => union(s, acc), create(), sets);
}
export function difference(set1, set2) {
  return set1.tree.tag === 0 ? set1 : set2.tree.tag === 0 ? set1 : from(set1.comparer, tree_diff(set1.comparer, set1.tree, set2.tree));
}
export function op_Subtraction(set1, set2) {
  return difference(set1, set2);
}
export function differenceInPlace(set1, set2) {
  seqIterate(x => {
    set1.delete(x);
  }, set2);
}
export function intersect(set1, set2) {
  return set2.tree.tag === 0 ? set2 : set1.tree.tag === 0 ? set1 : from(set1.comparer, tree_intersection(set1.comparer, set1.tree, set2.tree));
}
export function intersectInPlace(set1, set2) {
  const set2_ = set2 instanceof Set ? set2 : new Set(set2);
  seqIterate(x => {
    if (!set2_.has(x)) {
      set1.delete(x);
    }
  }, set1);
}
export function intersectMany(sets) {
  return seqReduce((s1, s2) => intersect(s1, s2), sets);
}
export function isProperSubsetOf(set1, set2) {
  if (set1 instanceof FableSet && set2 instanceof FableSet) {
    return tree_psubset(set1.comparer, set1.tree, set2.tree);
  } else {
    set2 = set2 instanceof Set ? set2 : new Set(set2);
    return seqForAll(x => set2.has(x), set1) && seqExists(x => !set1.has(x), set2);
  }
}
export function isProperSubset(set1, set2) {
  return isProperSubsetOf(set1, set2);
}
export function isSubsetOf(set1, set2) {
  if (set1 instanceof FableSet && set2 instanceof FableSet) {
    return tree_subset(set1.comparer, set1.tree, set2.tree);
  } else {
    set2 = set2 instanceof Set ? set2 : new Set(set2);
    return seqForAll(x => set2.has(x), set1);
  }
}
export function isSubset(set1, set2) {
  return isSubsetOf(set1, set2);
}
export function isProperSupersetOf(set1, set2) {
  if (set1 instanceof FableSet && set2 instanceof FableSet) {
    return tree_psubset(set1.comparer, set2.tree, set1.tree);
  } else {
    return isProperSubset(set2 instanceof Set ? set2 : new Set(set2), set1);
  }
}
export function isProperSuperset(set1, set2) {
  return isProperSupersetOf(set1, set2);
}
export function isSupersetOf(set1, set2) {
  if (set1 instanceof FableSet && set2 instanceof FableSet) {
    return tree_subset(set1.comparer, set2.tree, set1.tree);
  } else {
    return isSubset(set2 instanceof Set ? set2 : new Set(set2), set1);
  }
}
export function isSuperset(set1, set2) {
  return isSupersetOf(set1, set2);
}
export function copyTo(xs, arr, arrayIndex, count) {
  if (!Array.isArray(arr) && !ArrayBuffer.isView(arr)) {
    throw new Error("Array is invalid");
  }
  count = count || arr.length;
  let i = arrayIndex || 0;
  const iter = xs[Symbol.iterator]();
  while (count--) {
    const el = iter.next();
    if (el.done) {
      break;
    }
    arr[i++] = el.value;
  }
}
export function partition(f, s) {
  if (s.tree.tag === 0) {
    return [s, s];
  } else {
    const tuple = tree_partition(s.comparer, f, s.tree);
    return [from(s.comparer, tuple[0]), from(s.comparer, tuple[1])];
  }
}
export function filter(f, s) {
  if (s.tree.tag === 0) {
    return s;
  } else {
    return from(s.comparer, tree_filter(s.comparer, f, s.tree));
  }
}
export function map(f, s) {
  const comparer = new Comparer();
  return from(comparer, tree_fold((acc, k) => tree_add(comparer, f(k), acc), new SetTree(0), s.tree));
}
export function exists(f, s) {
  return tree_exists(f, s.tree);
}
export function forAll(f, s) {
  return tree_forall(f, s.tree);
}
export function fold(f, seed, s) {
  return tree_fold(f, seed, s.tree);
}
export function foldBack(f, s, seed) {
  return tree_foldBack(f, s.tree, seed);
}
export function iterate(f, s) {
  tree_iter(f, s.tree);
}
export function minimumElement(s) {
  return tree_minimumElement(s.tree);
}
export function minElement(s) {
  return tree_minimumElement(s.tree);
}
export function maximumElement(s) {
  return tree_maximumElement(s.tree);
}
export function maxElement(s) {
  return tree_maximumElement(s.tree);
}