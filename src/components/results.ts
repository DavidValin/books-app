'use strict';
import { LitElement, html, property, customElement } from 'lit-element';
import { store } from "../state/store";
import { SET_CURRENT_SEARCH_RESULT } from "../state/actions";
import { IAppState, IBook } from "../state/i_app_state";


import "./shared/carousel";
import "./shared/carousel_item";

import "./book";

@customElement('b-results')
class Results extends LitElement {
  @property({ type: Array })
  books:Array<IBook> = []

  @property({ type: Number })
  carouselHeight:number = 400

  @property({ type: Number })
  focusedBookIndex:number = -1

  @property({ type: Boolean })
  searching:boolean = false

  @property({ type: String })
  query:string|undefined = ""

  @property({ type: String })
  lastSearchAt:string|null = null

  constructor() {
    super();

    store.subscribe(() => {
      this.books = (<IAppState>store.getState()).results.books;
      this.focusedBookIndex = store.getState().results.focusedBookIndex;
      this.searching = store.getState().searching;
      this.query = store.getState().filters.query; 
      this.lastSearchAt = store.getState().results.lastSearchAt
    });
  }

  render() {
    return html`
      <div class="results">
        ${this.searching ? html`<div class="results__searching">searching...</div>` : html`
          ${this.query ? html`
            <div class="results__description">
              ${this.books.length==0 ? 'There are no results for that query. ': ''}Last search at: ${this.lastSearchAt}
            </div>
            <b-carousel height="${this.carouselHeight}" .onScrolled=${(currIndex:number) => store.dispatch({ type: SET_CURRENT_SEARCH_RESULT, payload: currIndex })}>
              ${this.books.map((book:IBook, i:number) => html`
                <b-carousel-item height=${this.carouselHeight}>
                  <b-book .book=${book} .preloadImages=${this.focusedBookIndex === i-1 || this.focusedBookIndex >= i && this.focusedBookIndex <= i+5}></b-book>
                </b-carousel-item>
              `)}
            </b-carousel>
          ` : ''}
        `}
      </div>

      <style>
        :host .app-container {
          max-width: 1000px;
          margin: 2rem auto;
        }
        :host .results {
          margin: 2rem 0;
        }
        :host .results__searching {
          font-size: 1.5rem;
          animation: blinker 0.6s linear infinite;
        }
        :host .results__description {
          margin: 1rem 0;
          font-size: 0.8rem;
        }
        @keyframes blinker {
          50% { opacity: 0.1; }
        }
      </style>
    `;
  }
}
