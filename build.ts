import type { Config } from "jsr:@ndh/config@1.0.0";
import * as esBuild from "https://deno.land/x/esbuild@v0.24.0/mod.js";
import {denoPlugins} from "https://deno.land/x/esbuild_deno_loader@0.9.0/mod.ts";

/** 
 * builds and bundles an entrypoint into a single ESM output. 
 * @param {Config} cfg - the configuration to build from, object that contains:        
 *    - OutPath: string - the folder to place the bundle in (defaults to 'dist')   
 *    - Entry: string[] - the entry points to build from (defaults to ["./src/main.ts"])   
 *    - Minify: boolean - whether or not to minify the bundle
 */
export async function buildIt(cfg: Config) {
   if (cfg.DEV) {
      console.log(`Bundling ${cfg.Entry} to ${cfg.OutPath} - minified = ${cfg.Minify}`)
   }
   await esBuild.build({
      // @ts-ignore: outdated types
      plugins: [...denoPlugins()],
      entryPoints: cfg.Entry,
      outfile: cfg.OutPath,
      bundle: true,
      minify: cfg.Minify,
      keepNames: true,
      banner: { js: '// deno-lint-ignore-file' },
      format: "esm"
   }).catch((e: unknown) => console.info(e));
   esBuild.stop();
}
