const input = document.getElementById("api-key");
const saveBtn = document.getElementById("save-btn");
const status = document.getElementById("status");

// Pre-fill the field if a key was saved earlier, so the user can see it's set.
chrome.storage.local.get("groqApiKey").then(({ groqApiKey }) => {
  if (groqApiKey) {
    input.value = groqApiKey;
    setStatus("A key is already saved.", "ok");
  }
});

saveBtn.addEventListener("click", async () => {
  const key = input.value.trim();

  if (!key) {
    setStatus("Please enter an API key.", "error");
    return;
  }

  // Groq keys start with "gsk_" — catch obvious paste mistakes early.
  if (!key.startsWith("gsk_")) {
    setStatus('That does not look like a Groq key (should start with "gsk_").', "error");
    return;
  }

  await chrome.storage.local.set({ groqApiKey: key });
  setStatus("Saved!", "ok");
});

function setStatus(message, kind) {
  status.textContent = message;
  status.className = kind;
}
