/// <reference lib="dom" />
             
/** our counter */
let cnt = 1;

const logger = document.getElementById('logger') as HTMLPreElement;
const btn = document.getElementById('btn') as HTMLButtonElement ;

btn.onclick = () => {
    log(`Click count = ${cnt++}  `)
}
  
/** on-screen logger */
export const log = (what: string, whatElse = null, and = null) => {
    let text = `${what.padEnd(30, '-')} `;
    if (whatElse) text += `${whatElse} `;
    if (and) text += `${and}`;
    text += new Date().toLocaleTimeString();
    logger.textContent = `${text}${'\n'}` + logger.textContent;
};
   