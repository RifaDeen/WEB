// Get the popup container element
const popupContainer = document.querySelector('.popup-container');

// Get the close button element
const closeBtn = document.querySelector('.close-btn');

// Get the submit button element
const submitBtn = document.querySelector('.submit-btn');

// Add a click event listener to the submit button
submitBtn.addEventListener('click', function (event) {
  // Prevent the default form submission
  event.preventDefault();

  // Show the popup container
  popupContainer.style.display = 'block';
});

// Add a click event listener to the close button
closeBtn.addEventListener('click', function (event) {
  // Hide the popup container
  popupContainer.style.display = 'none';
});
