import "@material/web/tabs/tabs";

const resp = await fetch("/header.html");
const html = await resp.text();

const headerTemplate = document.createElement('template');
headerTemplate.innerHTML = html;

class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'closed' });

    shadowRoot.appendChild(headerTemplate.content);
  }
}

customElements.define('header-component', Header);
