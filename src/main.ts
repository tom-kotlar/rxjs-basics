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



