import './style.css'

import { from } from 'rxjs';
import { map, reduce, scan} from 'rxjs/operators';

const numbers = [1, 2, 3, 4, 5];


/*
 * scan is similar to reduce, except it emits each new acculumated
 * value as it occurs. This is great for managing state changes 
 * in your application over time.
 */
from(numbers)
  .pipe(scan((accumulator: any, currentValue: any) => {
    return accumulator + currentValue;
   }, 0))
  .subscribe(console.log);


  const user = [
    { name: 'Tom', loggedIn: false, token: null },
    { name: 'Tom', loggedIn: true, token: 'abc' },
    { name: 'Tom', loggedIn: true, token: '123' }
  ];

  /*
 * For instance, in this example we are building up an object 
 * as new entries are emitted. Using scan, you can create a redux-like
 * pattern with just one operator. In fact, early versions of @ngrx/store,
 * Angular's reactive redux solution, were not much more than this:
 * https://github.com/ngrx/store/blob/d3a786aecafcda9b81fe60215af5852aae9de3a5/src/store.ts#L22
 */
const state$ = from(user).pipe(scan((accumulator, currentValue) => {
    return { ...accumulator, ...currentValue }
  }, {})
);

/*
 * We could then use map to grab certain properties from our
 * state for display. As it stands, even if the name doesn't change 
 * the name will be emitted on any emissions from scan. In future lessons
 * we will see how to only emit unique values based on the previous
 * emission. We will also see how to share an execution path between 
 * subscribers when necessary.
 */
const name$ = state$.pipe(
  map((state: any) => state.name)
);

name$.subscribe(console.log);