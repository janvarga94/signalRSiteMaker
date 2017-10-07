import { TestClass } from "./../ts/test"

declare var $;

var test = new TestClass();  


export default function sendMessage () {
    var message = $("#messageInput").val();
    var nickname = $("#nicknameInput").val();

    if (message && nickname) {
        console.log("sending")
        window['myHubProxy'].invoke("sendMessageToAll", nickname, message);
    }
}