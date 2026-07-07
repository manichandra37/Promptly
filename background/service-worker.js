// Event listener
async function handleMessages(message, sender, sendResponse) {
  const { groqApiKey } = await chrome.storage.local.get("groqApiKey");

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
            "Rewrite the user's prompt to be clearer and more effective. Return only the rewritten prompt.",
        },
        { role: "user", content: message.prompt },
      ],
    }),
  });

  const data = await res.json();
  const optimized = data.choices[0].message.content;
  sendResponse({ optimized });
  return true;
}

chrome.runtime.onMessage.addListener(handleMessages);
