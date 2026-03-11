class MobileMenu extends HTMLElement {
  #openButton = this.querySelector(
    '[data-name="menu-open-button"]',
  ) as HTMLButtonElement;
  #closeButton = this.querySelector(
    '[data-name="menu-close-button"]',
  ) as HTMLButtonElement;
  #menuOverlay = this.querySelector(
    '[data-name="menu-overlay"]',
  ) as HTMLDivElement;

  constructor() {
    super();
  }

  #toggleMenu() {
    const isOpen = this.#menuOverlay.classList.contains('open');
    if (isOpen) {
      this.#closeMenu();
    } else {
      this.#openMenu();
    }
  }

  #openMenu() {
    document.body.classList.add('noscroll-mobile');
    this.#closeButton.focus();
    this.#menuOverlay.classList.add('open');
  }

  #closeMenu() {
    document.body.classList.remove('noscroll-mobile');
    this.#openButton.focus();
    this.#menuOverlay.classList.remove('open');
  }

  connectedCallback() {
    this.#openButton.addEventListener('click', this.#toggleMenu.bind(this));
    this.#closeButton.addEventListener('click', this.#toggleMenu.bind(this));
  }

  disconnectedCallback() {
    this.#openButton.removeEventListener('click', this.#toggleMenu.bind(this));
    this.#closeButton.removeEventListener('click', this.#toggleMenu.bind(this));
  }
}

customElements.define('mobile-menu', MobileMenu);
