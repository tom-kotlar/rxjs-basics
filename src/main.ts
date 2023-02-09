

import { combineLatest, filter, fromEvent, map } from 'rxjs';
import './style.css'
import { ajax } from 'rxjs/ajax';

 // elems
const first = document.getElementById('first');
const second = document.getElementById('second');

// streams
const keyup$ = fromEvent(document, 'keyup');
const click$ = fromEvent(document, 'click');

// helpers
const keyupAsValue = (elem: any) => {
  return fromEvent(elem, 'keyup').pipe(
    map((event: any) => event.target.valueAsNumber)
  );
};

/*
 * Each time any stream provided to combineLatest
 * emits a value, the latest value from all provided
 * streams will be emitted as an array. Note that all
 * provided streams must emit at least one value before
 * combineLatest will emit any values.
 */
// combineLatestWith(
//   keyup$,
//   click$
// ).subscribe(console.log);

/*
 * When you want to augment one stream with 
 * information from a second stream on emitted values,
 * withLatestFrom is a perfect choice.
 */
// click$.pipe(
//   withLatestFrom(interval(1000))
// ).subscribe(console.log);

/*
 * combineLatest is great when an element depends
 * on the combination of multiple streams to make
 * some calculation or determination. We will explore
 * this concept further in the next lab.
 */
combineLatest([
  keyupAsValue(first), 
  keyupAsValue(second)
]
)
.pipe(
  filter(([first, second]) => {
    return !isNaN(first) && !isNaN(second);
  }),
  map(([first, second]) => first + second)
).subscribe(console.log);