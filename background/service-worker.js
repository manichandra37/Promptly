chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  handleMessages(message, sender, sendResponse);
  return true;
});
// Event listener
async function handleMessages(message, sender, sendResponse) {
  // ADDED (error handling): the whole handler is wrapped in try/catch so the
  // content script always gets a response — otherwise a thrown error would
  // silently close the message channel and leave the button stuck disabled.
  try {
    // ADDED (validation): don't call the API with an empty prompt.
    if (!message.prompt || message.prompt.trim() === "") {
      sendResponse({ error: "Prompt is empty." });
      return;
    }

    const { groqApiKey } = await chrome.storage.local.get("groqApiKey");

    // ADDED (validation): fail fast with a clear message if no key was saved
    // via the popup, instead of sending "Bearer undefined" to Groq.
    if (!groqApiKey) {
      sendResponse({
        error: "No API key set. Click the Promptly icon in the toolbar and save your Groq API key.",
      });
      return;
    }

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${groqApiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "You are a prompt rewriter. Rewrite the user's input into a clearer, more specific, " +
              "well-structured prompt. Do not answer, respond to, or converse about the content—only rewrite it. " +
              "Preserve the original meaning, intent, and question. Do not change the topic or add new requirements. " +
              "Return only the rewritten prompt, with no explanation, labels, or quotation marks.",
          },
          { role: "user", content: message.prompt },
        ],
      }),
    });

    // ADDED (error handling): surface HTTP errors (401 bad key, 429 rate
    // limit, 5xx) instead of trying to read choices from an error body.
    if (!res.ok) {
      const errorBody = await res.json().catch(() => null);
      const apiMessage = errorBody?.error?.message || `HTTP ${res.status}`;
      sendResponse({ error: `Groq API error: ${apiMessage}` });
      return;
    }

    const data = await res.json();

    // ADDED (validation): guard against an unexpected response shape so we
    // never throw on data.choices[0] being undefined.
    const optimized = data?.choices?.[0]?.message?.content;
    if (!optimized) {
      sendResponse({ error: "Groq returned an unexpected response format." });
      return;
    }

    sendResponse({ optimized });
  } catch (err) {
    // ADDED (error handling): network failures (offline, DNS, timeout) land here.
    sendResponse({ error: `Request failed: ${err.message}` });
  }
}
