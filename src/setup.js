'use strict';

const setupClass = function (){
    this.get = function(type){
        if(typeof type === 'undefined')
            return false;
        if(typeof setup[type] === 'undefined')
            return false;
        return setup[type];
    };
    this.setup = function(settings){
        for(let i in settings)
            set(i, settings[i]);
    };
    this.set = function(type, value){
        if(typeof type === 'undefined')
            return false;
        if(typeof value === 'undefined')
            return false;
        return set(type,value);
    };
    let set = function(type, value){
        if(typeof setupValues[type] === 'undefined')
            return false;
        if(typeof setupValues[type][value] === 'undefined')
            return false;
        setup[type] = value;
        return true;
    };
    let setup = {
        'debugPrint':'normal'
    };
    let setupValues = {
        'debugPrint':{
            'normal' : 'full error trace',
            'short'  : 'first error only'
        }
    };
};

exports.setupClass = setupClass;
