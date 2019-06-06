import { Injectable, isDevMode } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CompilerInfo } from "../models/compilerInfo";

@Injectable()
export class RoslynService {
  private url: string = isDevMode()
    ? "http://localhost:5000/api/generator"
    : "https://raimbeckcorp.azurewebsites.net/api/generator";

  constructor(private http: HttpClient) {}

  public GetDefaultCode(): Observable<string> {
    return this.http.get<string>(`${this.url}/defaultCode`);
  }

  public Compile(compilerInfo: CompilerInfo): Observable<any> {
    console.log(compilerInfo);
    return this.http.post(`${this.url}/compile`, compilerInfo);
  }
}
