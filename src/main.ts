import { Observable,fromEvent, interval, scan, takeUntil, takeWhile, tap,} from 'rxjs'
import './style.css'


const click$: Observable<Event> = fromEvent(document, 'click')
const counter$: Observable<number> = interval(1000);




/*
 * takeUntil lets you complete a stream based
 * on when another stream emits a value. For instance,
 * in this example our counter will run until the click$
 * stream emits a value, at which point the observable
 * will be completed.
 */

// counter$.pipe(
//   takeUntil(click$)
// ).subscribe(console.log);



const countdown: any = document.getElementById('countdown');
const message: any = document.getElementById('message');
const abortButton: any = document.getElementById('abort');

// streams

const abort$ = fromEvent(abortButton, 'click');

counter$
  .pipe(
    scan((accumulator, current) => {
      return accumulator - 1;
    }, 10),
    tap( console.log),
    takeWhile(value => value >= 0),
    /*
     * When you want to complete a stream based on another
     * stream you can use takeUntil. In this case, whenever
     * our button click stream emits the observable will
     * complete, letting us stop the countdown before
     * it reaches zero.
     */
    takeUntil(abort$)
  )
  .subscribe((value: any) => {
    countdown.innerHTML = value;
    if (!value) {
      message.innerHTML = 'Liftoff!';
    }
  });
