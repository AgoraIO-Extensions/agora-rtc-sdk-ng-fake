const fs = require("fs");
const path = require("path");

const pkg = require("../package.json");

const distDir = "dist";

const packageData = {
  name: "agora-rtc-sdk-ng-fake",
  version: `${pkg.version}`,
  description: "Fake Agora Web RTC for testing",
  main: `${pkg.name}_${pkg.version}.js`,
};

const packagePath = path.join(distDir, "package.json");

fs.writeFileSync(packagePath, JSON.stringify(packageData, null, 2));
