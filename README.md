# Promptly

Live token counter for LLM prompts — works on Claude.ai and ChatGPT.

## Demo
[Watch demo](https://youtu.be/9h7vW9zWP8k)

## Features
- Live token count as you type
- Works on Claude.ai and ChatGPT
- Lightweight — vanilla JS, no frameworks

## Installation
1. Clone this repo
2. Go to chrome://extensions
3. Enable Developer Mode
4. Click "Load unpacked" → select the folder
5. Click the Promptly icon in the toolbar and save your Groq API key
   (get one at https://console.groq.com/keys)

## Privacy
Prompt text is sent to the Groq API only when you click the optimize
button. Your API key is stored locally in your browser. No analytics, no
tracking. Full details in [PRIVACY.md](PRIVACY.md).

## Tech Stack
- Vanilla JavaScript
- Chrome Manifest V3
- DOM injection via content scripts
