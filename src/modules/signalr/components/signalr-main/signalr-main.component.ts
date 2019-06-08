import { AuctionService } from "./../../services/auction.service";
import { Subscription, Observable } from "rxjs";
import { AuctionItem } from "./../../models/auctionItem";
import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { AuctionRequestItem } from "../../models/auctionRequestItem";
import { runInThisContext } from "vm";

@Component({
  selector: "signalr-main",
  templateUrl: "./signalr-main.component.html",
  styleUrls: ["./signalr-main.component.scss"]
})
export class SignalrMainComponent implements OnInit, OnDestroy {
  userSignInStatus: boolean;
  username: string = "";
  messages: string = "";
  auctionItems: AuctionItem[] = [];
  i: number;
  reservedUsernames: string[] = ["system", "admin"];

  $messageStream: Subscription;
  $auctionItemsStream: Subscription;
  $rateStream: Subscription;

  constructor(private service: AuctionService) {}

  ngOnInit() {
    this.username = localStorage.getItem("username");
    this.userSignInStatus = this.username ? true : false;

    this.messages += "Welcome to auction, Sign In to participate.\n";
    this.service.connectToAuction();

    this.$messageStream = this.service.messageStream().subscribe(message => {
      this.messages += message + "\n";
    });

    this.$auctionItemsStream = this.service
      .auctionItemsStream()
      .subscribe(data => {
        console.log(data);
        if (data.status) {
          data.item["interval"] = setInterval(() => {
            console.log(data.item.remainingTimeInSecs);
            data.item.remainingTimeInSecs -= 1;
            console.log(this.auctionItems);
            if (data.item.remainingTimeInSecs == 0)
              clearInterval(data.item["interval"]);
            this.i = data.item.remainingTimeInSecs;
          }, 1000);

          this.auctionItems.push(data.item);
          console.log(this.auctionItems);
        } else {
          const index = this.auctionItems.findIndex(
            ai => ai.name == data.item.name
          );
          if (index > -1) this.auctionItems.splice(index, 1);
        }
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

    localStorage.setItem(
      "username",
      this.userSignInStatus ? this.username : ""
    );

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

  raiseRate(input: HTMLInputElement, auctionItemName: string) {
    this.service.raiseRate(
      new AuctionRequestItem(this.username, auctionItemName, +input.value)
    );

    input.value = "";
  }

  ngOnDestroy() {
    if (this.$auctionItemsStream) this.$auctionItemsStream.unsubscribe();
    if (this.$messageStream) this.$messageStream.unsubscribe();
  }
}
