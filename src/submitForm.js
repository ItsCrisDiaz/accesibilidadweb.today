class SubstackForm extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["domain"];
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    attr === "domain" && (this.domain = newVal);
  }

  getTemplate() {
    const template = document.createElement("template");

    template.innerHTML =
      /* html */

      `<form class="flow" novalidate>
        <div class="l-sidebar">
          <div data-content>
            <label class="label" for="substackForm">Correo electrónico</label>
            <p class="status error" id="substackInputError" data-inline data-form-error></p>
            <input class="input" id="substackForm" type="email" aria-describedby="substackInputError" required  />
          </div>
          <div data-sidebar>
            <button class="submit" type="submit">Suscribirse</button>
          </div>
        </div>
        <div role="status" aria-busy="true" class="loader flow" tabindex="-2">
        </div>
        <div role="status" class="status" tabindex="-2" data-form-state></div>
      </form>`;

    return template;
  }

  render() {
    this.innerHTML = this.getTemplate().innerHTML;
  }

  connectedCallback() {
    // this.innerHTML = this.getTemplate().content.cloneNode(true);
    this.render();

    // Get newly created form elements
    const form = this.querySelector("form");
    const email = this.querySelector("input");
    const loading = this.querySelector(".loader");
    const error = this.querySelector("[data-form-error]");
    const announce = this.querySelector("[data-form-state]");

    // Handle submit events
    async function submitHandler(event) {
      // Stop the form from reloading
      event.preventDefault();

      // Make sure an email address was provided
      if (!email.value) {
        error.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <path d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Por favor usa un correo válido.`;
        error.classList.remove("success");
        error.classList.add("error");
        email.focus();
        return;
      }

      try {
        // Call the API
        announce.innerHTML = "";
        error.innerHTML = "";
        loading.innerHTML = `<div class="loading"></div>
        <p><b>Enviando...</b></p>`;
        loading.focus();
        let request = await fetch(
          "https://us-central1-substackapi.cloudfunctions.net/subscribe",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email.value,
              domain: this.domain,
            }),
          }
        );

        // Get the response and show the message in the UI
        let response = await request.json();
        loading.innerHTML = "";
        console.log(response);
        announce.innerHTML = `
        <p>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <path d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          ¡Gracias por inscribirte! Te hemos enviado un correo de confirmación a <b>${email.value}</b> para que completes el proceso.</p>`;
        announce.classList.remove("error");
        announce.classList.add("success");
      } catch (error) {
        // If something went wrong, show the error instead

        loading.hidden = true;
        announce.innerHTML = `<p>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <path d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Algo no está funcionando. Por favor, intenta de nuevo. Si persiste, puedes contactarme a <a href="mailto:cristian@accesibilidadweb.today>cristian@accesibilidadweb.today</a> para suscribirte.`;
        announce.classList.remove("success");
        announce.classList.add("error");
      }
    }

    // Listen for submit events
    form.addEventListener("submit", submitHandler.bind(this));
  }
}

customElements.define("substack-form", SubstackForm);
