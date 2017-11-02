'use strict';

import request from 'request';
import Groves from './Groves.js';

// Grove - Electromagnet
export default class extends Groves{
    
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
            //TODO: convert bit to strings
        });
    }
    
    // return a array of length 10, boolean at index indicating state
    //@arg callback
    //    @arg error Object
    //    @arg bits array, 10 length array fill with booleans
    getBitsArray(callback){
        this.getBits((error,bits)=>{
            if(error){
                return callback(error);
            }
            //TODO: convert bit to strings
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
        if(typeof(callback === 'function')){
            request("https://us.wio.seeed.io/v1/node/GroveLEDBarUART0/toggle/"+led+"?access_token="+this.nodekey, (error, response, body)=>{
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
        throw new Error('type of callback expect to be function');
    }
}