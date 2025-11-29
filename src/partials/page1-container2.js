

import { conforms, functions } from "lodash";
import {destroyChart} from './page2-container4';
function format(number) {if (number < 10) {return "0" + number;}
                              else {return number.toString();}}
let weatherDay = document.querySelector(".weather-day");
let monthDay = document.querySelector(".month");
let timeDay= document.querySelector(".time");
let arrayDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
let arrayMonths = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// Get hour and minutes


let locationText = document.querySelector(".location-text");
let weatherIcon = document.querySelector(".weather-icon");
let sunriseeee = document.querySelector(".sunrise-time");
let twilightttt = document.querySelector(".twilight-time");

let emojiMap = 
{Drizzle: `🌧️`,
Thunderstorm : `🌩️`,
Rain : `🌧️`,
Snow : `❄️`,
Mist : `🌫️`,
Smoke: `🌫️`,
Haze: `🌫️`,
Dust: `🌫️`,
Fog: `🌫️`,
Sand: `🌫️`,
Dust: `🌫️`,
Ash: `🌫️`,
Squall: `🌫️`,
Tornado: `🌪️`,
Clear: `☀️`,
Clouds : `🌥️`,}

let location =``;
let localizationLatLon = ``;
let localizationCountry =``;
let timezoneOffsetSeconds = ``;
function getLocation() {
  if (navigator.geolocation) {navigator.geolocation.getCurrentPosition(showPosition,geoDenied()); return;} //originally(showPosition, showError)
  else {geoDenied()}}

function getData12(){
                  let location = localStorage.getItem("temporary");
                  let reply=``;
                  let apiURL = `https://api.openweathermap.org/data/2.5/weather?&units=metric&APPID=65135483567bdfc07e8e9ad4811a6114&q=${location}`;
                  fetch(apiURL).then(response => {if(!response.ok){console.log("Please refresh");}
                                else{reply = response.json();return reply;}})
                               .then(city =>{ markup12(city)})}

