

import { forkJoin } from 'rxjs';
import './style.css'
import { ajax } from 'rxjs/ajax';

const GITHUB_API_BASE = 'https://api.github.com';

/*
 * forkJoin waits for all inner observables to complete 
 * before emitting the last emitted value of each.
 * The use cases for forkJoin are generally similar to
 * Promise.all
 */
forkJoin({
  user: ajax.getJSON(`${GITHUB_API_BASE}/users/tom-kotlar`),
  repo: ajax.getJSON(`${GITHUB_API_BASE}/users/tom-kotlar/repos`)
}).subscribe(console.log);

/*
 * You can also pass in comma seperated arugments and
 * receieve an array in return. This is the only option if
 * you are using less than RxJS 6.5
 */

// forkJoin(
//   ajax.getJSON(`${GITHUB_API_BASE}/users/reactivex`),
//   ajax.getJSON(`${GITHUB_API_BASE}/users/reactivex/repos`)
// ).subscribe(([user, repos]) => {
//   // perform action
// });