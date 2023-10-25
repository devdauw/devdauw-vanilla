const resp = await fetch("footer.html");
const html = await resp.text();

const footerTemplate = document.createElement('template');
footerTemplate.innerHTML = html;

class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const BLOG_START_DATE = 2023;
    const currentYear = new Date().getFullYear();

    const shadowRoot = this.attachShadow({ mode: 'closed' });

    shadowRoot.appendChild(footerTemplate.content);
    shadowRoot.getElementById("activeYears").innerHTML = (new Date().getFullYear() !== BLOG_START_DATE) ?
     `${BLOG_START_DATE} - ${currentYear}` :
     `${BLOG_START_DATE}`;
  }
}

customElements.define('footer-component', Footer);