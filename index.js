exports.test = function () {
    this.history = [];
    this.tests = [];
    this.interactivrConsole = "";
    this.result = {
        ok: 0,
        fail: 0
    }
    this.detected = {
        interactiveConsole: 0,
    }
    this.check = function () {
        try {
            var ic = require("interactive-console");
            this.interactivrConsole = new ic.console();
            that.detected.interactiveConsole = 1;
        } catch (e) {
            that.detected.interactiveConsole = 0;
        }
    }
    this.printLog = function () {
        for (var i = 0; i < this.history.length; i++)
            if (this.history[i].result === "ok") {
                this.result.ok++;
                if (that.detected.interactiveConsole === 0) {
                    console.log(this.history[i].name + " : " + this.history[i].result + " - " + this.history[i].time + " ms");
                } else {
                    this.interactivrConsole.printLn(this.history[i].name + " : " + this.history[i].result + " - " + this.history[i].time + " ms " + this.interactivrConsole.style("✓", {color: "green"}));
                }
            } else {
                this.result.fail++;
                if (that.detected.interactiveConsole === 0) {
                    console.log(this.history[i].name + " : " + this.history[i].result + " --- value --- " + JSON.stringify(this.history[i].value) + " \n");
                } else {
                    this.interactivrConsole.printLn(this.history[i].name + " : " + this.history[i].result + "  --- value --- " + JSON.stringify(this.history[i].value) + " " + this.interactivrConsole.style("✗", {color: "red"}));
                }
            }
    }
    this.addLog = function (input) {
        this.history.push({
            time: input.time,
            name: input.name,
            result: input.result,
            error: input.error,
            value: input.value
        });
    }
    this.add = function (name, test, rule, sample) {
        this.tests.push({
            name: name,
            test: test,
            rule: rule,
            sample: sample,
        });
    }
    this.test = function (name, test, rule, sample) {
        var result;
        var error = "none";
        var time = 0;
        var startTime;
        var value;
        var endTime;
        try {
            startTime = +new Date;
            eval("value = " + test);
            endTime = +new Date;
            time = (endTime - startTime).toString();
            result = "ok";
        } catch (error) {
            result = "failed";
            error = "runtime Error";
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
        return {time: time, name: name, result: result, error: error, value: value, sample: sample};
    }
    this.run = function () {
        for (var i = 0; i < this.tests.length; i++) {
            this.addLog(this.test(this.tests[i].name, this.tests[i].test, this.tests[i].rule, this.tests[i].sample));
        }
        this.printLog();
        if (that.detected.interactiveConsole === 0) {
            console.log("ok :" + that.result.ok.toString() + " | failed : " + that.result.fail.toString());
        } else {
            this.interactivrConsole.printLn("ok :" +  this.interactivrConsole.style(that.result.ok.toString(), {color: "green"})+ " | failed : " + this.interactivrConsole.style(that.result.fail.toString(), {color: "red"} ));
        }
    }
    var that = this;
    this.check();
}


