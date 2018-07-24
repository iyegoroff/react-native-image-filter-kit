import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { createAtom, compareRecords, equalsRecords, compareUnions, equals, GenericParam } from "../fable-core/Util";
export class HMRMsg {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Elmish.HMR.Program.HMRMsg",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["UserMsg", GenericParam("msg")], ["Reload"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Elmish.HMR.Program.HMRMsg", HMRMsg);
export class HMRModel {
  constructor(hMRCount, userModel) {
    this.HMRCount = hMRCount | 0;
    this.UserModel = userModel;
  }

  [_Symbol.reflection]() {
    return {
      type: "Elmish.HMR.Program.HMRModel",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        HMRCount: "number",
        UserModel: GenericParam("model")
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

}
setType("Elmish.HMR.Program.HMRModel", HMRModel);
export let hmrState = createAtom(null);