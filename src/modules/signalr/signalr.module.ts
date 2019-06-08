import { CommonModule } from "@angular/common";
import { AuctionService } from "./services/auction.service";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SignalrMainComponent } from "./components/signalr-main/signalr-main.component";
import { AuctionControllerComponent } from "./components/auction-controller/auction-controller.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatDividerModule
} from "@angular/material";

@NgModule({
  exports: [SignalrMainComponent, AuctionControllerComponent],
  declarations: [SignalrMainComponent, AuctionControllerComponent],
  imports: [
    HttpClientModule,
    FormsModule,
    RouterModule.forChild([]),
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatCardModule,
    DragDropModule,
    MatDividerModule
  ],
  providers: [AuctionService]
})
export class SignalRModule {}
