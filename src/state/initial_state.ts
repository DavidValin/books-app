'use strict';
import { IAppState } from "./i_app_state"

/**
 * The initial application state
 */
export const initialState:IAppState = {
  recording: false,
  searching: false,
  filters: {
    query: ""
  },
  results: {
    lastSearchAt: null,
    books: [],
    focusedBookIndex: 0
  }
}
