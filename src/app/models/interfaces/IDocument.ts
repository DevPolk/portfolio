import { IBase } from "./IBase";
import { ICategory } from "./ICategory";
import { IValue } from "./IValue";

export interface IDocument extends IBase {
  categories: ICategory[];
  categoryIds: string[];
  values: IValue[];
  status: boolean;

  renderCategories(): void;
}
