import { combineLatest, delay, filter, fromEvent, map, mergeMap, of, share, tap } from 'rxjs';
import './style.css'
import { ajax } from 'rxjs/ajax';
import { calculateMortgage } from './helpers';




const loanAmount = document.getElementById('loanAmount');
const interest = document.getElementById('interest');
const loanLength = document.querySelectorAll('.loanLength');
const expected: any = document.getElementById('expected');

// helpers

const createInputValueStream = (elem: any) => {
    return fromEvent(elem, 'input').pipe(
            map((event: any) => parseFloat(event.target.value))
    )
}

// simulating a save request
const saveResponse = (mortageAmount: any) => {
    return of(mortageAmount).pipe(delay(1000));
  };

// streams
const interest$ = createInputValueStream(interest);
const loanLength$ = createInputValueStream(loanLength);
const loanAmount$ = createInputValueStream(loanAmount);

const calculation$ = combineLatest([
    interest$,
    loanAmount$,
    loanLength$
]).pipe(
    map(([ interest, loanAmount, loanLength ] ) => {
        return calculateMortgage( interest, loanAmount, loanLength )
    }),
    // proving the stream is shared
  tap(console.log),
  /*
   *  If a field is empty, we'll just ignore the update for now
   *  by filtering out invalid values.
   */
    filter((mortageAmount: any) => !isNaN(mortageAmount)),
     /*
   *  Demonstrate sharing a stream so saves won't impact
   *  display updates. Behind the scenes this uses a Subject,
   *  which we we learn about in the first lessons of the
   *  Masterclass course.
   */
  share()
)
// .subscribe(
//    console.log
// )

calculation$.subscribe(mortageAmount => {
    expected.innerHTML = mortageAmount;
  });
  
  calculation$
    .pipe(mergeMap(mortageAmount => saveResponse(mortageAmount)))
    .subscribe();