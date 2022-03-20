'use strict';

const missingFunction = new (function(){})
const errorFunction = function(){ return subidubibu();};
console.log('the expectation is 5 ok 10 failed 1 error 1 missing');

let nanoTestFull=()=>{
    let nanotest = require('./index.js').test;
    let nanoTest = new nanotest({
        'progress_bar':false,
        'debug_print':'short',
        'exit_code_missing':false,
        'exit_code_fail':false,
        'exit_code_error':false
    });
    nanoTest.add('"1. ", (()=>{return "0"})(), "!=", "1"',        ()=>{return '0';}, '!=', '1');
    nanoTest.add('"2. ", (()=>{return "0"})(), "!=", 1',          ()=>{return '0';}, '!=', 1);
    nanoTest.add('"3. ", (()=>{return "0"})(), "==", "0"',        ()=>{return '0';}, '==', '0');
    nanoTest.add('"4. ", (()=>{return "0"})(), "!==", "0"',       ()=>{return '0';}, '!==', 0);
    nanoTest.add('"5. ", (()=>{return "0"})(), "===", 0',         ()=>{return 0;}, '===', 0);
    nanoTest.add('"6. ", (()=>{return "0"})(), "<", 1',           ()=>{return '0';}, '<', 1);
    nanoTest.add('"7. ", (()=>{return "0"})(), ">", -1',          ()=>{return '0';}, '>', -1);
    nanoTest.add('"8. ", (()=>{return "1"})(), "==", "1"',        ()=>{return '1';}, '==', '1');
    nanoTest.add('"9. ", (()=>{return "0"})(), "==", 1',          ()=>{return '0';}, '!=', 1);
    nanoTest.add('"10.", (()=>{return "0"})(), "<", "1"',         ()=>{return '0';}, '<', '1');
    nanoTest.add('"11.", (()=>{return "1"})(), ">", "0"',         ()=>{return '1';}, '>', '0');
    nanoTest.add('"12.", (()=>{return {0:1}})(), "j===", {0:1}',  ()=>{return {0:1};}, 'j===', {0:1});
    nanoTest.add('"13.", (()=>{return {0:1}})(), "j==", {0:1}',   ()=>{return {0:1};}, 'j==', {0:1});
    nanoTest.add('"14.", (()=>{return {0:1}})(), "!=", {0:1}',    ()=>{return {0:1};}, '!=', {0:1});
    nanoTest.add(
        '"15.", errorFunctior, "!=", {0:1}',
        {
            'function':errorFunction,
            'options':[]
        },
        '!=', {0:1}
    );
    nanoTest.add(
        '"16.", missingFunction, "!=", {0:1}',
        {
            'function':missingFunction.a,
            'options':[]
        },
        '!=', {0:1}
    );
    nanoTest.add(
        '"17.", errorFunctior, "error"',
        {
            'function':errorFunction,
            'options':[]
        },
        'error'
    );
    nanoTest.add(
        '"18.", errorFunctior withouth "error"',
        {
            'function':()=>{return undefined},
            'options':[]
        },
        'error'
    );
    nanoTest.run({ok:5,failed:11,error:1,missing:1});// this test is a test test so 5 ok  11 failed 1 error 1 missing is the exectation
    /*the expectation is 4 ok 10 failed 1 error 1 missing */
    
};

nanoTestFull(); 
