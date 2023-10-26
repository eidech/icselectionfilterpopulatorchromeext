document.addEventListener("DOMContentLoaded", function () {
  const csvFileInput = document.getElementById("csvFileInput");
  const runScriptButton = document.getElementById("runScript");

  runScriptButton.addEventListener("click", function () {
    console.log("Run Script Button Clicked...");
    // Check if a file is selected
    if (csvFileInput.files.length > 0) {
      console.log("CSV File Found...");
      const file = csvFileInput.files[0];

      // Read the selected file (assuming CSV)
      const reader = new FileReader();
      reader.onload = function (event) {
        const csvData = event.target.result;
        const studentNumbers = extractStudentNumbers(csvData);

        for (studentNumber in studentNumbers) {
          console.log(studentNumber);
        }
        
        // Send a message to your content script to trigger the action
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { action: "runScript", studentstoselect: studentNumbers });
        });
      };

      reader.readAsText(file);
    }
  });
  
  // Function to extract student numbers from the CSV
  function extractStudentNumbers(csvData) {
    console.log("Extracting student numbers...")
    csvData = csvData.replace(/\r/g, '');
    const lines = csvData.split('\n');
    const headers = lines[0].split(',');
    console.log(headers);
    const studentNumberIndex = headers.indexOf('student_studentNumber');
    
    if (studentNumberIndex === -1) {
      console.error('Header "student_studentNumber" not found in CSV.');
      return [];
    }
    
    const studentNumbers = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      if (values.length === 1) {
        console.log("Pushing Single Column Data...");
        studentNumbers.push(values[0].trim());
      } else {
        studentNumbers.push(values[studentNumberIndex]);
      }
    }
    
    return studentNumbers;
  }
});
