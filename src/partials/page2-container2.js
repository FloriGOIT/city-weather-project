import axios from "axios";
import {getData12, markup12} from "./page1-container2.js"




let array23 = [];
let searchCitySVG23 = document.querySelector("#gps");
const fiveDaysContainer22 = document.querySelector('.fivedayscontainer');
const weatherChart22 = document.querySelector('.weather-fivedays-container');
const cityName22 = document.getElementById('city-fivedays-name');
const countryName22 = document.getElementById('country-fivedays-name');
let aContainer = document.querySelector('.cities-scroll');
let fivedaysPrevBtn = document.querySelector('.fivedays_prev-btn');
let fivedaysNextBtn = document.querySelector('.fivedays_next-btn');

fivedaysNextBtn.addEventListener("click",traslateXNext)
fivedaysPrevBtn.addEventListener("click",traslateXprev)
let value = 0;
let max = 180;
function traslateXNext(){if(value < max){value += 95;
                                     weatherChart22.style.transform = `translateX(-${value}px)`;
                                     fivedaysNextBtn.style.display = "visible"}
                         if(value == 190){fivedaysNextBtn.style.display = "none";
                                          fivedaysPrevBtn.style.display = "block";}
                     return value;}
function traslateXprev(){if(value <= 190){value -= 95;
                         weatherChart22.style.transform = `translateX(-${value}px)`;
                         fivedaysNextBtn.style.display = "block";}
                         if(value == 0){fivedaysPrevBtn.style.display = "none";
                                        fivedaysNextBtn.style.display = "block";}}

// de sters, le-am facut eu ca sa pot lucra
const inputText22 = '';
const form22 = document.querySelector('.searchbar');
const addForm22 = document.querySelector('.city');

const showFiveDaysWeather = document.querySelector('#five');

form22.addEventListener("submit", async (e) => {e.preventDefault();
                                                await fetchWeather();});
aContainer.addEventListener("click", async (e) => {
    e.preventDefault();
    await fetchWeather();});
searchCitySVG23.addEventListener("click", async (e) => {
    e.preventDefault();
    await fetchWeather();})

showFiveDaysWeather.addEventListener("click", e =>{
    fiveDaysContainer22.style.opacity = '0.9';
});

setTimeout(() => {
    fetchWeather();
}, 1000);

const fetchWeather = async (event) =>{

    const apiKey = '6c59b7271a472d858ef65bf9fc510832';
    let location = localStorage.getItem('temporary').trim();
    setTimeout(() => getData12(),100);
    try{
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${location}&appid=${apiKey}`);
        const city =  response.data;
       
        weatherPerDays(city.list);
        cityName22.textContent = city.city.name + `,`;
        countryName22.textContent = city.city.country;
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
    } 

    const weatherMarkup = filteredWeatherData.map((data) => `
        <li class="weatherfivedays-card" data-date=${new Date(data.dt_txt).getDate()}>
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
            <button class="more-info" data-date=${new Date(data.dt_txt).getDate()}>more info</button>
        </li>
    `);
    weatherChart22.innerHTML = weatherMarkup.join("");
}

