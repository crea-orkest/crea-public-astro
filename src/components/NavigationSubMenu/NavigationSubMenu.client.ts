class EnhancedSubmenu extends HTMLElement {
  #toggle = this.querySelector('button') as HTMLButtonElement;
  #submenu = this.querySelector('[data-name="sub-menu"]') as HTMLDivElement;

  constructor() {
    super();
  }

  #toggleSubMenu() {
    const expanded = this.#submenu.classList.contains('open');
    if (expanded) {
      this.#closeSubMenu();
    } else {
      this.#openSubMenu();
    }
  }

  #openSubMenu() {
    this.#toggle.setAttribute('aria-expanded', 'true');
    this.#submenu.classList.add('open');
    window.addEventListener('keydown', this.#keyboardEvent.bind(this));
  }

  #closeSubMenu() {
    this.#toggle.setAttribute('aria-expanded', 'false');
    this.#submenu.classList.remove('open');
    window.removeEventListener('keydown', this.#keyboardEvent.bind(this));
  }

  #clickOutside(event: MouseEvent) {
    if (!this.contains(event.target as Node)) {
      this.#closeSubMenu();
    }
  }

  #keyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.#closeSubMenu();
    }
  }

  connectedCallback() {
    this.#toggle.addEventListener('click', this.#toggleSubMenu.bind(this));
    window.addEventListener('click', this.#clickOutside.bind(this));
  }

  disconnectedCallback() {
    this.#toggle.removeEventListener('click', this.#toggleSubMenu.bind(this));
    window.removeEventListener('click', this.#clickOutside.bind(this));
  }
}

customElements.define('enhanced-submenu', EnhancedSubmenu);
