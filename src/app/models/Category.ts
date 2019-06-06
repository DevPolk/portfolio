import { ICategory } from "./interfaces/ICategory";
import { IField } from "./interfaces/IField";
import { IDocument } from "./interfaces/IDocument";

export class Category implements ICategory {
  id: string;
  name: string;
  fields: IField[];
  documents: IDocument[];
  status: boolean;

  constructor() {
    this.id = "00000000-0000-0000-0000-000000000000";
    this.name = "";
    this.fields = [];
    this.status = true;
  }
}
