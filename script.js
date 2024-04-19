const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
const progressBar = document.getElementById('progress');
const progressBarValue = document.getElementById('progress-number');
let order = "bottom"; // Default order is set to "top"

function updateProgress() {
  const totalItems = checkboxes.length;
  const checkedItems = document.querySelectorAll('.checklist input[type="checkbox"]:checked');
  const uncheckedItems = document.querySelectorAll('.checklist input[type="checkbox"]:not(:checked)');
  
  // Sorting the items based on the "order" variable
  if (order === "bottom") {
    // Appending checked items first
    checkedItems.forEach(item => item.parentNode.parentNode.appendChild(item.parentNode));
    // Appending unchecked items after checked items
    uncheckedItems.forEach(item => item.parentNode.parentNode.appendChild(item.parentNode));
  } else {
    // Appending unchecked items first
    uncheckedItems.forEach(item => item.parentNode.parentNode.insertBefore(item.parentNode, item.parentNode.parentNode.firstChild));
    // Appending checked items after unchecked items
    checkedItems.forEach(item => item.parentNode.parentNode.insertBefore(item.parentNode, null));
  }
  
  const progress = Math.floor((checkedItems.length / totalItems) * 100);
  
  // Adjusting height instead of width for the vertical progress bar
  progressBar.style.height = progress + '%';
  progressBarValue.textContent = progress + '%';
  
  // If progress reaches 100%, set border-radius to 0px
  if (progress === 100) {
    progressBar.style.borderRadius = '0px';
  } else {
    progressBar.style.borderRadius = '5px 5px 0px 0px'; // Reset border-radius if progress is less than 100%
  }
}

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', updateProgress);
});

// Initial call to update progress when the page loads
updateProgress();
