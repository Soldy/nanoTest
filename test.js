

var waittime = 10; // sec
var w = waittime * 1000;

nanoTestFull=()=>{
    let nanotest = require('./index.js').test;
    let nanoTest = new nanotest();
    if(nanoTest.detected.interactiveConsole === 1){
        nanoTest.interactivrConsole.printLn( nanoTest.interactivrConsole.style("Interactive console detected!", {color:"green"}));
    }
    nanoTest.add('"1. ", (()=>{return "0"})(), "!=", "1"', '(()=>{return "0"})()', "!=", "1");
    nanoTest.add('"2. ", (()=>{return "0"})(), "!=", 1', '(()=>{return "0"})()', "!=", 1);
    nanoTest.add('"3. ", (()=>{return "0"})(), "==", "0"', '(()=>{return "0"})()', "==", "0");
    nanoTest.add('"4. ", (()=>{return "0"})(), "!==", "0"', '(()=>{return "0"})()', "!==", 0);
    nanoTest.add('"5. ", (()=>{return "0"})(), "===", 0', '(()=>{return "0"})()', "===", 0);
    nanoTest.add('"6. ", (()=>{return "0"})(), "<", 1', '(()=>{return "0"})()', "<", 1);
    nanoTest.add('"7. ", (()=>{return "0"})(), ">", -1', '(()=>{return "0"})()', ">", -1);
    nanoTest.add('"8. ", (()=>{return "1"})(), "==", "1"', '(()=>{return "1"})()', "==", "1");
    nanoTest.add('"9. ", (()=>{return "0"})(), "==", 1', '(()=>{return "0"})()', "==", 1);
    nanoTest.add('"10.", (()=>{return "0"})(), "<", "0"', '(()=>{return "0"})()', "<", "0");
    nanoTest.add('"11.", (()=>{return "0"})(), ">", "0"', '(()=>{return "0"})()', ">", "0");
    nanoTest.add('"12.", (()=>{return "{0:1}"})(), "j==", {0:1}', '(()=>{return "{0:1}"})()', "j==", {0:1});
    nanoTest.add('"13.", (()=>{return {0:1}})(), "j==", {0:1}', '(()=>{return {0:1}})()', "j==", {0:1});
    nanoTest.add('"14.", (()=>{return {0:1}})(), "==", {0:1}', '(()=>{return {0:1}})()', "==", {0:1});
    nanoTest.run();   
}
nanoTestFull();
