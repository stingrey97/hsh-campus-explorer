/**
 * Building contains all information needed to display the required pop-up.
 * It also initializes the EventHandler for clicking buildings
 */
class Building {

    /**
     * Konstruktor zum Initialisieren eines neuen Buildings.
     * @param {string} id - Die ID des HTML-Elements, das das Gebäude repräsentiert.
     * @param {string} name - Der Name des Gebäudes.
     * @param {string} description - Eine Beschreibung des Gebäudes.
     * @param {string} picture - Der Pfad zum Bild des Gebäudes.
     */
    constructor(id, name, description, picture) {
        this.name = name;
        this.description = description;
        this.picture = picture;
        const element = document.getElementById(id);
        if (element) element.addEventListener("click", (event) => {
            this.show(event)
            event.stopPropagation();
        });
    }

    /**
     * Zeigt das Pop-up mit den Informationen des Gebäudes an.
     * Positioniert das Pop-up relativ zur Cursorposition, damit es im Viewport bleibt.
     * @param {MouseEvent} event - Das Klick-Event, welches die Position des Cursors liefert.
     */
    show(event) {
        const popup    = document.getElementById("popup");
        const scrollX  = window.scrollX;
        const scrollY  = window.scrollY;
        const vw       = window.innerWidth;
        const vh       = window.innerHeight;
        const isMobile = window.matchMedia("(max-width: 960px)").matches;

        // CSS‑Abstände einlesen
        const rootStyle       = getComputedStyle(document.documentElement);
        const topVhMobile     = parseFloat(rootStyle.getPropertyValue("--spacing-top-mobile"));
        const bottomVhMobile  = parseFloat(rootStyle.getPropertyValue("--spacing-bottom-mobile"));
        const topVhDesktop    = parseFloat(rootStyle.getPropertyValue("--spacing-top-desktop"));
        const bottomVhDesktop = parseFloat(rootStyle.getPropertyValue("--spacing-bottom-desktop"));
        const spacingTop      = vh * (isMobile ? topVhMobile    : topVhDesktop)    / 100;
        const spacingBot      = vh * (isMobile ? bottomVhMobile : bottomVhDesktop) / 100;

        // Inhalte setzen
        document.getElementById("nameDesGebäudes").textContent        = this.name;
        document.getElementById("beschreibungDesGebäudes").textContent = this.description;
        document.getElementById("pictureDesGebäudes").src              = this.picture;

        // Zum Messen kurz unsichtbar anzeigen
        popup.style.visibility = "hidden";
        popup.style.display    = "block";
        const popupW = popup.offsetWidth;
        const popupH = popup.offsetHeight;

        // ─── Horizontal nur Desktop ─────────────────────────────────────────
        if (!isMobile) {
            let left = event.pageX;
            const viewportMaxX = scrollX + vw;
            // Rechts-Overflow?
            if (left + popupW > viewportMaxX) {
                left = event.pageX - popupW - 10;
            }
            // Clamp in Dokument-Koordinaten
            left = Math.min(
                Math.max(left, scrollX + 10),
                viewportMaxX - popupW - 10
            );
            popup.style.left = left + "px";
        }
        // Mobil: kein JS-Left, CSS übernimmt

        // ─── Vertikal (Desktop + Mobile) ───────────────────────────────────────
        let top;
        if (!isMobile) {
            // Desktop: mit Header/Footer‑Clamp
            const viewportMaxY = scrollY + vh;
            top = event.pageY + 10;
            if (top + popupH > viewportMaxY - spacingBot) {
                top = event.pageY - popupH - 10;
            }
            const minY = scrollY + spacingTop;
            const maxY = viewportMaxY - spacingBot - popupH;
            top = Math.min(Math.max(top, minY), maxY);
        } else {
            // Mobile: immer nach unten öffnen (Overflow erlaubt)
            top = event.pageY + 10;
        }
        popup.style.top = top + "px";

        // Sichtbar machen
        popup.style.visibility = "visible";
        popup.style.display    = "block";
    }
}

function hide() {
    const popup    = document.getElementById("popup");
    if (popup) {
        popup.style.visibility = "hidden";
        popup.style.display = "none";
    }
}

document.addEventListener("click", (event) => {
    const popup = document.getElementById("popup");
    // Prüfe, ob der Klick NICHT im Popup und NICHT auf dem Button stattgefunden hat
    if (popup && popup.style.display === "block" &&
        !popup.contains(event.target) &&
        event.target.id !== "popupButton") {
        popup.style.display = "none";
    }
});

