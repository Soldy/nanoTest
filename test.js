/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var nanotest = require('./index.js').test;
var nanoTest = new nanotest();
var waittime = 10; // secund
var w = waittime * 1000;

nanoTest.add('"return 0", "0", "==", "1"', "0", "!=", "1");
nanoTest.add('"return 0", "0", "==", 1', "0", "!=", 1);
nanoTest.add('"return 0", "0", "==", "0"', "0", "==", "0");
nanoTest.add('"return 0", "0", "!==", "0"', "0", "!==", "0");
nanoTest.add('"return 0", "0", "===", 0', "0", "===", 0);
nanoTest.add('"return 0", "0", "<", 1', "0", "<", 1);
nanoTest.add('"return 0", "0", ">", -1', "0", ">", -1);
nanoTest.run();
