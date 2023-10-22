document.addEventListener("DOMContentLoaded", function () {
    const csvFileInput = document.getElementById("csvFileInput");
    const runScriptButton = document.getElementById("runScript");
  
    runScriptButton.addEventListener("click", function () {
      // Check if a file is selected
      if (csvFileInput.files.length > 0) {
        const file = csvFileInput.files[0];
  
        // Read the selected file (assuming CSV)
        const reader = new FileReader();
        reader.onload = function (event) {
          const csvData = event.target.result;
  
          // You can process the CSV data here or send it to your content script
          // For simplicity, we'll just log it to the console
          console.log("CSV Data:", csvData);
  
          // Send a message to your content script to trigger the action
          chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "runScript", csvData });
          });
        };
  
        reader.readAsText(file);
      }
    });
  });
  