// Poll until the chat input appears — SPAs often mount it after the page loads.
function findInputlement() {
  const checkExist = setInterval(() => {
    const inputElement = document.querySelector('[contenteditable="true"]');

    if (inputElement) {
      const button = document.createElement("button");
      button.id = "promptly-button";
      button.style.bottom = "2px";
      button.style.right = "85px";
      button.textContent = "O";
      button.style.backgroundColor = "#D97757";
      button.style.position = "absolute";
      button.style.padding = "2px";
      button.style.width = "24px";
      button.style.height = "24px";
      button.style.borderRadius = "50%";
      button.style.display = "inline-block";
      button.style.color = "white";
      button.style.display = "flex";
      button.style.alignItems = "center";
      button.style.justifyContent = "center";

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
      parentElement.appendChild(button);

      clearInterval(checkExist);

      button.addEventListener("click", () => {
        const currentText = inputElement.innerText.trim();
        console.log("Current prompt:", currentText);
      });

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
