
import axios from "axios";
import notiflix from 'notiflix';
import Chart from 'chart.js/auto';

const apiKey = '4010945aa892ea67d326c4c740de3e65';
const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';


// Functia principala care aduce datele de pe API
async function fetchData(location) {
  if (location.trim() === "") {
    notiflix.Notify.failure("Te rog introdu un oraș valid.");
    return;
  }
  try {
    const response = await axios.get(`${apiUrl}?q=${location}&appid=${apiKey}&units=metric`);
    return response.data  //const data = response.data; 
  } catch (error) {
    console.error(error);
    notiflix.Notify.failure('Error fetching data')
  }
};

// Functia care aduce datele pentru 5 zile in format 14 Mar 2024
async function getFiveDays(location) {
  const data = await fetchData(location);
  if (data) {
    const uniqueForecastDays = [];
    const fiveDaysForecast = data.list.filter(forecast => {
      const forecastDate = new Date(forecast.dt_txt).getDate();
      if (!uniqueForecastDays.includes(forecastDate)) {
        uniqueForecastDays.push(forecastDate);
        return true;
      }
      return false;
    });
    console.log(fiveDaysForecast);
    drawChart(fiveDaysForecast);
  }
}
 

    // Functia care creaza chart-ul
    function drawChart(fiveDaysForecast) {

      const ctx = document.getElementById('myChart');
    
      if (!ctx) {
        console.error('Canvas element not found');
        return;
      }
    
      new Chart(ctx, {
        type: 'line',
        data: {
            labels: fiveDaysForecast.map(weatherItem => {
                const dateParts = weatherItem.dt_txt.split(' ')[0].split('-');
                const day = parseInt(dateParts[2]);
                const month = parseInt(dateParts[1]);
                const year = parseInt(dateParts[0]);
                const months = new Intl.DateTimeFormat('en', { month: 'short' }).format(new Date(year, month - 1, day));
                return `${day}-${months}-${year}`; //Modific cum vreau
            }),
            datasets: [
                {
                    label: '- Temperature (°C)',
                    data: fiveDaysForecast.map(weatherItem => weatherItem.main.temp),
                    borderWidth: 1,
                    borderColor: 'rgba(255, 107, 9, 1)',
                    backgroundColor: 'rgba(255, 107, 9, 1)',
                },
                {
                    label: '- Humidity (%)',
                    data: fiveDaysForecast.map(weatherItem => weatherItem.main.humidity),
                    borderWidth: 1,
                    borderColor: 'rgba(9, 6, 235, 1)',
                    backgroundColor: 'rgba(9, 6, 235, 1)',
                },
                {
                    label: '- Wind Speed (m/s)',
                    data: fiveDaysForecast.map(weatherItem => weatherItem.wind.speed),
                    borderWidth: 1,
                    borderColor: 'rgba(234, 154, 5, 1)',
                    backgroundColor: 'rgba(234, 154, 5, 1)',
                },
                {
                    label: '- Atmosphere Pressure (m/m)',
                    data: fiveDaysForecast.map(weatherItem => weatherItem.main.pressure),
                    borderWidth: 1,
                    borderColor: 'rgba(6, 120, 6, 1)',
                    backgroundColor: 'rgba(6, 120, 6, 1)',
                },
            ]
        },
        options: {
            layout: {
                padding: {
                    bottom: 60
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            tension: 0.4,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.4)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.4)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.4)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.4)'
                    }
                },
            },
            plugins: {
                subtitle: {
                    display: true,
                    text: 'AVERAGE:',
                    align: 'start',
                    color: 'rgba(255, 255, 255, 0.4)',
                    font: {
                        size: 14,
                        weight: 'normal'
                    }
                },
                legend: {
                    display: true,
                    labels: {
                        color: 'rgba(255, 255, 255, 0.4)',
                        font: {
                            size: 14,
                        },
                    },
                },
            },
        }
    });
  }
  

  //shearch-bar-ul general unde scriem orasul 
  document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const location = document.getElementById('search-input').value; 
    getFiveDays(location); //functia care transmite orasul selectat catre chart-ul meu
  });


   //Functie care ascunde div-ule
  function showChart() {
    const showCart = document.querySelector('.show-chart-div');
    const hideCart = document.querySelector('.hide-chart-div');
    const extentionChart = document.querySelector('.extention-chart');
  
    showCart.addEventListener('click', function () {
      showCart.style.display = 'none';
      extentionChart.style.display = 'block';
    });
  
    hideCart.addEventListener('click', function () {
      extentionChart.style.display = 'none';
      showCart.style.display = 'flex';
    });
  }

showChart();