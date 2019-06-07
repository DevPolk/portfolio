import { CategoryService } from "./../../services/category.service";
import { IDocument } from "./../../models/interfaces/IDocument";
import { DocumentService } from "./../../services/document.service";
import { Subscription } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Document } from "src/app/models/Document";
import { MatSnackBar } from "@angular/material";
import { PopupComponent } from "../popup/popup.component";
import { Query } from "src/app/models/Query";
import { ICategory } from "src/app/models/interfaces/ICategory";

@Component({
  selector: "document-details",
  templateUrl: "./document-details.component.html",
  styleUrls: ["./document-details.component.scss"]
})
export class DocumentDetailsComponent implements OnInit {
  id: string;
  isNew: boolean = false;
  isLoading: boolean = true;
  document: IDocument;
  categories: ICategory[];
  allCategories: ICategory[];

  documentSub: Subscription;
  documentEditSub: Subscription;
  categoriesSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private service: DocumentService,
    private categoryService: CategoryService,
    private router: Router,
    private popup: MatSnackBar
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.isNew = this.id === "new";

    if (!this.isNew) {
      let query = new Query(
        "id,name,status",
        "categories($expand=fields),values($expand=field)"
      );
      this.documentSub = this.service.GetDocument(this.id, query).subscribe(
        response => {
          this.document = new Document(response);
        },
        error => console.log(error),
        () => {
          let query = new Query("id,name,status", "fields", "status eq true");
          this.categoriesSub = this.categoryService
            .GetCategories(query)
            .subscribe(response => {
              this.allCategories = response;
              this.renderCategories();
            });
          this.isLoading = false;
        }
      );
    } else {
      let query = new Query("id,name,status", "fields", "status eq true");
      this.categoriesSub = this.categoryService
        .GetCategories(query)
        .subscribe(
          response => (this.categories = this.allCategories = response)
        );

      this.document = new Document();
      this.isLoading = false;
    }
  }

  renderCategories() {
    this.categories = this.document
      ? this.allCategories.filter(
          c => this.document.categories.map(d => d.id).indexOf(c.id) == -1
        )
      : this.allCategories;

    this.document.categoryIds = this.document.categories.map(cat => cat.id);
    this.document.renderCategories();
  }

  submit() {
    this.documentEditSub = this.isNew
      ? this.service.CreateDocument(this.document).subscribe(response => {
          if (response.id) this.redirect("Successfully created a document.");
          else this.redirect("Failed.");
        })
      : this.service
          .UpdateDocument(this.id, this.document)
          .subscribe(response => {
            if (response.statusCode == 200)
              this.redirect("Successfully updated a document.");
            else if (response.statusCode == 304)
              this.redirect(response.message);
            else this.redirect("Failed.");
          });
  }

  redirect(message: string) {
    this.popup.openFromComponent(PopupComponent, {
      duration: 3000,
      data: { message: message }
    });
    this.router.navigate(["/admin/items"]);
  }

  categoryChange() {
    this.renderCategories();
  }

  responsiveHeight(content: string): string {
    return Math.floor(content.length / 70) + 1.3 + "rem";
  }

  ngOnDestroy() {
    if (this.documentSub) this.documentSub.unsubscribe();
    if (this.documentEditSub) this.documentEditSub.unsubscribe();
    if (this.categoriesSub) this.categoriesSub.unsubscribe();
  }
}