function showPosition(position) 
{
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  let reply=``;
  localizationLatLon = `lat=${Math.trunc(latitude * 1000)/1000}&lon=${Math.trunc(longitude * 1000)/1000}`;//lat=43.8207125&lon=28.5860482
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?&units=metric&APPID=65135483567bdfc07e8e9ad4811a6114&${localizationLatLon}`;
  fetch(apiURL).then(response => {if(!response.ok){console.log("Please refresh");}
                                  else{reply = response.json();return reply;}})
               .then(city =>{localStorage.setItem("temporary", city.name.toLowerCase()); markup12(city); })};

function markup12(x)
{
locationText.innerHTML = x.name +`, `+x.sys.country;
currentTemperature.innerHTML = Math.round(x.main.temp) + `° `;
minimum.innerHTML = Math.round(x.main.temp_min)+`° `;
maximum.innerHTML = Math.round(x.main.temp_max)+`° `;
let iconforweather = x.weather[0].main;
let emoji = emojiMap[iconforweather];
timezoneOffsetSeconds = x.timezone;
let sunsetUnix = new Date(x.sys.sunset * 1000);
let utcTimeSunset = new Date(sunsetUnix .getTime() + (timezoneOffsetSeconds - 7200) * 1000);
let sunsetTime = format(utcTimeSunset.getHours()) +`:`+ format(utcTimeSunset.getMinutes());
twilightttt.innerHTML = `🌘  ` + sunsetTime;
let sunriseUnix = new Date(x.sys.sunrise * 1000);
let utcTimeSunrise = new Date(sunriseUnix .getTime() + (timezoneOffsetSeconds - 7200) * 1000);
let sunriseTime = format(utcTimeSunrise.getHours()) +`:`+ format(utcTimeSunrise.getMinutes());
sunriseeee.innerHTML= `🌅  ` + sunriseTime;
let newDate = new Date();
if(newDate.getHours() > format(sunsetUnix.getHours())){weatherIcon.innerHTML  = `🌒`;}
else{weatherIcon.innerHTML  = emoji;}
weatherIcon.style.fontSize = "2em";
}

function dating(){
  let currentDate = new Date();
  let currentDateInMillis = new Date().getTime();
  let currentDateInSeconds = Math.floor(currentDateInMillis / 1000);
  let myTimeSeconds = currentDate.getTimezoneOffset() * 60;
  let dateeeeUnix = currentDateInSeconds + timezoneOffsetSeconds + myTimeSeconds;
  let dateeee = new Date(dateeeeUnix * 1000)
  let arrayDay = dateeee.getDay();
  let number = format(dateeee.getDate());
  weatherDay.innerHTML = arrayDays[arrayDay] + `  ` + number;
  let month = dateeee.getMonth();
  monthDay.innerHTML = arrayMonths[month];
  timeDay.innerHTML = format(dateeee.getHours()) + `:` + format(dateeee.getMinutes()) + `:` + format(dateeee.getSeconds());}
setInterval(dating, 1000)



function geoDenied() {
  let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let timeZoneSplit = timeZone.split("/");
  localizationCountry = timeZoneSplit[1].toLowerCase();
  localStorage.setItem("temporary", localizationCountry);
  getData12();
  localStorage.setItem("temporary", localizationCountry);
  
};

document.addEventListener("DOMContentLoaded",getLocation)


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
      quote: 'Wherever you go, no matter the weather, always bring your own sunshine.',
      author: 'Anthony J. D’Angelo',
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
    { quote: 'Rain is grace; rain is the sky descending to the earth; without rain, there would be no life', author: 'John Updike' },
    {
      quote: 'If you want to see the sunshine, you have to weather the storm',
      author: 'Frank Lane',
    },
    {quote:'Some people feel the rain. Others just get wet.', author:'Bob Marley'},
  {quote:'Keep your face to the sunshine and you cannot see a shadow.', author:'Helen Keller'},
  {quote:'Life isn’t about waiting for the storm to pass, it’s about learning to dance in the rain.', author:'Vivian Greene'}
  ];

let page12 = document.querySelector(".weather-data-section");
let oneDayBtn = document.querySelector(".change-today");
let fiveDayBtn = document.querySelector("#five");
let page22 = document.querySelector(".fivedayscontainer");
let page23 = document.querySelector(".container23")
page22.style.visibility = 'hidden';
let showChartDiv24 = document.querySelector(".show-chart-div");
let hideCart24 = document.querySelector('.hide-chart-div');
let bigChart24 = document.querySelector(".bigChart24");
let closeBtn23 = document.querySelector('.close__more-info');

//when button
setInterval(function() {let quoteText = document.querySelector(".quote-text");
                        let quoteAuthor = document.querySelector(".quote-author");
                        let x = Math.floor(Math.random() * 13)
                        quoteText.textContent = quoteAll[x].quote;
                        quoteAuthor.textContent = quoteAll[x].author;}, 10000);

function oneDayhidden(){//page12.style.visibility = 'hidden';
                        page12.style.display = 'none';
                        //page22.style.transform = `translatey(-450px)`;
                        page22.style.display = "flex";
                        page22.style.visibility = "visible";
                        page23.style.display = 'flex';
                        showChartDiv24.style.visibility = "visible";
                      }
function fiveDayhidden(){page22.style.display = 'none';
                         //page12.style.visibility = 'visible';
                         page12.style.display = 'block';
                         //page22.style.transform = `translatey(0px)`;
                         page23.style.display = 'none';
                         showChartDiv24.style.visibility = "hidden";
                         closeBtn23.click();
                         hideCart24.click();
                         }

fiveDayBtn.addEventListener("click",oneDayhidden)
oneDayBtn.addEventListener("click",fiveDayhidden)

//first tempreture container


let currentTemperature = document.querySelector(".current-temperature")
let minimum = document.querySelector("#minimum");
let maximum = document.querySelector("#maximum");
let cityStorage12=``;

export {getData12, markup12}

