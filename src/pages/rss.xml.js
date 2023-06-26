import rss, { pagesGlobToRssItems } from "@astrojs/rss";

export async function get() {
  return rss({
    title: "Accesibilidadweb.today",
    description:
      "Guía en proceso sobre accesibilidad web enfocada en desarrollo y diseño de interfaces",
    site: "https://www.accesibilidadweb.today",
    items: await pagesGlobToRssItems(import.meta.glob("./**/*.md")),
    customData: `<language>es</language>`,
  });
}
