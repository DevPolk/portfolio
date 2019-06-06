import { IBase } from "./IBase";
import { IField } from "./IField";
import { IDocument } from "./IDocument";

export interface ICategory extends IBase {
  fields: IField[];
  documents: IDocument[];
  status: boolean;
}
