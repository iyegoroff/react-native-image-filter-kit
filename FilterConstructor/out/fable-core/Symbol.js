const types = new Map();
export function setType(fullName, cons) {
  types.set(fullName, cons);
}
export function getType(fullName) {
  return types.get(fullName);
}
export default {
  reflection: Symbol("reflection")
};