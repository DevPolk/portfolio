import { AuctionItem } from "./auctionItem";

export class AuctionItemStatusPair {
  item: AuctionItem;
  status: boolean;

  constructor(item: AuctionItem, status: boolean) {
    this.item = item;
    this.status = status;
  }
}
