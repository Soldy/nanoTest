
exports.test = function () {
    /*
     * @param string {name}
     * @param object {test}
     * @param string {rule}
     * @param any {sample}
     * @public
     *  boolean
     */
    this.add = function (name, test, rule, sample) {
        if ( 
             (typeof name === "udefined") ||
             (typeof test === "udefined") ||
             (typeof rule === "udefined") ||
             (typeof sample === "udefined") 
        ){
             return false;
        }
        tests.push({
            name,
            test,
            rule,
            sample
        });
        return true;
    };

    /*
     * @private
     * array
     */
    let tests = [];


    let addLog = function (input) {
        this.history.push({
            time: input.time,
            name: input.name,
            result: input.result,
            error: input.error,
            value: input.value,
            debug: input.debug

        });
    };

    let history = [];

    let result = {
        ok: 0,
        fail: 0,
        error: 0,
        missing: 0
    };
    this.test = async function (name, test, rule, sample) {
        let result;
        let error = "none";
        let time = 0;
        let startTime;
        let value;
        let endTime;
        let debug;
        try {
            if(typeof test === "string"){
                startTime = (+new Date());
                eval("value = " + test);
                endTime = (+new Date());
            }else if(typeof test === "object"){
                if(
                    (typeof test.options === "undefined")||
                    (test.options.length === 0)){
                    startTime = (+new Date());
                    value = await test.function();
                    endTime = (+new Date());
                }else if(test.options.length === 1){
                    startTime = (+new Date());
                    value = await test.function(
                        test.options[0]
                    );
                    endTime = (+new Date());
                }else if(test.options.length === 2){
                    startTime = (+new Date());
                    value = await test.function(
                        test.options[0],
                        test.options[1]
                    );
                    endTime = (+new Date());
                }else if(test.options.length === 3){
                    startTime = (+new Date());
                    value = await test.function(
                        test.options[0],
                        test.options[1],
                        test.options[2]
                    );
                    endTime = (+new Date());
                }else if(test.options.length === 4){
                    startTime = (+new Date());
                    value = await test.function(
                        test.options[0],
                        test.options[1],
                        test.options[2],
                        test.options[3]
                    );
                    endTime = (+new Date());
                }else if(test.options.length === 5){
                    startTime = (+new Date());
                    value = await test.function(
                        test.options[0],
                        test.options[1],
                        test.options[2],
                        test.options[3],
                        test.options[4]
                    );
                    endTime = (+new Date());
                }
            }else{
                startTime = (+new Date());
                value = await test();
                endTime = (+new Date());
            }
            time = (endTime - startTime).toString();
            result = "ok";
        } catch (e) {
            result = "error";
            if(typeof test !== "undefined"){
                error = "runtime Error";
            }else{
                error = "missing";
            }
            debug = e;
        }
        
        if (result === "ok")
            if (rule == "==") {
                if (value == sample) {
                    result = "ok";
                } else {
                    result = "failed";
                }
            } else if (rule == "j==") {
                if (JSON.stringify(value) == JSON.stringify(sample)) {
                    result = "ok";
                } else {
                    result = "failed";
                }
            } else if (rule == "===") {
                if (value === sample) {
                    result = "ok";
                } else {
                    result = "failed";
                }
            } else if (rule == "!=") {
                if (value != sample) {
                    result = "ok";
                } else {
                    result = "failed";
                }
            } else if (rule == "!==") {
                if (value !== sample) {
                    result = "ok";
                } else {
                    result = "failed";
                }
            } else if (rule == "<") {
                if (value < sample) {
                    result = "ok";
                } else {
                    result = "failed";
                }
            } else if (rule == ">") {
                if (value > sample) {
                    result = "ok";
                } else {
                    result = "failed";
                }
            } else if (rule == "length") {
                if (value.length === sample) {
                    result = "ok";
                } else {
                    result = "failed";
                }
            }
        if (result !== "ok"){
            this.result.fail++;
            if(error !== "none")
                this.result.error++
            if(error == "missing")
                this.result.missing++
        }else
            this.result.ok++;
        return {
            time: time, 
            name: name, 
            result: result, 
            error: error, 
            value: value, 
            sample: sample,
            debug: debug
        };
    };
    process.stderr.write("\x1B[?25l");
    let run = async function () {
        for (var i = 0; i < this.tests.length; i++) {
            this.addLog(
                await this.test(
                    this.tests[i].name,
                    this.tests[i].test,
                    this.tests[i].rule, 
                    this.tests[i].sample
                )
            );
        }
        thast.processing();
        thast.printLog();
        if (thast.detected.interactiveConsole === 0) {
            console.log("ok :" + thast.result.ok.toString() + " | failed : " + thast.result.fail.toString());
        } else {
            this.interactivrConsole.printLn(
                "ok :" +  
                this.interactivrConsole.style(
                    thast.result.ok.toString(), 
                    {color: "green"}
                )+ " | failed : " + 
                this.interactivrConsole.style(
                     thast.result.fail.toString(),
                     {color: "red"} 
                )+ " | error : " + 
                this.interactivrConsole.style(
                     thast.result.error.toString(), 
                      {color: "yellow"} 
                )+ " | missing : " + 
                this.interactivrConsole.style(
                     thast.result.missing.toString(), 
                     {color: "blue"} 
               )
            );
       
        }
        process.stderr.write("\x1B[?25h");
    };
    var thast = this;
    this.check();
    thast.processing();
};


