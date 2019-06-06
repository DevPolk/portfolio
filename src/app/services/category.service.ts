import { Injectable, isDevMode } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IStatusMessagePairResponse } from "../models/interfaces/IStatusMessagePairResponse";
import { ICategory } from "../models/interfaces/ICategory";
import { Query } from "../models/Query";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  private url: string = isDevMode()
    ? "http://localhost:5000/api/categories"
    : "https://universal-api.azurewebsites.net/api/categories";

  constructor(private http: HttpClient) {}

  /**
   * HttpGet api/categories/{id}?{query}
   * @param id - category id
   * @param query - optional custom query
   */
  public GetCategory(id: string, query?: Query): Observable<ICategory> {
    return this.http.get<ICategory>(
      `${this.url}/${id}${query ? query.params : ""}`
    );
  }

  /**
   * HttpGet api/categories?{query}
   * @param query - optional custom query
   */
  public GetCategories(query?: Query): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(
      `${this.url}${query ? query.params : ""}`
    );
  }

  /**
   * HttpPost api/categories/new
   * @param category - request body
   */
  public CreateCategory(category: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(`${this.url}/new`, category);
  }

  /**
   * HttpPut api/categories/{id}
   * @param id - category id
   * @param category - request body
   */
  public UpdateCategory(
    id: string,
    category: ICategory
  ): Observable<IStatusMessagePairResponse> {
    return this.http.put<IStatusMessagePairResponse>(
      `${this.url}/${id}`,
      category
    );
  }

  /**
   * HttpGet api/categories/count
   */
  public GetCategoriesCount(): Observable<number> {
    return this.http.get<number>(`${this.url}/count`);
  }
}
