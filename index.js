exports.test = function () {
    this.history = [];
    this.tests = [];
    this.printlog = function () {
        for (var i = 0; i < s.test.v.history.length; i++)
            console.log(this.history[i].time + " " + this.history[i].name + " : " + this.history[i].result);
    }
    this.addlog = function (input) {
        this.history.push({
            time: input.time,
            name: input.name,
            result: input.result,
            error: input.error
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
            value = eval(test);
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
        return {time: time, name: name, result: result, error: error};
    }
    this.run = function () {
        for (var i = 0; i < this.test.length; i++)
            this.addLog(this.test(this.tests[i].name, this.tests[i].test, this.tests[i].rule, this.tests[i].sample));
        this.printLog();
    }
}

