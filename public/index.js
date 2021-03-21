let loc = document.getElementById("location");
let tempValue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let tempIcon = document.getElementById("temp-icon");
let form = document.getElementById("form");
let searchBtn = document.querySelector(".search-btn");

form.addEventListener('submit', getLocation);
searchBtn.addEventListener("click", getLocation);

function getLocation(e) {
    e.preventDefault();
    const input = document.querySelector('input[type="text"]');
    const userLocation = input.value;
    form.reset();
    fetchWeather(userLocation);
    saveLocationLocally(userLocation);
}

function fetchWeather(location) {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=e4f1ef6e9324111786ef50ad293f7cee`;

    fetch(api, { method: "get" })
        .then(function (response) {
            response.json().then(data => {
                console.log(data);
                const { name } = data;
                const { temp } = data.main;
                const { main, icon } = data.weather[0];
                const { country } = data.sys;
                loc.textContent = `${name}, ${country}`;
                tempValue.textContent = (temp - 273.15).toFixed(0);
                climate.textContent = main;
                tempIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;


            }

            )
        })
}

window.addEventListener("DOMContentLoaded", getWeather);

function saveLocationLocally(location) {
    let cityName;
    if (sessionStorage.getItem("cityName") === null) {
        cityName = {};
    } else {
        cityName = JSON.parse(sessionStorage.getItem("cityName"));
    }

    cityName.name = location;
    console.log(cityName);

    sessionStorage.setItem("cityName", JSON.stringify(cityName));
}


function getWeather() {
    let cityName;

    console.log("inside getweather");
    if (sessionStorage.getItem("cityName") === null) {
        cityName = {};
    } else {
        cityName = JSON.parse(sessionStorage.getItem("cityName"));
    }

    console.log(cityName.name);
    fetchWeather(cityName.name);
    
    if (cityName.name === undefined) {

        let lon;
        let lat;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                lon = position.coords.longitude;
                lat = position.coords.latitude;

                const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e4f1ef6e9324111786ef50ad293f7cee`;

                fetch(api, { method: "get" })
                    .then(function (response) {
                        response.json().then(data => {
                            console.log(data);
                            const { name } = data;
                            const { temp } = data.main;
                            const { main, icon } = data.weather[0];
                            const { country } = data.sys;
                            loc.textContent = `${name}, ${country}`;
                            tempValue.textContent = (temp - 273).toFixed(0);
                            climate.textContent = main;
                            tempIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                        })
                    })
            })
        }
    }

}
