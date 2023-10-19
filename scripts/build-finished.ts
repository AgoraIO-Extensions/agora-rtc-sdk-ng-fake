const fs = require("fs");
const path = require("path");

const pkg = require("../package.json");

const distDir = "dist";

const packageData = {
  name: `${pkg.name}`,
  version: `${pkg.version}`,
  description: "Fake Agora Web RTC for testing",
  main: `${pkg.name}_${pkg.version}.js`,
  publishConfig: {
    registry: "https://npm.pkg.github.com",
  },
};

const packagePath = path.join(distDir, "package.json");

fs.writeFileSync(packagePath, JSON.stringify(packageData, null, 2));
