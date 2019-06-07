import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule
} from "@angular/material";

import { RoslynMainComponent } from "./components/roslyn-main/roslyn-main.component";
import { RoslynService } from "./services/roslyn.service";

@NgModule({
  declarations: [RoslynMainComponent],
  exports: [RoslynMainComponent],
  imports: [
    RouterModule.forChild([]),
    FormsModule,
    HttpClientModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [RoslynService]
})
export class RoslynModule {}
