// AI Chatbot API Module using free, keyless Pollinations AI text model

export async function askAI(conversationHistory) {
    // In demo mode, return the mock follow-up instantly for speed and reliability
    const isDemo = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('demo');
    if (isDemo) {
        return "Możesz także rozważyć zabranie ze sobą okularów przeciwsłonecznych na wypadek nagłego przejaśnienia. Co sądzisz o takim zestawie, czy chciałbyś dobrać jakieś inne dodatki?";
    }
    
    try {
        // Format messages array for the AI API
        // conversationHistory is an array of { text, sender }
        // We map sender 'user-message' -> 'user' and 'bot-message' -> 'assistant'
        const systemPrompt = {
            role: "system",
            content: "Jesteś AuraStyle AI, inteligentnym asystentem pogodowym i modowym. " +
                     "Twoim zadaniem jest rozmawianie z użytkownikiem i doradzanie mu w kwestii ubiory, stylu i dodatków. " +
                     "Jeśli użytkownik pyta o szczegóły pogody lub ubiory, odpowiadaj krótko (maksymalnie 2-3 zdania), naturalnie i stylowo w języku polskim. " +
                     "Bądź przyjazny, a na koniec wypowiedzi zawsze krótko zaproponuj ciekawą alternatywę, aktywność pasującą do aury lub zadaj pytanie zachęcające do dalszej rozmowy."
        };

        const messages = [
            systemPrompt,
            ...conversationHistory.map(msg => ({
                role: msg.sender === 'user-message' ? 'user' : 'assistant',
                content: msg.text
            }))
        ];

        // Fetch from Pollinations AI (completely free, no API key required!)
        const response = await fetch("https://text.pollinations.ai/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                messages: messages,
                model: "openai", // Defaults to GPT-4o-mini
                seed: 42
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const replyText = await response.text();
        return replyText.trim();
    } catch (error) {
        console.warn("Real AI API failed, using smart fallback response. Error:", error.message);
        // Fallback to a smart static reply in case the free API is rate-limited or offline
        return "Możesz także rozważyć zabranie ze sobą okularów przeciwsłonecznych na wypadek nagłego przejaśnienia. Co sądzisz o takim zestawie, czy chciałbyś dobrać jakieś inne dodatki?";
    }
}
