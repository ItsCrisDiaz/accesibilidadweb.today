const { DateTime } = require("luxon");
const sass = require("sass");
const webCPlugin = require("@11ty/eleventy-plugin-webc");
const { EleventyRenderPlugin } = require("@11ty/eleventy");
const pluginCSS = require("eleventy-postcss-extension");

module.exports = function (eleventyConfig) {
  // Sincronizar CSS
  eleventyConfig.setBrowserSyncConfig({
    files: ["public/*.css"],
  });

  eleventyConfig.addPlugin(pluginCSS);
  eleventyConfig.addPlugin(webCPlugin, {
    // Glob to find no-import global components
    // (The default changed from `false` in Eleventy WebC v0.7.0)
    components: "./src/_includes/components/*.webc",

    // Adds an Eleventy WebC transform to process all HTML output
    useTransform: false,

    // Additional global data used in the Eleventy WebC transform
    transformData: {},
  });
  eleventyConfig.addPlugin(EleventyRenderPlugin);

  // Export assets and HTML files (to redirect)
  eleventyConfig.addPassthroughCopy("./src/**.svg");
  eleventyConfig.addPassthroughCopy("./src/substackForm.min.js");
  // Get actual year
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Change date format in blogs
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  // Compile Sass
  eleventyConfig.addTemplateFormats("scss");

  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    compile: function (contents, inputPath) {
      let includesPaths = [this.config.dir.includes];
      return (data) => {
        let ret = sass.renderSync({
          file: inputPath,
          includesPaths,
          data: contents,
        });
        return ret.css.toString("utf8");
      };
    },
  });

  return {
    // Default template to Nunjucks
    markdownTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "public",
    },
  };
};
