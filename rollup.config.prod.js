const path = require("path");
const inputPath = path.resolve(__dirname, "./src/index.js");
const outputPath = path.resolve(__dirname, "./dist/visual.lib.min.js");
const outputPathEs = path.resolve(__dirname, "./dist/visual.lib.es.min.js");
const resolve = require("rollup-plugin-node-resolve");
const common = require("rollup-plugin-commonjs");
const babel = require("rollup-plugin-babel");
const json = require("rollup-plugin-json");
const { terser } = require("rollup-plugin-terser");
const vue = require("rollup-plugin-vue");
const postcss = require("rollup-plugin-postcss");
module.exports = {
  input: inputPath,
  output: [
    {
      file: outputPath,
      format: "umd", // umd格式
      name: "visual",
    },
    {
      file: outputPathEs,
      format: "es", // es格式
      name: "visualEs",
    },
  ],
  plugins: [
    // 有顺序可言。vue
    vue(),
    resolve(),
    common(),
    babel({ exclude: "node_modules/**" }),
    json(),
    terser(),
    postcss({ plugins: [] }),
    babel({
      exclude: "node_modules/**",
      runtimeHelpers: true,
      plugins: [
        [
          "@babel/transform-runtime",
          {
            regenerator: true,
          },
        ],
      ],
    }),
  ],
  external: ["vue"],
};
