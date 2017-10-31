'use strict';

const GroveElecMagnetD0 = require("./wioLib/GroveElecMagnetD0.js");
const config = require("./apiKey.json");

let mg = new GroveElecMagnetD0(config.nodekey);

mg.getOnOffStatus((error, status)=>{
    if(error){
        console.log(error);
    }
    console.log("before: "+status);
    
    mg.setOnOffStatus(false, (error)=>{
        if(error){
            console.log(error);
        }
        mg.getOnOffStatus((error, status)=>{
            if(error){
                console.log(error);
            }
            console.log("after: "+status);
        });
    });
});