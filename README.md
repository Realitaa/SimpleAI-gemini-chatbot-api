# SimpleAI - Gemini Chatbot API

A simple chatbot page to simulate chatting with generative AI model from Google Gemini API. This chatbot model have a motto: "A short, simple and to the point chatbot".

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

- **Node.js**: Version 18.x or newer is recommended.
- **npm** or **yarn**: Package manager for Node.js.
- **Google Gemini API Key**: You'll need an API key to communicate with the Gemini models. You can obtain one from [Google AI Studio](https://aistudio.google.com/).

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/Realitaa/SimpleAI-gemini-chatbot-api.git
    cd SimpleAI-gemini-chatbot-api
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project by copying the example file.
    ```sh
    cp .env.example .env
    ```

4.  **Add your API key:**
    Open the newly created `.env` file and add your Google Gemini API key.
    ```env
    GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
    ```

## Usage

You can run the server in two modes:

- **Development Mode**: Uses `nodemon` to automatically restart the server on file changes.
  ```sh
  npm run dev
  ```

- **Production Mode**: Runs the server using `node`.
  ```sh
  npm start
  ```

By default, the server will be running at port `3000` (you can change this in the `.env` file)

Open `http://localhost:3000` in your browser after running the server.

## License

This project is licensed under the MIT License.

