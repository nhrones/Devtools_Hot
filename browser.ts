/**
 * Open a web page with the appropriate browser.
 * 
 * This utility is used by a few dev-servers to 
 * auto-launch the browser with the url being served.
 * @module
 */

/**
 * Get a browser open command based on the os
 * @returns the string for the command to call
 */
function getBrowserCmd(): string {
    switch (Deno.build.os) {
       case "windows":
          return "explorer.exe";
       case "darwin":
          return "open";
       case "linux":
          if (Deno.env.get("WSL_DISTRO_NAME")) {
             // is WSL
             return "explorer.exe";
          } else {
             return "xdg-open";
          }
       default:
          return "Unknown os" 
     }
 }
 
 /**
  * Opens a URL in the default browser
  * 
  * @param url  - the complete url to be opened in the browser
  * 
  * @examples 
  *    openWebsite('https://Deno.com')
  *    openWebsite('http://localhost:8080')
  */
 export function openWebsite(url: string): Deno.CommandOutput {
    return new Deno.Command(getBrowserCmd(), 
    { args: [url] }).outputSync();
 }
 