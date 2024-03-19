// Import fast-glob package
const util = require('./util');
const fg = require('fast-glob');
const { execSync } = require('child_process')

// Run search for images 
const ghcImages = fg.sync(['**/GHC/**', '!**/_site']);
const mfcImages = fg.sync(['**/MFC/**', '!**/_site']);

// load the csv file at './_data/eap1477.csv'
const fs = require("fs");
const { parse } = require("csv-parse");
fs.createReadStream("./_data/eap1477.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    console.log(row);
  })

//Create collections so you can access the data in your templates
module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");
  //GHC
  eleventyConfig.addPassthroughCopy("GHC");
  eleventyConfig.addCollection('ghc', function(collection) {
    ghcCollection = [];
    ghcImages.forEach((image) => {
      let imageObject = {
        "path": image,
        "name": image.split("/")
      }
      ghcCollection.push(imageObject);
    });
    return ghcCollection;
  });
  

  eleventyConfig.addNunjucksFilter("getGHCNext", function(value) {
    let index = ghcImages.indexOf(value);
    return ghcImages[index+1] ? ghcImages[index+1] : ghcImages[0];
  });
  eleventyConfig.addNunjucksFilter("getGHCPrevious", function(value) {
    let index = ghcImages.indexOf(value);
    return ghcImages[index-1] ? ghcImages[index-1] : ghcImages[0];
  });
  
  //MFC
  eleventyConfig.addPassthroughCopy("MFC");
  eleventyConfig.addCollection('mfc', function(collection) {
    return mfcImages;
  });
  eleventyConfig.addNunjucksFilter("getMFCNext", function(value) {
    let index = mfcImages.indexOf(value);
    return mfcImages[index+1] ? mfcImages[index+1] : mfcImages[0];
  });
  eleventyConfig.addNunjucksFilter("getMFCPrevious", function(value) {
    let index = mfcImages.indexOf(value);
    return mfcImages[index-1] ? mfcImages[index-1] : mfcImages[0];
  });
  eleventyConfig.on('eleventy.after', () => {
    execSync(`npx pagefind --source _site --glob \"**/*.html\"`, { encoding: 'utf-8' })
    })
    
};