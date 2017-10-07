"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var test_1 = require("./../ts/test");
var test = new test_1.TestClass();
function sendMessage() {
    var message = $("#messageInput").val();
    var nickname = $("#nicknameInput").val();
    if (message && nickname) {
        console.log("sending");
        window['myHubProxy'].invoke("sendMessageToAll", nickname, message);
    }
}
exports.default = sendMessage;
