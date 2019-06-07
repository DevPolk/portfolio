import { AuctionService } from "./../../services/auction.service";
import { Subscription, Observable } from "rxjs";
import { AuctionItem } from "./../../models/auctionItem";
import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { AuctionRequestItem } from "../../models/auctionRequestItem";

@Component({
  selector: "signalr-main",
  templateUrl: "./signalr-main.component.html",
  styleUrls: ["./signalr-main.component.scss"]
})
export class SignalrMainComponent implements OnInit, OnDestroy {
  userSignInStatus: boolean = false;
  username: string = "";
  messages: string = "";
  auctionItems: AuctionItem[] = [];
  reservedUsernames: string[] = ["system", "admin"];

  $messageStack: Subscription;
  $auctionItemsStream: Subscription;
  $rateStream: Subscription;
  $timeStream: Subscription;

  constructor(private service: AuctionService) {}

  ngOnInit() {
    this.messages += "Welcome to auction, Sign In to participate.\n";
    this.service.connectToAuction();

    this.$messageStack = this.service.messageStream().subscribe(message => {
      this.messages += message + "\n";
    });

    this.$auctionItemsStream = this.service
      .auctionItemsStream()
      .subscribe(data => {
        if (data.status) this.auctionItems.push(data.item);
        else {
          const index = this.auctionItems.findIndex(
            ai => ai.name == data.item.name
          );
          if (index > -1) this.auctionItems.splice(index, 1);
        }
      });

    this.$timeStream = this.service.timeStream().subscribe(auctionItem => {
      const index = this.auctionItems.findIndex(
        ai => ai.name === auctionItem.name
      );

      if (index > -1)
        this.auctionItems[index].remainingTimeInSecs =
          auctionItem.remainingTimeInSecs;
    });

    this.$rateStream = this.service.rateStream().subscribe(requestItem => {
      const index = this.auctionItems.findIndex(
        ai => ai.name === requestItem.auctionItemName
      );
      if (index > -1)
        this.auctionItems[index]["highestRate"] = `${requestItem.username} - $${
          requestItem.proposedRate
        }`;
    });
  }

  toggleSignInStatus() {
    this.userSignInStatus = !this.userSignInStatus;
    this.service.postMessage(
      "System",
      `[${this.username}] has ${
        this.userSignInStatus ? "signed in." : "signed out."
      }`
    );
  }

  validateUsername(): boolean {
    return (
      this.reservedUsernames.findIndex(ru =>
        ru.toLowerCase().includes(this.username.toLowerCase())
      ) == -1
    );
  }

  clearChat() {
    this.messages = "";
  }

  postMessage(input: HTMLInputElement) {
    this.service.postMessage(this.username, input.value);
    input.value = "";
  }

  raiseRate(rate: number, auctionItemName: string) {
    this.service.raiseRate(
      new AuctionRequestItem(this.username, auctionItemName, rate)
    );
  }

  ngOnDestroy() {
    if (this.$auctionItemsStream) this.$auctionItemsStream.unsubscribe();
    if (this.$messageStack) this.$messageStack.unsubscribe();
  }
}
