# Deno Hot Dev Server

This dev server will launch a web app and hot-restart it on any\
changes to the deno typescript client source code.

**Yes, you read that right!** - Pure Deno Typescript client code!!!

This is accomplished by automating the build and bundling of the /src/ to a
single javascript bundle.js file.

Any saved changes to the typescript code will trigger both a build and bundle.\
The `bundle` action will automatically trigger a browser refresh.\
Stylesheet changes refresh only the styles without restarting the bundle.

## An example project built with Hot-Serve: 
https://nhrones.github.io/Hot_BuenoCache/    
Click the see-the-code link at bottom to open the Github repo.
Open the repo and checkout the **_/src/_** and **_/dist/bundle.js/_**.

## Requirements

This Hot-Serve service requires the following:

An index.html file with the following:

- must contain a \<body\>\</body\> tag (for code injection).

- must reference a `bundle.js` file as type module\
  \<script type=module src="bundle.js"\>\</script\>

- should have one or more stylesheets\
  \<link rel="stylesheet" href="./style.css"\>

- for bundling with esbuild, a configuration must be included


## Code injection (injector.ts)

The hot-browser-refresh is accomplished by emdedding a temporary\
script tag at the end of the index.html-body.\
The injected code registers a WebSocket client on the Hot-server.\
When Hot-Serve detects changes that rebuild bundle.js, it will send a\
message to the embedded socket that will force a browser refresh.

```
NOTE: Code injection happens only when the content of index.html is     
served to the browser; it will not mutate the index.html file.
We inject our script tag below the body-end-tag </body>.
Anything that exists below the body-end-tag will be displaced    
below this injected script.
```

See the example app in the `./dist` folder

## Usage
I no longer recommend using a locally installed copy of Hot.   

To add Hot, to a Deno project, add this task entry to deno.json:
```json
   "hot": "deno run --allow-all --no-config https://jsr.io/@ndh/hot/1.0.7/server.ts"
```
To run Hot in a project with a package.json, add this script entry:
```json
   "hot": "deno run --allow-all --no-config https://jsr.io/@ndh/hot/1.0.7/server.ts"
```
Or, if using VSCode, add the following entry to _./.vscode/tasks.json_    
This is my prefered method as it becomes the default VSCode build task.     
It can be started by entering the VSCode _build_ shortcut **_ctrl+shift+b _**  
```json
      {
         "label": "HOT",
         "type": "shell",
         "command": "deno run --allow-all --no-config https://jsr.io/@ndh/hot/1.0.7/server.ts .",
         "problemMatcher": [],
         "group": {
            "kind": "build",
            "isDefault": true
         }
      }
```

## Important:

Hot when first used in a project folder, will add a configuration json entry in
**_./.vscode/dev.json_**.   
You can edit this config json to customise hot for each project.

```json
{
   "hot": {
      "BundleName": "bundle.js",
      "DEV": true,
      "Entry": [
         "./src/main.ts"
      ],
      "Minify": false,
      "OutPath": "dist",
      "Port": 80,
      "Serve": ".",
      "Watch": [
         "src",
         "dist"
      ]
   }
}
```
Hot will populate this config on first use (when one is not found).    
The above hot-config is the default. It deals mainly with esBuild,    
Watch, and Serve options. You can find these setting in:
https://github.com/nhrones/Devtools_Config/blob/main/readme.md

This default expects a ./src/main.ts file, a /dist/ folder with   
a bundle.js file in it.  It will bundle to /dist/, and serve the index.html from root.

## Try it:
In a clean project folder: 
Add an index.html file in the root. This allows running from Github Pages   

add a /dist/ folder   
add a bundle.js file in /dist/ and reference it in index.html,
add a style.css file in /dist/ and reference it in index.html,   

add a src folder
add a main.ts file in the src folder   
add `/// <reference lib="dom" />` at the top of main.ts,   
This allows you to write client-side typescript without vscode complaints.   
To run this, enter the following:
``` 
deno run --allow-all --no-config https://jsr.io/@ndh/hot/1.0.7/server.ts .
```
Try changing some code in main.ts, then save it. The browser tab should refresh.
Try changing the h1 color in style.css, then save. The h1 color should change\
without restarting the app!
