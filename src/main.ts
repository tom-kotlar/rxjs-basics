
import { asyncScheduler, debounce, debounceTime, distinctUntilChanged, fromEvent, interval, map, tap, throttleTime } from 'rxjs';
import './style.css'

const click$ = fromEvent(document, 'click')



// click$.pipe(
//      /*
//       * throttleTime will emit the first value, then ignore
//       * values for the specified duration. After that duration
//       * has passed, the next value from the source will be
//       * emitted, with the previous behavior repeated.
//       */
//     throttleTime(3000)
// ).subscribe(console.log)

function calculateScrollPercent(element: { scrollTop: any; scrollHeight: any; clientHeight: any; }) {
    const { scrollTop, scrollHeight, clientHeight } = element;
  
    return (scrollTop / (scrollHeight - clientHeight)) * 100;
  }
  
  // elems
  const progressBar: any = document.querySelector('.progress-bar');
  
  // streams
  const scroll$ = fromEvent(document, 'scroll');
  
  const progress$ = scroll$.pipe(
    /*
     * For extremely active streams like scroll events,
     * throttleTime can be used to limit the number of emitted
     * values. In this case, we'll just update our scroll bar every
     * 30ms of scrolling.
     */
    throttleTime(30, asyncScheduler, {
        leading: false,
        trailing: true
    }),
    /*
     * For every scroll event, we use our helper function to 
     * map to a current scroll progress value.
     */
    map(({ target }: any) => calculateScrollPercent(target.documentElement)),
    tap(console.log)
  );
  /*
   * We can then take the emitted percent and set the width
   * on our progress bar.
   */
  progress$.subscribe(percent => {
    progressBar.style.width = `${percent}%`;
  });