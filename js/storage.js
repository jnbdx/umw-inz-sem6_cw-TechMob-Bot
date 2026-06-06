// Storage Module
export function saveHistory(history) {
    localStorage.setItem('chat_history', JSON.stringify(history));
}

export function loadHistory() {
    const data = localStorage.getItem('chat_history');
    return data ? JSON.parse(data) : [];
}

export function saveApiKey(key) {
    localStorage.setItem('openweather_api_key', key.trim());
}

export function getApiKey() {
    return localStorage.getItem('openweather_api_key') || "";
}

