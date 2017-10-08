define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Test;
    (function (Test) {
        var TestClass = (function () {
            function TestClass() {
                console.log("working typescript");
            }
            return TestClass;
        }());
        Test.TestClass = TestClass;
    })(Test = exports.Test || (exports.Test = {}));
});
