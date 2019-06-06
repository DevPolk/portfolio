import { IDocument } from "./../../models/interfaces/IDocument";
import { DocumentService } from "./../../services/document.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, Observable } from "rxjs";
import { MatTableDataSource, PageEvent } from "@angular/material";
import { Query } from "src/app/models/Query";

@Component({
  selector: "document",
  templateUrl: "./document.component.html",
  styleUrls: ["./document.component.scss"]
})
export class DocumentComponent implements OnInit, OnDestroy {
  documentsSub: Subscription;
  isLoading: boolean = true;
  documentsCount$: Observable<number>;

  displayedColumns: string[] = ["name", "categoriesCount", "status"];
  dataSource: MatTableDataSource<IDocument>;

  constructor(private service: DocumentService) {}

  ngOnInit() {
    this.documentsCount$ = this.service.GetDocumentsCount();
    this.renderDocuments(0, 10);
  }

  renderDocuments(skip: number, top: number) {
    let query = new Query(
      "id,name,status",
      "categories",
      "",
      `$skip=${skip}&$top=${top}`
    );

    this.documentsSub = this.service.GetDocuments(query).subscribe(
      response => {
        response.forEach(document => {
          document["categoriesCount"] = document.categories.length;
          document["documentStatus"] = document.status ? "Enabled" : "Disabled";
        });
        this.dataSource = new MatTableDataSource(response);
      },
      error => {},
      () => (this.isLoading = false)
    );
  }

  search(input: HTMLInputElement) {
    this.dataSource.filter = input.value.trim().toLowerCase();
  }

  onPageChange(page: PageEvent) {
    this.renderDocuments(page.pageIndex * page.pageSize, page.pageSize);
  }

  ngOnDestroy() {
    if (this.documentsSub) this.documentsSub.unsubscribe();
  }
}
