/* eslint-env node */

/// <reference types="vitest" />

import { defineConfig } from "vite";

export default defineConfig({
  test: {
    onConsoleLog(log) {
      if (log.includes("Agora RTC client not found")) return false;
      if (log.includes("Agora-SDK [DEBUG]: ")) return false;
      if (log.includes("Agora-SDK [WARNING]: ")) return false;
      if (log.includes("Agora-SDK [ERROR]: ")) return false;
      if (log.includes("Agora-SDK [INFO]: ")) return false;
    },
    environment: "jsdom",
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov", "json-summary"],
      exclude: ["src/*/index.ts", "test/**", "src/version.ts"],
    },
    exclude: ["**/node_modules/**"],
    setupFiles: ["./test/setup.tsx"],
  },
});
