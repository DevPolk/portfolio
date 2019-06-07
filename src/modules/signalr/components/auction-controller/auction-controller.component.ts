import { AuctionService } from "../../services/auction.service";
import { AuctionItem } from "../../models/auctionItem";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "auction-controller",
  templateUrl: "./auction-controller.component.html",
  styleUrls: ["./auction-controller.component.scss"]
})
export class AuctionControllerComponent implements OnInit {
  @Input("auctionItems") auctionItems: AuctionItem[];

  constructor(private service: AuctionService) {}

  ngOnInit() {}

  init(auctionItem: AuctionItem) {
    this.service.initialize(auctionItem);
  }
}
