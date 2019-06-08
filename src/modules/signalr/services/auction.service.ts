import { AuctionItem } from "./../models/auctionItem";
import { AuctionResponse } from "./../models/auctionResponse";
import { Injectable, isDevMode } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as signalr from "@aspnet/signalr";
import { Observable, Subject } from "rxjs";
import { AuctionRequestItem } from "../models/auctionRequestItem";
import { AuctionItemStatusPair } from "../models/auctionItemStatusPair";

@Injectable({
  providedIn: "root"
})
export class AuctionService {
  private hubConnection: signalr.HubConnection;
  private url: string = isDevMode()
    ? "http://localhost:5000"
    : "https://raimbeckcorp.azurewebsites.net";
  private messageStack = new Subject<string>();
  private rateStack = new Subject<AuctionRequestItem>();
  private timeStack = new Subject<AuctionItem>();
  private auctionItems = new Subject<AuctionItemStatusPair>();

  constructor(private http: HttpClient) {}

  public initialize(item: AuctionItem): void {
    this.http
      .post(`${this.url}/api/auction/initialize`, item)
      .subscribe(response => console.log(response));
  }

  public connectToAuction(): void {
    this.hubConnection = new signalr.HubConnectionBuilder()
      .withUrl(`${this.url}/auctionHub`)
      .build();

    this.hubConnection
      .start()
      .then(() => this.hubConnection.invoke("ConnectToAuction"))
      .catch(err => console.log("Error", err));

    this.hubConnection.on("RateRaised", (response: AuctionResponse) => {
      this.messageStack.next(response.message);
      if (response.auctionRateRequest)
        this.rateStack.next(response.auctionRateRequest);
    });

    this.hubConnection.on(
      "RecieveMessage",
      (username: string, message: string) => {
        this.messageStack.next(`[${username}]: ${message}`);
      }
    );

    this.hubConnection.on("AuctionItemClosed", item =>
      this.auctionItems.next(new AuctionItemStatusPair(item, false))
    );

    this.hubConnection.on("NewAuctionItemAdded", item => {
      item["highestRate"] = "No rates yet.";
      this.auctionItems.next(new AuctionItemStatusPair(item, true));
    });
  }

  public postMessage(username: string, message: string): void {
    this.hubConnection.invoke("SendMessage", username, message);
  }

  public raiseRate(item: AuctionRequestItem): void {
    if (!this.hubConnection) return;

    this.hubConnection
      .invoke("RaiseRate", item)
      .catch(err => console.log(`${item.username} got error: ${err}`));
  }

  public messageStream(): Observable<string> {
    return this.messageStack.asObservable();
  }

  public rateStream(): Observable<AuctionRequestItem> {
    return this.rateStack.asObservable();
  }

  public timeStream(): Observable<AuctionItem> {
    return this.timeStack.asObservable();
  }

  public auctionItemsStream(): Observable<AuctionItemStatusPair> {
    return this.auctionItems.asObservable();
  }
}
