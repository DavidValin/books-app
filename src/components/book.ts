'use strict';
import {LitElement, html, property, customElement} from 'lit-element';
import {IBook} from "../../src/state/i_app_state";
import { store } from '../state/store';
import { breakpoints } from "../device_breakpoints";

@customElement('b-book')
class Book extends LitElement {
  @property({ type: Object })
  book:IBook|undefined

  @property({ type: Boolean })
  preloadImages:boolean = false

  constructor() {
    super();
  }

  render() {
    return html`
      ${this.book ? html`
        <div class="book">
          <div class="book__cover-container">
            <img class="book__cover-container__cover"
              src="${this.preloadImages === true ? this.book.cover.previewUrl : ''}"
              srcset="${this.preloadImages === true ? `${this.book.cover.thumbnailUrl} 1x, ${this.book.cover.previewUrl} 2x` : ''}"
              sizes="(max-width: 400px) 1x, (min-width: 400px) 2x"
            />
          </div>

          <div class="book__details">
            <h3 class="book__details__title-name">${this.book.title}</h3>
            <span class="book__details__author-name">
              by <span class="book__details__author-name__name">
                   ${this.book.authorName}
                 </span>
            </span>
            <p>isbn: ${this.book.isbn}</p>
            <p>
              Published in: ${this.book.years && this.book.years.length>0 ? this.book.years.map((year) => html`<b-tag>${year}</b-tag>`) : html`<b-tag>unknown year</b-tag>`}
            </p>
            <p>
              Languages: ${this.book.languages && this.book.languages.length>0 ? this.book.languages.map((lang) => html`<b-tag>${lang}</b-tag>`) : html`<b-tag>unknown languages</b-tag>`}
            </p>
            <p>
              Subjects: ${this.book.subjects && this.book.subjects.length>0 ? this.book.subjects.map((subject) => html`<b-tag>${subject}</b-tag>`) : html`<b-tag>unknown</b-tag>`}
            </p>
          </div>
        </div>

        <style>
          :host .book {
            background: white;
            border-radius: 10px;
            height: calc(100% - 2px);
            display: flex;
          }
          :host .book__cover-container {
            text-align: center;
            flex: 1;
            padding: 1rem;
          }
          :host .book__cover-container__cover {
            padding: 0.3rem;
            border: 1px solid #eaeaea;
            max-width: 100%;
          }
          @media (min-width: ${breakpoints.desktop.min}px) {
            :host .book__cover-container__cover {
              max-height: 310px;
              max-width: 80%;
            }
          }
          @media (max-width: ${breakpoints.tablet.max}px) {
            :host .book__cover-container {
              max-width: 100%;
            }
          }
          @media (max-width: ${breakpoints.mobile.max}px) {
            :host .book__cover-container {
              flex: 2;
            }
            :host .book__details {
              flex: 8;
            }
          }
          @media (min-width: ${breakpoints.tablet.min}px) {
            :host .book__cover-container {
              flex: 1.5;
            }
            :host .book__details {
              flex: 2.5;
            }
          }
          :host .book__details__title-name {
            margin-bottom: 0.5rem;
            font-size: 1.5rem;
          }
          :host .book__details__author-name {
            color: #333;
          }
          :host .book__details__author-name__name {
            font-weight: 600;
          }
        </style>
      ` : null}
    `;
  }
}
