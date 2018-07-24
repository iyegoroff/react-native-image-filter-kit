import { permute as arrayPermute } from "./Array";
import { chunkBySize as arrayChunkBySize } from "./Array";
import List from "./ListClass";
import { getValue, makeSome } from "./Option";
import { compare, equals } from "./Util";
export class Enumerator {
  constructor(iter) {
    this.iter = iter;
  }
  MoveNext() {
    const cur = this.iter.next();
    this.current = cur.value;
    return !cur.done;
  }
  get Current() {
    return this.current;
  }
  get get_Current() {
    return this.current;
  }
  Reset() {
    throw new Error("JS iterators cannot be reset");
  }
  Dispose() {
    return;
  }
}
export function getEnumerator(o) {
  return typeof o.GetEnumerator === "function" ? o.GetEnumerator() : new Enumerator(o[Symbol.iterator]());
}
export function toIterator(en) {
  return {
    next() {
      return en.MoveNext() ? { done: false, value: en.Current } : { done: true, value: null };
    }
  };
}
function __failIfNone(res) {
  if (res == null) {
    throw new Error("Seq did not contain any matching element");
  }
  return getValue(res);
}
export function toList(xs) {
  return foldBack((x, acc) => new List(x, acc), xs, new List());
}
export function ofList(xs) {
  return delay(() => unfold(x => x.tail != null ? [x.head, x.tail] : null, xs));
}
export function ofArray(xs) {
  return delay(() => unfold(i => i < xs.length ? [xs[i], i + 1] : null, 0));
}
export function append(xs, ys) {
  return delay(() => {
    let firstDone = false;
    const i = xs[Symbol.iterator]();
    let iters = [i, null];
    return unfold(() => {
      let cur;
      if (!firstDone) {
        cur = iters[0].next();
        if (!cur.done) {
          return [cur.value, iters];
        } else {
          firstDone = true;
          iters = [null, ys[Symbol.iterator]()];
        }
      }
      cur = iters[1].next();
      return !cur.done ? [cur.value, iters] : null;
    }, iters);
  });
}
export function average(xs) {
  let count = 1;
  const sum = reduce((acc, x) => {
    count++;
    return acc + x;
  }, xs);
  return sum / count;
}
export function averageBy(f, xs) {
  let count = 1;
  const sum = reduce((acc, x) => {
    count++;
    return (count === 2 ? f(acc) : acc) + f(x);
  }, xs);
  return sum / count;
}
export function concat(xs) {
  return delay(() => {
    const iter = xs[Symbol.iterator]();
    let output = { value: null };
    return unfold(innerIter => {
      let hasFinished = false;
      while (!hasFinished) {
        if (innerIter == null) {
          const cur = iter.next();
          if (!cur.done) {
            innerIter = cur.value[Symbol.iterator]();
          } else {
            hasFinished = true;
          }
        } else {
          const cur = innerIter.next();
          if (!cur.done) {
            output = { value: cur.value };
            hasFinished = true;
          } else {
            innerIter = null;
          }
        }
      }
      return innerIter != null && output != null ? [output.value, innerIter] : null;
    }, null);
  });
}
export function collect(f, xs) {
  return concat(map(f, xs));
}
export function choose(f, xs) {
  return delay(() => unfold(iter => {
    let cur = iter.next();
    while (!cur.done) {
      const y = f(cur.value);
      if (y != null) {
        return [getValue(y), iter];
      }
      cur = iter.next();
    }
    return null;
  }, xs[Symbol.iterator]()));
}
export function compareWith(f, xs, ys) {
  const nonZero = tryFind(i => i !== 0, map2((x, y) => f(x, y), xs, ys));
  return nonZero != null ? getValue(nonZero) : count(xs) - count(ys);
}
export function delay(f) {
  return {
    [Symbol.iterator]: () => f()[Symbol.iterator]()
  };
}
export function empty() {
  return unfold(() => void 0);
}
export function enumerateWhile(cond, xs) {
  return concat(unfold(() => cond() ? [xs, true] : null));
}
export function enumerateThenFinally(xs, finalFn) {
  return delay(() => {
    let iter;
    try {
      iter = xs[Symbol.iterator]();
    } catch (err) {
      return void 0;
    } finally {
      finalFn();
    }
    return unfold(it => {
      try {
        const cur = it.next();
        return !cur.done ? [cur.value, it] : null;
      } catch (err) {
        return void 0;
      } finally {
        finalFn();
      }
    }, iter);
  });
}
export function enumerateUsing(disp, work) {
  let isDisposed = false;
  const disposeOnce = () => {
    if (!isDisposed) {
      isDisposed = true;
      disp.Dispose();
    }
  };
  try {
    return enumerateThenFinally(work(disp), disposeOnce);
  } catch (err) {
    return void 0;
  } finally {
    disposeOnce();
  }
}
export function exactlyOne(xs) {
  const iter = xs[Symbol.iterator]();
  const fst = iter.next();
  if (fst.done) {
    throw new Error("Seq was empty");
  }
  const snd = iter.next();
  if (!snd.done) {
    throw new Error("Seq had multiple items");
  }
  return fst.value;
}
export function except(itemsToExclude, source) {
  const exclusionItems = Array.from(itemsToExclude);
  const testIsNotInExclusionItems = element => !exclusionItems.some(excludedItem => equals(excludedItem, element));
  return filter(testIsNotInExclusionItems, source);
}
export function exists(f, xs) {
  let cur;
  for (const iter = xs[Symbol.iterator]();;) {
    cur = iter.next();
    if (cur.done) {
      break;
    }
    if (f(cur.value)) {
      return true;
    }
  }
  return false;
}
export function exists2(f, xs, ys) {
  let cur1;
  let cur2;
  for (const iter1 = xs[Symbol.iterator](), iter2 = ys[Symbol.iterator]();;) {
    cur1 = iter1.next();
    cur2 = iter2.next();
    if (cur1.done || cur2.done) {
      break;
    }
    if (f(cur1.value, cur2.value)) {
      return true;
    }
  }
  return false;
}
export function filter(f, xs) {
  return delay(() => unfold(iter => {
    let cur = iter.next();
    while (!cur.done) {
      if (f(cur.value)) {
        return [cur.value, iter];
      }
      cur = iter.next();
    }
    return null;
  }, xs[Symbol.iterator]()));
}
export function where(f, xs) {
  return filter(f, xs);
}
export function fold(f, acc, xs) {
  if (Array.isArray(xs) || ArrayBuffer.isView(xs)) {
    return xs.reduce(f, acc);
  } else {
    let cur;
    for (let i = 0, iter = xs[Symbol.iterator]();; i++) {
      cur = iter.next();
      if (cur.done) {
        break;
      }
      acc = f(acc, cur.value, i);
    }
    return acc;
  }
}
export function foldBack(f, xs, acc) {
  const arr = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs : Array.from(xs);
  for (let i = arr.length - 1; i >= 0; i--) {
    acc = f(arr[i], acc, i);
  }
  return acc;
}
export function fold2(f, acc, xs, ys) {
  const iter1 = xs[Symbol.iterator]();
  const iter2 = ys[Symbol.iterator]();
  let cur1;
  let cur2;
  for (let i = 0;; i++) {
    cur1 = iter1.next();
    cur2 = iter2.next();
    if (cur1.done || cur2.done) {
      break;
    }
    acc = f(acc, cur1.value, cur2.value, i);
  }
  return acc;
}
export function foldBack2(f, xs, ys, acc) {
  const ar1 = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs : Array.from(xs);
  const ar2 = Array.isArray(ys) || ArrayBuffer.isView(ys) ? ys : Array.from(ys);
  for (let i = ar1.length - 1; i >= 0; i--) {
    acc = f(ar1[i], ar2[i], acc, i);
  }
  return acc;
}
export function forAll(f, xs) {
  return fold((acc, x) => acc && f(x), true, xs);
}
export function forAll2(f, xs, ys) {
  return fold2((acc, x, y) => acc && f(x, y), true, xs, ys);
}
export function tryHead(xs) {
  const iter = xs[Symbol.iterator]();
  const cur = iter.next();
  return cur.done ? null : makeSome(cur.value);
}
export function head(xs) {
  return __failIfNone(tryHead(xs));
}
export function initialize(n, f) {
  return delay(() => unfold(i => i < n ? [f(i), i + 1] : null, 0));
}
export function initializeInfinite(f) {
  return delay(() => unfold(i => [f(i), i + 1], 0));
}
export function tryItem(i, xs) {
  if (i < 0) {
    return null;
  }
  if (Array.isArray(xs) || ArrayBuffer.isView(xs)) {
    return i < xs.length ? makeSome(xs[i]) : null;
  }
  for (let j = 0, iter = xs[Symbol.iterator]();; j++) {
    const cur = iter.next();
    if (cur.done) {
      break;
    }
    if (j === i) {
      return makeSome(cur.value);
    }
  }
  return null;
}
export function item(i, xs) {
  return __failIfNone(tryItem(i, xs));
}
export function iterate(f, xs) {
  fold((_, x) => f(x), null, xs);
}
export function iterate2(f, xs, ys) {
  fold2((_, x, y) => f(x, y), null, xs, ys);
}
export function iterateIndexed(f, xs) {
  fold((_, x, i) => f(i, x), null, xs);
}
export function iterateIndexed2(f, xs, ys) {
  fold2((_, x, y, i) => f(i, x, y), null, xs, ys);
}
export function isEmpty(xs) {
  const i = xs[Symbol.iterator]();
  return i.next().done;
}
export function tryLast(xs) {
  try {
    return makeSome(reduce((_, x) => x, xs));
  } catch (err) {
    return null;
  }
}
export function last(xs) {
  return __failIfNone(tryLast(xs));
}
// A export function 'length' method causes problems in JavaScript -- https://github.com/Microsoft/TypeScript/issues/442
export function count(xs) {
  return Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs.length : fold((acc, x) => acc + 1, 0, xs);
}
export function map(f, xs) {
  return delay(() => unfold(iter => {
    const cur = iter.next();
    return !cur.done ? [f(cur.value), iter] : null;
  }, xs[Symbol.iterator]()));
}
export function mapIndexed(f, xs) {
  return delay(() => {
    let i = 0;
    return unfold(iter => {
      const cur = iter.next();
      return !cur.done ? [f(i++, cur.value), iter] : null;
    }, xs[Symbol.iterator]());
  });
}
export function indexed(xs) {
  return mapIndexed((i, x) => [i, x], xs);
}
export function map2(f, xs, ys) {
  return delay(() => {
    const iter1 = xs[Symbol.iterator]();
    const iter2 = ys[Symbol.iterator]();
    return unfold(() => {
      const cur1 = iter1.next();
      const cur2 = iter2.next();
      return !cur1.done && !cur2.done ? [f(cur1.value, cur2.value), null] : null;
    });
  });
}
export function mapIndexed2(f, xs, ys) {
  return delay(() => {
    let i = 0;
    const iter1 = xs[Symbol.iterator]();
    const iter2 = ys[Symbol.iterator]();
    return unfold(() => {
      const cur1 = iter1.next();
      const cur2 = iter2.next();
      return !cur1.done && !cur2.done ? [f(i++, cur1.value, cur2.value), null] : null;
    });
  });
}
export function map3(f, xs, ys, zs) {
  return delay(() => {
    const iter1 = xs[Symbol.iterator]();
    const iter2 = ys[Symbol.iterator]();
    const iter3 = zs[Symbol.iterator]();
    return unfold(() => {
      const cur1 = iter1.next();
      const cur2 = iter2.next();
      const cur3 = iter3.next();
      return !cur1.done && !cur2.done && !cur3.done ? [f(cur1.value, cur2.value, cur3.value), null] : null;
    });
  });
}
export function chunkBySize(size, xs) {
  const result = arrayChunkBySize(size, Array.from(xs));
  return ofArray(result);
}
export function mapFold(f, acc, xs, transform) {
  const result = [];
  let r;
  let cur;
  for (let i = 0, iter = xs[Symbol.iterator]();; i++) {
    cur = iter.next();
    if (cur.done) {
      break;
    }
    [r, acc] = f(acc, cur.value);
    result.push(r);
  }
  return transform !== void 0 ? [transform(result), acc] : [result, acc];
}
export function mapFoldBack(f, xs, acc, transform) {
  const arr = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs : Array.from(xs);
  const result = [];
  let r;
  for (let i = arr.length - 1; i >= 0; i--) {
    [r, acc] = f(arr[i], acc);
    result.push(r);
  }
  return transform !== void 0 ? [transform(result), acc] : [result, acc];
}
export function max(xs) {
  return reduce((acc, x) => compare(acc, x) === 1 ? acc : x, xs);
}
export function maxBy(f, xs) {
  return reduce((acc, x) => compare(f(acc), f(x)) === 1 ? acc : x, xs);
}
export function min(xs) {
  return reduce((acc, x) => compare(acc, x) === -1 ? acc : x, xs);
}
export function minBy(f, xs) {
  return reduce((acc, x) => compare(f(acc), f(x)) === -1 ? acc : x, xs);
}
export function pairwise(xs) {
  return skip(2, scan((last, next) => [last[1], next], [0, 0], xs));
}
export function permute(f, xs) {
  return ofArray(arrayPermute(f, Array.from(xs)));
}
export function rangeStep(first, step, last) {
  if (step === 0) {
    throw new Error("Step cannot be 0");
  }
  return delay(() => unfold(x => step > 0 && x <= last || step < 0 && x >= last ? [x, x + step] : null, first));
}
export function rangeChar(first, last) {
  return delay(() => unfold(x => x <= last ? [x, String.fromCharCode(x.charCodeAt(0) + 1)] : null, first));
}
export function range(first, last) {
  return rangeStep(first, 1, last);
}
export function readOnly(xs) {
  return map(x => x, xs);
}
export function reduce(f, xs) {
  if (Array.isArray(xs) || ArrayBuffer.isView(xs)) {
    return xs.reduce(f);
  }
  const iter = xs[Symbol.iterator]();
  let cur = iter.next();
  if (cur.done) {
    throw new Error("Seq was empty");
  }
  let acc = cur.value;
  while (true) {
    cur = iter.next();
    if (cur.done) {
      break;
    }
    acc = f(acc, cur.value);
  }
  return acc;
}
export function reduceBack(f, xs) {
  const ar = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs : Array.from(xs);
  if (ar.length === 0) {
    throw new Error("Seq was empty");
  }
  let acc = ar[ar.length - 1];
  for (let i = ar.length - 2; i >= 0; i--) {
    acc = f(ar[i], acc, i);
  }
  return acc;
}
export function replicate(n, x) {
  return initialize(n, () => x);
}
export function reverse(xs) {
  const ar = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs.slice(0) : Array.from(xs);
  return ofArray(ar.reverse());
}
export function scan(f, seed, xs) {
  return delay(() => {
    const iter = xs[Symbol.iterator]();
    return unfold(acc => {
      if (acc == null) {
        return [seed, seed];
      }
      const cur = iter.next();
      if (!cur.done) {
        acc = f(acc, cur.value);
        return [acc, acc];
      }
      return void 0;
    }, null);
  });
}
export function scanBack(f, xs, seed) {
  return reverse(scan((acc, x) => f(x, acc), seed, reverse(xs)));
}
export function singleton(y) {
  return unfold(x => x != null ? [x, null] : null, y);
}
export function skip(n, xs) {
  return {
    [Symbol.iterator]: () => {
      const iter = xs[Symbol.iterator]();
      for (let i = 1; i <= n; i++) {
        if (iter.next().done) {
          throw new Error("Seq has not enough elements");
        }
      }
      return iter;
    }
  };
}
export function skipWhile(f, xs) {
  return delay(() => {
    let hasPassed = false;
    return filter(x => hasPassed || (hasPassed = !f(x)), xs);
  });
}
export function sortWith(f, xs) {
  const ys = Array.from(xs);
  return ofArray(ys.sort(f));
}
export function sum(xs) {
  return fold((acc, x) => acc + x, 0, xs);
}
export function sumBy(f, xs) {
  return fold((acc, x) => acc + f(x), 0, xs);
}
export function tail(xs) {
  const iter = xs[Symbol.iterator]();
  const cur = iter.next();
  if (cur.done) {
    throw new Error("Seq was empty");
  }
  return {
    [Symbol.iterator]: () => iter
  };
}
export function take(n, xs, truncate = false) {
  return delay(() => {
    const iter = xs[Symbol.iterator]();
    return unfold(i => {
      if (i < n) {
        const cur = iter.next();
        if (!cur.done) {
          return [cur.value, i + 1];
        }
        if (!truncate) {
          throw new Error("Seq has not enough elements");
        }
      }
      return void 0;
    }, 0);
  });
}
export function truncate(n, xs) {
  return take(n, xs, true);
}
export function takeWhile(f, xs) {
  return delay(() => {
    const iter = xs[Symbol.iterator]();
    return unfold(i => {
      const cur = iter.next();
      if (!cur.done && f(cur.value)) {
        return [cur.value, null];
      }
      return void 0;
    }, 0);
  });
}
export function tryFind(f, xs, defaultValue) {
  for (let i = 0, iter = xs[Symbol.iterator]();; i++) {
    const cur = iter.next();
    if (cur.done) {
      break;
    }
    if (f(cur.value, i)) {
      return makeSome(cur.value);
    }
  }
  return defaultValue === void 0 ? null : makeSome(defaultValue);
}
export function find(f, xs) {
  return __failIfNone(tryFind(f, xs));
}
export function tryFindBack(f, xs, defaultValue) {
  const arr = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs.slice(0) : Array.from(xs);
  return tryFind(f, arr.reverse(), defaultValue);
}
export function findBack(f, xs) {
  return __failIfNone(tryFindBack(f, xs));
}
export function tryFindIndex(f, xs) {
  for (let i = 0, iter = xs[Symbol.iterator]();; i++) {
    const cur = iter.next();
    if (cur.done) {
      break;
    }
    if (f(cur.value, i)) {
      return i;
    }
  }
  return null;
}
export function findIndex(f, xs) {
  return __failIfNone(tryFindIndex(f, xs));
}
export function tryFindIndexBack(f, xs) {
  const arr = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs.slice(0) : Array.from(xs);
  for (let i = arr.length - 1; i >= 0; i--) {
    if (f(arr[i], i)) {
      return i;
    }
  }
  return null;
}
export function findIndexBack(f, xs) {
  return __failIfNone(tryFindIndexBack(f, xs));
}
export function tryPick(f, xs) {
  for (let i = 0, iter = xs[Symbol.iterator]();; i++) {
    const cur = iter.next();
    if (cur.done) {
      break;
    }
    const y = f(cur.value, i);
    if (y != null) {
      return y;
    }
  }
  return null;
}
export function pick(f, xs) {
  return __failIfNone(tryPick(f, xs));
}
export function unfold(f, fst) {
  return {
    [Symbol.iterator]: () => {
      // Capture a copy of the first value in the closure
      // so the sequence is restarted every time, see #1230
      let acc = fst;
      return {
        next: () => {
          const res = f(acc);
          if (res != null) {
            acc = res[1];
            return { done: false, value: res[0] };
          }
          return { done: true };
        }
      };
    }
  };
}
export function zip(xs, ys) {
  return map2((x, y) => [x, y], xs, ys);
}
export function zip3(xs, ys, zs) {
  return map3((x, y, z) => [x, y, z], xs, ys, zs);
}