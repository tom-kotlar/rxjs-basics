
import { fromEvent, interval, map, mergeMap, takeUntil } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import './style.css'

const mousedown$ = fromEvent(document, 'mousedown')
const mouseup$ = fromEvent(document, 'mouseup')


const interval$ = interval(1000)
const click$ = fromEvent(document, 'click');

// mousedown$.pipe(
//   /*
//    * In this case, we are mapping to a new interval
//    * observable on mousedown, but we are limiting it's
//    * lifetime by using the takeUntil operator with
//    * the mouseup$ stream.
//    */
//   mergeMap(
//     () => interval$.pipe(
//       takeUntil(mouseup$)
//     )
//   )
// ).subscribe(console.log)



const coordinates$ = click$.pipe(
  map((event: any) => ({
    x: event.clientX,
    y: event.clientY
  }))
);

const coordinatesWithSave$ = coordinates$.pipe(
  /*
   * mergeMap is good for 'fire and forget' save request
   * you do not want to be cancelled. For instance, in this
   * example we are emulating a save of coordinates
   * anytime the user clicks on the page.
   */
  mergeMap(coords => ajax.post(
    'https://www.mocky.io/v2/5185415ba171ea3a00704eed'
  ))
);

coordinatesWithSave$.subscribe(console.log);