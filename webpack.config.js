const path = require("path");
module.exports = {
  entry: [
    "./js/backend.js",
    "./js/debounce.js",
    "./js/gallery.js",
    "./js/gallery-filter.js",
    "./js/big-photo.js",
    "./js/form.js",
    "./js/scale.js",
    "./js/effects.js",
    "./js/hashtags.js",
    "./js/preview.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: 'inline-source-map'
};
