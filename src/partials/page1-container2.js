

import { conforms, functions } from "lodash";

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
  if (navigator.geolocation) {navigator.geolocation.getCurrentPosition(showPosition,showError); return;} //originally(showPosition, showError)
  else {let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let timeZoneSplit = timeZone.split("/");
    localizationCountry = timeZoneSplit[1].toLowerCase();
    localStorage.setItem("temporary", localizationCountry);
    getData12();
    };}

function getData12(){
                  let location = localStorage.getItem("temporary");
                  let reply=``;
                  let apiURL = `https://api.openweathermap.org/data/2.5/weather?&units=metric&APPID=65135483567bdfc07e8e9ad4811a6114&q=${location}`;
                  console.log(apiURL)
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
               .then(city =>{localStorage.setItem("temporary", city.name.toLowerCase()); markup12(city)})}

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
return timezoneOffsetSeconds;
}

function dating(){
  let currentDate = new Date();
  let currentDateInMillis = new Date().getTime();
  let currentDateInSeconds = Math.floor(currentDateInMillis / 1000);
  let myTimeSeconds = currentDate.getTimezoneOffset() * 60;
  console.log(timezoneOffsetSeconds)
  let dateeeeUnix = currentDateInSeconds + timezoneOffsetSeconds + myTimeSeconds;
  let dateeee = new Date(dateeeeUnix * 1000)
  console.log(dateeee)
  let arrayDay = dateeee.getDay();
  let number = format(dateeee.getDate());
  weatherDay.innerHTML = arrayDays[arrayDay] + `  ` + number;
  let month = dateeee.getMonth();
  monthDay.innerHTML = arrayMonths[month];
  timeDay.innerHTML = format(dateeee.getHours()) + `:` + format(dateeee.getMinutes()) + `:` + format(dateeee.getSeconds());}
setInterval(dating, 1000)



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
      break;}};

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
                        page22.style.transform = `translatey(0px)`;}

fiveDayBtn.addEventListener("click",oneDayhidden)
oneDayBtn.addEventListener("click",fiveDayhidden)

//first tempreture container


let currentTemperature = document.querySelector(".current-temperature")
let minimum = document.querySelector("#minimum");
let maximum = document.querySelector("#maximum");
localStoreTemporary = "temporary";
let cityStorage12=``;

export {getData12, markup12}

