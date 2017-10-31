'use strict';

const request = require('request');
const Groves = require('./Groves.js');

class Pm extends Groves{
    constructor(nodekey){
        super(nodekey);
    }
    
    //async sleep board
    //@parama seconds number, seconds board will sleep for no more than 5 hours, 5~8us/tick 
    //@parama callback function:
    //    @parama error Object, error if error, null if none
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
    
    //sleep board
    //@parama seconds number, seconds board will sleep for no more than 5 hours 5~8us/tick 
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