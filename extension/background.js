const API_URL = "https://your-api.railway.app";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "analyzeOffer") {
    fetch(`${API_URL}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: request.offerText }),
    })
      .then((res) => res.json())
      .then((data) => sendResponse({ success: true, response: data.response }))
      .catch((err) =>
        sendResponse({ success: false, error: err.message })
      );
    return true; // Keep message channel open for async response
  }
});
