import { currencyToCountry } from "./country.js";
const BaseURL = "https://api.openweathermap.org/data/2.5/weather?q=Ratangarh,IN&appid=33655f13c3abfc64849c907b045bb0d7";
const weatherContainer = document.querySelector('.weather-container');
let weatCont = document.querySelector(".dropDown");
const EnterBtn = document.querySelector('.submit')

//start menu 

startMenu();

function startMenu() {
    for (let country in currencyToCountry) {
        let newOption = document.createElement('option');
        newOption.innerHTML = `${country}`
        weatCont.appendChild(newOption);
        if (country === "India") {
            newOption.selected = "selected";
        }
    }
}
let country = "India";

weatCont.addEventListener('change', (e) => {
    country = e.target.value;
})
EnterBtn.addEventListener('click', () => {
    let cityVal = document.querySelector('#cityName');
    localStorage.setItem('weatherCity',JSON.stringify({"city":cityVal.value,"country":country}))
    let Tval = JSON.parse(localStorage.getItem("weatherCity"));
    weatherContainer.innerHTML = `
    <h2>Country Name:- ${Tval.country}</h2>`;
})