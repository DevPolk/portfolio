import { IDocument } from "./../models/interfaces/IDocument";
import { Injectable, isDevMode } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IStatusMessagePairResponse } from "../models/interfaces/IStatusMessagePairResponse";
import { Query } from "../models/Query";

@Injectable({
  providedIn: "root"
})
export class DocumentService {
  private url: string = isDevMode()
    ? "https://localhost:5001/api/documents"
    : "https://universal-api.azurewebsites.net/api/documents";

  constructor(private http: HttpClient) {}

  /**
   * HttpGet api/documents/{id}?{query}
   * @param id - document id
   * @param query - optional custom query
   */
  public GetDocument(id: string, query?: Query): Observable<IDocument> {
    return this.http.get<IDocument>(
      `${this.url}/${id}${query ? query.params : ""}`
    );
  }

  /**
   * HttpGet api/documents?{query}
   * @param query - optional custom query
   */
  public GetDocuments(query?: Query): Observable<IDocument[]> {
    return this.http.get<IDocument[]>(
      `${this.url}${query ? query.params : ""}`
    );
  }

  /**
   * HttpPost api/documents/new
   * @param document - request body
   */
  public CreateDocument(document: IDocument): Observable<IDocument> {
    return this.http.post<IDocument>(`${this.url}/new`, document);
  }

  /**
   * HttpPut api/documents/{id}
   * @param id - document id
   * @param document - request body
   */
  public UpdateDocument(
    id: string,
    document: IDocument
  ): Observable<IStatusMessagePairResponse> {
    return this.http.put<IStatusMessagePairResponse>(
      `${this.url}/${id}`,
      document
    );
  }

  /**
   * HttpPut api/documents/togglestatus/{id}
   * @param id - document id
   */
  public ToggleDocumentStatus(id: string): Observable<boolean> {
    return this.http.put<boolean>(`${this.url}/togglestatus/${id}`, null);
  }

  /**
   * HttpGet api/documents/count
   */
  public GetDocumentsCount(): Observable<number> {
    return this.http.get<number>(`${this.url}/count`);
  }
}
