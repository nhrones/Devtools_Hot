// deno-lint-ignore-file
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/main.ts
var cnt = 1;
var logger = document.getElementById("logger");
var btn = document.getElementById("btn");
btn.onclick = () => {
  log(`Click count = ${cnt++}  `);
};
var log = /* @__PURE__ */ __name((what) => {
  let text = `${what.padEnd(30, "-")} `;
  text += (/* @__PURE__ */ new Date()).toLocaleTimeString();
  logger.textContent = `${text}${"\n"}` + logger.textContent;
}, "log");
export {
  log
};
