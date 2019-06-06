import { CategoryService } from "./../../services/category.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ICategory } from "src/app/models/interfaces/ICategory";
import { Subscription, Observable } from "rxjs";
import { MatTableDataSource, PageEvent } from "@angular/material";
import { Query } from "src/app/models/Query";

@Component({
  selector: "category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"]
})
export class CategoryComponent implements OnInit, OnDestroy {
  categoriesSub: Subscription;
  isLoading: boolean = true;
  categoriesCount$: Observable<number>;

  displayedColumns: string[] = ["name", "fieldsCount", "status"];
  dataSource: MatTableDataSource<ICategory>;

  constructor(private service: CategoryService) {}

  ngOnInit() {
    this.categoriesCount$ = this.service.GetCategoriesCount();
    this.renderCategories(0, 10);
  }

  renderCategories(skip: number, top: number) {
    const query = new Query(
      "name,id,status",
      "fields",
      "",
      `$skip=${skip}&$top=${top}`
    );
    this.categoriesSub = this.service.GetCategories(query).subscribe(
      response => {
        response.forEach(category => {
          category["fieldsCount"] = category.fields.length;
          category["categoryStatus"] = category.status ? "Enabled" : "Disabled";
        });
        this.dataSource = new MatTableDataSource(response);
      },
      error => {},
      () => (this.isLoading = false)
    );
  }

  filter(input: HTMLInputElement) {
    this.dataSource.filter = input.value.trim().toLowerCase();
  }

  onPageChange(page: PageEvent) {
    this.renderCategories(page.pageIndex * page.pageSize, page.pageSize);
  }

  ngOnDestroy() {
    if (this.categoriesSub) this.categoriesSub.unsubscribe();
  }
}
