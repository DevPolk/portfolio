import { IBase } from "./IBase";
import { IValue } from "./IValue";

export interface IField extends IBase {
  categoryId: string;
  values: IValue[];
}
