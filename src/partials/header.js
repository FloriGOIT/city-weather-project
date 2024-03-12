import Notiflix from 'notiflix'; 

//declaration
let searchSection = document.querySelector(".search-section");
console.log(searchSection);
let inputText= "";
let citiesArr = [];
let cityInput = document.querySelector("#city-input");
let saveCitySVG = document.querySelector("#star");
let savedCities = document.querySelector(".saved-cities");
let savedCity = document.querySelector(".saved-city");
let closeCity = document.querySelector(".close-city");


//functions
getInput = event => {inputText = event.currentTarget.value.toLowerCase(); console.log(inputText); return inputText;}

savedCityMarkup = (event) =>
{ if(!citiesArr.includes(inputText)){let markup = `<li class="saved-city ${inputText}" >
                                                     <span class="city">${event.currentTarget.value}</span>
                                                     <svg class="close-city ${inputText}" id=${inputText}>
                                                      <use class="${inputText}" href = "/header-symbol-defs.5e7c9225.svg#icon-cancel-circle"></use>
                                                     </svg>
                                                    </li>`;
                                      savedCities.insertAdjacentHTML("beforeend", markup);
                                      citiesArr.push(inputText);
                                      console.log(citiesArr);
                                      return citiesArr
                                     }
  else{Notiflix.Notify.warning('City already as favorite.')}
}

removeMarkup = (event) => {let y = event.target;
    let z = y.classList.length-1;
    let w = y.classList[z];
    let container = document.querySelector(`div .${w}`);
    container.remove();}



export {searchSection, inputText, citiesArr, cityInput, saveCitySVG, savedCities, savedCity, closeCity, getInput, savedCityMarkup, removeMarkup};