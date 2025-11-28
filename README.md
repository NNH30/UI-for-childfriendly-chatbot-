# Sunny Chat Buddy UI

A playful Windows-friendly user interface for a child-friendly multimodal chatbot. The layout is designed for young learners with bright colors, large fonts, and welcoming copy. The interface can be plugged into your fine-tuned Gemma 3n E4B model by providing a callback that handles text and optional image inputs.

## Features

- Friendly comic-style typography and pastel theme suitable for children.
- Chat bubbles with optional image previews for both the child and the bot.
- Image picker with thumbnail preview panel.
- Scrollable conversation history with auto-scrolling.
- Keyboard shortcuts (`Ctrl+Enter`) to send messages and `Shift+Enter` to add new lines.
- Easily integrates with any callable that accepts `(text, image_path)`.

## Getting Started

1. **Install dependencies**

   ```bash
   python -m pip install -r requirements.txt
   ```

   > Pillow is used for rendering picture previews. Tkinter ships with the standard Python installer on Windows.

2. **Run the demo UI**

   ```bash
   python -m app.child_friendly_chat_ui
   ```

   The demo ships with a friendly echo response so you can preview the experience before wiring your model.

3. **Integrate your model**

   ```python
   from app import ChildFriendlyChatUI

   def send_to_model(text, image_path):
       # TODO: Replace with a call to Gemma 3n E4B once your inference code is ready.
       response = my_inference_pipeline.generate_reply(text=text, image=image_path)
       return response

   app = ChildFriendlyChatUI(on_send=send_to_model)
   app.mainloop()
   ```

   For async pipelines, return `None` and call `app.show_bot_response(...)` later when the model finishes.

## Customization Tips

- Update the palette constants in `app/child_friendly_chat_ui.py` to tweak colors.
- Modify the `tip_label` copy or replace it with quick-action buttons tailored to your project.
- Add stickers, badges, or avatar images by extending `_append_turn` with additional Tkinter widgets.

Enjoy building your delightful child-friendly chatbot experience!
# Child-Friendly Chatbot UI

This repo contains two ways to try the kid-safe chatbot experience:
- **Python desktop preview (Tkinter)** for a quick Windows-friendly demo.
- **React + TypeScript web UI** source in `src/` ready to drop into a Vite/CRA setup.

Follow the steps below to run either option after cloning from GitHub.

## Prerequisites
- **Windows** (tested on Windows 10/11) or any OS with Python 3.10+.
- **Python 3.10+** with `pip`. Tkinter ships with the standard Windows installer.
- For the web UI: **Node.js 18+** and **npm** (or **pnpm/yarn**).

## Option A: Run the Python desktop preview (fastest)
1) **Clone the repository**
```bash
git clone https://github.com/<your-account>/Userinterface-for-child-friendly-chatbot.git
cd Userinterface-for-child-friendly-chatbot
```

2) **(Recommended) Create and activate a virtual environment**
```bash
python -m venv .venv
.\.venv\Scripts\activate
```
_On PowerShell use `./.venv/Scripts/Activate.ps1`. On macOS/Linux use `source .venv/bin/activate`._

3) **Install dependencies**
```bash
python -m pip install -r requirements.txt
```

4) **Launch the preview UI**
```bash
python -m app.child_friendly_chat_ui
```
A window named **Sunny Chat Buddy** opens. Type a message, optionally pick an image, and click **Send** to see the built-in friendly echo reply.

## Option B: Run the React web UI in the browser
The React source is in `src/` and follows a Vite-style entry (`src/main.tsx`, `src/App.tsx`). If you already have a `package.json` from Vite/CRA in this folder, simply install and run:
```bash
npm install
npm run dev
```
Then open the shown local URL (e.g., http://localhost:5173) in your browser.

If you **do not** have a Node project set up yet, you can scaffold one quickly and copy this `src/` folder in:
```bash
# From the repo root
npm create vite@latest . -- --template react-ts
npm install
npm run dev
```
If asked to overwrite, choose “Yes” for config files you don’t need, then ensure the existing `src/` and `src/styles/global.css` from this repo remain. Start the dev server with `npm run dev` and open the provided URL.

## Integrate your model later
Both UIs currently use a friendly placeholder response. To connect your Gemma 3n E4B backend:
- **Python preview:** Pass a callable to `ChildFriendlyChatUI(on_send=...)` inside `app/child_friendly_chat_ui.py`.
- **React web UI:** Replace the simulated call in `src/api/chatbotApi.ts` with your real API request and wire authentication/fetch logic as needed.

## Troubleshooting
- If Tkinter fails to launch on Windows, ensure you used the standard Python installer (it includes Tkinter by default).
- If `npm run dev` fails, confirm you are using Node 18+ and that dependencies installed without errors.
- Delete `.venv` or `node_modules` and reinstall if you hit missing-module errors after upgrades.
