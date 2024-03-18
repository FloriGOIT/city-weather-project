


import axios from 'axios';

let fiveDaysRequest = document.querySelector("#five")
const today = new Date();
const container23 = document.querySelector('.weather-fivedays-container');// changeeee container23   weather-fivedays-container
const modalElem = document.querySelector('.modal');
const forecastList = document.querySelector('.three_hour_weather');
const closeBtn = document.querySelector('.close__more-info');
const prevBtn = document.querySelector('.three_hour_prev-btn');
const nextBtn = document.querySelector('.three_hour_next-btn');
const divDays = document.querySelector('.weather-fivedays-container');// changeeee  fiveDays   weather-fivedays-container
const daysList = document.querySelector('.weatherfivedays-card');// changeeee  days  weatherfivedays-card

let form11for23 = document.querySelector(".searchbar");


async function getWeatherForDate() {
  let site = `https://api.openweathermap.org/data/2.5/forecast?APPID=8defc985a5e2c764076c53bf90c6c44e&units=metric&lang=en&q=${localStorage.getItem("temporary")}`;
  console.log("site",site)
  try {
    const response = await axios(site);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function getWeatherData(dataValue) {
    let site = `https://api.openweathermap.org/data/2.5/forecast?APPID=8defc985a5e2c764076c53bf90c6c44e&units=metric&lang=en&q=${localStorage.getItem("temporary")}`;
    console.log("site",site);
  try {
    const forecastData = await getWeatherForDate();
    const weatherList = forecastData.list;
    const markup = weatherList
      .filter(list => {
        const date = new Date(list.dt * 1000)
          .getDate()
          .toString()
          .padStart(2, '0');
        console.log("date 1",date)
        return date === dataValue;
      })
      .map(list => {
        const {
          dt,
          main: { humidity, temp, pressure },
          wind: { speed },
        } = list;

        const date = new Date(dt * 1000);
        console.log("date 2",date)
        let amPm = 'AM';
        let hours = date.getHours().toString().padStart(2, '0');
        if (hours >= 12) {
          hours -= 12;
          amPm = 'PM';
        }
        if (hours === 0) {
          hours = 12;
        }
        const formattedTime = `${hours}:${date
          .getMinutes()
          .toString()
          .padStart(2, '0')} ${amPm}`;
        const day = date.getDate().toString().padStart(2, '0');
        console.log("daydayday",day)
        const weatherArray = list.weather;
        console.log("weatherArray",weatherArray)
        const { icon, main } = weatherArray[0];
        const degrees = Math.round(temp);
        console.log("dataValue",dataValue)
        if (dataValue === day) {
          return `
                <li class= list-item id=${main}><p class= item_hourly_time>${formattedTime}</p>
                                               <img class= item_hourly_img src="https://openweathermap.org/img/w/${icon}.png" alt="clouds" width="35"/>
                                               <p class= item_hourly_degrees>${degrees}°</p>
                 <div class= weather_details><p class= item_hourly_pressure>${pressure} mm</p><p class= item_hourly_humidity>${humidity} %</p><p class= item_hourly_wind_speed>${speed} m/s</p></div>
                </li>`;
        }
      })
      .join('');

    forecastList.innerHTML = markup;
    console.log("hello to me")
  } catch (error) {
    console.error('Error processing forecast data:', error);
  }
}
function removeSelectedCls(elem){
  elem.classList.remove('selected')
  }
  function hideModal() {
    modalElem.classList.add('is-hidden');
  }

//add listener on divDays to open modal with data from day
container23.addEventListener('click', ev => {
  const clickedBtn = ev.target;
  console.log("clickedBtn", clickedBtn)
  if (clickedBtn.nodeName !== 'BUTTON') {return;};

  const isDaysButton = clickedBtn.classList.contains('more-info');//changeeee days weatherfivedays-card
  if (!isDaysButton) return;
  if (modalElem.classList.contains('is-hidden')) {
    modalElem.classList.remove('is-hidden');
  }
  const hoveredBtn = document.querySelector('.selected');
  if (hoveredBtn) {
    hoveredBtn.classList.remove('selected');
  }
  clickedBtn.classList.add('selected');
  const dataValue = clickedBtn.dataset.date;
  getWeatherData(dataValue);
});

//close modal
closeBtn.addEventListener('click', ()=>{
  hideModal();
  const hoveredBtn = document.querySelector('.selected');
  if (hoveredBtn) {
    removeSelectedCls(hoveredBtn);
  }
});



let currentPosition = 0;
const itemWidth = 130;
prevBtn.addEventListener('click', () => {
  const targetPosition = Math.max(currentPosition - itemWidth, 0);
  scrollTo(targetPosition);
  currentPosition = targetPosition;
});

nextBtn.addEventListener('click', () => {
  const maxScrollPosition =
    forecastList.scrollWidth - container23.clientWidth + 40;
  const targetPosition = Math.min(
    currentPosition + itemWidth,
    maxScrollPosition
  );
  scrollTo(targetPosition);
  currentPosition = targetPosition;
});

function scrollTo(targetPosition) {
  const adjustedPosition = Math.min(
    Math.max(targetPosition, 0),
    forecastList.scrollWidth - container23.clientWidth + 40
  );
  forecastList.scrollTo({
    left: adjustedPosition,
    behavior: 'smooth',
  });
}