window.addEventListener("load", () => {
    let q;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            q = position.name;
            const api = `api.openweathermap.org / data / 2.5 / weather ? q = ${q} &appid={ e4f1ef6e9324111786ef50ad293f7cee } `;

            fetch(api, { mode: 'cors' })
                .then(function (response) {
                    console.log(response.json());
                })
        })
    }
})