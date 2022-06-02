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
            'debug'    : '',
            'willfail' : false

        };
        if(rule === 'error')
            _tests[id].willfail = true;
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
        if(typeof _tests[id] === 'undefined')
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
            await _run(t);
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
        'debug_print':{
            'type'    : 'select',
            'list'    : [
                'normal',
                'long',
                'short'
            ],
            'default' : 'long'
        },
        'progress_bar':{
            'type'    : 'bool',
            'default' : true
        },
        'exit_code_fail':{
            'type'    : 'bool',
            'default' : true
        },
        'exit_code_error':{
            'type'    : 'bool',
            'default' : true
        },
        'exit_code_missing':{
            'type'    : 'bool',
            'default' : true
        },
        'expected_ok' : {
            'type'    : 'integer',
            'default' : -1
        },
        'expected_fail' : {
            'type'    : 'integer',
            'default' : -1
        },
        'expected_error' : {
            'type'    : 'integer',
            'default' : -1
        },
        'expected_missing' : {
            'type'    : 'integer',
            'default' : -1
        },
        'serialize':{
            'type'    : 'bool',
            'default' : false
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
     * @param {object}
     * @private
     *
     */
    const _run = async function(test){
        const result = await _sandboxes[test].check(_tests);
        _tests[test].startTime = result.startTime;
        _tests[test].endTime   = result.endTime;
        _tests[test].time      = result.time;
        _tests[test].result    = result.result;
        _tests[test].ready     = true;
        _tests[test].value     = result.value;
        _tests[test].error     = result.error;
        if(_tests[test].willfail === false)
            _tests[test].check = $assertrc.check(
                _tests[test].value,
                _tests[test].rule,
                _tests[test].sample
            );
        if(
            (_tests[test].willfail === true)&&
            (_tests[test].error !== '')&&
            (_tests[test].error !== false)
        ){
            if(
                (typeof _tests[test].sample === 'undefined')||
                (_tests[test].sample === _tests[test].error.message)
            ){
                _tests[test].check = true;
                _tests[test].result = 0;
                _tests[test].error = false;
                result.error = false;
            }

        }
        if(
            (_tests[test].willfail === true)&&
           (_tests[test].error.length === 0)
        ){
            _tests[test].check = false;
            _tests[test].result = 0 ;
        }
        if(_tests[test].result === 0){
            if(_tests[test].check === true){
                _tests[test].result = 1;
            }else{
                _tests[test].result = 2;
            }
        }
        _count();
        _screen.change(_result, _tests[test]);

    };
    /*
     * @private
     *
     */
    const _end = function(){
        let exit_code = 0;
        if(
            (_setup.get('exit_code_missing') === true)&&
            (_result.missing >0)
        )
            exit_code =1;
        if(
            (_setup.get('exit_code_error') === true)&&
            (_result.error >0)
        )
            exit_code =1;
        if(
            (_setup.get('exit_code_fail') === true)&&
            (_result.fail >0)
        )
            exit_code =1;
        if(
            (_setup.get('expected_ok') > -1)&&
            (_setup.get('expected_ok') !== _result.ok )
        )
            exit_code =1;
        if(
            (_setup.get('expected_fail') > -1)&&
            (_setup.get('expected_fail') !== _result.fail )
        )
            exit_code =1;
        if(
            (_setup.get('expected_error') > -1)&&
            (_setup.get('expected_error') !== _result.error )
        )
            exit_code =1;
        if(
            (_setup.get('expected_missing') > -1)&&
            (_setup.get('expected_missing') !== _result.missing )
        )
            exit_code =1;
        if(exit_code > 0){
            _screen.end(false);
        }else{
            _screen.end(true);
        }
        return process.exit(exit_code);
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
