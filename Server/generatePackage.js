var fs = require('fs');

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

function genPackage(id) {
  
  const info = require("./info.json");
  var fs = require("fs");
  const JSZip = require('jszip');
  const { createCanvas } = require('canvas');
  const path = require('path');

  var userpath = path.resolve('./covers');

  let directory_name = userpath;
  
  // Function to get current filenames
  // in directory
  let filenames = fs.readdirSync(directory_name);

  let img_base64 = "";
  //looping through imagese to check for image with same input id
  filenames.forEach((file) => {
      //console.log("File:", file);
      if(file === id + ".jpg") {
        //convert image to base64 string
        img_base64 = base64_encode("./covers/" + file);
      }
  });
  
  var EPub = require('epub')

  userpath = path.resolve('./epubs');

  directory_name = userpath;
  
  // Function to get current filenames
  // in directory
  filenames = fs.readdirSync(directory_name);

  let pathToEpub = "";
  //looping through epubs to check for epub with same input id
  filenames.forEach((file) => {
      //console.log("File:", file);
      if(file === id + ".epub") {
        pathToEpub = "./epubs/" + file + "";
      }
  });

  //create epub object to be put into the zip file
  const epub = new EPub(pathToEpub)
  
  //create zip file
  var zip = new JSZip();
  //adding info.json to the zip file
  zip.file("info.json", JSON.stringify(info));
  //adding book cover to the zip fie
  zip.file("cover.png", img_base64);
  //adding the book epub to the zip file
  zip.file(id + ".epub", epub);
  zip
  .generateNodeStream({type:'nodebuffer',streamFiles:true})
  .pipe(fs.createWriteStream(id + '.zip'))
  .on('finish', function () {
      // JSZip generates a readable stream with a "end" event,
      // but is piped here in a writable stream which emits a "finish" event.
      console.log(id + ".zip written.");
  });
  
}
