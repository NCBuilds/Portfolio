const menuIconButton = document.querySelector("[data-menu-icon-btn]")
const sidebar = document.querySelector("[data-sidebar]")

class Header extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback(header) {
    const shadowRoot = this.attachShadow({ mode: 'open' });

    shadowRoot.appendChild(headerTemplate.content);
  }
}
customElements.define('header-component', Header);

class navigation extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback(navigation) {
    const shadowRoot = this.attachShadow({ mode: 'closed' });

    shadowRoot.appendChild(navigationTemplate.content);
  }
}

customElements.define('navigation-component', navigation);




menuIconButton.addEventListener("click", () => {
  sidebar.classList.toggle("open")
})