import fs from "fs";

async function readData (dataPath) {
  return new Promise ((fulfill, reject) => {
  fs.readFile(dataPath, "utf-8", (error, res) => {
    if(error) reject(error);
    fulfill(JSON.parse(res));
  });
});
}

export default readData;
