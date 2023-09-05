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
    format: ["cjs", "esm"],
    splitting: false,
    sourcemap: false,
    clean: true,
    treeshake: true,
    dts: true,
    minify: false,
  },
]);
