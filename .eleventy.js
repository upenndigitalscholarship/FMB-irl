// Import fast-glob package
const fg = require('fast-glob');

// Run search for images in /gallery and /sponsors
const ghcImages = fg.sync(['**/GHC/**', '!**/_site']);
const mfcImages = fg.sync(['**/MFC/**', '!**/_site']);

//Create collections so you can access the data in your templates
module.exports = function(eleventyConfig) {

  //Create collection of gallery images
  eleventyConfig.addCollection('ghc', function(collection) {
    return ghcImages;
  });

  //Create collection of sponsor logos
  eleventyConfig.addCollection('mfc', function(collection) {
    return mfcImages;
  });
};