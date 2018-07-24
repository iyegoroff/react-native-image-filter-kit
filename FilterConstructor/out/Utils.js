import { ofArray } from "./fable-core/List";
import List from "./fable-core/List";
export function average(min, max) {
  return (min + max) / 2;
}
export function moveDownAt(index, list) {
  const matchValue = [index, list];
  const $var1 = matchValue[0] === -1 ? [0] : matchValue[0] === 0 ? matchValue[1].tail == null ? [3] : matchValue[1].tail.tail != null ? [1, matchValue[1].head, matchValue[1].tail.head, matchValue[1].tail.tail] : [2, matchValue[1].head, matchValue[0], matchValue[1].tail] : matchValue[1].tail == null ? [3] : [2, matchValue[1].head, matchValue[0], matchValue[1].tail];

  switch ($var1[0]) {
    case 0:
      return list;

    case 1:
      return ofArray([$var1[2], $var1[1]], $var1[3]);

    case 2:
      return new List($var1[1], moveDownAt($var1[2] - 1, $var1[3]));

    case 3:
      return list;
  }
}
export function moveUpAt(index, list) {
  return moveDownAt(index - 1, list);
}