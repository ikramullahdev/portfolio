const apiKey = "b71130961e324f45983134519262507";

const searchBtn = document.querySelector("button");
const cityInput = document.querySelector("input");

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        getWeather();
    }
});

async function getWeather(){

    const city = cityInput.value.trim();

    if(city === ""){
        alert("Please enter a city.");
        return;
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try{

       const response = await fetch(url);
const data = await response.json();
        alert(JSON.stringify(data));

console.log("URL:", url);
console.log("DATA:", data);

if (data.error) {
    alert(data.error.message);
    return;
}document.querySelector(".weather h2").innerText = data.location.name;
document.querySelector(".weather h1").innerText = data.current.temp_c + "°C";
document.querySelector(".weather p").innerText = data.current.condition.text;

alert("Updated Successfully");
        document.querySelector(".details div:first-child p").textContent =
        data.current.humidity + "%";

        document.querySelector(".details div:last-child p").textContent =
        data.current.wind_kph + " km/h";

    }catch(err){

        console.log(err);
        alert("Something went wrong.");

    }

}
