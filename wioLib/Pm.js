'use strict';

const request = require('request');
const Groves = require('./Groves.js');

class Pm extends Groves{
    constructor(nodekey){
        super(nodekey);
    }
    
    sleep(seconds, callback){
        if(typeof(seconds) === "number"){
            if(seconds <= 18000){
                request("https://us.wio.seeed.io/v1/node/pm/sleep/"+seconds+"?access_token="+this.nodekey, (error, response, body)=>{
                    if(error){
                        return callback(error);
                    }
                    if(response.statusCode >= 400){
                        const errorMessage = JSON.parse(body)['error'];
                        return callback(new Error(errorMessage));
                    }
                    return callback(null);
                });
            }
            else{
                callback(new Error("Sleep timer more than 18000 may cause overflow"));
            }
        }
    }
    
    sleepSync(seconds){
        if(typeof(seconds) === "number"){
            if(seconds <= 18000){
                request("https://us.wio.seeed.io/v1/node/pm/sleep/"+seconds+"?access_token="+this.nodekey, (error, response, body)=>{
                    if(error){
                        throw error;
                    }
                    if(response.statusCode >= 400){
                        const errorMessage = JSON.parse(body)['error'];
                        return new Error(errorMessage);
                    }
                    return null;
                });
            }
            else{
                throw new Error("Sleep timer more than 18000 may cause overflow");
            }
        }
    }
}

module.exports = Pm;