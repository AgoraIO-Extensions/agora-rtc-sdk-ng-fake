import { defineConfig } from "tsup";

import pkg from "./package.json";

const banner = `
/**
 * @license ${pkg.name}
 * @version ${pkg.version}
 *
 * Copyright (c) Agora, Inc.
 *
 * This source code is licensed under the MIT license.
 */
`;

export default defineConfig([
  {
    entry: {
      [pkg.name]: "src/index.ts",
    },
    banner: () => {
      return {
        js: banner,
      };
    },
    outExtension: () => {
      return {
        js: `.js`,
      };
    },
    format: ["iife"],
    sourcemap: false,
    splitting: false,
    clean: true,
    minify: false,
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
    globalName: "FakeAgoraRTCWrapper",
    platform: "browser",
  },
]);
