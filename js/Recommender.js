// Recommendation Engine Module

/**
 * Analyzes the weather description or structured weather data and returns a styled response.
 * @param {string} userInput - The query written by the user.
 * @returns {object} Recommendations containing clothing, accessories, protection, and style.
 */
export function getRecommendation(userInput) {
    const text = userInput.toLowerCase();
    
    // 1. Parse temperature
    let temp = null;
    // Match patterns like: 7 stopni, 7°C, -5 stopni, -3.5 stopni, 20 stopnie, 15 c
    const tempRegex = /(-?\d+(?:[.,]\d+)?)\s*(?:°|stopn|c)/g;
    const match = tempRegex.exec(text);
    if (match) {
        temp = parseFloat(match[1].replace(',', '.'));
    } else {
        // Fallback: search for stand-alone numbers that could be temperature if "zimno" or "ciepło" is mentioned
        const numberRegex = /(-?\d+(?:[.,]\d+)?)/g;
        let numMatch;
        while ((numMatch = numberRegex.exec(text)) !== null) {
            const val = parseFloat(numMatch[1].replace(',', '.'));
            // If the number is in a reasonable weather range
            if (val >= -40 && val <= 50) {
                temp = val;
                break;
            }
        }
    }

    // 2. Parse weather conditions
    const conditions = {
        rain: /deszcz|ulew|pada|mokro|mżawk|opad|wilg/i.test(text),
        snow: /śnieg|śnież|mróz|mroź|zamieć|gołoled/i.test(text),
        wind: /wiatr|wieje|wichur|dmucha|przeciąg/i.test(text),
        sun: /słońc|słonecz|gorąc|upał|bezchmurn|ciepło/i.test(text)
    };

    // Fallback temperature if not found in text but descriptive keywords are present
    if (temp === null) {
        if (/mróz|bardzo zimno/i.test(text)) temp = -5;
        else if (/zimno/i.test(text)) temp = 5;
        else if (/umiarkowanie|wiosna|jesień/i.test(text)) temp = 14;
        else if (/ciepło|lato/i.test(text)) temp = 22;
        else if (/gorąco|upał/i.test(text)) temp = 30;
    }

    return generateClothingGuide(temp, conditions);
}

/**
 * Generates structured clothing advice based on temperature and conditions.
 * @param {number|null} temp 
 * @param {object} conditions 
 * @returns {object} Guides
 */
