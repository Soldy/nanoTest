const iconsole = require("interactiveConsole");

exports.test = function () {
    this.history = [];
    this.tests = [];
    this.interactivrConsole = "";
    this.processLine = "";
    this.processIcon = [
        "|",
        "/",
        "-",
        "\\"
    ];
    this.processIconI=0;
    this.processTimeout = "";
    this.result = {
        ok: 0,
        fail: 0,
        error: 0,
        missing: 0
    };
    this.detected = {
        interactiveConsole: 0,
    };
    this.processing = function (){
        let progress = thast.tests.length-thast.result.ok-thast.result.fail;
        if (thast.detected.interactiveConsole === 0) {
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            process.stdout.write(thast.processLine+" "+thast.processIcon[thast.processIconI]);
            thast.processIconI++;
            if(thast.processIconI >3)
                thast.processIconI=0;
        }else{
            thast.interactivrConsole.bar.update({
                "name"   : "progress",
                "update" : {
                    "1" : progress,
                    "2" : thast.result.ok,
                    "3" : thast.result.fail
                }});
            thast.interactivrConsole.cursor.up(3);
            thast.interactivrConsole.bar.draw("progress");
        }
        if(thast.processTimeout !== ""){
            clearTimeout(thast.processTimeout);
            thast.processTimeout="";
        }
        if(
            (thast.result.ok+thast.result.fail === 0)||
            (parseInt(progress) !== 0)
        )
            thast.processTimeout = setTimeout(thast.processing, 20);
    };
    this.check = function () {
        try {
            thast.interactivrConsole = new iconsole.console();
            thast.detected.interactiveConsole = 1;
        } catch (e) {
            thast.detected.interactiveConsole = 0;
        }
    };
    this.printLog = function () {
        for (let i = 0; i < this.history.length; i++)
            if(typeof this.history[i].debug !== "undefined")
                console.log(this.history[i]);
        for (let i = 0; i < this.history.length; i++)
            if (this.history[i].result === "ok") {
                if (thast.detected.interactiveConsole === 0) {
                    console.log(
                        this.history[i].name +
                        " : " +
                        this.history[i].result +
                        " - " +
                        this.history[i].time +
                        " ms"
                    );
                } else {
                    this.interactivrConsole.printLn(
                        this.interactivrConsole.style(
                            "✓ ", 
                            {color: "green"}
                        )+
                        this.history[i].name + 
                        " : " + 
                        this.history[i].result + 
                        " - " + this.history[i].time + 
                        " ms "
                    );

                }
            } else {
                if (thast.detected.interactiveConsole === 0) {
                    console.log(
                        this.history[i].name + 
                        " : " + 
                        this.history[i].result + 
                        " --- value --- " +
                        JSON.stringify(
                            this.history[i].value
                        ) 
                    );
                } else {
                    this.interactivrConsole.printLn(
                        this.interactivrConsole.style(
                            "✗ ", 
                            {color: "red"}
                        )+
                        this.history[i].name +
                        " : " +
                        this.history[i].result +
                        "  --- value --- " +
                        JSON.stringify(this.history[i].value)
                    );
                }
            }
    };
    this.addLog = function (input) {
        this.history.push({
            time: input.time,
            name: input.name,
            result: input.result,
            error: input.error,
            value: input.value,
            debug: input.debug

        });
    };
    this.add = function (name, test, rule, sample) {
        this.tests.push({
            name: name,
            test: test,
            rule: rule,
            sample: sample,
        });
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
            result = "faild";
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
                    result = "faild";
                }
            } else if (rule == "j==") {
                if (JSON.stringify(value) == JSON.stringify(sample)) {
                    result = "ok";
                } else {
                    result = "faild";
                }
            } else if (rule == "===") {
                if (value === sample) {
                    result = "ok";
                } else {
                    result = "faild";
                }
            } else if (rule == "!=") {
                if (value != sample) {
                    result = "ok";
                } else {
                    result = "faild";
                }
            } else if (rule == "!==") {
                if (value !== sample) {
                    result = "ok";
                } else {
                    result = "faild";
                }
            } else if (rule == "<") {
                if (value < sample) {
                    result = "ok";
                } else {
                    result = "faild";
                }
            } else if (rule == ">") {
                if (value > sample) {
                    result = "ok";
                } else {
                    result = "faild";
                }
            } else if (rule == "length") {
                if (value.length === sample) {
                    result = "ok";
                } else {
                    result = "faild";
                }
            }
        if (result == "faild"){
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
    this.run = async function () {
        process.stderr.write("\x1B[?25l");
        if (thast.detected.interactiveConsole === 1) {
            thast.interactivrConsole.print("\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
            thast.interactivrConsole.bar.init({
                "name":"progress",
                "max" : thast.tests.length
            });
            thast.interactivrConsole.bar.addLine({
                "bar"   : "progress",
                "id"    : "1",
                "title"  : "not tested",
                "color" : "blue"
            });
            thast.interactivrConsole.bar.addLine({
                "bar"   : "progress",
                "id"    : "2",
                "title"  : "ok",
                "color" : "green"
            });
            thast.interactivrConsole.bar.addLine({
                "bar"   : "progress",
                "id"    : "3",
                "title"  : "failed",
                "color" : "red"
            });
        }
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


