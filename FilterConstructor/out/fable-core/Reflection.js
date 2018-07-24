import List from "./List";
import FSymbol from "./Symbol";
import { getDefinition, getPropertyNames, NonDeclaredType } from "./Util";
export class MemberInfo {
  constructor(name, index, declaringType, propertyType, unionFields) {
    this.name = name;
    this.index = index;
    this.declaringType = declaringType;
    this.propertyType = propertyType;
    this.unionFields = unionFields;
  }
  getUnionFields() {
    return this.unionFields.map((fi, i) => new MemberInfo("unknown", i, this.declaringType, fi));
  }
}
export function resolveGeneric(idx, enclosing) {
  try {
    const t = enclosing.head;
    if (t.generics == null) {
      return resolveGeneric(idx, enclosing.tail);
    } else {
      const name = typeof idx === "string" ? idx : Object.getOwnPropertyNames(t.generics)[idx];
      const resolved = t.generics[name];
      if (resolved == null) {
        return resolveGeneric(idx, enclosing.tail);
      } else if (resolved instanceof NonDeclaredType && resolved.kind === "GenericParam") {
        return resolveGeneric(resolved.definition, enclosing.tail);
      } else {
        return new List(resolved, enclosing);
      }
    }
  } catch (err) {
    throw new Error(`Cannot resolve generic argument ${idx}: ${err}`);
  }
}
export function getType(obj) {
  const t = typeof obj;
  switch (t) {
    case "boolean":
    case "number":
    case "string":
    case "function":
      return t;
    default:
      return Object.getPrototypeOf(obj).constructor;
  }
}
// TODO: This needs improvement, check namespace for non-custom types?
export function getTypeFullName(typ, option) {
  function trim(fullName, opt) {
    if (typeof fullName !== "string") {
      return "unknown";
    }
    if (opt === "name") {
      const i = fullName.lastIndexOf(".");
      return fullName.substr(i + 1);
    }
    if (opt === "namespace") {
      const i = fullName.lastIndexOf(".");
      return i > -1 ? fullName.substr(0, i) : "";
    }
    return fullName;
  }
  if (typeof typ === "string") {
    return typ;
  } else if (typ instanceof NonDeclaredType) {
    switch (typ.kind) {
      case "Unit":
        return "unit";
      case "Option":
        return getTypeFullName(typ.generics[0], option) + " option";
      case "Array":
        return getTypeFullName(typ.generics[0], option) + "[]";
      case "Tuple":
        return typ.generics.map(x => getTypeFullName(x, option)).join(" * ");
      case "Function":
        return "Func<" + typ.generics.map(x => getTypeFullName(x, option)).join(", ") + ">";
      case "GenericParam":
      case "Interface":
        return typ.definition;
      case "GenericType":
        return getTypeFullName(typ.definition, option);
      case "Any":
      default:
        return "unknown";
    }
  } else {
    // Attention: this doesn't work with Object.getPrototypeOf
    const proto = typ.prototype;
    return trim(typeof proto[FSymbol.reflection] === "function" ? proto[FSymbol.reflection]().type : null, option);
  }
}
export function getName(x) {
  if (x instanceof MemberInfo) {
    return x.name;
  }
  return getTypeFullName(x, "name");
}
export function getPrototypeOfType(typ) {
  if (typeof typ === "string") {
    return null;
  } else if (typ instanceof NonDeclaredType) {
    return typ.kind === "GenericType" ? typ.definition.prototype : null;
  } else {
    return typ.prototype;
  }
}
export function getProperties(typ) {
  const proto = getPrototypeOfType(typ);
  if (proto != null && typeof proto[FSymbol.reflection] === "function") {
    const info = proto[FSymbol.reflection]();
    if (info.properties) {
      return Object.getOwnPropertyNames(info.properties).map((k, i) => new MemberInfo(k, i, typ, info.properties[k]));
    }
  }
  throw new Error("Type " + getTypeFullName(typ) + " doesn't contain property info.");
}
export function getUnionCases(typ) {
  const proto = getPrototypeOfType(typ);
  if (proto != null && typeof proto[FSymbol.reflection] === "function") {
    const info = proto[FSymbol.reflection]();
    if (info.cases) {
      return info.cases.map((uci, i) => new MemberInfo(uci[0], i, typ, null, uci.slice(1)));
    }
  }
  throw new Error("Type " + getTypeFullName(typ) + " doesn't contain union case info.");
}
export function getPropertyValues(obj) {
  return getPropertyNames(obj).map(k => obj[k]);
}
export function getUnionFields(obj, typ) {
  if (obj != null && typeof obj[FSymbol.reflection] === "function") {
    const info = obj[FSymbol.reflection]();
    if (info.cases) {
      const uci = info.cases[obj.tag];
      if (uci != null) {
        const fields = uci.length > 2 ? obj.data : uci.length > 1 ? [obj.data] : [];
        return [new MemberInfo(uci[0], obj.tag, typ, null, uci.slice(1)), fields];
      }
    }
  }
  throw new Error("Not an F# union type.");
}
export function makeUnion(caseInfo, args) {
  const Cons = getDefinition(caseInfo.declaringType);
  switch (args.length) {
    case 0:
      return new Cons(caseInfo.index);
    case 1:
      return new Cons(caseInfo.index, args[0]);
    default:
      return new Cons(caseInfo.index, args);
  }
}
export function getTupleElements(typ) {
  if (typ instanceof NonDeclaredType && typ.kind === "Tuple") {
    return typ.generics;
  }
  throw new Error("Type " + getTypeFullName(typ) + " is not a tuple type.");
}
export function isTupleType(typ) {
  if (typ instanceof NonDeclaredType) {
    return typ.kind === "Tuple";
  }
  return false;
}
export function getFunctionElements(typ) {
  if (typ === "function") {
    throw new Error("The type of the function must be known at compile time to get the elements.");
  }
  if (typ instanceof NonDeclaredType && typ.kind === "Function") {
    return typ.generics;
  }
  throw new Error("Type " + getTypeFullName(typ) + " is not a function type.");
}
export function isFunctionType(typ) {
  return typ === "function" || typ instanceof NonDeclaredType && typ.kind === "Function";
}
export function getGenericArguments(typ) {
  if (typ instanceof NonDeclaredType) {
    if (Array.isArray(typ.generics)) {
      return typ.generics;
    } else {
      const dic = typ.generics;
      return Object.keys(dic).map(k => dic[k]);
    }
  }
  return [];
}