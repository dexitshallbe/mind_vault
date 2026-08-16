const BACKEND_URL = "http://localhost:8000/chat";

const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");
const messagesContainer = document.getElementById("messages");
const sendButton = document.getElementById("sendButton");

const newChatButton = document.getElementById("newChatBtn");
const menuButton = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");


/* =========================
   ADD MESSAGE
========================= */

function addMessage(text, sender) {

    const row = document.createElement("div");

    row.classList.add("message-row", sender);

    const message = document.createElement("div");

    message.classList.add("message");

    message.textContent = text;

    row.appendChild(message);

    messagesContainer.appendChild(row);

    messagesContainer.scrollTop =
        messagesContainer.scrollHeight;

    return message;
}


/* =========================
   LOADING MESSAGE
========================= */

function addLoadingMessage() {

    const row = document.createElement("div");

    row.classList.add("message-row", "bot");

    const message = document.createElement("div");

    message.classList.add("message");

    message.innerHTML = `
        <div class="typing">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;

    row.appendChild(message);

    messagesContainer.appendChild(row);

    messagesContainer.scrollTop =
        messagesContainer.scrollHeight;

    return message;
}


/* =========================
   SEND MESSAGE
========================= */

async function sendMessage(text) {

    addMessage(text, "user");

    messageInput.value = "";

    messageInput.style.height = "auto";

    sendButton.disabled = true;

    const loadingMessage = addLoadingMessage();


    try {

        const response = await fetch(BACKEND_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: text
            })

        });


        if (!response.ok) {

            throw new Error(
                `Server error: ${response.status}`
            );

        }


        const data = await response.json();


        /*
         * Backend is expected to return:
         *
         * {
         *     "reply": "AI response here"
         * }
         */

        loadingMessage.textContent =
            data.reply ?? "No response received.";


    } catch (error) {

        loadingMessage.textContent =
            "Sorry, something went wrong. " +
            error.message;

    } finally {

        sendButton.disabled = false;

        messageInput.focus();

    }
}


/* =========================
   FORM SUBMISSION
========================= */

chatForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const text = messageInput.value.trim();

    if (!text) {
        return;
    }

    sendMessage(text);

});


/* =========================
   ENTER TO SEND
========================= */

messageInput.addEventListener("keydown", function(event) {

    if (
        event.key === "Enter" &&
        !event.shiftKey
    ) {

        event.preventDefault();

        chatForm.requestSubmit();

    }

});


/* =========================
   AUTO RESIZE TEXTAREA
========================= */

messageInput.addEventListener("input", function() {

    this.style.height = "auto";

    this.style.height =
        Math.min(this.scrollHeight, 150) + "px";

});


/* =========================
   NEW CHAT
========================= */

newChatButton.addEventListener("click", function() {

    messagesContainer.innerHTML = `
        <div class="welcome">

            <div class="welcome-icon">
                M
            </div>

            <h1>How can I help you study?</h1>

            <p>
                Ask questions, summarize your notes,
                practice a topic, or explore your notebooks.
            </p>

        </div>
    `;

    messageInput.focus();

});


/* =========================
   MOBILE SIDEBAR
========================= */

menuButton.addEventListener("click", function() {

    sidebar.classList.toggle("open");

});