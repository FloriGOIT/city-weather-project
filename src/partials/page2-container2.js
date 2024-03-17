import axios from "axios";

const fiveDaysContainer = document.querySelector('.fivedayscontainer');
const weatherChart = document.querySelector('.weather-fivedays-container');
const cityName = document.getElementById('city-fivedays-name');
const countryName = document.getElementById('country-fivedays-name');


// de sters, le-am facut eu ca sa pot lucra
const inputText = document.getElementsByName("searchQuery")[0];
const form = document.querySelector('.form');
const showFiveDaysWeather = document.querySelector('.fivedays-button');

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await fetchWeather();
});
//


fiveDaysContainer.style.opacity = '0';

showFiveDaysWeather.addEventListener("click", e =>{
    fiveDaysContainer.style.opacity = '100%';
});


const fetchWeather = async () =>{
    const apiKey = '6c59b7271a472d858ef65bf9fc510832';
    const location = inputText.value.trim();
   
    try{
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${location}&appid=${apiKey}`);
        const city =  response.data;
       
        weatherPerDays(city.list);
        cityName.textContent = city.city.name;
        countryName.textContent = city.city.country;
    }
    catch(error){
        console.log(error)
    }
}

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function weatherPerDays(weatherData) {
    const currtentMonth = months[new Date(weatherData[0].dt_txt).getMonth()];
    const filteredWeatherData = [];

    for (let i = 0; i < weatherData.length; i += 8) {
        filteredWeatherData.push(weatherData[i]);
        console.log(weatherData[i]);
    } 

    const weatherMarkup = filteredWeatherData.map((data) => `
        <li class="weatherfivedays-card">
            <h2 class="day">${days[new Date(data.dt_txt).getDay()]}</h2>
            <h2 class="date">${new Date(data.dt_txt).getDate() + ' ' + currtentMonth}</h2>
            <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png"
                alt="weather icon" class="fivedays-icon">
            <div class="min-max-temp">
                <div class="temp-min">
                    <p class="temp-title">min</p>
                    <p class="temperature">${Math.round(data.main.temp_min)}&#176</p>
                </div>
                <span class="dash"></span>
                <div class="temp-max">
                    <p class="temp-title">max</p>
                    <p class="temperature">${Math.round(data.main.temp_max)}&#176</p>
                </div>
            </div>
            <button class="more-info">more info</button>
        </li>
    `);
    weatherChart.innerHTML = weatherMarkup.join("");
}


