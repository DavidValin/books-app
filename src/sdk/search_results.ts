'use strict';
import { IBook } from "../state/i_app_state"

/**
 * Searches books through open library and returns a raw Array of raw results
 */
export async function getSearchResults(q:string):Promise<Array<any>> {
  return fetch(`https://openlibrary.org/search.json?q=${q}`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'omit'
  }).then(
    /* success */ (response:Response) => {
      return response.json().then((res) => res.docs)
    },
    /* fail */ (e:any) => {
      throw e
    }
  );
}
