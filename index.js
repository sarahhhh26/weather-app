// API Key for OpenWeatherMap
const apiKey = "869bb6d9527a7c9257f4e0a64336b85d";

// Select elements for weather functionality
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

// Select elements for event planner functionality
const eventForm = document.querySelector(".eventForm");
const eventInput = document.querySelector(".eventInput");
const eventDateInput = document.querySelector(".eventDateInput");
const eventList = document.querySelector(".eventList");

// Weather functionality

// Select the login form

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      displayError(error.message);
    }
  } else {
    displayError("Please enter a city name");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("City not found");
  }
  return await response.json();
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = getWeatherEmoji(id);

  cityDisplay.textContent = city;
  tempDisplay.textContent = `Temperature: ${Math.round(temp)}°C`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = `${weatherEmoji} ${description}`;

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);

  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
}

function getWeatherEmoji(weatherId) {
  if (weatherId >= 200 && weatherId < 300) return "⛈️"; // Thunderstorm
  if (weatherId >= 300 && weatherId < 400) return "🌧️"; // Drizzle
  if (weatherId >= 500 && weatherId < 600) return "🌧️"; // Rain
  if (weatherId >= 600 && weatherId < 700) return "❄️"; // Snow
  if (weatherId >= 700 && weatherId < 800) return "🌫️"; // Atmosphere
  if (weatherId === 800) return "☀️"; // Clear
  if (weatherId > 800) return "☁️"; // Clouds
  return "❓"; // Default
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}

// Event planner functionality
eventForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const eventText = eventInput.value.trim();
  const eventDate = eventDateInput.value;

  if (eventText && eventDate) {
    addEvent(eventText, eventDate);
    eventInput.value = ""; // Clear input field
    eventDateInput.value = ""; // Clear date field
  } else {
    alert("Please enter both an event and a date.");
  }
});

function addEvent(eventText, eventDate) {
  const eventItem = document.createElement("li");
  eventItem.classList.add("eventItem");

  const eventContent = document.createElement("span");
  eventContent.textContent = `${eventText} - ${formatDate(eventDate)}`;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "❌";
  deleteButton.addEventListener("click", () => {
    eventItem.remove();
  });

  eventItem.appendChild(eventContent);
  eventItem.appendChild(deleteButton);
  eventList.appendChild(eventItem);
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}