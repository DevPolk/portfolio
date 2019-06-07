import { PopupComponent } from "./components/popup/popup.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { RoslynModule } from "src/modules/roslyn/roslyn.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatTableModule,
  MatButtonModule,
  MatSnackBarModule,
  MatChipsModule,
  MatExpansionModule,
  MatSelectModule,
  MatInputModule,
  MatDividerModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatPaginatorModule
} from "@angular/material";

import { AppComponent } from "./app.component";
import { CategoryComponent } from "./components/category/category.component";
import { DocumentComponent } from "./components/document/document.component";
import { DocumentDetailsComponent } from "./components/document-details/document-details.component";
import { CategoryDetailsComponent } from "./components/category-details/category-details.component";
import { SummaryPipe } from "./pipes/summary.pipe";
import { DocumentInformationComponent } from "./components/document-information/document-information.component";
import { HomeComponent } from "./components/home/home.component";
import { SignalRModule } from "src/modules/signalr/signalr.module";
import { AdminAuctionComponent } from "./components/admin-auction/admin-auction.component";

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    DocumentComponent,
    DocumentDetailsComponent,
    CategoryDetailsComponent,
    SummaryPipe,
    DocumentInformationComponent,
    PopupComponent,
    HomeComponent,
    AdminAuctionComponent
  ],
  imports: [
    MatTableModule,
    MatButtonModule,
    MatSnackBarModule,
    MatChipsModule,
    MatExpansionModule,
    MatSelectModule,
    MatInputModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        { path: "", component: HomeComponent },
        {
          path: "admin/items/information/:id",
          component: DocumentInformationComponent
        },
        { path: "admin/auction", component: AdminAuctionComponent },
        { path: "admin/items/:id", component: DocumentDetailsComponent },
        { path: "admin/items", component: DocumentComponent },
        { path: "admin/categories/:id", component: CategoryDetailsComponent },
        { path: "admin/categories", component: CategoryComponent },
        { path: "**", component: HomeComponent }
      ],
      { useHash: true }
    ),
    RoslynModule,
    SignalRModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PopupComponent]
})
export class AppModule {}
