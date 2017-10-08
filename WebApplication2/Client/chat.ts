declare var $;

export module Chat {

    export function sendMessage() {
        var message = $("#messageInput").val();
        var nickname = $("#nicknameInput").val();

        if (message && nickname) {
            console.log("sending")
            window['myHubProxy'].invoke("sendMessageToAll", nickname, message);
        }
    }
}