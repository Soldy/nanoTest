'use strict';

const missingFunction = new (function(){});
const errorFunction = function(){ return subidubibu();};

let nanoTestFull=async ()=>{
    let nanotest = require('./index.js').test;
    let nanoTest = new nanotest({
        'progress_bar':false,
        'debug_print':'short',
        'exit_code_missing':false,
        'exit_code_fail':false,
        'exit_code_error':false
    });
    nanoTest.add('"0. ", partly function test',        ()=>{return true;}, '===', true);
    await nanoTest.partly();
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
            'function':()=>{return undefined;},
            'options':[]
        },
        'error'
    );
    nanoTest.add(
        '"19.", no error result test',
        {
            'function':()=>{return 'can be anything';},
            'options':[]
        },
        '!error'
    );
    nanoTest.run({
        expected_ok:7,
        expected_fail:11,
        expected_error:1,
        expected_missing:1
    });
};

nanoTestFull(); 
