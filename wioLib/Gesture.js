'use strict';

const request = require('request');
const Groves = require('./Groves.js');

class Gesture extends Groves{

    constructor(nodekey){
        super(nodekey);
    }

    //Read the motion code. The upper direction is the one in which you read the silk-screen "U1".
    //@arg callback
    //    @arg error Object
    //    @arg motion number, motion: uint8_t value, 1-right, 2-left, 3-up, 4-down, 5-forward, 6-backward, 7-clockwise, 8-countclockwise, 255-sensor initialization fail
    getMotion(callback){
        if(typeof(callback) === "function"){
            request("https://us.wio.seeed.io/v1/node/GroveLEDBarUART0/bits?access_token="+this.nodekey, (error, response, body)=>{
                if(error){
                    return callback(error);
                }
                if(response.statusCode >= 400){
                    const errorMessage = JSON.parse(body)['error'];
                    return callback(new Error(errorMessage));
                }
                callback(null, JSON.parse(body)['motion']);
            });
        }
        else{
            throw new Error('type of callback expect to be function');
        }
    }
}

module.exports = Gesture;