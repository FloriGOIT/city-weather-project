//current location
/*
let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
console.log(timeZone); // Output: e.g., "Europe/Bucharest"



let btn = document.querySelector(".localize");
let localizationLatLon = ``;
function getLocation() {
  if (navigator.geolocation) {navigator.geolocation.getCurrentPosition(showPosition);} //originally(showPosition, showError)
  else {alert("Geolocation is not supported by this browser.");}}

function showPosition(position) 
{
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  localizationLatLon = `lat=${Math.trunc(latitude * 1000)/1000}&lon=${Math.trunc(longitude * 1000)/1000}`;//lat=43.8207125&lon=28.5860482
  console.log(localizationLatLon);
  return localizationLatLon;
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}
btn.addEventListener("click", getLocation)

let localSite = `https://api.openweathermap.org/data/2.5/weather?&units=metric&APPID=65135483567bdfc07e8e9ad4811a6114&${localizationLatLon}`
*/

import { conforms, functions } from "lodash";






let quoteAll = [
    {
      quote: 'Climate is what we expect, weather is what we get.',
      author: 'Mark Twain',
    },
    {
      quote:
        'In the Spring, I have counted 136 different kinds of weather inside of 24 hours.',
      author: 'Mark Twain',
    },
    { quote: 'Weather forecast for tonight: dark.', author: 'George Carlin' },
    {
      quote:
        'There is no such thing as bad weather, only different kinds of good weather.',
      author: 'John Ruskin',
    },
    {
      quote:
        'Wherever you go, no matter what the weather, always bring your own sunshine.',
      author: 'Anthony J. D`Angelo',
    },
    {
      quote: 'Bad weather always looks worse through a window.',
      author: 'Tom Lehrer',
    },
    {
      quote: 'The weather is like the government, always in the wrong.',
      author: 'Jerome K. Jerome',
    },
    {
      quote: 'A beach and warm weather is all I really need.',
      author: 'Rob Gronkowski',
    },
    {
      quote: 'The weather is perfect. The gods are shining on us.',
      author: 'Frank Shorter',
    },
    {
      quote: 'There`s no such thing as bad weather, just soft people.',
      author: 'Bill Bowerman',
    },
    { quote: 'I love the rain, it can hide my tears', author: 'JS programmer' },
    {
      quote: 'If you want to see the sunshine, you have to weather the storm',
      author: 'Frank Lane',
    },
    {quote:'Just for the record, the weather today is calm and sunny, but the air is full of shit.', author:'Ellie Yelizarieva '}
  ];

let page12 = document.querySelector(".weather-data-section");
let oneDayBtn = document.querySelector(".change-today");
let fiveDayBtn = document.querySelector("#five");
let page22 = document.querySelector(".fivedayscontainer");
page22.style.visibility = 'hidden';

//when button
setInterval(function() {let quoteText = document.querySelector(".quote-text");
                        let quoteAuthor = document.querySelector(".quote-author");
                        let x = Math.floor(Math.random() * 13)
                        quoteText.textContent = quoteAll[x].quote;
                        quoteAuthor.textContent = quoteAll[x].author;}, 10000);

function oneDayhidden(){page22.style.visibility = 'visible';
                        page12.style.visibility = 'hidden';
                        page22.style.transform = `translatey(-550px)`;}
function fiveDayhidden(){page22.style.visibility = 'hidden';
                         page12.style.visibility = 'visible';
                        page22.style.transform = `translatey(0px)`;
                        page22.style.visibility = `hidden`;

                        consolelog(oneDayBtn)
                    }

fiveDayBtn.addEventListener("click",oneDayhidden)
oneDayBtn.addEventListener("click",fiveDayhidden)

//first tempreture container

