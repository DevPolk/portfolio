import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material";

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
    MatButtonModule
  ],
  providers: [RoslynService]
})
export class RoslynModule {}
