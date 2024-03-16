// Current time
function updateCurrentTime() {
  const currentTimeElement = document.getElementById("data-time");
  const currentTime = new Date();
  const hours = currentTime.getHours().toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const seconds = currentTime.getSeconds().toString().padStart(2, "0");

  const formattedTime = `${hours}:${minutes}:${seconds}`;
  currentTimeElement.textContent = formattedTime;
}
updateCurrentTime();
setInterval(updateCurrentTime, 1000);


// Current Month 
const monthElement = document.getElementById("data-month");

const currentMonth = new Date().getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
monthElement.textContent = months[currentMonth];

// Current weekday and day number

const dayElement = document.getElementById("data-section-day");
const currentDate = new Date();
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const weekdayName = weekdays[currentDate.getDay()];
const date = currentDate.getDate();
dayElement.textContent = `${weekdayName} ${date}`;

// Quote and author


const quoteElement = document.getElementById("quote-text");
const authorElement = document.getElementById("quote-author");


const weatherQuotes = [
  { quote: "Sunshine is delicious, rain is refreshing, wind braces us up, snow is exhilarating; there is really no such thing as bad weather.", author: "John Ruskin" },
  { quote: "There's no such thing as bad weather, just different kinds of good weather.", author: "Charles F. Glassman" },
  { quote: "I love a storm coming. It's a feeling of excitement I can't explain.",  author: "Gustave Flaubert" },
];

function updateQuote() {

  const randomIndex = Math.floor(Math.random() * weatherQuotes.length);
  const quote = weatherQuotes[randomIndex].quote;
  const author = weatherQuotes[randomIndex].author;

  quoteElement.textContent = quote;
  authorElement.textContent = author;
}

updateQuote();
setInterval(updateQuote, 5000); 

// API SUNSET / SUNRISE


const apiKey = 'dcf210a6fff4c73b98c3eb5b02348d8f';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?&units=metric&q=';

const searchBox = document.getElementById("city-input");


async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  const data = await response.json();

  const sunriseTime = new Date(data.sys.sunrise * 1000);
  const sunsetTime = new Date(data.sys.sunset * 1000);

  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const sunriseFormatted = sunriseTime.toLocaleTimeString('en-US', options);
  const sunsetFormatted = sunsetTime.toLocaleTimeString('en-US', options);

  document.querySelector('.sunrise-time').innerHTML = sunriseFormatted;
  document.querySelector('.sunset-time').innerHTML = sunsetFormatted;
  
}

searchBox.addEventListener('keydown', async (event) => {
  if (event.key === 'Enter') {
    const city = searchBox.value;
    await checkWeather(city);
  }
  
});
checkWeather();
















