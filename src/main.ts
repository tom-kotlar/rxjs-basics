

import { endWith, fromEvent, interval, of, scan, startWith, takeUntil, takeWhile } from 'rxjs';
import './style.css'
import { ajax } from 'rxjs/ajax';

 const numbers$ = of(1,2,3);

numbers$.pipe(
  /*
   * startWith lets you seed a stream with 1:M values.
   * On subscription, these values will be emitted
   * immediately, followed by any future values from
   * the source.
   */
  startWith('a', 'b', 'c'),
  /*
   * You can also end a stream with any number of values,
   * emitted on completion.
   */
  endWith('d', 'e', 'f')
).subscribe(console.log);

/*
 * BEGIN SECOND SECTION OF LESSON
 */
// elem refs
const countdown: any  = document.getElementById('countdown');
const message: any  = document.getElementById('message');
const abortButton: any = document.getElementById('abort');

// streams
const counter$ = interval(1000);
const abort$ = fromEvent(abortButton, 'click');

const COUNTDOWN_FROM = 10;

counter$
  .pipe(
    scan((accumulator, current) => {
      return accumulator  - 1 ;
    }, COUNTDOWN_FROM),
    takeWhile(value => value >= 0),
    takeUntil(abort$),
    /*
     * With startWith, we can seed the stream with
     * the starting countdown value.
     */
    startWith(COUNTDOWN_FROM)
  )
  .subscribe((value: any) => {
    countdown.innerHTML = value;
    if (!value) {
      message.innerHTML = 'Liftoff!';
    }
  });

