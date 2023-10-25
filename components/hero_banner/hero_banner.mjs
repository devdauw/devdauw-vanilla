const resp = await fetch("hero_banner.html");
const html = await resp.text();

const heroBannerTemplate = document.createElement('template');
heroBannerTemplate.innerHTML = html;

class HeroBanner extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'closed' });

    shadowRoot.appendChild(heroBannerTemplate.content);
  }
}

customElements.define('hero_banner-component', HeroBanner);