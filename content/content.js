
function findInputlement() {
  // 1. Setup a timer that checks every 500 milliseconds (half a second)
  const checkExist = setInterval(() => {
    const inputElement = document.querySelector('[contenteditable="true"]');

    // 2. If the input element is finally found...
    if (inputElement) {
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

      parentElement.style.position = "relative";
      parentElement.appendChild(badge);

      // 3. Stop checking/looping
      clearInterval(checkExist);

      // 4. Safely attach your event listener
      inputElement.addEventListener("input", (event) => {
        const inputValue = event.target.innerText.trim();
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
