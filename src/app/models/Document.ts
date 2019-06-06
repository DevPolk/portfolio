import { Field } from "src/app/models/Field";
import { IDocument } from "./interfaces/IDocument";
import { ICategory } from "./interfaces/ICategory";
import { IValue } from "./interfaces/IValue";
import { Value } from "./Value";

export class Document implements IDocument {
  categories: ICategory[];
  categoryIds: string[];
  values: IValue[];
  status: boolean;
  id: string;
  name: string;

  constructor(document?: Partial<IDocument>) {
    if (document) Object.assign(this, document);
    else {
      this.id = "00000000-0000-0000-0000-000000000000";
      this.name = "";
      this.status = true;
      this.categories = [];
      this.categoryIds = [];
      this.values = [];
    }
  }

  renderCategories() {
    if (this.categories.length > 0)
      this.categories.forEach(category => {
        category.fields.forEach(field => {
          if (!this.values.find(val => val.fieldId == field.id)) {
            let value = new Value();
            value.fieldId = field.id;
            value.field = new Field(field);
            this.values.push(value);
          }
        });
      });

    this.values.forEach(value => {
      if (this.categoryIds.indexOf(value.field.categoryId) == -1) {
        this.values = this.values.filter(val => val != value);
      }
    });
  }
}
