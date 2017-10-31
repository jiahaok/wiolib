'use strict';

class Groves{
    
    constructor(nodekey){
        if(typeof(nodekey) === "string"){
            this.nodekey = nodekey;
        }
        else{
            throw new Error("nodeKey must be a string");
        }
    }
    
    getNodeKey(){
        return this.nodekey;
    }
}
 module.exports = Groves;