const resp = await fetch("tooltip.html");
const html = await resp.text();

const template = document.createElement("template");
template.innerHTML = html;

class Tooltip extends HTMLSpanElement {
  constructor() {
    self = super();
  }

  static get observedAttributes() {
    return ["data-tooltip"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      const shadowRoot = self.attachShadow({ mode: 'closed' });
      shadowRoot.appendChild(template.content);

      const hostChildNodes = Array.from(shadowRoot.host.childNodes);
      if (hostChildNodes.length > 0) {
        const holdingSpan = shadowRoot.getElementById("tooltip");
        hostChildNodes.map(child => {
          holdingSpan.appendChild(child);
        });
        holdingSpan.dataset.tooltip = newValue;
      }
    }
  }
}

customElements.define('has-tooltip', Tooltip, { extends: "span" });
