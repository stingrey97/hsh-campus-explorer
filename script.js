/**
 * Funktionen und Klassen um dem Bild von der Karte Funktion zu geben und entsprechende Popups mit den richtigen parametern zu öffnen
 */
class Building {
    constructor(name, description, picture) {
        this.name = name;
        this.description = description;
        this.picture = picture;
    }
}

// Die einzelnen Gebäude
let mensa = new Building("Mensa", "Die Mensa von Campus Linden mit dem BESTEN Essen, Preisen und Mitarbeitern", "resource/mensa.png");
let j = new Building("J-Gebäude", "Hier befinden sich Lehrräume, die FSRe und dei Verwaltung der Hochschule", "resource/j.png");
let h = new Building("H-Gebäude", "Hier sind die Informatiker und komischen Wirtschaftler", "resource/h.png");

//Event listener für die einzelnen Gebäude auf der Karte
document.getElementById("mensa").addEventListener("click", function (event) {
    showBuilding(mensa);
});

document.getElementById("j").addEventListener("click", function (event) {
    showBuilding(j);
});

document.getElementById("h").addEventListener("click", function (event) {
    showBuilding(h);
});

function showBuilding(building) {
    window.open("PopUp.html?name=" + encodeURIComponent(building.name) + "&description=" + encodeURIComponent(building.description) + "&picture=" + encodeURIComponent(building.picture));
}

if (window.location.pathname.includes("PopUp.html")) {
    getURIParams();
}

function getURIParams() {
    const uriParams = new URLSearchParams(window.location.search);
    let name = uriParams.get("name");
    let description = uriParams.get("description");
    let picture = uriParams.get("picture");

    if (name && description && picture) {
        document.getElementById("buildingName").textContent = name;
        document.getElementById("buildingDescription").textContent = description;
        document.getElementById("buildingPicture").src = picture;
    } else {
        document.getElementById("buildingName").textContent = "Kein Gebäude ausgewählt";
        document.getElementById("buildingDescription").textContent = "Keine Beschreibung verfügbar.";
    }
}

/**
 * Ajax Teil um entsprechend das Wetter einzubinden
 */

fetchWeather() // Einmal zu Beginn
setInterval(fetchWeather, 60 * 1000 * 15);

async function fetchWeather() {
    let temp;
    let weather;
    let windSpeed;
    let maxTemp;
    let minTemp;
    let current;
    let todayWeather;
    try {
        let response = await fetch('https://wttr.in/Hannover?format=j1');
        let data = await response.json();

        // Aktuelle Daten
        current = data.current_condition[0];
        temp = current.temp_C;
        windSpeed = current.windspeedKmph;
        weather = current.weatherDesc[0].value;

        // Tages Daten
        todayWeather = data.weather[0];
        maxTemp = todayWeather.maxtempC;
        minTemp = todayWeather.mintempC;

        console.log(temp, windSpeed, maxTemp, minTemp, weather);
        updateButton(weather);

        showWeather(temp, windSpeed, maxTemp, minTemp, weather);
    } catch (e) {
        console.error('Fehler bei der GET-Anfrage:', e);
    }
}

function updateButton(weather) {
    const icon = document.getElementById("weatherButton");

    switch (weather) {
        case "Clear":
        case "Sunny":
            icon.src = "icons/weather/sunny.png";
            break;
        case "Moderate Rain":
        case "Heavy Rain":
        case "Light Rain":
            icon.src = "icons/weather/rainy.png";
            break;
        case "Overcast":
        case "Cloudy":
        case "Partly Cloudy":
            icon.src = "icons/weather/cloudy.png";
            break;
        case "Moderate Snow":
        case "Heavy Snow":
        case "Light Snow":
            icon.src = "icons/weather/weather-snowy.png";
            break;
        case "Thunderstorm":
            icon.src = "icons/weather/thunderstorm.png";
            break;
        case "Windy":
            icon.src = "icons/weather/wind.png";
            break;
        default:
            icon.src = "icons/weather/cloudy.png";
    }
}

function showWeather(temp, windSpeed, maxTemp, minTemp, weather) {
    document.getElementById("temp").textContent = "Aktuelle Temperatur: " + temp;
    document.getElementById("windSpeed").textContent = "Windgeschwindigkeit: " + windSpeed;
    document.getElementById("maxTemp").textContent = "Höchsttemperatur: " + maxTemp;
    document.getElementById("minTemp").textContent = "Minimale Temperatur: " + minTemp;
    document.getElementById("weather").textContent = "Wetter: " + weather;
}