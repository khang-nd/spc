import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

export default [
  {
    input: "src/background.js",
    output: {
      sourcemap: true,
      format: "iife",
      file: "public/build/background.js",
    },
    plugins: [resolve()],
    watch: {
      clearScreen: false,
    },
  },
  {
    input: "src/injection.js",
    output: {
      sourcemap: true,
      format: "iife",
      file: "public/build/injection.js",
    },
    plugins: [resolve(), commonjs()],
    watch: {
      clearScreen: false,
    },
  },
];
