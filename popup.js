document.addEventListener("DOMContentLoaded", function () {
  const csvFileInput = document.getElementById("csvFileInput");
  const runScriptButton = document.getElementById("runScript");
  const headerList = document.getElementById("headerList");
  const headerSelect = document.getElementById("headerSelect");

  // Event listener for file input change
  csvFileInput.addEventListener("change", function () {
    headerList.innerHTML = ""; // Clear the header list
    headerSelect.style.display = "none"; // Hide the select element

    // Check if a file is selected
    if (csvFileInput.files.length > 0) {
      const file = csvFileInput.files[0];

      // Read the selected file (assuming CSV)
      const reader = new FileReader();
      reader.onload = function (event) {
        const csvData = event.target.result;
        const headers = extractHeaders(csvData);

        if (headers.length > 0) {

          // Populate the dropdown select element with headers
          headerSelect.innerHTML = headers.map((header) => `<option value="${header}">${header}</option>`).join('');
          headerSelect.style.display = "block"; // Show the select element
        }
      };

      reader.readAsText(file);
    }
  });

  runScriptButton.addEventListener("click", function () {
    console.log("Run Script Button Clicked...");
    // Check if a file is selected
    if (csvFileInput.files.length > 0) {
      console.log("CSV File Found...");
      const file = csvFileInput.files[0];

      const selectedHeader = headerSelect.value; // Get the selected header

      if (selectedHeader) {
        // Read the selected file (assuming CSV)
        const reader = new FileReader();
        reader.onload = function (event) {
          const csvData = event.target.result;
          const studentNumbers = extractStudentNumbers(csvData, selectedHeader);

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
    }
  });
  
  // Function to extract student numbers from the CSV
  function extractStudentNumbers(csvData, selectedHeader) {
    console.log("Extracting student numbers...")
    csvData = csvData.replace(/\r/g, '');
    const lines = csvData.split('\n');
    const headers = lines[0].split(',');
    console.log(headers);
    const studentNumberIndex = headers.indexOf(selectedHeader);
    
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
  
  // Function to extract headers from the CSV data
  function extractHeaders(csvData) {
    csvData = csvData.replace(/\r/g, '');
    const lines = csvData.split('\n');

    if (lines.length === 0) {
      console.error('CSV data is empty.');
      return [];
    }

    const headers = lines[0].split(',');

    if (headers.length === 0) {
      console.error('No headers found in the CSV data.');
      return [];
    }

    return headers;
  }

});