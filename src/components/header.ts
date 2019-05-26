'use strict';
import { LitElement, html, property, customElement } from 'lit-element';
// @ts-ignore
import * as annyang from 'annyang';
import { store } from "../state/store";
import { IAppState } from "../state/i_app_state";
import { getSearchResults } from "../sdk/search_results";
import { TOGGLE_VOICE_SEARCH, START_SEARCHING, SET_SEARCH_RESULTS } from "../state/actions";
import { breakpoints } from "../device_breakpoints";

@customElement('b-header')
class Header extends LitElement {
  @property({ type: Boolean })
  recording:boolean|undefined

  @property({ type: String })
  textQuery:string|undefined = ""

  constructor() {
    super();
    // setup voice commands
    annyang.addCommands({
      'search *booksQuery': this.handleSearch,
    });
  }

  handleSearch(booksQuery:string) {
    store.dispatch({ type: START_SEARCHING, payload: booksQuery });
    getSearchResults(booksQuery).then(
      (books) => {
        store.dispatch({ type: SET_SEARCH_RESULTS, payload: books });
      }
    );
  }

  handleToggleVoice() {
    store.dispatch({ type: TOGGLE_VOICE_SEARCH })
  }

  handleKeyUp(e:any) {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (e.target) {
        this.handleSearch(e.target.value);
      }
    }
  }

  firstUpdated() {
    store.subscribe(() => {
      if (this.recording !== store.getState().recording) {
        // init mic or stop it when states changes to recording
        store.getState().recording ? annyang.start() : annyang.abort();
      }
      this.recording = (<IAppState>store.getState()).recording;
      this.textQuery = (<IAppState>store.getState()).filters.query;
    });
  }

  render() {
    return html`
      <div class="top">
        <h1 class="top__app-title">
          Books Search
        </h1>
        <div class="top__voice-instructions">
          Activate microphone and search by saying 'search <name of a book>'
        </div>
        <p class="top__app-subtitle">
          through openlibrary.org
        </p>
      </div>

      <div class="search">
        <input @keyup=${(e:any) => this.handleKeyUp(e)} @change=${(e:any) => this.handleSearch(e.target.value)} class="search__text" type="text" placeholder="search a book" value=${this.textQuery} />
        <div class="search__voice">
          <i @click=${() => this.handleToggleVoice()} class="search__voice__icon"></i>
          <span class="search__voice__description${this.recording===true ? '--recording': ''}">voice ${this.recording===true ? 'on' : 'off'}</span>
        </div>
      </div>

      <style>
        :host .top {
          display: flex;
          flex-flow: wrap;
        }
        :host .top__app-title {
          letter-spacing: -0.1rem;
          margin: 1rem 0 0 0;
          display: inline;
          flex: 3.5;
        }
        :host .top__voice-instructions {
          font-size: 0.8rem;
          line-height: 1rem;
          align-self: flex-end;
          flex: 2.5;
          text-align: center;
          display: inline-block;
          margin-top: 1rem;
          background: white;
          padding: 7px 10px;
          border-radius: 20px;
          box-shadow: inset 1px 1px 1px rgba(0,0,0, 0.1);
        }
        :host .top__app-title,
        :host .top__voice-instructions {
          display: inline;
        }
        @media (max-width: ${breakpoints.desktop.min}px) {
          :host .top__app-title {
            margin: 1.3rem 0 0 0;
          }
        }
        :host .top__app-subtitle {
          color: #848484;
          margin: 0 0 1rem 0;
          width: 100%;
        }
        :host .search {
          display: flex;
        }
        :host .search__text {
          border: 1px solid black;
          border-radius: 5px;
          flex: 9;
          padding: 0.7rem;
          font-size: 1.5rem;
        }
        :host .search__text:hover {
          box-shadow: inset 1px 1px 3px rgba(0,0,0,0.3);
        }
        :host .search__voice {
          flex: 1;
          margin: 0 1rem;
          text-align: center;
        }
        :host .search__voice > * {
          display: block;
        }
        :host .search__voice__icon {
          cursor: pointer;
          display: block;
          background-image: url(/src/assets/mic-icon.svg);
          background-repeat: no-repeat;
          background-position: center;
          width: 100%;
          height: 65%;
          margin-bottom: 0.15rem;
        }
        :host .search__voice__description {
          color: #555;
        }
        :host .search__voice__description--recording {
          color: red;
        }
        @media (max-width: ${breakpoints.mobile.max}px) {
          :host .search {
            flex-wrap: wrap;
          }
          :host .search__voice__icon {
            height: 3rem;
            margin: 1rem 0;
          }
        }
      </style>
    `;
  }
}
