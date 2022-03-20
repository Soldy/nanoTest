Super simple, fast, actively maintened test tool kit.

## nano unit test

Ultra mini unit test.

### install 

```bash
npm install nanoTest
```

### usage 

```javascript
const functest = require("nanoTest");

const test = new funtest();

test.add (
      "example test", 
      ()=>{
         return 93
      }, 
      "==", 
      "93"
);

test.add (
      "example test 2",
      ()=>{
         return 93
      }, 
      "==",
      93
);


test.add (
      "example test 3",
      {
        "function" : (n)=>{
                 return 93 +n
             },
        "options"  : [
              1
        ]
      ">",
      93
);

test.add (
      "example test 4",
      {
        'function' : (n,p)=>{
                 return {
                      'number': 93 +n,
                      'string': p
             },
       'options' : [
              1,
              'something'
        ]
      "j==",
      {
          'number' : 94,
          'string' : 'something'
      }
);
```
### add expected fail

```javascript
test.add (
      'expected fail',
      {
        'function' : ()=>{
                 just_fail();
             },
        'options'  : []
      'error'
);
```



## run test 

```javascript
test.run();
```
```


## control variables



   |   name                  | type    | default |   comment
   |-------------------------|---------|---------|-----------------------------
   | ```expected_ok```       | integer |     -1  |  test number expected ok
   | ```expected_fail```     | integer |     -1  |  test number expected fail
   | ```expected_error```    | integer |     -1  |  test number expected throw error
   | ```expected_missing```  | integer |     -1  |  test number expected missing
   | ```exit_code_fail```    | boolean |   true  |
   | ```exit_code_error```   | boolean |   true  |
   | ```exit_code_missing``` | boolean |   true  |
   | ```progress_bar```      | boolean |   true  |  enable/disable progress bar
   | ```serialize```         | boolean |   false |  enable test list index visualization
   | ```debug_print```       | string  |   long  |  error message format options : short,long
