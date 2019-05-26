'use strict';
import { LitElement, html, customElement, property } from 'lit-element';

@customElement('b-carousel')
class Carousel extends LitElement {
  @property({ type: Boolean })
  autoscroll:boolean = true

  @property({ type: Number })
  scrollIntervalSec:number = 3

  @property({ type: Boolean })
  scrolledItemIndex:number = 0

  @property({ type: Function })
  onScrolled:Function|undefined

  @property({ type: Number })
  carouselItemsNumber:number = 0;

  interval:any
  @property({ type: Number })
  height:number = 0

  constructor() {
    super();
  }

  scrollNext() {
    if (this.scrolledItemIndex >= this.carouselItemsNumber-1) {
      this.scrolledItemIndex = -1;
    }
    this.goTo(this.scrolledItemIndex+1);
  }

  scrollPrevious() {
    if (this.scrolledItemIndex == 0) {
      this.scrolledItemIndex = this.carouselItemsNumber+1;
    }
    this.goTo(this.scrolledItemIndex-1);
  }

  goTo(index:number) {
    this.scrolledItemIndex = index;
    if (this.onScrolled) {
      this.onScrolled(this.scrolledItemIndex);
    }
  }

  startScrolling() {
    if (this.interval) { clearInterval(this.interval); }
    this.interval = setInterval(() => this.scrollNext(), this.scrollIntervalSec*1000);
  }

  stopScrolling() {
    clearInterval(this.interval);
  }

  firstUpdated() {
    if (this.autoscroll) { this.startScrolling(); }

    // autoscrolling on tab on focus
    window.addEventListener('focus', () => {
      if (this.autoscroll) { this.startScrolling(); }
    });
    
    // stop scrolling when tab in background
    window.addEventListener('blur', () => {
      if (this.autoscroll) { this.stopScrolling(); }
    });

    const slot = (<ShadowRoot>this.shadowRoot).querySelector('slot');
    if (slot) {
      this.carouselItemsNumber = slot.assignedNodes().filter((node:Node,index:number, array:Node[]) => (node.nodeName === 'B-CAROUSEL-ITEM')).length;
    }
  }


  render() {
    return html`
      <div class="carousel">
        <div class="carousel__offset-container">
          <slot></slot>
        </div>
      </div>

      <style>
        :host .carousel {
          height: calc(${this.height}px - 2.6rem);
          overflow: hidden;
        }
        :host .carousel__offset-container {
          position: relative;
          transition: margin-top 0.25s ease-out;
          margin-top: -${this.height * this.scrolledItemIndex}px;
        }
      </style>
    `;
  }
}
