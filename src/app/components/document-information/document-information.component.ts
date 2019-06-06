import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { DocumentService } from "./../../services/document.service";
import { Component, OnInit } from "@angular/core";
import { Query } from "src/app/models/Query";
import { IDocument } from "src/app/models/interfaces/IDocument";

@Component({
  selector: "app-document-information",
  templateUrl: "./document-information.component.html",
  styleUrls: ["./document-information.component.scss"]
})
export class DocumentInformationComponent implements OnInit {
  document: IDocument;
  documentsSub: Subscription;
  id: string;
  isLoading: boolean = true;

  constructor(
    private service: DocumentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    const query = new Query("id, name", "values($expand=field),categories");

    this.documentsSub = this.service
      .GetDocument(this.id, query)
      .subscribe(
        response => (this.document = response),
        error => {},
        () => (this.isLoading = false)
      );
  }

  ngOnDestroy() {
    if (this.documentsSub) this.documentsSub.unsubscribe();
  }
}
