chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  handleMessages(message, sender, sendResponse);
  return true;
});
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
            "You are a prompt rewriter. Rewrite the user's input into a clearer, more specific, " +
            "well-structured prompt. Do not answer, respond to, or converse about the content—only rewrite it. " +
            "Preserve the original meaning, intent, and question. Do not change the topic or add new requirements. " +
            "Return only the rewritten prompt, with no explanation, labels, or quotation marks.",
        },
        { role: "user", content: message.prompt },
      ],
    }),
  });

  const data = await res.json();
  console.log(data);
  const optimized = data.choices[0].message.content;
  sendResponse({ optimized });
}
