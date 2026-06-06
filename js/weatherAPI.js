// Weather API Module

export async function fetchWeather(city) {
    const formattedCity = city.trim();
    
    // In demo mode, return mock weather instantly for speed and reliability
    const isDemo = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('demo');
    if (isDemo) {
        return getMockWeather(formattedCity);
    }
    
    // 1. Dynamically fetch from Open-Meteo (FREE, NO KEY REQUIRED!)
    try {
        // Step A: Geocoding (resolves City Name to Coordinates)
        const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(formattedCity)}&count=1&language=pl&format=json`;
        const geoResponse = await fetch(geoURL);
        
        if (!geoResponse.ok) {
            throw new Error("Geocoding failed");
        }
        
        const geoData = await geoResponse.json();
        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("Nie znaleziono miasta");
        }
        
        const location = geoData.results[0];
        const lat = location.latitude;
        const lon = location.longitude;
        const resolvedName = location.name;
        
        // Step B: Get Current Weather
        const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m&wind_speed_unit=ms`;
        const weatherResponse = await fetch(weatherURL);
        
        if (!weatherResponse.ok) {
            throw new Error("Weather fetch failed");
        }
        
        const weatherData = await weatherResponse.json();
        const current = weatherData.current;
        
        const temp = Math.round(current.temperature_2m);
        const code = current.weather_code;
        const windSpeed = current.wind_speed_10m;
        const desc = getWeatherDescription(code);
        
        return {
            success: true,
            source: "Open-Meteo API",
            city: resolvedName,
            temperature: temp,
            description: desc,
            conditions: {
                rain: (code >= 51 && code <= 67) || (code >= 80 && code <= 82) || (code >= 95),
                snow: (code >= 71 && code <= 77) || (code >= 85 && code <= 86),
                wind: windSpeed > 8,
                sun: code === 0 || code === 1
            }
        };
    } catch (error) {
        console.warn("Open-Meteo API failed, falling back to mock database. Error:", error.message);
        // Simulate minor loading delay for consistency in fallback
        const isDemo = new URLSearchParams(window.location.search).has('demo');
        await new Promise(resolve => setTimeout(resolve, isDemo ? 0 : 500));
        return getMockWeather(formattedCity);
    }
}

/**
 * Maps WMO code to weather description.
 */
function getWeatherDescription(code) {
    if (code === 0) return "czyste niebo, słonecznie";
    if (code === 1 || code === 2) return "częściowe zachmurzenie";
    if (code === 3) return "pochmurno";
    if (code === 45 || code === 48) return "mgła";
    if (code === 51 || code === 53 || code === 55) return "mżawka";
    if (code === 61 || code === 63 || code === 65) return "opady deszczu";
    if (code === 71 || code === 73 || code === 75) return "opady śniegu";
    if (code === 80 || code === 81 || code === 82) return "przelotne opady deszczu";
    if (code === 85 || code === 86) return "przelotne opady śniegu";
    if (code === 95 || code === 96 || code === 99) return "burza";
    return "zmienne warunki";
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

