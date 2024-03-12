import {searchSection, inputText, citiesArr, cityInput, saveCitySVG, savedCities, savedCity, closeCity, getInput, savedCityMarkup, removeMarkup,} from "./partials/header";



//eventlistener
cityInput.addEventListener("input", getInput);
saveCitySVG.addEventListener("click", savedCityMarkup);
savedCities.addEventListener("click", removeMarkup);


