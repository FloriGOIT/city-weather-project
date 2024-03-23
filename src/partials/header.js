import { remove } from 'lodash';
import Notiflix from 'notiflix'; 

let currentDate = new Date();
let currentDateInMillis = new Date().getTime();
let currentDateInSeconds = Math.floor(currentDateInMillis / 1000);
let myTimeSeconds = currentDate.getTimezoneOffset() * 60;
let timezoneOffsetSeconds = -18000;
let dateeeeUnix = currentDateInSeconds + timezoneOffsetSeconds + myTimeSeconds;
let dateeee = new Date(dateeeeUnix * 1000)

//declaration
let body = document.querySelector("body");
let searchSection = document.querySelector(".search-section");
let form = document.querySelector(".searchbar");
let inputText = ``;
let retrievedArray = [];
let citiesArr = [];
let cityInput = document.querySelector("#city-input");
let saveCitySVG = document.querySelector("#star");
let searchCitySVG = document.querySelector("#gps");
let savedCities = document.querySelector(".saved-cities");
let savedCitiesWidth = savedCities.parentNode.offsetWidth; 
let localStoreCities = "localCities";
export let localStoreTemporary = "temporary";
let prevButton = document.querySelector(".prevButton");
let nextButton = document.querySelector(".nextButton");
let itemsPerPage;
if (savedCitiesWidth < 220){itemsPerPage = 2;}
else{itemsPerPage = 4;}
let initial = 0;

//functions

//scroll saved city


function btnShow(){if(citiesArr.length > itemsPerPage){nextButton.style.visibility = "visible";}
                      else{nextButton.style.visibility = "hidden";
                          prevButton.style.visibility = "hidden";
                           savedCities.style.transform = `translatex(0px)`;}}
                         

getInput = () => {inputText = form.elements.userinput.value.toLowerCase();
                     return inputText;}



savedCityMarkup = (event) =>
{let retrievedArrayAsString = localStorage.getItem(localStoreCities);
  retrievedArray = JSON.parse(retrievedArrayAsString);
  citiesArr = [...retrievedArray];
  if(inputText == undefined){Notiflix.Notify.warning('Enter a valid city name.')}
  else if(inputText.length !== 0)
      {if(!citiesArr.includes(inputText)){ citiesArr.push(inputText.toLowerCase());
                                          let item = document.createElement("li");
                                          item.classList.add("saved-city");
                                          item.setAttribute("id", `${inputText}`);
                                          item.setAttribute("title", `${inputText}`);
                                          let markup = `<span class="city">${inputText}</span>
                                                     <svg class="close-city" title = ${inputText}>
                                                      <use href = "/header-symbol-defs.5e7c9225.svg#icon-cancel-circle"></use>
                                                     </svg>`;
                                      savedCities.append(item);
                                      item.insertAdjacentHTML("beforeend", markup);
                                      localStorage.setItem(localStoreCities, JSON.stringify(citiesArr));
                                      btnShow();
                                      form.reset();
                                      return citiesArr;}
       else{Notiflix.Notify.warning('City already as favorite.')}}
  else(Notiflix.Notify.warning('Enter a valid city name.'));

};

emptyMarkup = (event) => {event.preventDefault();
                          let g = event.target;
                          let gg = g.parentNode;
                          if(g.nodeName == "span"){return;}
                          else if(g.nodeName == "svg"){gg.remove();
                                                  citiesArr.splice(citiesArr.indexOf(gg.getAttribute("title")),1);}
                          else if(g.nodeName == "use"){gg.parentNode.remove();
                                citiesArr.splice(citiesArr.indexOf(gg.parentNode.getAttribute("title")),1);}
                          localStorage.setItem(localStoreCities, JSON.stringify(citiesArr));
                          initial = 0;
                          savedCities.style.transform = `translatex(0px)`;
                          prevButton.style.visibility = "hidden";
                          btnShow();
                          
                             }

function storedCities()
{localStorage.setItem('temporary', '');
try {
  retrievedArray = JSON.parse(localStorage.getItem(localStoreCities));
  citiesArr = [...retrievedArray];
} catch (error) {
  citiesArr = [];
}
if(citiesArr.length !== 0){citiesArr.forEach(city => {let item = document.createElement("li");
                                                      item.classList.add("saved-city");
                                                      item.setAttribute("id", `${city}`);
                                                      item.setAttribute("title", `${city}`);
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


function showNextItems(){let maxTrans = (citiesArr.length - itemsPerPage) * 110;                   
                         if(initial < maxTrans){initial += 110;
                                                 savedCities.style.transform = `translatex(-${initial}px)`};
                         if(initial == maxTrans){nextButton.style.visibility = "hidden"};
                                                 prevButton.style.visibility = "visible";
                                                  return initial;}
function showPreviousItems(){if(initial > 0){initial -= 110;
                                                savedCities.style.transform = `translatex(-${initial}px)`;
                                                if (initial == 0){nextButton.style.visibility = "visible";
                                                                  prevButton.style.visibility = "hidden";}}
                                                return initial;}                                       

function inputSearch(event){
                       let apiUrl = `https://pixabay.com/api/?key=42799638-b50871d8c9a958480a9d6ba7c&&safesearch=true&image_type=photo&pretty=true&q=${inputText}`;
                       fetch(apiUrl).then(response => {if (!response.ok) {console.log("response No:", body);}
                                                        else{return response.json()};})
                                    .then(data => {for(let hit of data.hits){if (hit.tags.includes("landscape") || hit.tags.includes("city") || hit.tags.includes("architecture") || hit.tags.includes("building") || hit.tags.includes("landmark")){largeImageARR.push(hit.largeImageURL);};};
                                                                             if(largeImageARR.length > 1){body.style.backgroundImage = `url('${largeImageARR[1]}')`;}
                                                                             else{body.style.backgroundImage = `url('${largeImageARR[0]}')`}});
                       largeImageARR=["https://e0.pxfuel.com/wallpapers/685/451/desktop-wallpaper-summer-day-sky-midday-sky.jpg"];
                       localStorage.setItem('temporary', `${inputText}`)
                       form.reset();                                                   
                          }

function addInputText(event){
                            let www = event.target;
                             if(event.target.nodeName == "SPAN"){inputText = www.textContent;
                                                                  inputSearch();
                                                                  largeImageARR=["https://e0.pxfuel.com/wallpapers/685/451/desktop-wallpaper-summer-day-sky-midday-sky.jpg"];
                                                                inputText = ``; return;};
                             localStorage.setItem('temporary', `${inputText}`);
                             }                                   

function inputSearchDefault(event){event.preventDefault();
                                   inputSearch();}         


//eventlistener
cityInput.addEventListener("input", getInput);
saveCitySVG.addEventListener("click", savedCityMarkup);
savedCities.addEventListener("click", emptyMarkup);
nextButton.addEventListener("click", showNextItems);
prevButton.addEventListener("click", showPreviousItems);
form.addEventListener("submit", inputSearchDefault);
searchCitySVG.addEventListener("click", inputSearchDefault);
savedCities.addEventListener("click", addInputText);

export {addInputText}



