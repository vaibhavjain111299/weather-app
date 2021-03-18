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
                const { id, main } = data.weather[0];
                loc.textContent = name;
                tempValue.textContent = (temp - 273.15).toFixed(0);
                climate.textContent = main;

                if (id >= 200 && id < 300) {
                    tempIcon.src = "./public/images/thunderstorm-clouds.svg";
                }

                else if (id >= 300 && id < 400) {
                    tempIcon.src = "./public/images/drizzle.svg";
                }

                else if (id >= 500 && id < 600) {
                    tempIcon.src = "./public/images/rainy.png";
                }

                else if (id >= 600 && id < 700) {
                    tempIcon.src = "./public/images/snowflake.svg";
                }

                else if (id == 701) {
                    tempIcon.src = "./public/images/mist.png";
                }

                else if (id === 711) {
                    tempIcon.src = "./public/images/factory.png";
                }

                else if (id === 731) {
                    tempIcon.src = "./public/images/dust.png";
                }

                else if (id === 741) {
                    tempIcon.src = "./public/images/fog.svg";
                }

                else if (id === 751) {
                    tempIcon.src = "./public/images/sand.png";
                }

                else if (id >= 700 && id < 800) {
                    tempIcon.src = './public/images/haze.png';
                }

                else if (id > 800 && id < 900) {
                    tempIcon.src = "http://openweathermap.org/img/wn/10d@2x.png";
                }
                else {
                    tempIcon.src = "./public/images/sun.png";
                }




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
                            const { id, main } = data.weather[0];
                            loc.textContent = name;
                            tempValue.textContent = (temp - 273.15).toFixed(0);
                            climate.textContent = main;

                            if (id >= 200 && id < 300) {
                                tempIcon.src = "./public/images/thunderstorm-clouds.svg";
                            }

                            else if (id >= 300 && id < 400) {
                                tempIcon.src = "./public/images/drizzle.svg";
                            }

                            else if (id >= 500 && id < 600) {
                                tempIcon.src = "./public/images/rainy.png";
                            }

                            else if (id >= 600 && id < 700) {
                                tempIcon.src = "./public/images/snowflake.svg";
                            }
                            
                            else if (id == 701) {
                                tempIcon.src = "./public/images/mist.png";
                            }

                            else if (id === 711) {
                                tempIcon.src = "./public/images/factory.png";
                            }

                            else if (id === 731) {
                                tempIcon.src = "./public/images/dust.png";
                            }

                            else if (id === 741) {
                                tempIcon.src = "./public/images/fog.svg";
                            }

                            else if (id === 751) {
                                tempIcon.src = "./public/images/sand.png";
                            }

                            else if (id >= 700 && id < 800) {
                                tempIcon.src = ' http://openweathermap.org/img/wn/50d@2x.png';
                            }

                            else if (id > 800 && id < 900) {
                                tempIcon.src = "http://openweathermap.org/img/wn/03d@2x.png";
                            }
                            else {
                                tempIcon.src = "./public/images/sun.png";
                            }
                        })
                    })
            })
        }
    }

}
