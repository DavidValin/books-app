'use strict';

/**
 * The application filters interface
 */
interface IAppFilters {
  query:              string|undefined
}

/**
 * The search results interface
 */
interface IResults {
  lastSearchAt:       string|null,
  books:              Array<IBook>,
  focusedBookIndex:   number
}

/**
 * The book interface
 */
export interface IBook {
  key:          string,
  isbn:         string, 
  title:        string,
  authorName:   string,
  languages:    Array<string>,
  years:        Array<string>,
  subjects:     Array<string>,
  cover: {
    previewUrl: string,
    thumbnailUrl: string,
    tinyTumbnailUrl: string
  }
}

/**
 * The application state interface
 */
export interface IAppState {
  recording: boolean,
  searching: boolean,
  filters: IAppFilters,
  results: IResults
}
