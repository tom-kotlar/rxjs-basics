import './style.css'
import { Observable } from 'rxjs';

const observer = {
  next: (value: any) => console.log('next', value),
  error: (error: any) => console.log('error', error),
  complete: () => console.log('complete!')
};


const observable = new Observable(subscriber => {
  let count = 0;
  // Observables can deliver 0:M values synchronous or asynchronously
  const id = setInterval(() => {
    subscriber.next(count);
    // calling complete also invokes the cleanup function you return
    subscriber.complete();
    count += 1;
  }, 1000);

  /*
   * You can return a function to clean up any resources that were
   * created with subscription. In this case, we need to clear 
   * the active interval. When using RxJS's built in creation operators
   * this will be handled for us.
   */
  return () => {
    console.log('called');
    clearInterval(id);
  };
});

const subscription = observable.subscribe(observer);
const subscriptionTwo = observable.subscribe(observer);

/*
 * Subscriptions can be added together using the add method,
 * you can then unsubscribe to multiple at the same time.
 * This is simply personal preference, unsubscribing individually 
 * will produce the same result. Also, in future lessons, we will see how
 * to automate this unsubscribe process with operators.
 */
subscription.add(subscriptionTwo);

setTimeout(() => {
 /*
  * Note: Calling unsubscribe will not fire your complete callback,
  * but the returned function will be invoked cleaning up any
  * resources that were created by the subscription - in this
  * case the interval.
  */
  subscription.unsubscribe();
}, 3500);
