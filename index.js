/*
 *  @Soldy\nanoTest\2021.02.04\GPL3
 */
'use strict';
const $setuprc = (require('setuprc')).base;
const $screen = (require('nano-test-output-cli')).base;
const $sandboxrc = require('sandboxrc').base;
const $assertrc = new (require('assertrc')).base();

/*
 * @param {setuprc} settings 
 * @prototype
 */
const masterBase = function(settings){
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
        let id = 't'+_serial+'t';
        _serial++;
        _tests[id] = {
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
        _sandboxes[id] = new $sandboxrc(
            _tests[id]
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
        if (typeof _tests[id] === 'undefined')
            return false;
        return _tests[id].value;
    };
    /*
     * call the setup object
     *
     * @public 
     * @return {object} setup
     *
     */
    this.setup = function(){
        return _setup;
    };
    /*
     * test runner
     * @public
     * @return {boolean}
     *
     */
    this.run = async function(){
        _start_time = (+new Date);
        _count();
        _screen = new $screen(_result, _setup);
        for (let t in _tests){
            let test = await _sandboxes[t].check(_tests);
            _tests[t].startTime = test.startTime;
            _tests[t].endTime   = test.endTime;
            _tests[t].time      = test.startTime - test.endTime;
            _tests[t].result    = test.result;
            _tests[t].ready     = true;
            _tests[t].value     = test.value;
            _tests[t].error     = test.error;
            $assertrc.tests(
                _tests
            );
            _tests[t].check     = $assertrc.check(
                _tests[t].value, 
                _tests[t].rule,
                _tests[t].sample
            );
            if(_tests[t].result === 0){
                if(_tests[t].check === true){
                    _tests[t].result = 1;
                }else{
                    _tests[t].result = 2;
                }
            }
            _count();
            _screen.change(_result, _tests[t]);
        }
        _end_time = (Date.now());
        _count();
        _screen.change(_result);
        return _end();
    };
    /*
     * setup  helper
     * @private
     */
    let _setup = new $setuprc({
        'debugPrint':{
            'type'    : 'select',
            'list'    : [
                'normal',
                'short'
            ],
            'default' : 'normal'
        },
        'progressBar':{
            'type'    : 'bool',
            'default' : true
        },
        'exitCodeFail':{
            'type'    : 'select',
            'list'    : [
                '1',
                '0',
            ],
            'default' : '1'
        },
        'exitCodeError':{
            'type'    : 'select',
            'list'    : [
                '1',
                '0',
            ],
            'default' : '1'
        },
        'exitCodeMissing':{
            'type'    : 'select',
            'list'    : [
                '1',
                '0',
            ],
            'default' : '1'
        }
    });
    /*
     * screen or output 
     * @private
     *
     */
    let _screen = '';
    /*
     * result type list 
     * @private
     * @var {array}
     *
     */
    let _result_type = [
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
    let _result = {
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
    let _start_time = 0;
    /*
     * test finish time
     * @private
     * @var {integer}
     *
     */
    let _end_time = 0;
    /*
     * @private
     * @var {integer}
     *
     */
    let _size = 0;
    /*
     * @private
     * @var {integer}
     *
     */
    let _serial = 0;
    /*
     * @private
     * @var {integer}
     *
     */
    let _tests = {};
    /*
     * @private
     * @var {integer}
     *
     */
    let _sandboxes = {};
    /*
     * status counter
     * @private
     * @return {integer}
     *
     */
    const _count = function(){
        let newSize = 0;
        let newResult = {
            start:_start_time,
            end:_end_time,
            time:(Date.now())-_start_time,
            all:0,
            ok: 0,
            fail: 0,
            error: 0,
            missing: 0
        };
        for (let i in _tests){
            newSize++;
            if(_tests[i].ready === true)
                newResult[_result_type[_tests[i].result]]++;
        }
        _size = newSize;
        newResult.all = _size;
        _result = newResult;
        return _size;
    };
    /*
     * @private
     *
     */
    const _end = function(){
        _screen.end();
        if (
            (_setup.get('exitCodeMissing') === '0')&&
             (_result.missing >0)
        )
            return process.exit(1);
        if (
            (_setup.get('exitCodeError') === '0')&&
             (_result.error >0)
        )
            return process.exit(1);
        if (
            (_setup.get('exitCodeFail') === '0')&&
             (_result.fail >0)
        )
            return process.exit(1);
        return process.exit(0);
    };
    /*
     *
     * setup init 
     *
     */
    if(typeof settings !== 'undefined')
        _setup.setup(settings);
};


exports.base = masterBase;
exports.test = masterBase;