function generateClothingGuide(temp, conditions) {
    let clothing = "";
    let accessories = "";
    let protection = "";
    let style = "";
    
    // Default response if no weather parameters identified
    if (temp === null && !conditions.rain && !conditions.snow && !conditions.wind && !conditions.sun) {
        return {
            success: false,
            message: "Nie udało mi się rozpoznać parametrów pogodowych w Twojej wiadomości. Spróbuj podać temperaturę (np. '15 stopni') lub napisz o deszczu/słońcu. Możesz też wpisać nazwę miasta (np. 'Warszawa'), aby pobrać aktualną pogodę!"
        };
    }

    // Temperature-based clothing guide
    if (temp !== null) {
        if (temp < 0) {
            clothing = "Gruba kurtka zimowa (puchowa), ocieplane spodnie, gruby sweter lub polar oraz wysokie buty zimowe z solidną podeszwą.";
            accessories = "Ciepła czapka zasłaniająca uszy, grube rękawiczki (najlepiej jednopalczaste lub narciarskie) oraz wełniany szalik.";
            protection = "Krem ochronny na mróz i wiatr. Jeśli pada śnieg - buty z membraną wodoodporną.";
            style = "Warstwowy (na cebulkę), zimowy outdoor / termiczny.";
        } else if (temp >= 0 && temp < 12) {
            clothing = "Ciepły płaszcz wełniany, przejściowa kurtka ocieplana (np. parka) lub lekki puchowy bezrękawnik na grubą bluzę. Długie spodnie (jeansy, chino) oraz buty trekkingowe, botki lub skórzane sztyblety.";
            accessories = "Lekka czapka, cieńsze rękawiczki oraz szalik lub komin.";
            protection = "Ochrona przed chłodem. Krem nawilżający.";
            style = "Casual warstwowy / smart casual.";
        } else if (temp >= 12 && temp < 20) {
            clothing = "Długie spodnie lub spódnica, bawełniany T-shirt lub longsleeve, a na wierzch rozpinany kardigan, lekka kurtka przejściowa (np. ramoneska, bomberka) lub bluza z kapturem. Buty: sneakersy, trampki lub półbuty.";
            accessories = "Zegarek, lekka biżuteria. Brak konieczności noszenia czapki czy szalika.";
            protection = "Podstawowy krem z filtrem UV przy słonecznej pogodzie.";
            style = "Casual, streetwear lub lekki biznesowy.";
        } else { // temp >= 20
            clothing = "Krótkie spodenki, spódnica lub lekka, przewiewna sukienka. T-shirt z naturalnych materiałów (len, bawełna), top na ramiączkach. Obuwie: sandały, klapki, przewiewne trampki lub espadryle.";
            accessories = "Okulary przeciwsłoneczne, lekka torba płócienna.";
            protection = "Krem z filtrem SPF 30 lub 50 (obowiązkowo), nakrycie głowy.";
            style = "Styl letni, plażowy lub casual-summer.";
        }
    } else {
        // If no temperature but conditions are present
        clothing = "Dopasuj ubiór do aktualnej pory roku, warstwowo, aby łatwo kontrolować temperaturę ciała.";
        style = "Casual.";
    }

    // Condition-based modifiers
    let weatherSummary = [];
    if (temp !== null) weatherSummary.push(`${temp}°C`);

    if (conditions.rain) {
        weatherSummary.push("opady deszczu 🌧️");
        clothing = clothing.replace("Ciepły płaszcz wełniany", "Kurtka przeciwdeszczowa / parka wodoodporna");
        clothing = clothing.replace("kurtka przejściowa", "kurtka przeciwdeszczowa z membraną");
        clothing = clothing.replace("sneakersy, trampki", "wodoodporne sneakersy lub kalosze");
        clothing = clothing.replace("sandały, klapki", "kryte buty skórzane lub trekkingowe");
        
        protection += (protection ? " " : "") + "Koniecznie zabierz parasol! Wybierz okrycie wierzchnie z kapturem oraz zaimpregnuj buty.";
        accessories += (accessories ? " " : "") + "Parasolka składana lub wodoodporny pokrowiec na plecak.";
    }

    if (conditions.snow) {
        weatherSummary.push("opady śniegu ❄️");
        clothing = clothing.replace("buty trekkingowe, botki", "ocieplane buty zimowe z głębokim protektorem");
        clothing = clothing.replace("sneakersy, trampki", "buty z membraną gore-tex");
        
        protection += (protection ? " " : "") + "Uważaj na śliską nawierzchnię. Wybierz buty o dobrej przyczepności (podeszwa Vibram lub podobna).";
    }

    if (conditions.wind) {
        weatherSummary.push("silny wiatr 💨");
        clothing = (temp !== null && temp >= 12 && temp < 20) 
            ? "Wiatroszczelna kurtka (np. softshell lub wiatrówka), długie spodnie, sneakersy." 
            : clothing;
        
        accessories += (accessories ? " " : "") + "Opaska na uszy lub czapka chroniąca przed wiatrem.";
        protection += (protection ? " " : "") + "Chroń gardło i uszy przed przewianiem (komin lub stójka w kurtce).";
    }

    if (conditions.sun) {
        weatherSummary.push("słonecznie ☀️");
        accessories += (accessories ? " " : "") + "Okulary przeciwsłoneczne z filtrem UV.";
        protection += (protection ? " " : "") + "Czapka z daszkiem lub kapelusz przeciwsłoneczny. Użyj kremu SPF.";
    }

    return {
        success: true,
        summary: weatherSummary.join(" + "),
        temperature: temp,
        clothing: clothing,
        accessories: accessories,
        protection: protection,
        style: style,
        message: `Oto rekomendacja na pogodę: **${weatherSummary.join(" i ")}**.\n\n` +
                 `👔 **Ubiór:** ${clothing}\n` +
                 `🎒 **Dodatki:** ${accessories || 'Brak specjalnych wymagań.'}\n` +
                 `☂️ **Ochrona:** ${protection || 'Brak specjalnych wymagań.'}\n` +
                 `✨ **Sugerowany styl:** ${style}`
    };
}

