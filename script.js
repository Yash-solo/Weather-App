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
EnterBtn.addEventListener('click', async() => {
    let cityVal = document.querySelector('#cityName');
    localStorage.setItem('weatherCity',JSON.stringify({"city":cityVal.value,"country":country}))
    let Tval = JSON.parse(localStorage.getItem("weatherCity"));

    weatherContainer.classList.add('afterEnter');

    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${Tval.city},${Tval.country}&appid=33655f13c3abfc64849c907b045bb0d7`);
    let data = await response.json();

    let weatherImg = "";
    let weatherID = data.weather[0].id;
    
    //cloud image choose 
    if(weatherID<=232 && weatherID>=200){
        weatherImg = "./pictures/first.jpg";
    }else if(weatherID<=321 && weatherID>=300){
        weatherImg = "./pictures/second.jpg";
    }else if(weatherID<=531 && weatherID>=500){
        weatherImg = "./pictures/third.png";
    }else if(weatherID<=622 && weatherID>=600){
        weatherImg = "./pictures/fourth.jpg";
    }else if(weatherID<=781 && weatherID>=700){
        weatherImg = "./pictures/smoke.jpg";
    }else if(weatherID===800){
        weatherImg = "sunny.jpg";
    }else if(weatherID<=804 && weatherID>=801){
        weatherImg = "./pictures/cloud.webp";
    }else{
        weatherImg = "sunny.jpg";
    }
    
    //weather container decide 
    weatherContainer.innerHTML = `
    <div class="weatherPic">
        <img src="${weatherImg}" class="pic" alt="weather">
        <h2 style="font-size:53px">${Math.ceil(data.main.temp-273)}°C</h2>
    </div>
    <div class="weatherOther">
        <div>
            <h2>temp in °K</h2>
            <h3> ${Math.ceil(data.main.temp)}°k </h3>
        </div>
        <div>
            <h2>temp in °F</h2>
            <h3>${Math.ceil(((data.main.temp-273)*(9/5))+32)}°F</h3>
        </div>
        <div>
            <h2>City:-${Tval.city}</h2>
            <h2>Country:-${Tval.country}</h2>
        </div>
    </div>`;

})