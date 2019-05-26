'use strict';
import { LitElement, html, property, customElement } from 'lit-element';

@customElement('b-tag')
class Tag extends LitElement {
  @property({ type: String })
  tag:string = ""

  constructor() {
    super();
  }

  render() {
    return html`
      <span class="tag">
        <slot></slot>
      </span>

      <style>
        :host .tag {
          background: #ffffff;
          border: 1px solid #d6d6d6;
          border-radius: 11px;
          padding: 0.1rem 0.6rem;
          margin: 0 0.2rem;
          line-height: 1.5rem;
        }
      </style>
    `;
  }
}
