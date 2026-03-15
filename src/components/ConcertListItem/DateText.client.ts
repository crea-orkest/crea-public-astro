import { dateIsInThePast } from '@lib/helpers/date';

class DateText extends HTMLElement {
  #text = this.getAttribute('data-text');
  #date = this.getAttribute('data-date');

  constructor() {
    super();
  }

  #setText() {
    if (this.#text) {
      this.innerHTML = this.#text;
    }
  }

  #checkDate() {
    if (this.#date && dateIsInThePast(this.#date)) {
      this.#setText();
    }
  }

  connectedCallback() {
    this.#checkDate();
  }
}

customElements.define('date-text', DateText);
