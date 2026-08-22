import { urlFor } from "./src/_utils/imageUrl.js";

export default function (eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("_site");
  // Set directories to pass through to the dist folder
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/fonts");
   eleventyConfig.addFilter("sanityImage", (image, width) => {
    const imageBuilder = urlFor(image);

    if (width) {
      imageBuilder.width(width);
    }

    return imageBuilder.url();
  });
}

export const config = {
  markdownTemplateEngine: "njk",
  htmlTemplateEngine: "njk",
};
