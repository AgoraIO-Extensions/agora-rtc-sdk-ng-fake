import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);

for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith("-")) {
    args.splice(args.indexOf(args[i]), 1);
    i--;
  }
}

const newVersion = args[0].substring(args[0].lastIndexOf("@") + 1);

const targetPath = path.join(__dirname, "..", "..", "src", "version.ts");

fs.readFile(targetPath, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const updatedData = data.replace(
    /export const VERSION = ".+"/,
    `export const VERSION = "${newVersion}"`,
  );

  fs.writeFile(targetPath, updatedData, err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`${targetPath} updated with version ${newVersion}`);
  });
});
