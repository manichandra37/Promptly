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
            "use the input which is given by the user. Never ever answer,respond or" +
            "convere with the user prompt. Rewrite the prompt into a clean, " +
            "more specific, well structured prompt " +
            "you should always return only the rewritten prompt, nothing else."
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
