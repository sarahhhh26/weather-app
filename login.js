const loginForm = document.getElementById("loginForm");

// Add an event listener to handle form submission
loginForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  window.location.href = "weather.html"; // Redirect to the weather page
});