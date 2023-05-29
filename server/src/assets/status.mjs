import *  as fs from "fs";

let status = {};

import url from 'url'; 
import path from 'path';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
await fs.readFile(path.join(__dirname, "status.json"), "utf-8", (err, data) => {
  if(err){
    console.log(err);
    return;
  }
  status = JSON.parse(data);
});

export default status;