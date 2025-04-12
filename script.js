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

//Event listener für die einzelnen Gebäude auf der Karte
document.getElementById("mensa").addEventListener("click", function (event) {
    showBuilding(mensa);
});

document.getElementById("j").addEventListener("click", function (event) {
    showBuilding(j);
})

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

        showWeather(temp, windSpeed, maxTemp, minTemp, weather);
    } catch (e) {
        console.error('Fehler bei der GET-Anfrage:', e);
    }
}

function showWeather(temp, windSpeed, maxTemp, minTemp, weather) {
    document.getElementById("temp").textContent = temp;
    document.getElementById("windSpeed").textContent = windSpeed;
    document.getElementById("maxTemp").textContent = maxTemp;
    document.getElementById("minTemp").textContent = minTemp;
    document.getElementById("weather").textContent = weather;
}