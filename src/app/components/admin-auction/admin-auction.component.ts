import { AuctionItem } from "./../../../modules/signalr/models/auctionItem";
import { DocumentService } from "./../../services/document.service";
import { Component, OnInit } from "@angular/core";
import { IDocument } from "src/app/models/interfaces/IDocument";
import { Query } from "src/app/models/Query";

@Component({
  selector: "admin-auction",
  templateUrl: "./admin-auction.component.html",
  styleUrls: ["./admin-auction.component.scss"]
})
export class AdminAuctionComponent implements OnInit {
  items: IDocument[];
  auctionItems: AuctionItem[];

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    const query = new Query("name", "values($expand=field)", "status eq true");
    this.documentService
      .GetDocuments(query)
      .subscribe(
        response =>
          (this.auctionItems = response.map(
            i =>
              new AuctionItem(
                i.name,
                i.values.filter(v => v.field.name === "ImageUrl")[0].content,
                +i.values.filter(v => v.field.name === "BaseRate")[0].content,
                +i.values.filter(v => v.field.name === "RemainingTimeInSecs")[0]
                  .content
              )
          ))
      );
  }
}
