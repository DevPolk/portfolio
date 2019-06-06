import { Query } from "src/app/models/Query";
import { Subscription } from "rxjs";
import { ICategory } from "src/app/models/interfaces/ICategory";
import { IDocument } from "./../../models/interfaces/IDocument";
import { CategoryService } from "./../../services/category.service";
import { DocumentService } from "./../../services/document.service";
import { Component, OnInit } from "@angular/core";
import { MatListOption } from "@angular/material";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  documents: IDocument[];
  filteredDocuments: IDocument[];
  categories: ICategory[];
  categoriesLoading: boolean = true;
  documentsLoading: boolean = true;

  documentsSub: Subscription;
  categoriesSub: Subscription;

  constructor(
    private documentService: DocumentService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    const documentQuery = new Query(
      "id, name",
      "categories($filter=status eq true)",
      "status eq true"
    );
    const categoryQuery = new Query("id, name", "", "status eq true");

    this.categoriesSub = this.categoryService
      .GetCategories(categoryQuery)
      .subscribe(
        response => (this.categories = response),
        error => {},
        () => (this.categoriesLoading = false)
      );

    this.documentsSub = this.documentService
      .GetDocuments(documentQuery)
      .subscribe(
        response => (this.documents = this.filteredDocuments = response),
        error => {},
        () => (this.documentsLoading = false)
      );
  }

  categoryChanged(options: MatListOption[]) {
    this.filteredDocuments =
      options && options.length
        ? this.documents.filter(d =>
            options.every(
              o => d.categories.map(c => c.id).indexOf(o.value) > -1
            )
          )
        : this.documents;
  }

  ngOnDestroy() {
    if (this.categoriesSub) this.categoriesSub.unsubscribe();
    if (this.documentsSub) this.documentsSub.unsubscribe();
  }
}
