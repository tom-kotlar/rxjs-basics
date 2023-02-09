

import { EMPTY, fromEvent, interval, map, merge, scan, startWith, switchMap, takeWhile } from 'rxjs';
import './style.css'
import { ajax } from 'rxjs/ajax';

 /*
 * CODE FOR FOR FIRST SECTION OF LESSON
 */
// const keyup$ = fromEvent(document, 'keyup');
// const click$ = fromEvent(document, 'click');

// keyup$.subscribe(console.log);
// click$.subscribe(console.log);

/*
 * merge subscribes to all provided streams on subscription,
 * emitting any values emitted by these streams.
 */
// merge(keyup$, click$).subscribe(console.log);


/*
 * BEGIN SECOND SECTION OF LESSON
 */
// elem refs
const countdown: any = document.getElementById('countdown');
const message: any= document.getElementById('message');
const pauseButton : any= document.getElementById('pause');
const startButton: any = document.getElementById('start');

// streams
const counter$ = interval(1000);
const pauseClick$ = fromEvent(pauseButton, 'click');
const startClick$ = fromEvent(startButton, 'click');

const COUNTDOWN_FROM = 10;

/*
 * With merge, we can combine the start and pause
 * streams, taking relevant action below depending
 * on which stream emits a value.
 */
merge(
  startClick$.pipe(map(() => true)), 
  pauseClick$.pipe(map(() => false))
)
.pipe(
  /*
   * Depending on whether start or pause was clicked,
   * we'll either switch to the interval observable,
   * or to an empty observable which will act as a pause.
   */
  switchMap(shouldStart => {
    return shouldStart ? counter$ : EMPTY;
  }),

  scan((accumulator, current) => {
    return accumulator - 1;
  }, COUNTDOWN_FROM),
  takeWhile(value => value >= 0),
  startWith(COUNTDOWN_FROM)
)
.subscribe(value => {
  countdown.innerHTML = value;
  if (!value) {
    message.innerHTML = 'Liftoff!';
  }
});