import Express from 'express';
import fs from 'fs';

class WebUIServer {

  constructor({cacheUIHTMLFile = false} = {}) {
    this.UIHTML = null;
    this.app = null;
    this.cacheUIHTMLFile = cacheUIHTMLFile;
    this.setup();
  }

  setup() {
    this.app = Express();
    this.app.get('*', (req, res) => {
      if(!this.UIHTML || !this.cacheUIHTMLFile) {
        console.log("Reloaded UI Html File");
        this.UIHTML = fs.readFileSync("./ui.html", { encoding: 'utf8' });
      }
      res.type('html')
      res.send(this.UIHTML)
    })
  }

  listen({port = 6969} = {}) {
    return new Promise((resolve, reject) => {
      if(!this.app) reject();
      this.app.listen(port, () => {
        console.log("Web Server listening on port: ", port)
        resolve();
      })
    })
  }

}

export default WebUIServer;
