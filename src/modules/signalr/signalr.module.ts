import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SignalrMainComponent } from "./components/signalr-main/signalr-main.component";

@NgModule({
  exports: [SignalrMainComponent],
  declarations: [SignalrMainComponent],
  imports: [HttpClientModule, FormsModule, RouterModule.forChild([])],
  providers: []
})
export class SignalRModule {}
