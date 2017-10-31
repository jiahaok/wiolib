'use strict';

const request = require('request');
const Groves = require('./Groves.js');

// Grove - Electromagnet
class LEDBar extends Groves{
    
    constructor(nodekey){
        super(nodekey);
    }
    
    
    //get humidity
    //@arg callback
    //    @arg error Object
    //    @arg bits number, 16 bit number indicating each led's status
    getBits(callback){
        if(typeof(callback) === "function"){
            request("https://us.wio.seeed.io/v1/node/GroveLEDBarUART0/bits?access_token="+this.nodekey, (error, response, body)=>{
                if(error){
                    return callback(error);
                }
                if(response.statusCode >= 400){
                    const errorMessage = JSON.parse(body)['error'];
                    return callback(new Error(errorMessage));
                }
                callback(null, JSON.parse(body)['bits']);
            });
        }
    }
}

module.exports = LEDBar;