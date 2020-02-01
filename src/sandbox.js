

const sandbox = function(){
    /*
     * @public
     * object
     */
    this.check = function(test){
        run();
        return {
            time,
            starTime,
            endTime,
            name,
            result,
            errors,
            complete 
        }
    }
    /*
     * @private
     * any
     */
    let result;
    /*
     * @private
     * array
     */
    let errors = [];
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
     */.
    let runString = function(test){
        startTime = (+new Date());
        eval("value = " + test);
        endTime = (+new Date());
    }
    /*
     * @param object {test}
     * @private
     * boolean
     *
     */
    let runObject = function (test){
        if(
            (typeof test.options === "undefined")||
            (1 > test.options.length)
        ){
            startTime = (+new Date());
            value = await test.function();
            endTime = (+new Date());
        }else{
            startTime = (+new Date());
            value = await test.function(...test.options);
            endTime = (+new Date());
        }
    }
    /*
     * @param function {test}
     * @private
     * boolean
     *
     */
    let runLegacy = function(test){
        startTime = (+new Date());
        value = await test();
        endTime = (+new Date());
    }
    /*
     * @param any {test}
     * @private
     * boolean
     *
     */
    let run = function(test){
        try { 
            if(typeof test === "string"){
                runString(test);
            }else if(typeof test === "object"){
                runObject(test);
            }else{
                runLegacy(test);
            }
            complate = true;
        }catch(e){
           errorAdd(e);
        }
        time = (endTime - startTime).toString();
        return true;
    }
}
