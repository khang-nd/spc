import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import svelte from "rollup-plugin-svelte";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import css from "rollup-plugin-css-only";

const production = !process.env.ROLLUP_WATCH;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require("child_process").spawn(
        "npm",
        ["run", "start", "--", "--dev"],
        {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        }
      );

      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
}

function buildConfig(fileName, plugins = []) {
  return {
    input: `src/${fileName}`,
    output: {
      name: fileName,
      format: "iife",
      sourcemap: false,
      compact: true,
      file: `public/build/${fileName}`,
    },
    plugins: [resolve(), commonjs(), ...plugins],
  };
}

export default [
  buildConfig("background.js"),
  buildConfig("main.css.js"),
  buildConfig("main.js", [
    svelte({
      compilerOptions: { dev: !production },
    }),

    css({ output: "main.css" }),

    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),

    json(),

    !production && serve(),

    !production && livereload("public"),

    production && terser(),
  ]),
];
