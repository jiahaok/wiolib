'use strict';

const lib = require("./wioLib/LEDBar.js");
const config = require("./apiKey.json");

let test = new lib(config.nodekey);

test.getBits((error, status)=>{
    if(error){
        console.log(error);
    }
    console.log("Result: "+status);
});