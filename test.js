'use strict';

const lib = require("./wioLib/LEDBar.js");
const config = require("./apiKey.json");

let test = new lib(config.nodekey);

test.level(1,(error, status)=>{
    if(error){
        console.log("Error: "+error);
    }
    console.log("Result: "+status);
});