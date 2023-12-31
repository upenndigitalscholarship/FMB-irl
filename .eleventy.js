// Import fast-glob package
const util = require('./util');
const fg = require('fast-glob');
const { execSync } = require('child_process')
const parquet = require('parquetjs');

// check if parquet file exists
// if not, create it
const fs = require('fs');
const path = require('path');
const parquetFile = path.join(__dirname, 'data.parquet');

const schema = new parquet.ParquetSchema({
  name: { type: 'UTF8' },
  quantity: { type: 'INT64' },
  price: { type: 'DOUBLE' },
  date: { type: 'TIMESTAMP_MILLIS' },
  in_stock: { type: 'BOOLEAN' }
});
if (!fs.existsSync(parquetFile)) {
  util.makeData(schema, parquetFile);
}




// Run search for images in /gallery and /sponsors
// const ghcImages = fg.sync(['**/GHC/**', '!**/_site']);
// const mfcImages = fg.sync(['**/MFC/**', '!**/_site']);

//Create collections so you can access the data in your templates
module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");
  //GHC
  // eleventyConfig.addPassthroughCopy("GHC");
  // eleventyConfig.addCollection('ghc', function(collection) {
  //   return ghcImages;
  // });
  // TODO is this a better way to do it?
  // eleventyConfig.addCollection("ghc", function(collectionApi) {
  //   return collectionApi.getFilteredByGlob('GHC/**');
  // });
  // eleventyConfig.addNunjucksFilter("getGHCNext", function(value) {
  //   let index = ghcImages.indexOf(value);
  //   return ghcImages[index+1] ? ghcImages[index+1] : ghcImages[0];
  // });
  // eleventyConfig.addNunjucksFilter("getGHCPrevious", function(value) {
  //   let index = ghcImages.indexOf(value);
  //   return ghcImages[index-1] ? ghcImages[index-1] : ghcImages[0];
  // });
  
  // //MFC
  // eleventyConfig.addPassthroughCopy("MFC");
  // eleventyConfig.addCollection('mfc', function(collection) {
  //   return mfcImages;
  // });
  // eleventyConfig.addNunjucksFilter("getMFCNext", function(value) {
  //   let index = mfcImages.indexOf(value);
  //   return mfcImages[index+1] ? mfcImages[index+1] : mfcImages[0];
  // });
  // eleventyConfig.addNunjucksFilter("getMFCPrevious", function(value) {
  //   let index = mfcImages.indexOf(value);
  //   return mfcImages[index-1] ? mfcImages[index-1] : mfcImages[0];
  // });
  // eleventyConfig.on('eleventy.after', () => {
  //   execSync(`npx pagefind --source _site --glob \"**/*.html\"`, { encoding: 'utf-8' })
  //   })
    
};