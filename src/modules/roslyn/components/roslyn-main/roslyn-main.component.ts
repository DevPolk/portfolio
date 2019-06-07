import { Component, OnInit } from "@angular/core";
import { RoslynService } from "../../services/roslyn.service";
import { Observable, Subscription } from "rxjs";
import { CompilerInfo } from "../../models/compilerInfo";

@Component({
  selector: "roslyn-main",
  templateUrl: "./roslyn-main.component.html",
  styleUrls: ["./roslyn-main.component.scss"]
})
export class RoslynMainComponent implements OnInit {
  script: string;
  compilerInfo: CompilerInfo;
  compiledResult: any;
  defaultCodeSub: Subscription;

  constructor(private service: RoslynService) {}

  ngOnInit() {
    this.compilerInfo = new CompilerInfo();

    this.defaultCodeSub = this.service
      .GetDefaultCode()
      .subscribe(
        response => (this.compilerInfo.script = this.script = response)
      );
  }

  compile() {
    this.service
      .Compile(this.compilerInfo)
      .subscribe(response => (this.compiledResult = response));
  }

  reset() {
    this.compilerInfo.script = this.script;
  }
}
