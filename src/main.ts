import './style.css'

import { interval } from 'rxjs';
import { scan, map, filter } from 'rxjs/operators';

// elem refs
const countdown: any = document.getElementById('countdown');
const message: any = document.getElementById('message');

// streams
const counter$ = interval(1000);

counter$.pipe(
    scan((accumulator: any, current: any) => {
return accumulator - 1
    }, 10),
filter(value => value >= 0)
).subscribe((value: any) => {
    countdown.innerHTML = value
    if (!value ) {
        message.innerHTML = "LiftOff"
    }
})

/*
 * Starting countdown example. In future lessons we will learn
 * about how to seed our countdown, complete when the timer hits zero, 
 * pause the countdown, and resume. More to come!
 */
// counter$
//   .pipe(
//     // since we have learned about mapTo, let's use it!
//     mapTo(-1),
//     scan((accumulator, current) => {
//       return accumulator + current;
//     }, 10),
//     // prevent entering the negatives
//     filter(value => value >= 0)
//   )
//   .subscribe((value: any) => {
//     // for every emitted value, update our countdown display
//     countdown.innerHTML = value;
//     if (!value) {
//       message.innerHTML = 'Liftoff!';
//     }
//   });


