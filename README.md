# Building an AI API Wrapper

## with OpenRouter, Flask & React

_A Practical Toolkit & Getting-Started Guide_

**Phase 1 — 4 | Prompt-Powered Toolkit Project**

_By Ruth Iguta_

---

## 1. Title & Objective

### What technology did we choose?

This project integrates three technologies into a single, working AI chat application:

- **OpenRouter** — a unified API gateway that routes requests to multiple AI models (Claude, LLaMA, Gemini, etc.) through one OpenAI-compatible endpoint.

- **Flask (Python)** — a lightweight backend framework used to host the API wrapper and stream AI responses to the frontend.

- **React + Vite + TailwindCSS** — a modern frontend stack used to build a real-time chat UI that consumes the streamed responses.

### Why did we choose it?

- OpenRouter provides access to free-tier models (e.g. `meta-llama/llama-3.1-8b-instruct:free`), removing the cost barrier for development and learning.
- The OpenAI-compatible API shape means skills transfer directly to other providers.
- Flask is minimal and easy to reason about — ideal for understanding the raw HTTP layer before adding framework abstractions.
- React with streaming support (via the Fetch ReadableStream API) delivers a modern, responsive chat experience identical to tools like ChatGPT.

### End Goal

Build a fully functional streaming AI chat application where a user can type a message, have it sent through a Flask backend to the OpenRouter API, and receive a real-time streamed response — all displayed live in the browser.

---

## 2. Quick Summary of the Technology

### OpenRouter

OpenRouter is a unified API router that sits in front of dozens of AI language model providers. Developers send a single request to OpenRouter and choose a model string — the service handles authentication, routing, and billing for each underlying provider.

- **What it is:** An OpenAI-compatible HTTP API gateway for multiple LLM providers.
- **Where it is used:** Developer tools, AI chatbots, research prototypes, and any product that needs model flexibility without vendor lock-in.
- **Real-world example:** Cursor (the AI code editor) uses a similar multi-model router to let users switch between GPT-4, Claude, and others from a single settings toggle.

### Flask

Flask is a micro web framework for Python. It handles HTTP routing, request parsing, and response generation with minimal boilerplate. In this project it acts as the middleware layer between the React frontend and the OpenRouter API.

### React + Vite + TailwindCSS

React is a component-based UI library. Vite is its fast build tool and dev server. TailwindCSS is a utility-first CSS framework that enables rapid, consistent styling without writing custom CSS files.

---

## 3. System Requirements

| **Component**       | **Requirement**                                                         |
| ------------------- | ----------------------------------------------------------------------- |
| **OS**              | Linux, macOS, or Windows (WSL2 recommended on Windows)                  |
| **Python**          | 3.8 or higher                                                           |
| **Node.js**         | 18 or higher (for Vite / React frontend)                                |
| **Package Manager** | pip + pipenv (backend) \| npm or yarn (frontend)                        |
| **Editor**          | VS Code recommended (with Pylance + ESLint extensions)                  |
| **Browser**         | Any modern browser with DevTools (Chrome recommended)                   |
| **OpenRouter Key**  | Free account at openrouter.ai — no credit card required for free models |

---

## 4. Installation & Setup Instructions

### Step 1 — Clone or scaffold the project

```bash
# Backend
mkdir my-ai-app && cd my-ai-app
mkdir backend frontend

# Frontend (Vite + React)
cd frontend
npm create vite@latest . -- --template react
npm install
npm install tailwindcss @tailwindcss/vite axios lucide-react react-router-dom

```

## 📄 Documentation

- [Read the full AI Toolkit](./docs/AI_Toolkit_Guide_by_Ruth_Iguta.pdf)
- [Prompts](./docs/AIPromptJournal.md)


## Live Demo

👉 [Try the App](https://ai-wrapper-frontend-zrf5.onrender.com)
    ![AI Works](/public/aiworks.png)

