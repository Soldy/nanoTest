## nano unit test

Ultra mini unit test.

### install 

npm install nano-test

### usage 


var functest = require("nano-test");

var test = new functest();

test.add ("example test", "examplefunction('123456')", "==", "93");

test.run();
