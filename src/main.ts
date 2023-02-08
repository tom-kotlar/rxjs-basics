
import { debounce, debounceTime, distinctUntilChanged, fromEvent, interval, map, tap } from 'rxjs';
import './style.css'

const click$ = fromEvent(document, 'click')



click$.pipe(
    debounceTime(1000)
).subscribe(console.log)

const inputBox: any = document.getElementById('text-input')
const input$ = fromEvent(inputBox, 'keyup');


input$.pipe(
     /*
     * debounceTime emits the last emitted value from the source 
     * after a pause, based on a duration you specify.
     * For instance, in this case when the user starts typing all values
     * will be ignored until they paused for at least 200ms,
     * at which point the last value will be emitted.
     */
    debounceTime(1000),
    map(({target}: any) => target.value),
     /* 
     * If the user types, then backspaces quickly, the same value could
     * be emitted twice in a row. Using distinctUntilChanged will prevent
     * this from happening.
     */
    distinctUntilChanged()
).subscribe(console.log)

// input$.pipe(
//     debounce(() => interval(1000)),
//     map(({target}: any) => target.value),
//     distinctUntilChanged()
// ).subscribe(console.log)
