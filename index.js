let loc = document.getElementById("location");
let tempValue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let tempIcon = document.getElementById("temp-icon");
let form = document.getElementById("form");
let searchBtn = document.querySelector(".search-btn");


//fetching weather data for input location.
form.addEventListener('submit', start);
searchBtn.addEventListener("click", start);

function start(e) {
    e.preventDefault();
    console.log('here');
    getLocation();
}

function getLocation() {
    console.log("inside location");
    const input = document.querySelector('input[type="text"]');
    const userLocation = input.value;
    fetchWeather(userLocation);
}

function fetchWeather(location) {
    let lon;
    let lat;

    const api = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=e4f1ef6e9324111786ef50ad293f7cee`;

    fetch(api, { method: "get" })
        .then(function (response) {
            response.json().then(data => {
                console.log(data);
                const { name } = data;
                const { temp } = data.main;
                const { id, main } = data.weather[0];
                loc.textContent = name;
                tempValue.textContent = (temp - 273.15).toFixed(1);
                climate.textContent = main;

                if (id >= 200 && id < 300) {
                    tempIcon.src = "./images/thunderstorm-clouds.svg";
                }

                else if (id >= 300 && id < 400) {
                    tempIcon.src = "./images/drizzle.svg";
                }

                else if (id >= 500 && id < 600) {
                    tempIcon.src = "./images/rainy.png";
                }

                else if (id >= 600 && id < 700) {
                    tempIcon.src = "./images/snowflake.svg";
                }

                else if (id == 701) {
                    tempIcon.src = "./images/mist.png";
                }

                else if (id === 711) {
                    tempIcon.src = "./images/factory.png";
                }

                else if (id === 731) {
                    tempIcon.src = "./images/dust.png";
                }

                else if (id === 741) {
                    tempIcon.src = "./images/fog.svg";
                }

                else if (id === 751) {
                    temp.src = "./images/sand.png";
                }

                else if (id >= 700 && id < 800) {
                    tempIcon.src = './images/haze.png';
                }

                else if (id > 800 && id < 900) {
                    tempIcon.src = "./images/clouds.svg";
                }
                else {
                    tempIcon.src = "./images/sun.png";
                }




            }

            )
        })
}

//fetching weather data for current location.
window.addEventListener("DOMContentLoaded", () => {
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
                        const { id, main } = data.weather[0];
                        loc.textContent = name;
                        tempValue.textContent = (temp - 273.15).toFixed(1);
                        climate.textContent = main;

                        if (id >= 200 && id < 300) {
                            tempIcon.src = "./images/thunderstorm-clouds.svg";
                        }

                        else if (id >= 300 && id < 400) {
                            tempIcon.src = "./images/drizzle.svg";
                        }

                        else if (id >= 500 && id < 600) {
                            tempIcon.src = "./images/rainy.png";
                        }

                        else if (id >= 600 && id < 700) {
                            tempIcon.src = "./images/snowflake.svg";
                        }
                        else if (id == 701) {
                            tempIcon.src = "./images/mist.png";
                        }

                        else if (id === 711) {
                            tempIcon.src = "./images/factory.png";
                        }

                        else if (id === 731) {
                            tempIcon.src = "./images/dust.png";
                        }

                        else if (id === 741) {
                            tempIcon.src = "./images/fog.svg";
                        }

                        else if (id === 751) {
                            tempIcon.src = "./images/sand.png";
                        }

                        else if (id >= 700 && id < 800) {
                            tempIcon.src = './images/haze.png';
                        }

                        else if (id > 800 && id < 900) {
                            tempIcon.src = "./images/clouds.svg";
                        }
                        else {
                            tempIcon.src = "./images/sun.png";
                        }
                    })
                })
        })
    }
})
