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
    
    //loop through covers to find image with same id
    let img_base64 = ""; 
    filenames.forEach((file) => {
        if(file === id + ".jpg") {
          //convert image to base64 string
          img_base64 = base64_encode("./covers/" + file);
        }
    });
  
  //create zip file
  var zip = new JSZip();
  //adding info.json to the zip file
  zip.file("info.json", JSON.stringify(info));
  //adding image in the form of base64 string to the zip file
  zip.file("cover.png", img_base64 );
  zip
  .generateNodeStream({type:'nodebuffer',streamFiles:true})
  .pipe(fs.createWriteStream(id + '.zip'))
  .on('finish', function () {
      // JSZip generates a readable stream with a "end" event,
      // but is piped here in a writable stream which emits a "finish" event.
      console.log(id + ".zip written.");
  });
  
}
