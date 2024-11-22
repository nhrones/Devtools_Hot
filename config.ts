import { Config, getConfig } from './deps.ts'


// If the first CLI argument (args[0]) = -h or ?
// show help text then just exit
if (Deno.args[0] === '-h' || Deno.args[0] === '?') {
   console.log(`
Build Help --   
Usage:
Commandline args:
-h or ? = this help

/src/dev.json - build:
Out: string - the folder to place the bundle in (defaults to 'dist')
Entry: string[] - default = ["./src/main.ts"]
Watch: string - the folder to watch for change
Minify: boolean - true or false (defaults to false)`
   );
   Deno.exit(0)
}

// initial default configuration for this app
const requiredCfg = {
   "DEV": true,
   "Entry": ["./src/main.ts"] ,  // an array of entry files to start esBuild from
   "Minify": false,               // minify the esbuild bundle?
   "Out": "dist",              // the folder to place esBuild bundle.js in 
   "Port": 80,                   // the local port to serve from
   "Serve": "dist",                // the folder to serve index.html from 
   "Watch": ["src", "dist"],     // Array of folders to watch for changes in.
} satisfies Config


// gets an existing configuration from ./.vscode/dev.json
// if not found, just build it from requiredCfg above
const cfg = getConfig("hot", Deno.args, requiredCfg)

// export all configuration constants
export const DEV = cfg.DEV ?? false
export const Entry = cfg.Entry ?? ['./src/main.ts']
export const Minify = cfg.Minify ?? false
export const Out = (cfg.Out && cfg.Out.length > 0) ? `./${cfg.Out}/bundle.js` : './bundle.js'
export const Port = cfg.Port ?? 80
export const ServeFrom = cfg.Serve ?? ""
export const Watch = cfg.Watch ?? ["src", "dist"]
