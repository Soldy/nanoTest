
'use strict'
const screen = new (require('../src/screen.js')).screenClass(10);
const sandboxClass = require('./sandbox.js').sandboxClass;
const assertManager = new (require('../src/assert.js')).assertManager();

const masterClass = function(){
    /*
     * @param string {name}
     * @param object {test}
     * @param string {rule}
     * @param any {sample}
     * @public 
     * string {id}
     *
     */
    this.add = function (name, test, rule, sample) {
        let id = 't'+serial+'t';
        serial++;
        tests[id] = {
            'name'     : name,
            'test'     : test,
            'rule'     : rule,
            'sample'   : sample,
            'ready'    : false,
            'startTime': 0,
            'endTime'  : 0,
            'time'     : 0,
            'result'   : 0,
            'error'    : '',
            'value'    : '',
            'check'    : false,
            'debug'    : ''

        }
        sandboxes[id] = new sandboxClass(
            tests[id]
        );
        return id;
    }
    this.run = async function(){
        for (let t in tests){
            let test = await sandboxes[t].check();
            tests[t].startTime = test.startTime;
            tests[t].endTime   = test.endTime;
            tests[t].time      = test.startTime - test.endTime;
            tests[t].result    = test.result;
            tests[t].ready     = true;
            tests[t].value     = test.value;
            tests[t].error     = test.error;
            tests[t].check     = assertManager.check(
                        tests[t].value, 
                        tests[t].rule,
                        tests[t].sample
            );
            if(tests[t].result === 0){
                if( tests[t].check === true ){
                    tests[t].result = 1;
                }else{
                    tests[t].result = 2;
                }
            }
            count();
            screen.change(result, tests[t]);
        }
        end();

    }

    let resultType = [
      'not tested',
      'ok',
      'fail',
      'error',
      'missing'
    ];
    let result = {
        ok: 0,
        fail: 0,
        error: 0,
        missing: 0
    }
    let size = 0;
    let serial = 0;
    let tests = {};
    let sandboxes = {};
    let count = function(){
        let newSize = 0;
        let newResult = {
            ok: 0,
            fail: 0,
            error: 0,
            missing: 0
        }
        for (let i in tests){
            newSize = 0;
            if(tests[i].ready === true)
                newResult[resultType[tests[i].result]]++;
        }
        size = newSize;
        result = newResult;
        return size;
    }
    let end = function(){
        //for (let t in tests)
        //    screen.print(tests[t]);
        screen.end();
    }
}


exports.masterClass = masterClass;
