// Weather API Module

// Optional: You can place your OpenWeather API key here.
// If empty, the app will use realistic mock weather data for testing.
const API_KEY = ""; 

/**
 * Fetches current weather for a given city from OpenWeatherMap or falls back to realistic mock data.
 * @param {string} city - The name of the city.
 * @returns {Promise<object>} Weather data containing temperature and conditions.
 */
export async function fetchWeather(city) {
    const formattedCity = city.trim();
    
    // Check if we have an API key configured
    if (API_KEY && API_KEY !== "YOUR_API_KEY_HERE") {
        try {
            const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(formattedCity)}&appid=${API_KEY}&units=metric&lang=pl`;
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

/**
 * Generates realistic weather mock data based on city name.
 * @param {string} city 
 * @returns {object} Mock weather
 */
function getMockWeather(city) {
    const cleaned = city.toLowerCase().trim();
    
    // Pre-defined weather for popular Polish cities for consistent testing
    const cityDatabase = {
        warszawa: { temp: 18, desc: "częściowe zachmurzenie", rain: false, snow: false, wind: false, sun: true },
        bydgoszcz: { temp: 7, desc: "lekki deszcz ze słońcem", rain: true, snow: false, wind: true, sun: false },
        gdańsk: { temp: 12, desc: "silny wiatr od morza i mżawka", rain: true, snow: false, wind: true, sun: false },
        kraków: { temp: 22, desc: "bezchmurnie i słonecznie", rain: false, snow: false, wind: false, sun: true },
        wrocław: { temp: 25, desc: "upał i słońce", rain: false, snow: false, wind: false, sun: true },
        zakopane: { temp: -2, desc: "intensywne opady śniegu", rain: false, snow: true, wind: false, sun: false }
    };
    
    if (cityDatabase[cleaned]) {
        const info = cityDatabase[cleaned];
        return {
            success: true,
            source: "AuraStyle Database (Mock)",
            city: city.charAt(0).toUpperCase() + city.slice(1),
            temperature: info.temp,
            description: info.desc,
            conditions: {
                rain: info.rain,
                snow: info.snow,
                wind: info.wind,
                sun: info.sun
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

