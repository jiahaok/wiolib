'use strict';

const request = require('request');
const Groves = require('./Groves.js');

class Pm extends Groves{
    constructor(nodekey){
        super(nodekey);
    }
    
    sleep(seconds){
        if(typeof(seconds) === "number"){
            request("");
        }
    }
}

module.exports = Pm;