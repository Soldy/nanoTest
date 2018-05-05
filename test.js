

var nanotest = require('./index.js').test;
var nanoTest = new nanotest();
var waittime = 10; // sec
var w = waittime * 1000;
if(nanoTest.detected.interactiveConsole === 1){
    nanoTest.interactivrConsole.printLn( nanoTest.interactivrConsole.style("Interactive console detected!", {color:"green"}));
}

nanoTest.add('"1. ", function(){return "0"}(), "!=", "1"', 'function(){return "0"}()', "!=", "1");
nanoTest.add('"2. ", function(){return "0"}(), "!=", 1', 'function(){return "0"}()', "!=", 1);
nanoTest.add('"3. ", function(){return "0"}(), "==", "0"', 'function(){return "0"}()', "==", "0");
nanoTest.add('"4. ", function(){return "0"}(), "!==", "0"', 'function(){return "0"}()', "!==", 0);
nanoTest.add('"5. ", function(){return "0"}(), "===", 0', 'function(){return "0"}()', "===", 0);
nanoTest.add('"6. ", function(){return "0"}(), "<", 1', 'function(){return "0"}()', "<", 1);
nanoTest.add('"7. ", function(){return "0"}(), ">", -1', 'function(){return "0"}()', ">", -1);
nanoTest.add('"8. ", function(){return "1"}(), "==", "1"', 'function(){return "1"}()', "==", "1");
nanoTest.add('"9. ", function(){return "0"}(), "==", 1', 'function(){return "0"}()', "==", 1);
nanoTest.add('"10.", function(){return "0"}(), "<", "0"', 'function(){return "0"}()', "<", "0");
nanoTest.add('"11.", function(){return "0"}(), ">", "0"', 'function(){return "0"}()', ">", "0");
nanoTest.add('"12.", function(){return "{0:1}"}(), "j==", {0:1}', 'function(){return "{0:1}"}()', "j==", {0:1});
nanoTest.add('"13.", function(){return {0:1}}(), "j==", {0:1}', 'function(){return {0:1}}()', "j==", {0:1});
nanoTest.add('"14.", function(){return {0:1}}(), "==", {0:1}', 'function(){return {0:1}}()', "==", {0:1});
nanoTest.run();
