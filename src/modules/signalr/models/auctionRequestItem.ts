export class AuctionRequestItem {
  username: string;
  auctionItemName: string;
  proposedRate: number;

  constructor(username: string, auctionItemName: string, proposedRate: number) {
    this.username = username;
    this.auctionItemName = auctionItemName;
    this.proposedRate = proposedRate;
  }
}