// TODO: Fix this later
new Building("1A", "A-Gebäude", "Fakultät I – Elektro- und Informationstechnik", "resources/buildings/building-a.jpg");
new Building("1B", "B-Gebäude", "Fakultät I – Elektro- und Informationstechnik", "resources/buildings/building-b.jpg");
new Building("1C", "C-Gebäude", "Fakultät I – Elektro- und Informationstechnik", "resources/buildings/building-c.jpg");
new Building("1D", "D-Gebäude", "Fakultät II – Maschinenbau und Bioverfahrenstechnik", "resources/buildings/building-d.jpg");
new Building("1E", "E-Gebäude", "Fakultät II – Maschinenbau und Bioverfahrenstechnik", "resources/buildings/building-e.jpg");
new Building("1F", "F-Gebäude", "Fakultät II – Maschinenbau und Bioverfahrenstechnik", "resources/buildings/building-f.jpg");
new Building("1G", "G-Gebäude", "Fakultät II – Maschinenbau und Bioverfahrenstechnik", "resources/buildings/building-g.jpg");
new Building("1H", "H-Gebäude", "Fakultät IV – Wirtschaft und Informatik", "resources/buildings/building-h.jpg");
new Building("1I", "I-Gebäude", "Mensa – Campus Linden", "resources/buildings/building-i.jpg");
new Building("1J", "J-Gebäude", "Studierendenzentrum", "resources/buildings/building-j.jpg");
new Building("1K", "K-Gebäude", "Die Zentral-Bibliothek der Hochschule Hannover", "resources/buildings/building-k.jpg");


/**
 * AJAX Weather API (wttr.in)
 */
void fetchWeather(); // Update weather icon on loading the page
setInterval(fetchWeather, 60 * 1000 * 15);

/**
 * Holt die aktuellen Wetterdaten von der API wttr.in und aktualisiert die Benutzeroberfläche.
 */
async function fetchWeather() {
    let temp;
    let weather;
    let windSpeed;
    let maxTemp;
    let minTemp;
    let current;
    let todayWeather;
    let deutschWetter;
    try {
        let response = await fetch('https://wttr.in/Hannover?format=j1');
        let data = await response.json();


        current = data.current_condition[0];
        temp = current.temp_C;
        windSpeed = current.windspeedKmph;
        weather = current.weatherDesc[0].value;
        console.log("Weather description from API: " + weather)
        // deutschWetter = current.lang_de[0].value; alternativ wenn der Webserver nicht funktioniert

        todayWeather = data.weather[0];
        maxTemp = todayWeather.maxtempC;
        minTemp = todayWeather.mintempC;

        updateWeatherIcon(weather, temp);
        if (window.location.pathname.includes("weather")) {
            showWeather(temp, windSpeed, maxTemp, minTemp, weather, deutschWetter);
        }
    } catch (e) {
        console.error('Error calling "wttr.in" API:', e);
    }
}

/**
 * Aktualisiert den Wetter-Button mit der entsprechenden Temperatur und dem passenden Wetter-Icon.
 * @param {string} weather - Die Wetterbeschreibung (z.B. "Clear", "Rain").
 * @param {string} temp - Die aktuelle Temperatur.
 */
function updateWeatherIcon(weather, temp) {
    const icon = document.querySelector("#weatherButton img");
    const text = document.querySelector("#weatherButton span");
    text.textContent = temp + "°C";
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
            icon.src = "resources/icons/weather/partly-cloudy.svg";
    }
}

/**
 * Zeigt detaillierte Wetterinformationen auf der Wetterseite an.
 * Übersetzt die Wetterbeschreibung ins Deutsche und aktualisiert die entsprechenden Elemente.
 * @param {string} temp - Die aktuelle Temperatur.
 * @param {string} windSpeed - Die aktuelle Windgeschwindigkeit.
 * @param {string} maxTemp - Die Höchsttemperatur des Tages.
 * @param {string} minTemp - Die minimale Temperatur des Tages.
 * @param {string} weather - Die Wetterbeschreibung in Englisch.
 * @param {string} deutschWetter - (Optional) Direkte deutsche Wetterbeschreibung, falls verfügbar.
 */
async function showWeather(temp, windSpeed, maxTemp, minTemp, weather, deutschWetter) {
    // Übersetze die Wetterbeschreibung ins Deutsche
    weather = await translate(weather);
    document.getElementById("temp").innerHTML = temp;
    document.getElementById("windSpeed").innerHTML = windSpeed;
    document.getElementById("maxTemp").innerHTML = maxTemp;
    document.getElementById("minTemp").innerHTML = minTemp;
    document.getElementById("weather").innerHTML = weather;
}

/**
 * Übersetzt den übergebenen englischen Wettertext ins Deutsche.
 * Sendet einen POST-Request an einen externen Übersetzungsservice.
 * @param {string} weather - Die englische Wetterbeschreibung, die übersetzt werden soll.
 * @returns {Promise<string>} - Die übersetzte Wetterbeschreibung oder eine Fehlermeldung.
 */
async function translate(weather) {
    console.log("Before translation: " + weather);
    let antwort = "Übersetzung gescheitert";
    try {
        // Sende einen POST-Request an den Übersetzungsservice
        let response = await fetch("https://terzenbach.com/translate", {
            method: "POST",
            body: JSON.stringify({
                q:  weather.toLowerCase(),
                source: "en",
                target: "de",
                api_key:"meingeheimerkey123" /* Bad practise but for this purpose once okay :) */
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        let data = await response.json();
        antwort = data.translatedText;
        console.log("After translation" + data.translatedText);
    } catch (e) {
        console.error('Error calling "translate.com" API:', e);
    }
    return antwort;
}

/* Mail für Impressum */
const user = "datenschutz";
const domain = "terzenbach.com";
const email = `${user}@${domain}`;

const span = document.getElementById("email");
if (span) span.innerHTML = `<a href="mailto:${email}">${email}</a>`;