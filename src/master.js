
'use strict';
const setupBase = (require('setuprc')).setupBase;
const screenBase = (require('nano-test-output-cli')).screenBase;
const sandboxBase = require('sandboxrc').sandboxBase;
const assertManager = new (require('assertrc')).assertBase();

const masterClass = function(settings){
    /*
     * Add new test
     *
     * @param {string} name
     * @param {object} test
     * @param {string} rule
     * @param {any} sample
     * @public 
     * @return {string} id
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

        };
        sandboxes[id] = new sandboxBase(
            tests[id]
        );
        return id;
    };
    /*
     * get test function output
     *
     * @param {string} id 
     * @public 
     * @return {string} id
     *
     */
    this.value = function(id){
        if (typeof tests[id] === 'undefined')
            return false;
        return tests[id].value;
    };
    /*
     * call the setup object
     *
     * @public 
     * @return {object} setup
     *
     */
    this.setup = function(){
        return setup;
    };
    /*
     * test runner
     * @public
     * @return {boolean}
     *
     */
    this.run = async function(){
        startTime = (+new Date);
        count();
        screen = new screenBase(result, setup);
        for (let t in tests){
            let test = await sandboxes[t].check(tests);
            tests[t].startTime = test.startTime;
            tests[t].endTime   = test.endTime;
            tests[t].time      = test.startTime - test.endTime;
            tests[t].result    = test.result;
            tests[t].ready     = true;
            tests[t].value     = test.value;
            tests[t].error     = test.error;
            assertManager.tests(
                tests
            );
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
        endTime = (+new Date);
        count();
        screen.change(result);
        end();
        return true;
    };
    /*
     * setup  helper
     * @private
     */
    let setup = new setupBase({
        'debugPrint':{
            'type'    : 'select',
            'list'    : [
                'normal',
                'short'
            ],
            'default' : 'normal'
        }
    });
    /*
     * screen or output 
     * @private
     *
     */
    let screen = new screenBase(setup);
    /*
     * result type list 
     * @private
     * @var {array}
     *
     */
    let resultType = [
        'not tested',
        'ok',
        'fail',
        'error',
        'missing'
    ];
    /*
     * result counter
     * @private
     * @var {object}
     *
     */
    let result = {
        ok: 0,
        fail: 0,
        error: 0,
        missing: 0
    };
    /*
     * test start time
     * @private
     * @var {integer}
     *
     */
    let startTime = 0;
    /*
     * test finish time
     * @private
     * @var {integer}
     *
     */
    let endTime = 0;
    /*
     * @private
     * @var {integer}
     *
     */
    let size = 0;
    /*
     * @private
     * @var {integer}
     *
     */
    let serial = 0;
    /*
     * @private
     * @var {integer}
     *
     */
    let tests = {};
    /*
     * @private
     * @var {integer}
     *
     */
    let sandboxes = {};
    /*
     * status counter
     * @private
     * @return {integer}
     *
     */
    let count = function(){
        let newSize = 0;
        let newResult = {
            start:startTime,
            end:endTime,
            time:(+new Date)-startTime,
            all:0,
            ok: 0,
            fail: 0,
            error: 0,
            missing: 0
        };
        for (let i in tests){
            newSize++;
            if(tests[i].ready === true)
                newResult[resultType[tests[i].result]]++;
        }
        size = newSize;
        newResult.all = size;
        result = newResult;
        return size;
    };
    /*
     * @private
     *
     */
    let end = function(){
        screen.end();
    };
    /*
     *
     * setup init 
     *
     */
    if(typeof settings !== 'undefined')
        setup.setup(settings);

};


exports.masterClass = masterClass;
