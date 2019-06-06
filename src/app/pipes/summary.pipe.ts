import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "summary"
})
export class SummaryPipe implements PipeTransform {
  transform(value: string, args?: any): any {
    if (!value) return null;

    return value.length > 100 ? value.substr(0, 100) + "..." : value;
  }
}
