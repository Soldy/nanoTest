

var nanotest = require('./index.js').test;
var nanoTest = new nanotest();
var waittime = 10; // sec
var w = waittime * 1000;

if(nanoTest.detected.interactiveConsole === 1){
    nanoTest.interactivrConsole.printLn( nanoTest.interactivrConsole.style("Interactive console detected!", {color:"green"}));
}

nanoTest.add('"1. ", "0", "!=", "1"', "0", "!=", "1");
nanoTest.add('"2. ", "0", "!=", 1', "0", "!=", 1);
nanoTest.add('"3. ", "0", "==", "0"', "0", "==", "0");
nanoTest.add('"4. ", "0", "!==", "0"', "0", "!==", "0");
nanoTest.add('"5. ", "0", "===", 0', "0", "===", 0);
nanoTest.add('"6. ", "0", "<", 1', "0", "<", 1);
nanoTest.add('"7. ", "0", ">", -1', "0", ">", -1);
nanoTest.add('"8. ", "1", "==", "1"', "0", "==", "1");
nanoTest.add('"9. ", "0", "==", 1', "0", "==", 1);
nanoTest.add('"10.", "0", "<", "0"', "0", "<", "0");
nanoTest.add('"11.", "0", ">", "0"', "0", ">", "0");
nanoTest.add('"12.", "{0:1}", "j==", {0:1}', "{0:1}", "j==", {0:1});
nanoTest.run();
