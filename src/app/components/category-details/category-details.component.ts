import { Subscription } from "rxjs";
import { CategoryService } from "./../../services/category.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ICategory } from "src/app/models/interfaces/ICategory";
import { Category } from "src/app/models/Category";
import { Field } from "src/app/models/Field";
import { MatSnackBar } from "@angular/material";
import { PopupComponent } from "../popup/popup.component";
import { Query } from "src/app/models/Query";

@Component({
  selector: "category-details",
  templateUrl: "./category-details.component.html",
  styleUrls: ["./category-details.component.scss"]
})
export class CategoryDetailsComponent implements OnInit {
  id: string;
  isNew: boolean = false;
  isLoading: boolean = true;
  category: ICategory;

  categorySub: Subscription;
  categoryEditSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private service: CategoryService,
    private router: Router,
    private popup: MatSnackBar
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.isNew = this.id === "new" ? true : false;

    if (!this.isNew) {
      const query = new Query("id,name,status", "fields");
      this.categorySub = this.service
        .GetCategory(this.id, query)
        .subscribe(
          response => (this.category = response),
          error => {},
          () => (this.isLoading = false)
        );
    } else {
      this.isLoading = false;
      this.category = new Category();
    }
  }

  submit() {
    this.categoryEditSub = this.isNew
      ? this.service.CreateCategory(this.category).subscribe(response => {
          if (response.id) this.redirect("Successfully created a category.");
          else this.redirect("Failed.");
        })
      : this.service
          .UpdateCategory(this.id, this.category)
          .subscribe(response => {
            if (response.statusCode == 200)
              this.redirect("Successfully updated a category.");
            else if (response.statusCode == 304)
              this.redirect(response.message);
            else this.redirect("Failed.");
          });
  }

  addField() {
    this.category.fields.push(new Field());
  }

  removeField(index: number) {
    this.category.fields.splice(index, 1);
  }

  redirect(message: string) {
    this.popup.openFromComponent(PopupComponent, {
      duration: 3000,
      data: { message: message }
    });
    this.router.navigate(["/categories"]);
  }

  ngOnDestroy() {
    if (this.categorySub) this.categorySub.unsubscribe();
    if (this.categoryEditSub) this.categoryEditSub.unsubscribe();
  }
}
