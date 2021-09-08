import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { filter, map, skip, startWith, take } from 'rxjs/operators';
import { increment, decrement, reset } from '../counter.actions';

@Component({
  selector: 'app-my-counter',
  templateUrl: './my-counter.component.html',
  styleUrls: ['./my-counter.component.css']
})
export class MyCounterComponent {
  count$: Observable<any>;
  operations$ = new BehaviorSubject<string>('');

  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.select('count');

    // this.count$
    //   .pipe(map(item => item * item))
    //   .subscribe(data => console.log('Square numbers', data));

    // this.count$
    //   .pipe(take(3))
    //   .subscribe(data => console.log('Taking only 3 numbers', data));

    // this.count$
    //   .pipe(filter(item => !(item % 2)))
    //   .subscribe(data => console.log('Even numbers', data));

    // this.count$
    //   .pipe(skip(3))
    //   .subscribe(data => console.log('First 3 values are skipped', data));

    // this.count$
    //   .pipe(startWith(100))
    //   .subscribe(data => console.log('starting with 100', data));
  }

  calculate(value: string) {
    this.operations$.next(value);
    combineLatest([this.count$, this.operations$]);
    // .pipe(
    //   filter(item => item[1] === 'addition'),
    //   // filter(item =>
    //   //   item[1] === 'addition' ? item[0] + item[0] : item[0] * item[0]
    //   // )
    //   map(item => item[0] + item[0])
    // )
    // .subscribe(data => console.log('Only addition is working: ', data));

    combineLatest(this.count$, this.operations$).subscribe(
      ([count, operation]) => {
        if (operation === 'addition') {
          console.log('result of addition', count + count);
        }
        if (operation === 'multiplication') {
          console.log('result of multiplication', count * count);
        }
      }
    );
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }
}

/*
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://github.com/ngrx/platform
*/
