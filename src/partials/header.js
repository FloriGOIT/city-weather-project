import { remove } from 'lodash';
import Notiflix from 'notiflix'; 

//declaration
let searchSection = document.querySelector(".search-section");
let form = document.querySelector(".searchbar");
console.log(searchSection);
let inputText;
let retrievedArray = [];
let citiesArr = [];
let cityInput = document.querySelector("#city-input");
let saveCitySVG = document.querySelector("#star");
let savedCities = document.querySelector(".saved-cities");
let savedCitiesWidth = savedCities.parentNode.offsetWidth;
console.log(savedCities);
//console.log("x",savedCities.attributes.length);
let savedCityy = document.querySelector(".saved-city");
let closeCity = document.querySelector(".close-city");
let localStoreCities = "localCities";
let prevButton = document.querySelector(".prevButton");
let nextButton = document.querySelector(".nextButton");
let nrOfCities;
let currentIndex = 0;
let itemWidth = 105;
let itemsPerPage;
if (savedCitiesWidth < 220){itemsPerPage = 2;}
else{itemsPerPage = 4;}
let move = 110;
let count = 0;
let calcTrans;
let scrolled;
let maxCount = citiesArr.length;

//functions
getInput = () => {inputText = form.elements.userinput.value.toLowerCase();
                     return inputText;}

savedCityMarkup = (event) =>
{let retrievedArrayAsString = localStorage.getItem(localStoreCities);
  retrievedArray = JSON.parse(retrievedArrayAsString);
  citiesArr = [...retrievedArray];
  console.log(citiesArr);
  if(inputText == undefined){Notiflix.Notify.warning('Enter a valid city name.')}
  else if(inputText.length !== 0)
      {if(!citiesArr.includes(inputText)){ citiesArr.push(inputText.toLowerCase());
                                          let item = document.createElement("li");
                                          item.classList.add("saved-city");
                                          item.setAttribute("id", `${inputText}`);
                                          console.log("length ", citiesArr.length);
                                          let markup = `<span class="city">${inputText}</span>
                                                     <svg class="close-city">
                                                      <use href = "/header-symbol-defs.5e7c9225.svg#icon-cancel-circle"></use>
                                                     </svg>`;
                                      savedCities.append(item);
                                      item.insertAdjacentHTML("beforeend", markup);
                                      localStorage.setItem(localStoreCities, JSON.stringify(citiesArr));
                                      console.log("Add array:",citiesArr);
                                      btnShow();
                                      return citiesArr;}
       else{Notiflix.Notify.warning('City already as favorite.')}}
  else(Notiflix.Notify.warning('Enter a valid city name.'));

};

emptyMarkup = (event) => {let g = event.target.parentNode;
                          let gg = g.parentNode;
                          let removeing;
                          if(g.nodeName == "svg"){removeing = document.querySelector(`#${gg.getAttribute("id")}`);
                                                  removeing.remove();}
                          else{removeing = document.querySelector(`#${g.getAttribute("id")}`);
                          removeing.remove();}
                          citiesArr.splice(citiesArr.indexOf(removeing.getAttribute("id")),1);
                          localStorage.setItem(localStoreCities, JSON.stringify(citiesArr));
                          console.log(searchSection);
                          console.log("Empty array", citiesArr);
                          btnShow();
                             }

function storedCities()
{let retrievedArrayAsString = localStorage.getItem(localStoreCities);
retrievedArray = JSON.parse(retrievedArrayAsString);
console.log("Local saved: ", retrievedArray);
citiesArr = [...retrievedArray];
console.log(citiesArr)
if(citiesArr.length !== 0){citiesArr.forEach(city => {let item = document.createElement("li");
                                                      item.classList.add("saved-city");
                                                      item.setAttribute("id", `${city}`);
                                                      let markupSaved = `<span class="city">${city}</span>
                                                                                            <svg class="close-city">
                                                                                              <use href = "/header-symbol-defs.5e7c9225.svg#icon-cancel-circle"></use>
                                                                                            </svg>`;
                                                      savedCities.append(item);
                                                      item.insertAdjacentHTML("beforeend", markupSaved)});
                                                      btnShow();
                                                      return retrievedArray;}
}
storedCities()


//scroll saved city

let initial = 0;
let moveTrans = 110;
function btnShow(){if(citiesArr.length > itemsPerPage){nextButton.style.visibility = "visible";}
                      else{nextButton.style.visibility = "hidden";}}
                         
function showNextItems(){console.log("initial=0 ", initial);
                         
                         let maxTrans = (citiesArr.length - itemsPerPage) * 110;                   
                         if(initial < maxTrans){
                                                initial += 110;
                                                 savedCities.style.transform = `translatex(-${initial}px)`;
                                                 console.log("NEXT initial + maxTrans: ", initial, maxTrans);
                                                 };
                         if(initial == maxTrans){nextButton.style.visibility = "hidden"};
                                                 prevButton.style.visibility = "visible";
                                                  return initial;
                                                }
function showPreviousItems(){ console.log("PREV initial 1", initial);
                              if(initial > 0){initial -= 110;
                                                savedCities.style.transform = `translatex(-${initial}px)`;
                                                console.log("PREV initial  2 ", initial);
                                                if (initial == 0){nextButton.style.visibility = "visible";
                                                                  prevButton.style.visibility = "hidden";
                                                                  console.log("PREV initial 3 ", initial);}}
                                                return initial;}

                                     

//eventlistener
cityInput.addEventListener("input", getInput);
saveCitySVG.addEventListener("click", savedCityMarkup);
savedCities.addEventListener("click", emptyMarkup);
nextButton.addEventListener("click", showNextItems);
prevButton.addEventListener("click", showPreviousItems);
//window.addEventListener("load",btnShow)


