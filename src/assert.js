'use strict'

const assertManager = function (){
    /*
     * @param any {value}
     * @param string {rule}
     * @param any {sample}
     * @public
     * boolean
     */
    this.check = function(value, rule, sample){
        errorClean();
        if(typeof value === "undefined")
            errorAdd(' value not defined ');
        if(typeof rule === "undefined")
            errorAdd(' rule not defined ');
        if(typeof sample === "undefined")
            errorAdd(' sample not defined ');
        if(errorCheck()){
            return false;
        }
        if(typeof collection[rule.toLowerCase()] === "undefined")
            errorAdd(' Rule not exist ');
        if(errorCheck())
            return false;
        return collection[rule.toLowerCase()](value, sample);
    }
    /*
     * @param any {value}
     * @param any {sample}
     * @private
     * boolean
     */
    let equal = function(value,sample){
        if( value == sample )
            return true;
        return false;
    }
    /*
     * @param any {value}
     * @param any {sample}
     * @private
     * boolean
     */
    let equalType = function(value,sample){
        if( value === sample )
            return true;
        return false;
    }
    /*
     * @param object {value}
     * @param object {sample}
     * @private
     * boolean
     */
    let equalJson = function(value,sample){
        if( JSON.stringify(value) === JSON.stringify(sample) )
            return true;
        return false;
    }
    /*
     * @param any {value}
     * @param any {sample}
     * @private
     * boolean
     */
    let notEqual = function(value,sample){
        if( value != sample )
            return true;
        return false;
    }
    /*
     * @param any {value}
     * @param any {sample}
     * @private
     * boolean
     */
    let notEqualType = function(value,sample){
        if( value !== sample )
            return true;
        return false;
    }
    /*
     * @param number {value}
     * @param number {sample}
     * @private
     * boolean
     */
    let greater = function(value,sample){
        if( typeof value !== "number" )
            errorAdd(" value not a number \n");
        if (typeof sample !== "number" )
            errorAdd(" Sample not a number \n");
        if(errorCheck())
            return false;
        if( value > sample )
            return true;
        return false;
    }
    /*
     * @param number {value}
     * @param number {sample}
     * @private
     * boolean
     */
    let less = function(value,sample){
        if( typeof value !== "number" )
            errorAdd(" value not a number \n");
        if (typeof sample !== "number" )
            errorAdd(" Sample not a number \n");
        if(errorCheck())
            return false;
        if( value < sample )
            return true;
        return false;
    }
    /*
     * @param string {value}
     * @param string {sample}
     * @private
     * boolean
     */
    let length = function(value,sample){
        if(
            (typeof value !== "string" )||
            (typeof sample !== "number" )
        ){
            if(typeof value !== "string" )
                errorAdd(" value not a string \n");
             if(typeof sample !== "number" )
                 errorAdd(" sample not a number ");
        }
        if(errorCheck())
            return false;
        if( value.length === sample )
            return true;
        return false;
    }
    /*
     * @private
     */
    let collection = {
        "=="            : equal,
        "eq"            : equal,
        "e"             : equal,
        "equal"         : equal,
        "equale"        : equal,
        "!=="           : notEqual,
        "neq"           : notEqual,
        "ne"            : notEqual,
        "notequal"      : notEqual,
        "notequale"     : notEqual,
        "==="           : equalType,
        "eqt"           : equalType,
        "et"            : equalType,
        "qt"            : equalType,
        "equaltype"     : equalType,
        "equaletype"    : equalType,
        "!==="          : notEqualType,
        "neqt"          : notEqualType,
        "net"           : notEqualType,
        "nqt"           : notEqualType,
        "notequaltype"  : notEqualType,
        "notequaletype" : notEqualType,
        "j=="           : equalJson,
        "jeq"           : equalJson,
        "je"            : equalJson,
        "jsonequal"     : equalJson,
        "jsonequale"    : equalJson,
        "==j"           : equalJson,
        "eqj"           : equalJson,
        "ej"            : equalJson,
        "equaljson"     : equalJson,
        "equalejson"    : equalJson,
        ">"             : greater,
        "greater"       : greater,
        "more"          : greater,
        "higher"        : greater,
        "bigger"        : greater,
        "biger"         : greater,
        "larger"        : greater,
        "<"             : less,
        "less"          : less,
        "lower"         : less,
        "smaller"       : less,
        "smaler"        : less,
        "length"        : length

    }
    /*
     * @private
     */
    let errors = [];
    /*
     * @parm string {err}
     * @private
     * boolean
     */
    let errorAdd = function(err){
        errors.push(err);
        return true;
    }
    /*
     * @parm string {err}
     * @private
     * boolean
     */
    let errorCheck = function(){
        if(errors.length>0)
            return true;
        return false;
    }
    /*
     * @private
     */
    let errorClean = function(){
        errors = [];
    }
}
exports.assertManager = assertManager;


