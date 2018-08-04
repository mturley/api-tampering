#!/usr/bin/env node

var PREFIX = "[api-tampering]";

console.log("WARNING: This package is still in development. Please don't try to use it yet.");

// I guess I could use babel, but for now let's throwback to ES5 for compatability.
var jsonfile = require("jsonfile");

var tamperingModulesPath = module.paths.find(function(path) {
  return path.endsWith("/node_modules/api-tampering/node_modules");
});

var packageJsonPath = tamperingModulesPath &&
  tamperingModulesPath.replace("/node_modules/api-tampering/node_modules", "/package.json");

var doNothing = function() {
  console.log(PREFIX, "No package.json found in project. Not installing any npm scripts.");
  console.log(PREFIX, "If you installed api-tampering globally, this is normal.\n");
}

if (!packageJsonPath) {
  doNothing();
} else {
  jsonfile.readFile(packageJsonPath, function(err, packageJson) {
    if (err) return doNothing();

    console.log(PREFIX, "Found package.json at", packageJsonPath);

    if (!packageJson.scripts) packageJson.scripts = {};
    packageJson.scripts["api-tampering"] = "./node_modules/api-tampering/bin/main.js";
    jsonfile.writeFileSync(packageJsonPath, packageJson, { spaces: 2 });

    console.log(PREFIX, "Added the npm script \"api-tampering\" in your package.json file.\n");
  });
}