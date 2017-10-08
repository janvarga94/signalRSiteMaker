define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Chat;
    (function (Chat) {
        function sendMessage() {
            var message = $("#messageInput").val();
            var nickname = $("#nicknameInput").val();
            if (message && nickname) {
                console.log("sending");
                window['myHubProxy'].invoke("sendMessageToAll", nickname, message);
            }
        }
        Chat.sendMessage = sendMessage;
    })(Chat = exports.Chat || (exports.Chat = {}));
});
