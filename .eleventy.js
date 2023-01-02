const { DateTime } = require("luxon");
const sass = require("sass");
const pluginCSS = require("eleventy-postcss-extension");

module.exports = function (eleventyConfig) {
  // Sincronizar CSS
  eleventyConfig.setBrowserSyncConfig({
    files: ["public/*.css"],
  });

  eleventyConfig.addPlugin(pluginCSS);

  // Export assets and HTML files (to redirect)
  eleventyConfig.addPassthroughCopy("./src/**.svg");
  eleventyConfig.addPassthroughCopy("./src/submitForm.min.js");
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
