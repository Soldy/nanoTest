'use strict'
const ic = new (require('interactiveConsole')).console();


const screenClass = function(sizeIn){
    /*
     * @param object {resultIn}
     * @param object {testrIn} Last test object
     * @param any {sample}
     * @public
     * boolean
     */
    this.change = function(resultIn,testIn){
        result = resultIn;
        processing();
        if(typeof testIn !== 'undefined')
            tests.push(testIn);
        if(testIn.error !== false)
           debugs.push(testIn.error);
    }
    /*
     * @public
     */
    this.end = function(){
        if(debugs.length >0){
            for(let i in debugs)
                debug(debugs[i]);
            ic.printLn('============');
        }
        for(let i in tests)
            if(tests[i].result === 1){
                ok(tests[i]);
            }else if(tests[i].result === 2){
                fail(tests[i]);
            }else if(tests[i].result === 3){
                error(tests[i]);
            }else if(tests[i].result === 4){
                missing(tests[i]);
            }

        ic.printLn(
            "ok :" +  
            ic.style(
                result.ok.toString(), 
                {color: "green"}
            )+ " | failed : " + 
            ic.style(
                 result.fail.toString(),
                 {color: "red"} 
            )+ " | error : " + 
            ic.style(
                 result.error.toString(), 
                  {color: "yellow"} 
            )+ " | missing : " + 
            ic.style(
                 result.missing.toString(),
                 {
                     color: "blue"
                 } 
           )
        );
        process.stderr.write("\x1B[?25h");
    }
    /*
     * @private
     */
    let debugs = [];
    /*
     * @private
     */
    let tests = [];
    /*
     * @private
     */
    let processing = function (){
        let progress = size-(result.ok+result.fail+result.error);
        ic.bar.update({
            "name"   : "progress",
            "update" : {
                "1" : progress,
                "2" : result.ok,
                "3" : result.fail,
                "4" : result.error
        }});
        ic.cursor.up(4);
        ic.bar.draw("progress");
        if(timeout !== ""){
            clearTimeout(timeout);
            timeout="";
        }
    }
    /*
     * @private
     */
    let ok = function(test){
        ic.printLn(
            ic.style(
                "✓ ", 
                {color: "green"}
            ) + test.name + " : ok -- "  + test.time + " ms "
        );
    }
    /*
     * @private
     */
    let fail = function (test){
        ic.printLn(
            ic.style(
                "✗ ", 
                {color: "red"}
            ) + test.name + 
                " : " + 
                test.result + 
                "  --- value --- " +
            JSON.stringify(test.value)
        );
    }
    /*
     * @private
     */
    let error = function (test) {
        ic.printLn(
            ic.style(
                "! ", 
                {color: "yellow"}
            ) + test.name + " : --- error"
        );
    }
    /*
     * @private
     */
    let missing = function (test){
        ic.printLn(
            ic.style(
                "! ", 
                {color: "blue"}
            ) + test.name + " : --- missing"
        );
    }
    /*
     * @private
     */
    let debug = function(debug){
        ic.printLn('====');
        ic.printLn(debug);
    }
    /*
     * @private
     */
    let init = function(){
        process.stderr.write("\x1B[?25l");
        ic.printLn("\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
        ic.bar.init({
           "name":"progress",
           "max" : size
        });
        ic.bar.addLine({
           "bar"         : "progress",
           "id"          : "1",
           "title"       : "not tested",
           "color"       : "blue"
        });
        ic.bar.addLine({
           "bar"    : "progress",
           "id"     : "2",
           "title"  : "ok",
           "color"  : "green"
        });
        ic.bar.addLine({
           "bar"    : "progress",
           "id"     : "3",
           "title"  : "failed",
           "color"  : "red"
        });
        ic.bar.addLine({
           "bar"    : "progress",
           "id"     : "4",
           "title"  : "error",
           "color"  : "yellow"
        });
    }
    /*
     * @private
     * string
     */
    let processLine = "";
    /*
     * @private
     * array
     */
    let processIcon = [
        "|",
        "/",
        "-",
        "\\"
    ];
    /*
     * @private
     * integer
     */
    let processIconI = 0;
    /*
     * @private
     * 
     */
    let timeout = "";
    /*
     * @private
     * integer
     */
    let size = sizeIn;
    /*
     * @private
     * object
     */
    let result = {
        ok: 0,
        fail: 0,
        error: 0,
        missing: 0
    }
    init();
}

exports.screenClass=screenClass;
