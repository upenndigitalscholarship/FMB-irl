// Import fast-glob package
const { execSync } = require('child_process')
const readline = require('readline');

//Create collections so you can access the data in your templates
module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("GHC");
  eleventyConfig.addPassthroughCopy("MFC");
  
  eleventyConfig.on('eleventy.after', () => {
    execSync(`npx pagefind --source _site --glob \"**/*.html\"`, { encoding: 'utf-8' })
    })
    
};