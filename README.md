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

```
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
```
test.run();
```
```



