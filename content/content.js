// Poll until the chat input appears — SPAs often mount it after the page loads.
function findInputlement() {
  const checkExist = setInterval(() => {
    const inputElement = document.querySelector('[contenteditable="true"]');

    if (inputElement) {
      // Token-count badge anchored to the bottom-right of the input area.
      const badge = document.createElement("div");
      badge.id = "promptly-badge";
      badge.style.bottom = "2px";
      badge.style.right = "8px";
      badge.style.backgroundColor = "#D97757";
      badge.style.color = "white";
      badge.style.padding = "2px";
      badge.style.zIndex = "9999";
      badge.style.borderRadius = "5px";
      badge.textContent = "0";
      badge.style.position = "absolute";
      badge.style.display = "inline-block";

      const parentElement = inputElement.parentElement;

      // Parent must be positioned so the absolute badge stays inside the input box.
      parentElement.style.position = "relative";
      parentElement.appendChild(badge);

      clearInterval(checkExist);

      inputElement.addEventListener("input", (event) => {
        const inputValue = event.target.innerText.trim();
        // Rough token estimate: word count × 1.3 (typical English token/word ratio).
        const tokenCount = Math.round(
          inputValue.split(" ").filter((w) => w.length > 0).length * 1.3,
        );
        badge.textContent = tokenCount + " tokens";
      });
    } else {
      console.log("Still looking for the chat input...");
    }
  }, 500);
}

findInputlement();
console.log("Promptly content script loaded!");
