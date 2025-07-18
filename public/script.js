const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const loadingIndicator = document.getElementById('loading');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage('user', userMessage);
  input.value = '';

  loadingIndicator.style.display = 'block'; // Show loading indicator

  fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: userMessage }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        appendMessage('bot', data.message);
      } else {
        appendMessage('bot', `Error: ${data.message}`); // Use template literals
      }
    })
    .catch(error => {
      appendMessage('bot', `Error: ${error.message}`);  // Use template literals
    })
    .finally(() => {
      loadingIndicator.style.display = 'none'; // Hide loading indicator in either case
    });
});


function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
