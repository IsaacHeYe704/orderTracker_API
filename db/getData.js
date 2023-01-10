// Paquete para leer y establecer las variables de entorno
import csv from 'csvtojson'
import "dotenv/config.js";
import Client from 'ftp'
import path from "node:path";
import { writeFile } from "node:fs/promises";

const config = {
  host: process.env.FTP_HOST,
  port: 21,
  user: process.env.FTP_USER,
  password: process.env.FTP_PASS,
};
const headers = ["OrderNumber" , "buid", "status" ,"shippedOn" ,"domsNumber" ,"initialEdd" ,"finalEdd" ,"actualDelivery" ,"pickUp" ,"courierDate" ,"deliveryCarrierLink" ,"domsCarrierLink" ,"customerClearanceDate" ,"customsArrivalDate" ,"countryArrivalDate"];

import fs from 'fs'
const destinationPath = path.join(process.cwd(),'db', "ROM_LATAM.csv");
const jsonPath = path.join(process.cwd(),'db', "ROM_LATAM.json");

console.log(destinationPath)
var c = new Client();
c.on("ready", function () {
  c.get("/pub/outbound/ROM_LATAM.csv", function (err, stream) {
    if (err) throw err;
    stream.once("close", function () {
      c.end();
    });
    stream.pipe(fs.createWriteStream(destinationPath));
    console.log(`done writing csv`);
  });
  console.log(`starting to parse csv to json`);
  parseToJSON()
});
c.connect(config);


let parseToJSON = ()=>{
    csv({
      headers: headers
    })
  .fromFile(destinationPath)
  .then((jsonObj)=>{
      writeFile(jsonPath, JSON.stringify(jsonObj, null, 2), "utf-8");
  })
}