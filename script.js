/**
 * Building contains all information needed to display the required pop-up.
 * It also initializes the EventHandler for clicking buildings
 */
class Building {

    constructor(id, name, description, picture) {
        this.name = name;
        this.description = description;
        this.picture = picture;
        const element = document.getElementById(id);
        if (element) element.addEventListener("click", () => this.show());
        else console.warn(`Element with ID "${id}" not found!`);
    }

    show() {
        const params = new URLSearchParams({
            name: this.name, description: this.description, picture: this.picture
        });
        window.open(`building-description?${params}`)
    }
}

new Building("1A", "A-Gebäude", "Fakultät I – Elektro- und Informationstechnik", "resource/buildings/building-a.png");
new Building("1B", "B-Gebäude", "Fakultät I – Elektro- und Informationstechnik", "resource/buildings/building-b.png");
new Building("1C", "C-Gebäude", "Fakultät I – Elektro- und Informationstechnik", "resource/buildings/building-c.png");
new Building("1D", "D-Gebäude", "Fakultät II – Maschinenbau und Bioverfahrenstechnik", "resource/buildings/building-d.png");
new Building("1E", "E-Gebäude", "Fakultät II – Maschinenbau und Bioverfahrenstechnik", "resource/buildings/building-e.png");
new Building("1F", "F-Gebäude", "Fakultät II – Maschinenbau und Bioverfahrenstechnik", "resource/buildings/building-f.png");
new Building("1G", "G-Gebäude", "Fakultät II – Maschinenbau und Bioverfahrenstechnik", "resource/buildings/building-g.png");
new Building("1H", "H-Gebäude", "Fakultät IV – Wirtschaft und Informatik", "resource/building-h.png");
new Building("1I", "I-Gebäude", "Mensa – Campus Linden", "resource/building-i.png");
new Building("1J", "J-Gebäude", "Verwaltung und Lehrräume", "resource/building-j.png");
new Building("1K", "K-Gebäude", "Studierendenzentrum", "resource/building-k.png");

/**
 * Display pop up only on buildings-description.html
 */
if (window.location.pathname.includes("buildings-description.html")) {
    const uriParams = new URLSearchParams(window.location.search);
    let name = uriParams.get("name");
    let description = uriParams.get("description");
    let picture = uriParams.get("picture");

    if (name && description) {
        document.getElementById("buildingName").textContent = name;
        document.getElementById("buildingDescription").textContent = description;
        document.getElementById("buildingPicture").src = picture;
    } else {
        document.getElementById("buildingName").textContent = "Kein Gebäude ausgewählt";
        document.getElementById("buildingDescription").textContent = "Keine Beschreibung verfügbar.";
    }
}

/**
 * ajax Weather API call (wttr.in)
 */
void fetchWeather(); // Update weather icon on loading the page
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


        current = data.current_condition[0];
        temp = current.temp_C;
        windSpeed = current.windspeedKmph;
        weather = current.weatherDesc[0].value;

        todayWeather = data.weather[0];
        maxTemp = todayWeather.maxtempC;
        minTemp = todayWeather.mintempC;

        updateButton(weather);
        showWeather(temp, windSpeed, maxTemp, minTemp, weather);
    } catch (e) {
        console.error('Error calling "wttr.in" API:', e);
    }
}

function updateButton(weather) {
    const icon = document.getElementById(`weatherButton`);

    switch (weather) {
        case "Clear":
        case "Sunny":
            icon.src = "resources/icons/weather/sunny.svg";
            break;
        case "Moderate Rain":
        case "Heavy Rain":
        case "Rain shower":
        case "Light Rain":
            icon.src = "resources/icons/weather/rainy.svg";
            break;
        case "Overcast":
        case "Cloudy":
        case "Partly Cloudy":
            icon.src = "resources/icons/weather/cloudy.svg";
            break;
        case "Moderate Snow":
        case "Heavy Snow":
        case "Light Snow":
            icon.src = "resources/icons/weather/weather-snowy.svg";
            break;
        case "Thunderstorm":
            icon.src = "resources/icons/weather/thunderstorm.svg";
            break;
        case "Windy":
            icon.src = "resources/icons/weather/wind.svg";
            break;
        default:
            icon.src = "resources/icons/weather/cloudy.svg";
    }
}

function showWeather(temp, windSpeed, maxTemp, minTemp, weather) {
    document.getElementById("temp").textContent = "Aktuelle Temperatur: " + temp;
    document.getElementById("windSpeed").textContent = "Windgeschwindigkeit: " + windSpeed;
    document.getElementById("maxTemp").textContent = "Höchsttemperatur: " + maxTemp;
    document.getElementById("minTemp").textContent = "Minimale Temperatur: " + minTemp;
    document.getElementById("weather").textContent = "Wetter: " + weather;
}