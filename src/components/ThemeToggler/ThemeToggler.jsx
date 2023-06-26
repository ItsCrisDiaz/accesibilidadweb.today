import { useState, useEffect } from "preact/hooks";
import css from "./ThemeToggler.module.scss";

export const ThemeToggler = () => {
  const [loadedJs, setLoadedJs] = useState(false);
  const [theme, setTheme] = useState("");

  useEffect(() => {
    setLoadedJs(true);
    console.log(localStorage.getItem("mode"));
    if (localStorage.getItem("mode")) {
      setTheme(localStorage.getItem("mode"));
    } else {
      const isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      if (isDarkMode) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    }
  }, []);

  useEffect(() => {
    const html = document.querySelector("html");

    localStorage.setItem("mode", theme);
    html.setAttribute("data-mode", theme);
    console.log(theme);
  }, [theme]);

  if (loadedJs) {
    return (
      <div class={css.container}>
        <p id="theme-toggler-label">Tema</p>
        <div
          class={css["theme-toggler"]}
          role="radiogroup"
          aria-labelledby="theme-toggler-label"
        >
          <div class={css["theme-toggler__item"]}>
            <input
              class={css["theme-toggler__input"]}
              type="radio"
              name="theme"
              id="light"
              value="light"
              checked={theme === "light"}
              onChange={(event) => setTheme(event.target.value)}
            />
            <label class={css["theme-toggler__label"]} for="light">
              Claro
            </label>
          </div>
          <div class={css["theme-toggler__item"]}>
            <input
              class={css["theme-toggler__input"]}
              type="radio"
              name="theme"
              id="dark"
              value="dark"
              checked={theme === "dark"}
              onChange={(event) => setTheme(event.target.value)}
            />
            <label class={css["theme-toggler__label"]} for="dark">
              Oscuro
            </label>
          </div>
        </div>
      </div>
    );
  }
};
