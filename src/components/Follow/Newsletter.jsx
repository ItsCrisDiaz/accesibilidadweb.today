import { useState, useEffect, useRef } from "preact/hooks";
import { Icon } from "../Icon/Icon";
import css from "./Newsletter.module.scss";

export const Newsletter = () => {
  const [loadedJs, setLoadedJs] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);

  const refForm = useRef(null);
  const refInput = useRef(null);

  useEffect(() => {
    setLoadedJs(true);
    refForm.current.removeAttribute("action");
    refForm.current.removeAttribute("method");
  }, [refForm]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!email) {
      setMessage("Por favor usa un correo válido");
      refInput.current.focus();
      return;
    }

    try {
      // Call the API
      setDisabled(true);
      setMessage(
        <>
          <div class={css.loading}></div>
          <p class="text-center">
            <b>Enviando...</b>
          </p>
        </>
      );
      let request = await fetch(
        "https://us-central1-substackapi.cloudfunctions.net/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            domain: "accesibilidadweb.substack.com/",
          }),
        }
      );

      // Get the response and show the message in the UI
      let response = await request.json();
      if (response.errors) {
        setMessage(
          <>
            <Icon
              name="close"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className={css.icon}
            />
            <p>
              Tu correo no es válido, por favor rectifícalo e intenta de nuevo
            </p>
          </>
        );
        setDisabled(false);
        refInput.current.focus();
      } else {
        setDisabled(false);
        setMessage(
          <>
            <Icon
              name="check"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className={css.icon}
            />
            <p>
              ¡Gracias por suscribirte! Se ha enviado un mensaje a{" "}
              <b>{email}</b>. Revisa tu correo para completar el proceso.
            </p>
          </>
        );
      }
    } catch (error) {
      // If something went wrong, show the error instead
      setDisabled(false);
      refInput.current.focus();
      setMessage(
        <>
          <Icon
            name="close"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={css.icon}
          />
          <p>Algo no está funcionando, por favor intenta de nuevo</p>
        </>
      );
    }
  }

  return (
    <form
      class="flow"
      action="https://us-central1-substackapi.cloudfunctions.net/subscribe"
      method="POST"
      {...(loadedJs && { novalidate: "" })}
      ref={refForm}
      onSubmit={(event) => handleSubmit(event)}
    >
      <div class={`${css.newsletter} | with-sidebar`}>
        <div class="content flow">
          <label class={css["newsletter__label"]} for="newsletterEmail">
            Correo electrónico
          </label>
          <input
            id="newsletterEmail"
            class={`${css["newsletter__input"]}`}
            type="email"
            name="email"
            value={email}
            ref={refInput}
            onChange={(event) => setEmail(event.target.value)}
            autocomplete="email"
            aria-describedby="newsletter-input-message"
            disabled={disabled}
            required
          />
          {loadedJs ? null : (
            <input
              type="hidden"
              id="newsletterDomain"
              name="domain"
              value="accesibilidadweb.substack.com/"
            />
          )}
        </div>
        <button
          disabled={disabled}
          class={`${css["newsletter__button"]} | sidebar ff-300`}
        >
          Suscribirse
        </button>
      </div>
      <div
        class={`${css.message} | flow fs-300`}
        role="status"
        id="newsletter-input-message"
      >
        {message}
      </div>
    </form>
  );
};
