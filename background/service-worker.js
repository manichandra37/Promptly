// Event listener
function handleMessages(message, sender, sendResponse) {
    console.log(message.prompt)
    return true;
  }
  
  chrome.runtime.onMessage.addListener(handleMessages);
  
