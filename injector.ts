/**
 * This function retrieves raw text from index.html.  
 * It then replace the body-end-tag </body> tag with our 
 * custom WebSocket Hot-Refresh client code. 
 * @argument {string} fullPath - the full path to index.html 
 */
export const inject = async (fullPath: string) => {

   const indexString = await Deno.readTextFile(fullPath)
   const endOfBody = indexString.indexOf('</body>')
   // mahe sure we got an end tag
   if (endOfBody > 5) {
      // just replace this tag with our script tag content
      const newBody = indexString.replace('</body>', `
   <script type=module id="hot">
const hotSocket = ${hotSocket.toString()}
hotSocket()
   </script>
   </body>`); // we've replaced the body end tag 
      return newBody
   } else {
      console.log('No </body> found!')
      return indexString
   }
}

/** This is Hot's socket-client code to be injected */
const hotSocket = () => {
   console.log("HOT CONNECTING")
   const socket = new WebSocket(location.origin.replace("http", "ws"))
   socket.onopen = () => console.log("HOT CONNECTED")
   socket.onerror = () => console.log("HOT DISCONNECTED")
   socket.onmessage = (e) => {
      const action = e.data
      console.log("sse got action - ", action)
      if (action === "refreshcss") {
         console.log("refreshCSS()")
         const sheets = [].slice.call(document.getElementsByTagName("link"))
         const head = document.getElementsByTagName("head")[0]
         for (let i = 0; i < sheets.length; ++i) {
            const elem = sheets[i]
            //@ts-ignore js code
            const parent = elem.parentElement || head
            parent.removeChild(elem)
            parent.appendChild(elem)
         }
      } else if (action === "reload") {
         console.log("Reload requested! ")
         globalThis.location.reload()
      }
   }
}

