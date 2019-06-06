import { Field } from "./Field";
import { IValue } from "./interfaces/IValue";
import { IField } from "./interfaces/IField";

export class Value implements IValue {
  id: string;
  content: string;
  fieldId: string;
  documentId: string;
  field: IField;

  constructor() {
    this.content = "";
    this.documentId = this.id = this.fieldId =
      "00000000-0000-0000-0000-000000000000";
    this.field = new Field();
  }
}
