import List from "./ListClass";
import { ofArray } from "./ListClass";
import { groupBy as mapGroupBy } from "./Map";
import { getValue } from "./Option";
import { map as seqMap } from "./Seq";
import { fold as seqFold } from "./Seq";
import { foldBack as seqFoldBack } from "./Seq";
import { toList as seqToList } from "./Seq";
export default List;
export { ofArray };
export function append(xs, ys) {
  return seqFold((acc, x) => new List(x, acc), ys, reverse(xs));
}
export function choose(f, xs) {
  const r = seqFold((acc, x) => {
    const y = f(x);
    return y != null ? new List(getValue(y), acc) : acc;
  }, new List(), xs);
  return reverse(r);
}
export function collect(f, xs) {
  return seqFold((acc, x) => append(acc, f(x)), new List(), xs);
}
// TODO: should be xs: Iterable<List<T>>
export function concat(xs) {
  return collect(x => x, xs);
}
export function filter(f, xs) {
  return reverse(seqFold((acc, x) => f(x) ? new List(x, acc) : acc, new List(), xs));
}
export function where(f, xs) {
  return filter(f, xs);
}
export function initialize(n, f) {
  if (n < 0) {
    throw new Error("List length must be non-negative");
  }
  let xs = new List();
  for (let i = 1; i <= n; i++) {
    xs = new List(f(n - i), xs);
  }
  return xs;
}
export function map(f, xs) {
  return reverse(seqFold((acc, x) => new List(f(x), acc), new List(), xs));
}
export function mapIndexed(f, xs) {
  return reverse(seqFold((acc, x, i) => new List(f(i, x), acc), new List(), xs));
}
export function indexed(xs) {
  return mapIndexed((i, x) => [i, x], xs);
}
export function partition(f, xs) {
  return seqFold((acc, x) => {
    const lacc = acc[0];
    const racc = acc[1];
    return f(x) ? [new List(x, lacc), racc] : [lacc, new List(x, racc)];
  }, [new List(), new List()], reverse(xs));
}
export function replicate(n, x) {
  return initialize(n, () => x);
}
export function reverse(xs) {
  return seqFold((acc, x) => new List(x, acc), new List(), xs);
}
export function singleton(x) {
  return new List(x, new List());
}
export function slice(lower, upper, xs) {
  const noLower = lower == null;
  const noUpper = upper == null;
  return reverse(seqFold((acc, x, i) => (noLower || lower <= i) && (noUpper || i <= upper) ? new List(x, acc) : acc, new List(), xs));
}
/* ToDo: instance unzip() */
export function unzip(xs) {
  return seqFoldBack((xy, acc) => [new List(xy[0], acc[0]), new List(xy[1], acc[1])], xs, [new List(), new List()]);
}
/* ToDo: instance unzip3() */
export function unzip3(xs) {
  return seqFoldBack((xyz, acc) => [new List(xyz[0], acc[0]), new List(xyz[1], acc[1]), new List(xyz[2], acc[2])], xs, [new List(), new List(), new List()]);
}
export function groupBy(f, xs) {
  return seqToList(seqMap(k => [k[0], seqToList(k[1])], mapGroupBy(f, xs)));
}
export function splitAt(index, xs) {
  if (index < 0) {
    throw new Error("The input must be non-negative.");
  }
  let i = 0;
  let last = xs;
  const first = new Array(index);
  while (i < index) {
    if (last.tail == null) {
      throw new Error("The input sequence has an insufficient number of elements.");
    }
    first[i] = last.head;
    last = last.tail;
    i++;
  }
  return [ofArray(first), last];
}
export function head(xs) {
  if (xs.head !== undefined) {
    return xs.head;
  } else {
    throw new Error("The input list was empty.");
  }
}
export function tail(xs) {
  if (xs.tail !== undefined) {
    return xs.tail;
  } else {
    throw new Error("The input list was empty.");
  }
}