// Weather API Module
import { getApiKey } from './storage.js';

/**
 * Fetches current weather for a given city from OpenWeatherMap or falls back to realistic mock data.
 * @param {string} city - The name of the city.
 * @returns {Promise<object>} Weather data containing temperature and conditions.
 */
export async function fetchWeather(city) {
    const formattedCity = city.trim();
    const apiKey = getApiKey();
    
    // Check if we have an API key configured
    if (apiKey) {
        try {
            const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(formattedCity)}&appid=${apiKey}&units=metric&lang=pl`;
            const response = await fetch(apiURL);
            
            if (!response.ok) {
                throw new Error(`Błąd API: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // Map API response to our app format
            const temp = Math.round(data.main.temp);
            const mainCondition = data.weather[0].main.toLowerCase();
            const desc = data.weather[0].description;
            const windSpeed = data.wind.speed; // m/s
            
            return {
                success: true,
                source: "OpenWeatherMap API",
                city: data.name,
                temperature: temp,
                description: desc,
                conditions: {
                    rain: mainCondition.includes("rain") || mainCondition.includes("drizzle"),
                    snow: mainCondition.includes("snow"),
                    wind: windSpeed > 8, // > 8 m/s (~29 km/h) is strong wind
                    sun: mainCondition.includes("clear") || (mainCondition.includes("clouds") && data.clouds.all < 30)
                }
            };
        } catch (error) {
            console.warn("OpenWeather API failed, falling back to mock data. Error:", error.message);
            return getMockWeather(formattedCity);
        }
    } else {
        // No API key configured - simulate network request and return mock weather
        const isDemo = new URLSearchParams(window.location.search).has('demo');
        await new Promise(resolve => setTimeout(resolve, isDemo ? 0 : 800)); // Simulate loading delay
        return getMockWeather(formattedCity);
    }
}

function getMockWeather(city) {
    // Helper to normalize Polish diacritics to plain English characters
    const normalizeString = (str) => {
        return str.toLowerCase().trim()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/ł/g, "l")
            .replace(/ó/g, "o")
            .replace(/ę/g, "e")
            .replace(/ą/g, "a")
            .replace(/ś/g, "s")
            .replace(/ł/g, "l")
            .replace(/ż/g, "z")
            .replace(/ź/g, "z")
            .replace(/ć/g, "c")
            .replace(/ń/g, "n");
    };
    
    const cleaned = normalizeString(city);
    
    // Pre-defined weather with normalized keys for robust matching (e.g. gdansk, krakow)
    const cityDatabase = [
        { pattern: "warszaw", name: "Warszawa", temp: 18, desc: "częściowe zachmurzenie", rain: false, snow: false, wind: false, sun: true },
        { pattern: "bydgoszcz", name: "Bydgoszcz", temp: 7, desc: "lekki deszcz ze słońcem", rain: true, snow: false, wind: true, sun: false },
        { pattern: "gdansk", name: "Gdańsk", temp: 12, desc: "silny wiatr od morza i mżawka", rain: true, snow: false, wind: true, sun: false },
        { pattern: "krakow", name: "Kraków", temp: 22, desc: "bezchmurnie i słonecznie", rain: false, snow: false, wind: false, sun: true },
        { pattern: "wroclaw", name: "Wrocław", temp: 25, desc: "upał i słońce", rain: false, snow: false, wind: false, sun: true },
        { pattern: "zakopan", name: "Zakopane", temp: -2, desc: "intensywne opady śniegu", rain: false, snow: true, wind: false, sun: false }
    ];
    
    // Check if input matches or contains any of the pattern keys
    const match = cityDatabase.find(item => cleaned.includes(item.pattern));
    
    if (match) {
        return {
            success: true,
            source: "AuraStyle Database (Mock)",
            city: match.name,
            temperature: match.temp,
            description: match.desc,
            conditions: {
                rain: match.rain,
                snow: match.snow,
                wind: match.wind,
                sun: match.sun
            }
        };
    }
    
    // Fallback: Generate semi-random deterministic weather based on city name string length/char codes
    const hash = cleaned.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const temp = -5 + (hash % 36); // Temp from -5 to 30°C
    
    const isRain = hash % 3 === 0 && temp > 2;
    const isSnow = hash % 5 === 0 && temp <= 2;
    const isWind = hash % 4 === 0;
    const isSun = hash % 2 === 0 && !isRain && !isSnow;
    
    let description = "umiarkowane zachmurzenie";
    if (isRain) description = "przelotne opady deszczu";
    else if (isSnow) description = "lekki śnieg";
    else if (isSun) description = temp > 24 ? "upał i pełne słońce" : "słonecznie i czyste niebo";
    else if (isWind) description = "wietrznie i chłodno";
    
    return {
        success: true,
        source: "AuraStyle Engine (Generated)",
        city: city.charAt(0).toUpperCase() + city.slice(1),
        temperature: temp,
        description: description,
        conditions: {
            rain: isRain,
            snow: isSnow,
            wind: isWind,
            sun: isSun
        }
    };
}

