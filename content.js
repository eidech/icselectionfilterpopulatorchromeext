// Locate the <select> element
var studentListSelect = document.getElementById("allListID");

// Find the button used to move values to the right
var movebutton = document.getElementById("addSelection");

// Iterate through options and select ones with matching student numbers
for (var i = 0; i < studentListSelect.options.length; i++) {
  var option = studentListSelect.options[i];
  var optionStudentNumber = option.textContent.split('#')[1];

  if (studentstoselect.includes(optionStudentNumber)) {
    option.selected = true; // Select the option
  }
}

// Trigger a click event on the move button to move the selected students to the right
movebutton.click();
