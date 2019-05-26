'use strict';
import { LitElement, html, customElement, property } from 'lit-element';

@customElement('b-carousel-item')
class CarouselItem extends LitElement {
  @property({ type: Number })
  height:number = 0;

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="carousel-item">
        <slot></slot>
      </div>

      <style>
        :host .carousel-item {
          height: ${this.height}px;
          display: block;
        }
      </style>
    `;
  }
}
