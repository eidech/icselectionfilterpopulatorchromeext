console.log("Content.js Script Running...");
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("runScript Event Triggered");
  if (message.action === "runScript") {
    const csvData = message.csvData;

    // Locate the <select> element
    var iframe = document.getElementById("frameWorkspace");

    if (iframe) {
      var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

      var studentListSelect = iframeDocument.getElementById("allListID");

      // Find the button used to move values to the right
      var movebutton = iframeDocument.getElementById("addSelection");
    } else {
      console.log("frameWorkspace not found!");
      return;
    }
    
    // Iterate through options and select ones with matching student numbers
    for (var i = 0; i < studentListSelect.options.length; i++) {
      var option = studentListSelect.options[i];
      var optionStudentNumber = option.textContent.split('#')[1];

      if (message.studentstoselect.includes(optionStudentNumber)) {
        option.selected = true; // Select the option
      }
    }

    // Trigger a click event on the move button to move the selected students to the right
    movebutton.click();
}});