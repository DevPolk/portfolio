import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CompilerInfo } from "../models/compilerInfo";

@Injectable()
export class RoslynService {
  private url: string = "http://localhost:5000/api/generator";

  constructor(private http: HttpClient) {}

  public GetDefaultCode(): Observable<string> {
    return this.http.get<string>(`${this.url}/defaultCode`);
  }

  public Compile(compilerInfo: CompilerInfo): Observable<any> {
    console.log(compilerInfo);
    return this.http.post(`${this.url}/compile`, compilerInfo);
  }
}
