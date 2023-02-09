

import { exhaustMap, finalize, fromEvent, map, mergeMap, pluck, switchMap, switchMapTo, takeUntil, tap, timer } from 'rxjs';
import './style.css'
import { ajax } from 'rxjs/ajax';

 const startButton: any = document.getElementById('start')
 const stopButton: any = document.getElementById('stop')
 const polingStatus: any = document.getElementById('polling-status')
 const dogImage: any = document.getElementById('dog');

 const startclick$ = fromEvent(startButton, 'click')
 const stopclick$ = fromEvent(stopButton, 'click')

 startclick$
 .pipe(
  /*
   * Every start click we will map to an interval which
   * emits every 5 seconds to request a new image.
   * Since we do not want multiple polls active at once,
   * we'll use exhaustMap to ignore any emissions
   * while the inner interval is running.
   */
  exhaustMap(() =>
    timer(0, 5000).pipe(
      tap(() => (polingStatus.innerHTML = 'Active')),
      switchMap(
      () =>  ajax.getJSON('https://random.dog/woof.json', {'Content-Type':'application/json','Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': "GET"})),
      /*
       * Cancel the poll when stop click stream emits
       */
      takeUntil(stopclick$),
      /*
       * We'll use finalize to update the status to stopped
       * each time the inner observable completes.
       */
      finalize(() => (polingStatus.innerHTML = 'Stopped'))
    )
  )
)
.subscribe(url => (dogImage.src = url));


