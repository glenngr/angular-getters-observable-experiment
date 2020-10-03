import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Injectable()
export class Data {

 readonly state = new BehaviorSubject({
    test: "cool",

  });

  readonly test$ = this.state.pipe(pluck('test'));

  emitNewState() {
    const {test} = this.state.value;
    this.state.next({
      test: `${test}${test}`
    })
  }
}