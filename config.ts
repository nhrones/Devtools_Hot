import { Config, getConfig } from './deps.ts'
import JSR from "./jsr.json" with { type: "json" };
export const VER = JSR.version

// initial default configuration for this app
const requiredCfg = {
   "BundleName": "bundle.js",    // the name of the esBundle file
   "DEV": true,
   "Entry": ["./src/main.ts"] ,  // an array of entry files to start esBuild from
   "Minify": false,              // esbuild bundle?
   "OutPath": "dist",            // the folder to place esBuild bundle.js in 
   "Port": 80,                   // the local port to serve from
   "Serve": "dist",
   "HtmlName":"index.html",      // the folder to serve index.html from 
   "Watch": ["src", "dist"],     // Array of folders to watch for changes in.
} satisfies Config


// gets an existing configuration from ./.vscode/dev.json
// if not found, just build it from requiredCfg above
const cfg = getConfig("HOT", VER, Deno.args, requiredCfg)

// export all configuration constants
export const DEV = cfg.DEV ?? false
export const Entry = cfg.Entry ?? ['./src/main.ts']
export const Minify = cfg.Minify ?? false
export const OutPath = (cfg.OutPath && cfg.OutPath.length > 0) ? `./${cfg.OutPath}/bundle.js` : './bundle.js'
export const Port = cfg.Port ?? 80
export const ServeFrom = cfg.Serve ?? ""
export const Name = cfg.HtmlName ?? "index.html"
export const Watch = cfg.Watch ?? ["src", "dist"]
