'use strict';
import {IAppState} from "../i_app_state"
import {initialState} from "../initial_state"
import {IBook} from "../i_app_state";
import {
  TOGGLE_VOICE_SEARCH,
  SET_VOICE_QUERY,
  START_SEARCHING,
  SET_SEARCH_RESULTS,
  SET_CURRENT_SEARCH_RESULT
} from "../actions"

/**
 * Application state reducer
 */
export function appReducer(state:IAppState = initialState, action:any) {
  switch (action.type) {

    case TOGGLE_VOICE_SEARCH:
      return <IAppState>{...state, ...{
        recording: state.recording===true ? false : true
      }};

    case START_SEARCHING:
      return <IAppState>{...state, ...{
        searching: true,
        filters: {
          query: action.payload
        }
      }};

    case SET_SEARCH_RESULTS:
      const newBooks = <Array<IBook>>action.payload.map((rawBookResult:any) => {
        const getCoverImgBySize = (rawBookResult:any, size:"L"|"M"|"S") => (rawBookResult.cover_i ? `http://covers.openlibrary.org/b/id/${rawBookResult.cover_i}-${size}.jpg` : '/src/assets/no-cover.png');

        return {
          key:          rawBookResult.key,
          isbn:         rawBookResult.isbn ? rawBookResult.isbn[0] : '', 
          title:        rawBookResult.title,
          authorName:   rawBookResult.author_name ? rawBookResult.author_name[0] : 'unknown',
          languages:    rawBookResult.language,
          years:        rawBookResult.publish_year ? rawBookResult.publish_year.sort((a:number, b:number) => a < b ? -1 : 0) : [],
          subjects:     rawBookResult.subject,
          cover: {
            previewUrl: getCoverImgBySize(rawBookResult, 'L'),
            thumbnailUrl: getCoverImgBySize(rawBookResult, 'M'),
            tinyTumbnailUrl: getCoverImgBySize(rawBookResult, 'S')
          }
        }
      });

      const lastSearchAt = <string>(new Date()).toLocaleString(navigator.language ? navigator.language : "en-US", {
        weekday:  'long',
        year:     'numeric',
        month:    'short',
        day:      'numeric',
        hour:     '2-digit',
        minute:   '2-digit'
      });

      return {...state, ...{
        searching: false,
        results: {
          lastSearchAt: lastSearchAt,
          books: newBooks,
          focusedBookIndex: 0
        }
      }};

    case SET_CURRENT_SEARCH_RESULT:
      return {...state, ...{
        results: {
          lastSearchAt: state.results.lastSearchAt,
          books: state.results.books,
          focusedBookIndex: action.payload
        }
      }};

    default:
      return state
  }
}
