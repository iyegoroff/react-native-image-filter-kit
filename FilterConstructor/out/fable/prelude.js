import { toJson } from "../fable-core/Serialize";
export function onError(text, ex) {
  console.error(text, ex);
}
export function toConsole(text, o) {
  console.log(text, JSON.parse.bind(JSON)(toJson(o)));
}