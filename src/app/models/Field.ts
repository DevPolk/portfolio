import { IField } from "./interfaces/IField";
import { IValue } from "./interfaces/IValue";

export class Field implements IField {
  id: string;
  name: string;
  categoryId: string;
  values: IValue[];

  constructor(field?: IField) {
    this.id = field ? field.id : "00000000-0000-0000-0000-000000000000";
    this.name = field ? field.name : "";
    this.categoryId = field
      ? field.categoryId
      : "00000000-0000-0000-0000-000000000000";
    this.values = [];
  }
}
