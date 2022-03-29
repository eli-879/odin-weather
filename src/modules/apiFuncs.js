export default class FormManager {
    constructor() {
        this.form = document.getElementById("weather-form");
        this.formValue = document.getElementById("location-input");
        this.location = "";
    }

    initForm() {
        const boundReturnLocation = this.returnLocation.bind(this);
        this.form.addEventListener("submit", boundReturnLocation);
    }

    getCityLocation() {
        return this.formValue.value;
    }

    cleanLocationInput(loc) {
        loc.replace(/(\s+$|^\s+)/g, ''); //remove whitespace from before and end of string
        loc.replace(/(,\s+)/g); // remove whitespace from after a comma
        loc.replace(/(\s+,)/g); //remove whitespace from before a comma
        loc.replace(/\s+/g, "+") // replace whitespace left with + i.e New Zealand => New+Zealand so works with api

        return loc;
    }

    buildCoordsURL(loc) {
        return `http://api.openweathermap.org/geo/1.0/direct?q=${loc}&appid=5b9d734e5dc27e5f513dd3c42ab228de`;
    }

    buildBGGif(keyword) {
        return `https://api.giphy.com/v1/gifs/translate?api_key=tfjaWqYrtGm6otk7M6O15iwfJMOrvogz&s=${keyword}`
    }

    buildKeyWord(keyword) {
        return keyword.replace(/(\s+)/g, "+");
        
    }

    async setBackground(keyword) {
        const body = document.body;
        const newKeyword = this.buildKeyWord(keyword);
        const url = this.buildBGGif(newKeyword);
        console.log(newKeyword, url)
        const img = await fetch(url, {mode: "cors"});
        const imgJSON =  await img.json();
        console.log(imgJSON)
        body.style.backgroundImage = `url(${imgJSON.data.images.downsized_large.url})`;
    }

    async getCityInfo(url) {
        const response = await fetch(url);
        const data = await response.json();

        return data;
    }

    async getWeatherInfo(lat, long) {
        const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=5b9d734e5dc27e5f513dd3c42ab228de`, {mode: "cors"});
        const response = await data.json();
    
        return response;    
    }

    async returnLocation() {
        const enteredLoc = this.getCityLocation();
        const cleanedLoc = this.cleanLocationInput(enteredLoc);
        const coordsURL = this.buildCoordsURL(cleanedLoc);
        const cityInfo = await this.getCityInfo(coordsURL);
        const cityCoords = {lat: cityInfo[0].lat, lon:cityInfo[0].lon};
        const weatherInfo = await this.getWeatherInfo(cityCoords.lat, cityCoords.lon);
        this.setBackground(weatherInfo.weather[0].description);
        console.log(cityInfo, weatherInfo);

        this.buildPageWithData(weatherInfo, cityInfo);

    }

    buildPageWithData(weatherData, cityData) {
        this.buildCurrentWeather(weatherData, cityData);
    }

    buildCurrentWeather(weatherData, cityData) {
        const currentHeader = document.querySelector(".current-weather-desc");
        currentHeader.innerText = weatherData.weather[0].description;

        const currentLocation = document.querySelector(".current-weather-location");
        currentLocation.innerText = cityData[0].name;

        const temp = document.querySelector(".temp");
        console.log(weatherData.main.temp)
        temp.innerText = "Current Temperature: " + Math.round((weatherData.main.temp - 273.15)) + "°C";

        const feelsLike = document.querySelector(".feels-like");
        feelsLike.innerText = "Feels Like: " + Math.round((weatherData.main.feels_like - 273.15)) + "°C";

        const wind = document.querySelector(".wind");
        wind.innerText = "Wind: " + Math.round(weatherData.wind.speed / 1.609) + " kph";

        const humidity = document.querySelector(".humidity");
        humidity.innerText = "Humidity: " + weatherData.main.humidity + "%";
    }

    
}



