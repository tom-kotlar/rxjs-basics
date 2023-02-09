

import { EMPTY, catchError, debounceTime, distinctUntilChanged, empty, fromEvent, map, switchMap } from 'rxjs';
import './style.css'
import { ajax } from 'rxjs/ajax';

 'rxjs/operators';

const BASE_URL = 'https://api.openbrewerydb.org/breweries';

//elems
const inputBox: any = document.getElementById('text-input');
const typeaheadContainer: any = document.getElementById('typeahead-container');

// streams
const input$ = fromEvent(inputBox, 'keyup');

input$
  .pipe(
    debounceTime(200),
  map( (event: any) => event.target.value),
    distinctUntilChanged(),
    switchMap(searchTerm => ajax.getJSON(
      `${BASE_URL}?by_name=${searchTerm}`
      )
      .pipe(
        /*
         * catchError receives the error and the
         * observable on which the error was caught
         * (in case you wish to retry). In this case,
         * we are catching the error on the ajax
         * observable returned by our switchMap
         * function, as we don't want the entire
         * input$ stream to be completed in the
         * case of an error.
         */
        catchError((error, caught) => {
          /*
           * In this case, we just want to ignore
           * any errors and hope the next request
           * succeeds so we will just return an 
           * empty observable (completes without
           * emitting any values).
           * 
           * You can also use the EMPTY import, 
           * which is just a shortcut for empty(). 
           * Behind the scenes empty() returns the
           * EMPTY constant when a scheduler is not provided.
           * ex. import { EMPTY } from 'rxjs';
           * return EMPTY;
           * https://github.com/ReactiveX/rxjs/blob/fc3d4264395d88887cae1df2de1b931964f3e684/src/internal/observable/empty.ts#L62-L64
           */
           return EMPTY;
        })
      )
    )
  )
  .subscribe((response: any) => {
    // update ui
    typeaheadContainer.innerHTML = response.map((b:any) => b.name).join('<br>');
  });
