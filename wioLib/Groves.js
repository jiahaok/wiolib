'use strict';

export default class{
    
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