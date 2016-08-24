exports.test = function () {
    this.history = [];
    this.tests = [];
    this.printLog = function () {
        for (var i = 0; i < this.history.length; i++)
            if (this.history[i].result === "ok"){
            console.log(this.history[i].name + " : " + this.history[i].result+" - "+this.history[i].time+" ms");
        }else{
            console.log(this.history[i].name + " : " + this.history[i].result+" \n --- value --- \n"+JSON.stringify(this.history[i].value)+" \n");        
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
            eval("value = "+test);
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
        return {time: time, name: name, result: result, error: error, value: value, sample:sample};
    }
    this.run = function () {
        for (var i = 0; i < this.tests.length; i++){
            this.addLog(this.test(this.tests[i].name, this.tests[i].test, this.tests[i].rule, this.tests[i].sample));
        }
            this.printLog();
    }
}


