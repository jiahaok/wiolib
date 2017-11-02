'use strict';

import request from 'request';
import Groves from './Groves.js';

// Grove - Electromagnet
export default class extends Groves{
    
    constructor(nodekey){
        super(nodekey);
    }
    
    
    //get humidity
    //@arg callback
    //    @arg error Object
    //    @arg data number, humidity percentage 0-100%
    getHumidity(callback){
        if(typeof(callback) === "function"){
            request("https://us.wio.seeed.io/v1/node/GroveTempHumD0/humidity?access_token="+this.nodekey, (error, response, body)=>{
                if(error){
                    return callback(error);
                }
                if(response.statusCode >= 400){
                    const errorMessage = JSON.parse(body)['error'];
                    return callback(new Error(errorMessage));
                }
                callback(null, JSON.parse(body)['humidity']);
            });
        }
    }
    
    //get humidity
    //@arg callback
    //    @arg error Object
    //    @arg data number, temperture in celsius
    getTemperature(callback){
        if(typeof(callback) === "function"){
            request("https://us.wio.seeed.io/v1/node/GroveTempHumD0/temperature?access_token="+this.nodekey, (error, response, body)=>{
                if(error){
                    return callback(error);
                }
                if(response.statusCode >= 400){
                    const errorMessage = JSON.parse(body)['error'];
                    return callback(new Error(errorMessage));
                }
                callback(null, JSON.parse(body)['celsius_degree']);
            });
        }
    }
    
    //get humidity
    //@arg callback
    //    @arg error Object
    //    @arg data number, temperture in fahrenheit
    getTemperature_f(callback){
        if(typeof(callback) === "function"){
            request("https://us.wio.seeed.io/v1/node/GroveTempHumD0/temperature_f?access_token="+this.nodekey, (error, response, body)=>{
                if(error){
                    return callback(error);
                }
                if(response.statusCode >= 400){
                    const errorMessage = JSON.parse(body)['error'];
                    return callback(new Error(errorMessage));
                }
                callback(null, JSON.parse(body)['fahrenheit_degree']);
            });
        }
    }
}