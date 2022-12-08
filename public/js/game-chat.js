const queryString = window.location.href;
const urlParams = queryString.split("/");
const gameroom_id = urlParams[urlParams.length - 2];

document
  .querySelector("#message-field")
  .addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
      fetch(`/chat/gameroom/${gameroom_id}`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: event.target.value })
      })
        .then(() => {
          document.querySelector("#message-field").value = "";
        })
        .catch((error) => console.log(error));
    }
  });

const messages = document.querySelector("#messages");

socket.on(`chat/gameroom/:${gameroom_id}`, ({ sender, message, timestamp }) => {
  let template = document.createElement("template");
  template.innerHTML = `<div class="commment">
                          <span class="sender">@${sender}</span>
                          <span class="content">${message}</span>
                          <div class="timestamp">${timestamp}</div>
                        </div>`;

  messages.lastChild.after(template.content.firstChild);
});
