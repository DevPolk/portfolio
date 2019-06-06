import { IField } from "./IField";

export interface IValue {
  id: string;
  content: string;
  fieldId: string;
  documentId: string;
  field: IField;
}
