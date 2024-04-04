console.log("Content.js Script Running...");
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("runScript Event Triggered");
  if (message.action === "runScript") {

    const newLook = message.newlook;

    // new look added an iframe to navigate through
    // Old Look -> Just go to frameWorkspace
    // New Look -> Go to main-workspace, then go to frameWorkspace

    var iframe;
    var iframeDocument;

    // if newlook, switch to main-workspace first; if not newlook, not needed
    if (newLook) {
      iframe = document.getElementById("main-workspace");
      if (iframe) {
        var mainworkspaceDocument = iframe.contentDocument || iframe.contentWindow.document;
        iframe = mainworkspaceDocument.getElementById("frameWorkspace");
        if (iframe) {
          iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        } else {
          console.log("frameWorkspace not found!");
          return;
        }
      } else {
        console.log("main-workspace not found!");
        return;
      }
    } else {
      iframe = document.getElementById("frameWorkspace");
      if (iframe) {
        iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      }
      else {
        console.log("frameWorkspace not found!");
        return;
      }
    }

    var studentListSelect = iframeDocument.getElementById("allListID");

    // Find the button used to move values to the right
    var movebutton = iframeDocument.getElementById("addSelection");
    
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