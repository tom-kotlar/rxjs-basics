
import { debounceTime, fromEvent, map, mergeAll, mergeMap} from 'rxjs';
import { ajax } from 'rxjs/ajax';
import './style.css'

const textInput: any = document.getElementById('text-input')

const input$ = fromEvent(textInput, 'keyup')

// input$.pipe(
//   map((event: any) => {
//     const term = event.target.value

//     return ajax.getJSON(
//       `https://swapi.dev/api/people/${term}/`
//     )
//   }), 
//   debounceTime(1000), 
//   mergeAll()
// ).subscribe(console.log)


input$.pipe(
  debounceTime(1000), 
  mergeMap((event: any) => {
    const term = event.target.value

    return ajax.getJSON(
      `https://swapi.dev/api/people/${term}/`
    )
  })
).subscribe(console.log)