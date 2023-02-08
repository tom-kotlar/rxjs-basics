import { Observable, first, fromEvent, map, of, take } from 'rxjs'
import './style.css'



const numbers$:Observable<number> = of(1,2,3,4,5)
const clicks$: Observable<Event> = fromEvent(document, 'click')

/*
 * take emits the first x values from the source,
 * then completes. In this case, 1,2,3 will be emitted.
 */

numbers$.pipe(take(3)).subscribe({
    next: console.log,
    complete: () => console.log('Complete!')
  });
  
/*
 * In this example, we will take the first value that matches
 * the provided criteria before completing. While we could use
 * a combination of filter(condition) and take(1), we can also 
 * use the first operator to fulfill the same use case. 
 * If you supply no values to first, it is equivalent to take(1).
 */

clicks$.pipe(
        map((event: any) => ({
          x: event.clientX,
          y: event.clientY
        })),
        // like filter(condition), take(1)
         first(({ y }) => y > 200)
      )
.subscribe({
    next: console.log,
    complete: () => console.log('Complete')
})