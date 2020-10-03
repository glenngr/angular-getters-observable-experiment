import { ChangeDetectionStrategy, Component, DoCheck } from "@angular/core";
import { Observable } from "rxjs";
import { pluck } from "rxjs/operators";
import { Data } from "./data.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements DoCheck {
  private previousGetterResult1;
  private previousGetterResult2;

  constructor(private readonly data: Data) {}

  /**
   * This getter just returns an observable, no pipe()
   */
  get test2(): Observable<string> {
    // console.log("getter2 accessed");
    const testObservable = this.data.test$;
    console.log(
      "getter2 same as last time?",
      testObservable === this.previousGetterResult2
    );
    this.previousGetterResult2 = testObservable;
    return testObservable;
  }

  /**
   * This getter gets an observable and uses pipe() to manipulate data
   */
  get test1(): Observable<string> {
    // console.log("getter1 accessed");
    const testObservable = this.data.state.pipe(pluck("test"));
    console.log(
      "getter1 same as last time?",
      testObservable === this.previousGetterResult1
    );
    this.previousGetterResult1 = testObservable;
    return testObservable;
  }

  ngDoCheck() {
    console.log("change detection runs");
  }

  onButtonClick() {
    this.data.emitNewState();
  }
}
