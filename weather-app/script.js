const apiKey = "0e0c49d82292506567079442c105777b";

const searchBtn = document.querySelector("button");
const cityInput = document.querySelector("input");

searchBtn.addEventListener("click", getWeather);
cityInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        getWeather();
    }
});

async function getWeather() {

    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            alert("City not found!");
            return;
        }

        const data = await response.json();

        document.querySelector(".weather h2").textContent = data.name;
        document.querySelector(".weather h1").textContent = Math.round(data.main.temp) + "°C";
        document.querySelector(".weather p").textContent = data.weather[0].description;
        document.querySelector(".details div:first-child p").textContent = data.main.humidity + "%";
        document.querySelector(".details div:last-child p").textContent = data.wind.speed + " km/h";

    } catch (error) {
        alert("Something went wrong!");
        console.log(error);
    }

}