let locationText = document.querySelector(".location-text");
let currentTemperature = document.querySelector(".current-temperature")
let minimum = document.querySelector("#minimum");
let maximum = document.querySelector("#maximum");
localStoreTemporary = "temporary";
let cityStorage12=``;
let weatherIcon = document.querySelector(".weather-icon")
let clearsky= `🌞`; let fewclouds = `🌤️`; let scatteredclouds = `🌥️`; let brokenclouds = `☁️`; 
let showerrain = `🌦️`; let rain = `🌧️`; let thunderstorm = `🌩️`; let snow = `❄️`; let mist = `🌫️`;
form = document.querySelector(".searchbar");
form.addEventListener("submit", firstcontainer);


function firstcontainer(event)
{cityStorage12= localStorage.getItem("temporary");
   let reply = ``;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=65135483567bdfc07e8e9ad4811a6114&units=metric&q=${cityStorage12}`;
  fetch(apiUrl).then(response => {if (!response.ok) {console.log("Please refresh");}
                                   else{reply = response.json();
                                        return reply};})
               .then(city => {console.log(city);
                              locationText.innerHTML = city.name +`, `+city.sys.country +`° `;
                              currentTemperature.innerHTML = Math.round(city.main.temp) + `° `;
                              minimum.innerHTML = Math.round(city.main.temp_min)+`° `;
                              maximum.innerHTML = Math.round(city.main.temp_max)+`° `;
                              let iconforweather = city.weather[0].description.replace(/\s/g, "")});
                              weatherIcon.innerHTML  = iconforweather;

              }
                          

              /*
              //design
              
              //https://api.openweathermap.org/data/2.5/weather?appid=65135483567bdfc07e8e9ad4811a6114&units=metric&q=ZURICH
              
              let city = 
              
              {
                coord:{lon:8.55,lat:47.3667},
                weather:[{id:800,main:'Clear',description:'clear sky',icon:'01d'}],
                base:`stations`,
                main:{temp:15.02,feels_like:14.17,temp_min:12.96,temp_max:17.04,pressure:1018,humidity:61},
                visibility:10000,
                wind:{speed:2.57,deg:50},
                clouds:{all:0},
                dt:1710864381,
                sys:{type:2,id:2004824,country:`CH`,sunrise:1710826217,sunset:1710869800},
                timezone:3600,
                id:2657896,
                name: 'Zurich',
                cod:200
                }


              let descrWeather = ["clear sky","few clouds","scattered clouds", "broken clouds", "shower rain", "rain","thunderstorm", "snow", "mist"]
              //let descrWeatherIcon=[🌞,🌤️,🌥️,☁️,🌦️,🌧️,🌩️, ❄️,🌫️,];//https://openweathermap.org/weather-conditions#Icon-list
              
              let cityCountry = city.name+`, `+city.sys.country;
              console.log("cityCountry: ",cityCountry)
              
              
              let iconCityWeather = city.weather[0].description
              console.log("iconCityWeather: ",iconCityWeather)
              
              let day = new Date().getDay();
              console.log("day: ",day)
              let number = new Date().getDate();
              console.log("number: ",number )
              let month = new Date().getMonth();
              console.log("month: ",day)
              let hourMinute = new Date().getHours().toString() + `:` + new Date().getMinutes().toString();
              console.log("hourMinute: ",hourMinute)
              
              let currentTemp12 = Math.round(city.main.temp)
              console.log("currentTemp12: ",currentTemp12)
              let minTemp12 = Math.round(city.main.temp_min)
              console.log("minTemp12: ",minTemp12)
              let maxTemp12 = Math.round(city.main.temp_max)
              console.log("maxTemp12: ",maxTemp12)
              
              let sunrise = new Date(city.sys.sunrise * 1000);
              let sunriseTime = sunrise.getHours().toString() +`:`+ sunrise.getMinutes().toString();
              console.log("sunriseTime:",sunriseTime)
              
              
              
              
              let sunset = new Date(city.sys.sunset * 1000);
              let sunsetTime = sunset.getHours().toString() +`:`+ sunset.getMinutes().toString();
              console.log("sunsetTime:",sunsetTime)
              
              //let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
              //console.log(timeZone)
              */