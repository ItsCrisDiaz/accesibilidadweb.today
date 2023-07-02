import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: "https://www.accesibilidadweb.today",
  // Enable Preact to support Preact JSX components.
  integrations: [preact({ compat: true })],
});
