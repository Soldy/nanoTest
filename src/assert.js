'use strict'

const assertManager = function (){
    /*
     * @param any {result}
     * @param string {rule}
     * @param any {sample}
     * @public
     * boolean
     */
    this.check = function(result, rule, sample){
        if(typeof result === "undefined")
            errorAdd(' result not defined ');
        if(typeof rule === "undefined")
            errorAdd(' rule not defined ');
        if(typeof sample === "undefined")
            errorAdd(' sample not defined ');
        if(errorCheck())
            return false;
        if(typeof collection[rule.toLowerCase()] === "undefined")
            errorAdd(' Rule not exist ');
        if(errorCheck())
            return false;
        return collection[rule.toLowerCase()](result, sample);
    }
    /*
     * @param any {result}
     * @param any {sample}
     * @private
     * boolean
     */
    let equal = function(result,sample){
        if( result == sample )
            return true;
        return false;
    }
    /*
     * @param any {result}
     * @param any {sample}
     * @private
     * boolean
     */
    let equalType = function(result,sample){
        if( result === sample )
            return true;
        return false;
    }
    /*
     * @param object {result}
     * @param object {sample}
     * @private
     * boolean
     */
    let equalJson = function(result,sample){
        if( JSON.stringify(result) === JSON.stringify(sample) )
            return true;
        return false;
    }
    /*
     * @param any {result}
     * @param any {sample}
     * @private
     * boolean
     */
    let notEqual = function(result,sample){
        if( result != sample )
            return true;
        return false;
    }
    /*
     * @param any {result}
     * @param any {sample}
     * @private
     * boolean
     */
    let notEqualType = function(result,sample){
        if( result !== sample )
            return true;
        return false;
    }
    /*
     * @param number {result}
     * @param number {sample}
     * @private
     * boolean
     */
    let greater = function(result,sample){
        if( typeof result !== "number" )
            errorAdd(" Result not a number \n");
        if (typeof sample !== "number" )
            errorAdd(" Sample not a number \n");
        if(errorCheck())
            return false;
        if( result < sample )
            return true;
        return false;
    }
    /*
     * @param number {result}
     * @param number {sample}
     * @private
     * boolean
     */
    let less = function(result,sample){
        if( typeof result !== "number" )
            errorAdd(" Result not a number \n");
        if (typeof sample !== "number" )
            errorAdd(" Sample not a number \n");
        if(errorCheck())
            return false;
        if( result > sample )
            return true;
        return false;
    }
    /*
     * @param string {result}
     * @param string {sample}
     * @private
     * boolean
     */
    let length = function(result,sample){
        if( typeof result !== "string" )
            errorAdd(" Result not a string \n");
        if( typeof sample !== "number" )
            errorAdd(" sample not a number ");
        if(errorCheck())
            return false;
        if( result.length > sample )
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
        "bigger"        : greater,
        "biger"         : greater,
        "<"             : less,
        "less"          : less,
        "lower"         : less,
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
