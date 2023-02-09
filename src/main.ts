

import { exhaustMap, fromEvent, interval, mergeMap, switchMap, take, tap } from 'rxjs';
import './style.css'
import { ajax } from 'rxjs/ajax';

// const interval$ = interval(1000)
// const clicks$ = fromEvent(document,'click')

// clicks$.pipe(
//   /*
//   exhaustMap ignores values from previus emitted from the source while there is
//   active inner observble
//   */
//   exhaustMap(() => interval$.pipe(take(3)))
// ).subscribe(console.log)


const authenticateUser = () => {
  return ajax.post(
    'https://reqres.in/api/login',
    {
      email: 'eve.holt@reqres.in',
      password: 'babajaga'
    })
} 

const logingButton: any = document.getElementById('login')

const login$ = fromEvent(logingButton, 'click')

login$.pipe(
  tap(console.log),
  exhaustMap(() => authenticateUser())
).subscribe(console.log)