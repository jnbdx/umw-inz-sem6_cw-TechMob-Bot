// Storage Module
export function saveHistory(history) {
    localStorage.setItem('chat_history', JSON.stringify(history));
}

export function loadHistory() {
    const data = localStorage.getItem('chat_history');
    return data ? JSON.parse(data) : [];
}
