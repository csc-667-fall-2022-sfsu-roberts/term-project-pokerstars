const queryString = window.location.href;
const urlParams = queryString.split("/");
const gameroom_id = urlParams[urlParams.length - 2];

$("time.timeago").timeago();

window.addEventListener("load", (event) => {
  const timestamps = document.getElementsByClassName("timestamp");

  console.log(timestamps);
  Array.from(timestamps).forEach((element) => {
    let date = new Date(parseInt(element.innerText));
    element.innerText = jQuery.timeago(date);
  });
});

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
                          <span class="timestamp">${jQuery.timeago(
                            timestamp
                          )}</span>
                        </div>`;

  messages.lastChild.after(template.content.firstChild);
});
