let loc = document.getElementById("location");
let tempValue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let tempIcon = document.getElementById("temp-icon");
let form = document.getElementById("form");
let searchBtn = document.querySelector(".search-btn");

form.addEventListener('submit', getLocation);
searchBtn.addEventListener("click", getLocation);
window.addEventListener("DOMContentLoaded", getWeather);

function getLocation(e) {
    e.preventDefault();
    const input = document.querySelector('input[type="text"]');
    const userLocation = input.value;
    insertParam("q", userLocation);
    form.reset();
    //fetchWeather(userLocation);
    //saveLocationLocally(userLocation);
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

function insertParam(key, value) {
    key = encodeURIComponent(key);
    value = encodeURIComponent(value);

    // kvp looks like ['key1=value1', 'key2=value2', ...]
    var kvp = document.location.search.substr(1).split('&');
    let i = 0;

    for (; i < kvp.length; i++) {
        if (kvp[i].startsWith(key + '=')) {
            let pair = kvp[i].split('=');
            pair[1] = value;
            kvp[i] = pair.join('=');
            break;
        }
    }

    if (i >= kvp.length) {
        kvp[kvp.length] = [key, value].join('=');
    }

    // can return this or...
    let params = kvp.join('?');

    // reload page with new params
    document.location.search = params;
}

/*function saveLocationLocally(location) {
    let cityName;
    if (sessionStorage.getItem("cityName") === null) {
        cityName = {};
    } else {
        cityName = JSON.parse(sessionStorage.getItem("cityName"));
    }

    cityName.name = location;
    console.log(cityName);

    sessionStorage.setItem("cityName", JSON.stringify(cityName));
}*/


function getWeather() {
    /*let cityName;

    console.log("inside getweather");
    if (sessionStorage.getItem("cityName") === null) {
        cityName = {};
    } else {
        cityName = JSON.parse(sessionStorage.getItem("cityName"));
    }

    console.log(cityName.name);*/
    
    let url_string = window.location.href;
    let url = new URL(url_string);
    
    //fetchWeather(cityName.name);
    
    //if (cityName.name === undefined) {
     if (url.search == "") {
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
    else {
        let currentLocation = url.searchParams.get("q");
        fetchWeather(currentLocation);
    }

}
