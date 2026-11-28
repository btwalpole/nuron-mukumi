import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import postcss from "postcss";
import postcssImport from "postcss-import";
import { urlFor } from "./src/_utils/imageUrl.js";

async function buildCss() {
  const input = "src/css/global.css";
  const output = "_site/css/global.css";
  const source = await readFile(input, "utf8");
  const result = await postcss([postcssImport()]).process(source, {
    from: input,
    to: output,
  });

  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, result.css);
}

export default function (eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("_site");
  eleventyConfig.addWatchTarget("src/css/");
  eleventyConfig.on("eleventy.after", buildCss);
  // Set directories to pass through to the dist folder
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/fonts");
   eleventyConfig.addFilter("sanityImage", (image, width) => {
    // The Sanity URL builder is immutable: each call returns a new builder
    let imageBuilder = urlFor(image).auto("format");

    if (width) {
      imageBuilder = imageBuilder.width(width);
    }

    return imageBuilder.url();
  });
}

export const config = {
  markdownTemplateEngine: "njk",
  htmlTemplateEngine: "njk",
};
