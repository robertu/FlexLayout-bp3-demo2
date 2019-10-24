const {
  override,
  addDecoratorsLegacy,
  disableEsLint,
  addBundleVisualizer,
  // addWebpackAlias,
  adjustWorkbox,
  addLessLoader
} = require("customize-cra");

const path = require("path");


module.exports = override(
  // enable legacy decorators babel plugin
  // addDecoratorsLegacy(),

  // disable eslint in webpack
  disableEsLint(),

  // add webpack bundle visualizer if BUNDLE_VISUALIZE flag is enabled
  process.env.BUNDLE_VISUALIZE === "YES" && addBundleVisualizer(),

  addLessLoader({
    strictMath: false, // jak jest true to się nie liczą less-y z bp3
    noIeCompat: true,
    localIdentName: "[local]--[hash:base64:5]" // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
  }),

  // adjust the underlying workbox
  adjustWorkbox(wb =>
    Object.assign(wb, {
      skipWaiting: true,
      exclude: (wb.exclude || []).concat("index.html")
    })
  )
);