// import { esBuild, denoPlugins } from "./deps.ts";
// import * as CFG from './config.ts'

// /** Build an entrypoint into a single ESM `bundle.js` output. */
// export const build = async () => {
//    await esBuild.build({
//       // @ts-ignore: outdated types
//       plugins: [...denoPlugins({})],
//       entryPoints: CFG.Entry,
//       outfile: CFG.Out,
//       bundle: true,
//       minify: CFG.Minify,
//       banner: { js: '// deno-lint-ignore-file' },
//       format: "esm"
//    }).catch((e: unknown) => console.info(e));
//    esBuild.stop();
// }
