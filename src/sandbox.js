'use strict';

const sandboxClass = function(testIn){
    /*
     * @public
     * object
     */
    this.check = async function(){
        await run();
        return {
            time,
            startTime,
            endTime,
            result,
            value,
            error,
            complete 
        };
    };
    /*
     * @private
     * any
     */
    let test = testIn;
    /*
     * @private
     * object 
     */
    let error = false;
    /*
     * @private
     * object 
     */
    let value = false;
    /*
     * @private
     * object 
     */
    let result = 0;
    /*
     * @private
     * unixmicrotimestamp
     */
    let time = 0;
    /*
     * @private
     * unixmicrotimestamp
     */
    let startTime;
    /*
     * @private
     * unixmicrotimestamp
     */
    let endTime;
    /*
     * @private
     * boolean
     */
    let complete = false;
    /*
     * @param string {test}
     * @private
     * boolean
     *
     */
    let runString = function(){
        startTime = (+new Date());
        eval('result = ' + test.test);
        endTime = (+new Date());
    };
    /*
     * @param object {test}
     * @private
     * boolean
     *
     */
    let runObject = async function (){
        if(
            (typeof test.test.options === 'undefined')||
            (1 > test.test.options.length)
        ){
            startTime = (+new Date());
            value = await test.test['function']();
            endTime = (+new Date());
        }else{
            startTime = (+new Date());
            value = await test.test['function'](...test.test.options);
            endTime = (+new Date());
        }
    };
    /*
     * @param function {test}
     * @private
     * boolean
     *
     */
    let runLegacy = async function(){
        startTime = (+new Date());
        value = await test.test();
        endTime = (+new Date());
    };
    /*
     * @param any {test}
     * @private
     * boolean
     *
     */
    let run = async function(){
        try { 
            if(typeof test.test === 'undefined'){
                result = 4;
            }else if(typeof test.test === 'string'){
                await runString();
            }else if(typeof test.test === 'object'){
                if(typeof test.test['function'] === 'undefined'){
                    result = 4;
                } else 
                    await runObject();
            }else{
                await runLegacy();
            }
            complete = true;
        }catch(e){
            result = 3;
            error = e;
        }
        if (endTime === 0)
            endTime = (+new Date());
        time = (endTime - startTime).toString();
        return true;
    };
};


exports.sandboxClass = sandboxClass;
