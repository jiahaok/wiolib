'use strict';

import request from 'request';
import Groves from './Groves.js';

export default class extends Groves{
    
    constructor(nodekey){
        super(nodekey);
    }
    
    //get compass heading duh
    //@arg callback function:
    //    @arg error Object
    //    @arg heading number, angle of heading relative to north
    getCompassHeading(callback){
        if(typeof(callback) === "function"){
            request("https://us.wio.seeed.io/v1/node/GroveCompassI2C0/compass_heading?access_token="+this.nodekey, (error, response, body)=>{
                if(error){
                    return callback(error);
                }
                if(response.statusCode >= 400){
                    const errorMessage = JSON.parse(body)['error'];
                    return callback(new Error(errorMessage));
                }
                return callback(null, JSON.parse(body)['heading_deg'])
            });
        }
        else{
            throw new Error("callback must be a function");
        }
    }
    
}