import './style.css'
import { interval, timer } from 'rxjs';

/*
 * interval emits numbers in sequence based on the
 * duration that you specify. In this case, a number
 * will be emitted every 1000ms (1s)
 */
const interval$ = interval(1000);

/*
 * We'll just supply a function for next in this case,
 * rather than observer object.
 */
interval$.subscribe(console.log);

/*
 * If you need the first item to be emitted on an interval
 * different than the rest, you can use the timer operator instead.
 * For example, let's have the first item emit immediately, followed
 * by a value every 1000ms after.
 */
 const timer$ = timer(0, 1000);

/*
 * You can also emit a single item after a specified duration, then complete,
 * by just supplying the first argument.
 */
//  const timer$ = timer(1000);
