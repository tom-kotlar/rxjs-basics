import './style.css'
import { Observable, of, range } from 'rxjs';

const observer = {
  next: (value: any) => console.log('next', value),
  error: (error: any) => console.log('error', error),
  complete: () => console.log('complete!')
};


const source$: Observable<any> = of(1,2,3,4,5);

console.log('proving');
source$.subscribe(observer);
range(1,5).subscribe(observer);
console.log('this is synchronous');
