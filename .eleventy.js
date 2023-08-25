// Import fast-glob package
const fg = require('fast-glob');

// Run search for images in /gallery and /sponsors
const ghcImages = fg.sync(['**/GHC/**', '!**/_site']);
const mfcImages = fg.sync(['**/MFC/**', '!**/_site']);

const createImageObject = (path) => {
  // Given a path, split on _, return an object with the path
  //GHC/GHC_B43/EAP1477_GHC_B43_Doc16_IMG_090.jpg
  let image = {
    src: path,
    name: path.split('_')[1],
  }
  console.log(image)
  return Object.create(image);
}
//Create collections so you can access the data in your templates
module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("GHC");

  //Create collection of gallery images
  eleventyConfig.addCollection('ghc', function(collection) {
    return ghcImages.map((x) => createImageObject(x));
  });

  //Create collection of sponsor logos
  eleventyConfig.addCollection('mfc', function(collection) {
    return mfcImages;
  });
};