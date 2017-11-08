'use strict';

const event = require('events').EventEmitter();
const WebSocket = require('ws');

class WioEvents{

    constructor(key){
        this.key = key;
        this.ws = new WebSocket('wss://us.wio.seeed.io/v1/node/event');
        this.ws.on('open', ()=>{
            this.ws.send(key);
        });
    }

    addSensor(name){

    }

    static lookupSensor(name){
        const table = {
            Gesture: "gesture"
        }
    }
}

module.exports = WioEvents;