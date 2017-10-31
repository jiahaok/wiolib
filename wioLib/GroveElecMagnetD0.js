'use strict';

const request = require('request');
const Groves = require('./Groves.js');

class GroveElecMagnetD0 extends Groves{
    
    constructor(nodekey){
        super(nodekey);
    }
    
    
    //Async get the status of the eletro-magnet
    //@parma callback Function:
    //    @parma error Object, An Error Object if error, else will be null
    //    @parma status Boolean, true if on, false if off
    getOnOffStatus(callback){
        if(typeof(callback) === "function"){
            request("https://us.wio.seeed.io/v1/node/GroveElecMagnetD0/onoff_status?access_token="+this.nodekey, (error, response, body)=>{
                if(error){
                    return callback(error);
                }
                if(response.statusCode === 400){
                    const errorMessage = JSON.parse(body)['error'];
                    return callback(new Error(errorMessage));
                }
                const magnetStatus = JSON.parse(body)['onoff'];
                if(magnetStatus === 1){
                    return callback(null, true);
                }
                else if(magnetStatus === 0){
                    return callback(null, false);
                }
                else{
                    return callback(new Error('Magnet is in a quantum state'));
                }
            });
        }
        else{
            throw new Error("callback must be a function");
        }
    }

    //get the status of the eletro-magnet
    //@return boolean, true if on, false if off
    getOnOffStatusSync(){
        request("https://us.wio.seeed.io/v1/node/GroveElecMagnetD0/onoff_status?access_token="+this.nodekey, (error, response, body)=>{
            if(error){
                throw error;
            }
            if(response.statusCode === 400){
                const errorMessage = JSON.parse(body)['error'];
                throw new Error(errorMessage);
            }
            const magnetStatus = JSON.parse(body)['onoff'];
            if(magnetStatus === 1){
                return true;
            }
            else if(magnetStatus === 0){
                return false;
            }
            else{
                throw new Error('Magnet is in a quantum state');
            }
        });
    }
    
    //Async set the status of the eletro-magnet
    //@parma onOff boolean, true if on, false if off
    //@parma callback Function:
    //    @parma error Object, An Error Object if error, else will be null
    setOnOffStatus(onOff, callback){
        if(typeof(onOff === "boolean")){
            if(onOff){
                onOff = "1";
            }else{
                onOff = "0";
            }
        }
        else{
            throw new Error("onOff must be a boolean value");
        }
        if(typeof callback === "function"){
            request("https://us.wio.seeed.io/v1/node/GroveElecMagnetD0/onoff/"+onOff+"?access_token="+this.nodekey, (error, response, body)=>{
                if(error){
                    return callback(error);
                }
                if(response.statusCode === 400){
                    const errorMessage = JSON.parse(body)['error'];
                    return callback(new Error(errorMessage));
                }
                return callback(null);
            });
        }
        else{
            throw new Error("callback must be a function");
        }
    }
    
    //set the status of the eletro-magnet
    //@parma onOff boolean, true if on, false if off
    setOnOffStatusSync(onOff){
        if(typeof(onOff === "boolean")){
            if(onOff){
                onOff = "1";
            }else{
                onOff = "0";
            }
        }
        else{
            throw new Error("onOff must be a boolean value");
        }
        if(typeof callback === "function"){
            request("https://us.wio.seeed.io/v1/node/GroveElecMagnetD0/onoff/"+onOff+"?access_token="+this.nodekey, (error, response, body)=>{
                if(error){
                    throw error;
                }
                if(response.statusCode === 400){
                    const errorMessage = JSON.parse(body)['error'];
                    throw new Error(errorMessage);
                }
                return null;
            });
        }
        else{
            throw new Error("callback must be a function");
        }
    }
    
}

module.exports = GroveElecMagnetD0;