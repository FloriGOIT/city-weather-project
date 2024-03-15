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
let savedCityy = document.querySelector(".saved-city");
let closeCity = document.querySelector(".close-city");
let localStoreCities = "localCities";





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
                                      //classing();
                                      localStorage.setItem(localStoreCities, JSON.stringify(citiesArr));
                                      console.log("Add array:",citiesArr);
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
                          let idx = citiesArr.indexOf(removeing);
                          citiesArr.splice(idx,1);
                          //classing();
                          console.log(citiesArr.length);
                          localStorage.setItem(localStoreCities, JSON.stringify(citiesArr));
                          console.log(searchSection);
                          console.log("Empty array", citiesArr);
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
                                                      return retrievedArray;}
}
storedCities()

function classing(){console.log(citiesArr.length);
                    let itemcity = document.querySelector(".saved-city");
                    //for(let i = 2; i > citiesArr.length;){itemcity.classList.add("tonone");}
                    //for(let i = 2, i > citiesArr.length, i++){itemcity.classList.remove("tonone");}
                    console.log(savedCities)}

//eventlistener
cityInput.addEventListener("input", getInput);
saveCitySVG.addEventListener("click", savedCityMarkup);
savedCities.addEventListener("click", emptyMarkup);




