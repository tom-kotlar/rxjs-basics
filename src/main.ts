import './style.css'

import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

/*
 * Calculate progress based on scroll position
 */
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
   * For every scroll event, we use our helper function to 
   * map to a current scroll progress value.
   */
  map(({ target }: any) => calculateScrollPercent(target.scrollingElement))
);
/*
 * We can then take the emitted percent and set the width
 * on our progress bar.
 */
progress$.subscribe(percent => {
  progressBar.style.width = `${percent}%`;
});