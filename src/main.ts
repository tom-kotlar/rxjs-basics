
import { Observable, fromEvent, interval, map, sample, sampleTime, tap } from 'rxjs';
import './style.css'

const click$: Observable<any>  = fromEvent(document, 'click')
const timer$: Observable<number> = interval(1000);


click$.pipe(

        /*
     * At the duration you specify, sample time will emit the last
     * emitted value within that window. For instance, in this 
     * example we are sampling at an interval of 4s. When the 4s
     * interval timer begins, you can click twice. Once 4s passes,
     * the second click will be emitted. This behavior is then repeated.
     * If no values are emitted from the source in the sample
     * window no values are emitted by sampleTime.
     */
    sampleTime(4000), 
    tap(console.log),
    map(({ clientX, clientY })  => ({
        clientX,
        clientY
      }))
).subscribe(console.log)



timer$.pipe(
    /*
     * The sample window can also be based off another stream. 
     * For instance, in this example every time you click the
     * last value emitted by the timer$ observable will be emitted
     * by sample.
     */
    sample(click$)
  ).subscribe(console.log);