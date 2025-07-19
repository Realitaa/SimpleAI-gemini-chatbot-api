function chatbot() {
  return {
    content: '',
    messages: [],
    welcomeMessage: true,
    loading: false,
    init() {
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.chatContainer;
        container.scrollTop = container.scrollHeight;
      });
    },
    async sendMessage() {
      if (!this.content.trim() || this.content.length > 100) return;

      this.welcomeMessage = false;

      // Tambahkan pesan pengguna
      this.messages.push({ from: 'user', text: this.content });

      const userMessage = this.content;
      this.content = '';
      this.loading = true;

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();

        if (!response.ok || !data || !data.message) {
          throw new Error("Respon tidak valid");
        }

        this.messages.push({ from: 'bot', text: data.message });
      } catch (error) {
        this.messages.push({ from: 'error', text: 'Ada kesalahan. Coba lagi nanti.' });
      } finally {
        this.loading = false;
        this.scrollToBottom();
      }
    }
  };
}

function typewriterMarkdown(markdownText) {
  return {
    display: '',
    fullText: markdownText,
    done: false,
    i: 0,
    startTyping() {
      const type = () => {
        if (this.i < this.fullText.length) {
          this.display += this.fullText.charAt(this.i++);
          setTimeout(type, 5); // kecepatan ketik
        } else {
          this.done = true;
        }
      };
      type();
    }
  };
}

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


function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
