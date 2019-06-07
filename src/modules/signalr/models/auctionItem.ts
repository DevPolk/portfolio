export class AuctionItem {
  name: string;
  imageUrl: string;
  baseRate: number;
  remainingTimeInSecs: number;

  constructor(
    name: string,
    imageUrl: string,
    baseRate: number,
    remainingTimeInSecs: number
  ) {
    this.name = name;
    this.imageUrl = imageUrl;
    this.baseRate = baseRate;
    this.remainingTimeInSecs = remainingTimeInSecs;
  }
}
