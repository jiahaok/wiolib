'use strict';

const request = require('request');
const Groves = require('./Groves.js');

// Grove - LED Bar
class LEDBar extends Groves{
    
    constructor(nodekey){
        super(nodekey);
    }
    
    
    //read the states of each led return bit mask of a uint16_t interger number
    //@arg callback
    //    @arg error Object
    //    @arg bits number, uint16_t 16 bit number indicating each led's status
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
        else{
            throw new Error('type of callback expect to be function');
        }
    }
    
    // return a string of 10 1s and 0s representing the led's on and off state
    //@arg callback
    //    @arg error Object
    //    @arg bits string, 10 char long string with 1s and 0s representing led's state
    getBitsString(callback){
        this.getBits((error,bits)=>{
            if(error){
                return callback(error);
            }
            bits = bits.toString(2);
            
            while(bits.length < 10){
                bits = "0"+bits;
            }
            
            callback(null, bits);
        });
    }
    
    // return a array of length 10, boolean at index indicating state
    //@arg callback
    //    @arg error Object
    //    @arg bits array, 10 length array fill with booleans
    getBitsArray(callback){
        this.getBitsString((error,bits)=>{
            if(error){
                return callback(error);
            }
            let bitArray = [];
            for(let i=0; i<bits.length; i++){
                bitArray[i] = bits.charAt(bits.length-i-1);
            }
            callback(null, bitArray);
        });
    }
    
    //toggle a single led on or off
    //@arg led number, 1-10 index of led to toggle
    //@arg callback function:
    //    @arg error Object
    toggle(led,callback){
        if(typeof(led)!="number"){
            if(led<0 || led>10){
                return callback(new Error('led index out of range'));
            }
            throw new Error("invalid type: led, expect numbers");
        }
        if(typeof(callback) === 'function'){
            request.post("https://us.wio.seeed.io/v1/node/GroveLEDBarUART0/toggle/"+led+"?access_token="+this.nodekey, (error, response, body)=>{
                if(error){
                    return callback(error);
                }
                if(response.statusCode >= 400){
                    const errorMessage = JSON.parse(body)['error'];
                    return callback(new Error(errorMessage));
                }
                callback(null);
            });
        }
        else{
            throw new Error('type of callback expect to be function');
        }
    }
    
    //display a level
    //@arg level number, 1-10 indicate what level to set led at
    //@arg callback function:
    //    @arg error Object
    level(level,callback){
        if(typeof(level)!="number"){
            if(level<0 || level>10){
                return callback(new Error('level index out of range'));
            }
            throw new Error("invalid type: level, expect numbers");
        }
        if(typeof(callback) === 'function'){
            request.post("https://us.wio.seeed.io/v1/node/GroveLEDBarUART0/level/"+level+"?access_token="+this.nodekey, (error, response, body)=>{
                if(error){
                    return callback(error);
                }
                if(response.statusCode >= 400){
                    const errorMessage = JSON.parse(body)['error'];
                    return callback(new Error(errorMessage));
                }
                callback(null);
            });
        }
        else{
            throw new Error('type of callback expect to be function');
        }
    }
    
    //Control a single led with brightness
    //@arg led number, uint8_t value, the index, 1~10
    //@arg brightness number, float value, 0.0~1.0, 1.0 is the brightest, 0.0 let this led off
    //@arg callback function:
    //    @arg error Object
    singleLedBrightness(led,brightness,callback){
        if(typeof(led)!="number"){
            if(led<0 || led>10){
                return callback(new Error('level index out of range'));
            }
            throw new Error("invalid type: level, expect numbers");
        }
        if(typeof(brightness)!="number"){
            if(brightness<0 || brightness>1){
                return callback(new Error('level index out of range'));
            }
            throw new Error("invalid type: level, expect numbers");
        }
        if(typeof(callback) === 'function'){
            request.post("https://us.wio.seeed.io/v1/node/GroveLEDBarUART0/single_led/"+led+"/"+brightness+"?access_token="+this.nodekey, (error, response, body)=>{
                if(error){
                    return callback(error);
                }
                if(response.statusCode >= 400){
                    const errorMessage = JSON.parse(body)['error'];
                    return callback(new Error(errorMessage));
                }
                callback(null);
            });
        }
        else{
            throw new Error('type of callback expect to be function');
        }
    }
    
    //Change the orientation of the level display
    //@arg green_to_red boolean, true: green to red; false: red to green
    //@arg callback function:
    //    @arg error Object
    singleLedBrightness(green_to_red,callback){
        if(typeof(green_to_red)!="boolean"){
            throw new Error("invalid type: level, expect numbers");
        }
        if(green_to_red){
            green_to_red= 1;
        }else{
            green_to_red=0;
        }
        if(typeof(callback) === 'function'){
            request.post("https://us.wio.seeed.io/v1/node/GroveLEDBarUART0/orientation/"+green_to_red+"?access_token="+this.nodekey, (error, response, body)=>{
                if(error){
                    return callback(error);
                }
                if(response.statusCode >= 400){
                    const errorMessage = JSON.parse(body)['error'];
                    return callback(new Error(errorMessage));
                }
                callback(null);
            });
        }
        else{
            throw new Error('type of callback expect to be function');
        }
    }
}

module.exports = LEDBar;