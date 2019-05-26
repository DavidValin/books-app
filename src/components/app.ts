'use strict';
import { LitElement, html, property, customElement } from 'lit-element';
import { store } from "../state/store";
import { IAppState, IBook } from "../state/i_app_state";
import { breakpoints } from "../device_breakpoints";

import "./shared/carousel";
import "./shared/carousel_item";

import "./shared/tag";
import "./header";
import "./book";
import "./results";

@customElement('books-app')
class BooksApp extends LitElement {
  @property({ type: Array })
  books:Array<IBook> = []

  @property({ type: Number })
  booksResultsN:number|undefined

  constructor() {
    super();

    store.subscribe(() => {
      this.books = (<IAppState>store.getState()).results.books;
      this.booksResultsN = this.books.length;
    });
  }

  render() {
    return html`
      <div class="app-container">
        <b-header .booksResultsN=${this.booksResultsN}></b-header>
        <b-results .books=${this.books}></b-results>
      </div>

      <style>
        @media (min-width: ${breakpoints.desktop.min}px) {
          :host .app-container {
            background: #f9f9f9;
            padding: 25px 50px;
            border: 1px solid #d2d2d2;
            border-radius: 5px;
            max-width: 950px;
            margin: 1rem auto;
            min-height: 530px;
          }
        }
        @media (max-width: ${breakpoints.tablet.max}px) {
          :host .app-container {
            padding: 1rem;
          }
        }
      </style>
    `;
  }
}
