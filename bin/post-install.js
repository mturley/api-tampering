#!/usr/bin/env node

function logLine(string) { console.log("| ", string); }
function logLines(strings) { strings.forEach(logLine); }

logLines([
  "",
  "Thanks for using api-tampering!",
  "For instructions please see https://github.com/mturley/api-tampering.",
  "",
  "WARNING: This package is still in development. Please don't try to use it yet.",
  ""
]);