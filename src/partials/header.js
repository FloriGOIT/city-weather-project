import { remove } from 'lodash';
import Notiflix from 'notiflix'; 

//declaration
let searchSection = document.querySelector(".search-section");
console.log(searchSection);
let inputText= "";
let citiesArr = [];
let cityInput = document.querySelector("#city-input");
let saveCitySVG = document.querySelector("#star");
let savedCities = document.querySelector(".saved-cities");
let savedCityy = document.querySelector(".saved-city");
let closeCity = document.querySelector(".close-city");


//functions
getInput = event => {inputText = event.currentTarget.value.toLowerCase(); return inputText;}

savedCityMarkup = (event) =>
{ if(!inputText.length == 0){
  if(!citiesArr.includes(inputText)){let markup = `<li class="saved-city" id="${inputText}">
                                                     <span class="city">${inputText}</span>
                                                     <svg class="close-city">
                                                      <use href = "/header-symbol-defs.5e7c9225.svg#icon-cancel-circle"></use>
                                                     </svg>
                                                    </li>`;
                                      savedCities.insertAdjacentHTML("beforeend", markup);
                                      citiesArr.push(inputText.toLowerCase());
                                      console.log("For add:",citiesArr);
                                      return citiesArr;}
  else{Notiflix.Notify.warning('City already as favorite.')}}
  else(Notiflix.Notify.warning('Enter a valid city name.'))
};

emptyMarkup = (event) => {let g = event.target.parentNode;
                          let gg = g.parentNode;
                          console.log(g.nodeName);
                          console.log(g.parentNode.nodeName);
                          let removeing;
                          if(g.nodeName == "svg"){removeing = document.querySelector(`#${gg.getAttribute("id")}`);
                                                  removeing.remove();}
                          else{removeing = document.querySelector(`#${g.getAttribute("id")}`);
                          removeing.remove();}
                          let idx = citiesArr.indexOf(removeing);
                          citiesArr.splice(idx,1);
                          console.log(citiesArr)
                             }
                           
//eventlistener
cityInput.addEventListener("input", getInput);
saveCitySVG.addEventListener("click", savedCityMarkup);
savedCities.addEventListener("click", emptyMarkup);

//export {searchSection, inputText, citiesArr, cityInput, saveCitySVG, savedCities, savedCityy, closeCity, getInput, savedCityMarkup, emptyMarkup};