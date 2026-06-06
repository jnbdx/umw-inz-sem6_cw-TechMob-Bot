// Chat UI Module
import { getRecommendation } from './Recommender.js';
import { fetchWeather } from './weatherAPI.js';
import { saveHistory, loadHistory, getApiKey, saveApiKey } from './storage.js';

// DOM Elements cache
let chatBox;
let userInput;
let sendBtn;
let themeToggleBtn;
let typingIndicator;
let quickTags;
let settingsBtn;
let settingsModal;
let closeModalBtn;
let saveSettingsBtn;
let apiKeyInput;

// State
let messageHistory = [];

/**
 * Initializes the Chat UI, binds events, and restores history.
 */
export function initChat() {
    // Cache DOM Elements
    chatBox = document.getElementById('chat-box');
    userInput = document.getElementById('user-input');
    sendBtn = document.getElementById('send-btn');
    themeToggleBtn = document.getElementById('theme-toggle');
    typingIndicator = document.getElementById('typing-indicator');
    quickTags = document.querySelectorAll('.quick-tag-btn');
    settingsBtn = document.getElementById('settings-btn');
    settingsModal = document.getElementById('settings-modal');
    closeModalBtn = document.getElementById('close-modal-btn');
    saveSettingsBtn = document.getElementById('save-settings-btn');
    apiKeyInput = document.getElementById('api-key-input');

    // Bind Event Listeners
    sendBtn.addEventListener('click', handleUserSend);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUserSend();
    });
    themeToggleBtn.addEventListener('click', toggleTheme);
    settingsBtn.addEventListener('click', openSettings);
    closeModalBtn.addEventListener('click', closeSettings);
    saveSettingsBtn.addEventListener('click', handleSaveSettings);
    
    // Close modal on background overlay click
    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) closeSettings();
    });

    // Bind Quick Tags
    quickTags.forEach(btn => {
        btn.addEventListener('click', () => {
            userInput.value = btn.getAttribute('data-text');
            userInput.focus();
        });
    });

    // Load Theme Preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        themeToggleBtn.querySelector('.toggle-icon').textContent = '☀️';
    } else {
        document.body.classList.remove('dark');
        themeToggleBtn.querySelector('.toggle-icon').textContent = '🌙';
    }

    // Load and Render History
    messageHistory = loadHistory();
    if (messageHistory.length === 0) {
        // Welcome message if fresh session
        const welcomeText = "Cześć! Jestem **AuraStyle AI** - Twój inteligentny doradca ubraniowy. ☀️🌧️\n\n" +
                            "Napisz mi, jaka jest u Ciebie pogoda (np. *'Jest 5 stopni i wieje silny wiatr'* lub *'Pada ulewny deszcz, 12 stopni'*).\n\n" +
                            "Możesz też wpisać **samą nazwę miasta** (np. *'Kraków'* lub *'Zakopane'*), a ja sprawdzę aktualne warunki i podpowiem, co na siebie włożyć!";
        addMessage(welcomeText, 'bot-message', false);
    } else {
        messageHistory.forEach(msg => {
            renderMessage(msg.text, msg.sender);
        });
        scrollToBottom();
    }
}

/**
 * Toggles dark/light theme and saves preference.
 */
function toggleTheme() {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggleBtn.querySelector('.toggle-icon').textContent = isDark ? '☀️' : '🌙';
}

function openSettings() {
    apiKeyInput.value = getApiKey();
    settingsModal.classList.remove('hidden');
    settingsModal.setAttribute('aria-hidden', 'false');
}

function closeSettings() {
    settingsModal.classList.add('hidden');
    settingsModal.setAttribute('aria-hidden', 'true');
}

function handleSaveSettings() {
    const key = apiKeyInput.value.trim();
    saveApiKey(key);
    closeSettings();
    
    const confirmationText = key 
        ? "Klucz API został pomyślnie zapisany! ⚙️ Od teraz będę pobierać aktualne dane o pogodzie w czasie rzeczywistym."
        : "Klucz API został usunięty. Przechodzę w tryb symulacji pogodowej.";
        
    addMessage(confirmationText, 'bot-message', true);
}


/**
 * Handles sending a message.
 */
async function handleUserSend() {
    const text = userInput.value.trim();
    if (!text) return;

    // Add user message to UI
    renderMessage(text, 'user-message');
    userInput.value = '';
    
    // Save to history state & storage
    messageHistory.push({ text, sender: 'user-message' });
    saveHistory(messageHistory);
    scrollToBottom();

    // Show typing indicator
    showTypingIndicator();

    try {
        let botText = "";
        
        // Smart query parsing: is it a city query?
        // Patterns: exactly 1-2 words (without numbers) or "pogoda [miasto]"
        const cleanText = text.replace(/pogoda\s+/i, '').trim();
        const words = cleanText.split(/\s+/);
        const hasNumbers = /\d/.test(text);
        
        // If it looks like a city query (e.g. no numbers, fewer than 3 words)
        if (!hasNumbers && words.length <= 2 && !/stopn|deszc|wiatr|słoń|śnieg/i.test(text)) {
            const weather = await fetchWeather(cleanText);
            if (weather && weather.success) {
                // If weather fetched, use recommender on the structured result
                const rec = getRecommendation(`Jest ${weather.temperature} stopni i ${weather.description}`);
                botText = `Aktualna pogoda w mieście **${weather.city}**:\n` +
                          `🌡️ Temperatura: **${weather.temperature}°C**\n` +
                          `☁️ Warunki: *${weather.description}*\n` +
                          `*(Źródło: ${weather.source})*\n\n` +
                          `${rec.message}`;
            } else {
                botText = `Niestety nie udało mi się pobrać pogody dla miasta "${cleanText}". Upewnij się, że nazwa jest poprawna.`;
            }
        } else {
            // Treat as descriptive weather text input
            const rec = getRecommendation(text);
            botText = rec.message;
        }

        // Simulate thinking delay (1.2s) for realistic typing effect, bypass in demo mode
        const isDemo = new URLSearchParams(window.location.search).has('demo');
        await new Promise(resolve => setTimeout(resolve, isDemo ? 0 : 1200));
        
        hideTypingIndicator();
        
        // Add bot response to UI
        addMessage(botText, 'bot-message', true);
        
    } catch (error) {
        hideTypingIndicator();
        addMessage("Ojej, napotkałem nieoczekiwany problem przy analizie pogody. Spróbuj ponownie za chwilę!", 'bot-message', true);
        console.error("Error in chatbot response loop:", error);
    }
}

/**
 * Formats basic Markdown-like syntax (bold and linebreaks) to HTML safely.
 * @param {string} text - Raw input text.
 * @returns {string} Safe HTML.
 */
function formatMarkdown(text) {
    // Escape HTML first to prevent XSS
    let escaped = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    // Replace bold **text** or *text*
    escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    escaped = escaped.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Replace linebreaks with <br>
    return escaped.replace(/\n/g, '<br>');
}

/**
 * Appends message structure to chat window and saves to storage.
 */
function addMessage(text, sender, save = true) {
    renderMessage(text, sender);
    if (save) {
        messageHistory.push({ text, sender });
        saveHistory(messageHistory);
    }
    scrollToBottom();
}

/**
 * Renders message directly to the DOM.
 */
function renderMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    
    // Format text markup (bold, italic, newlines)
    msgDiv.innerHTML = formatMarkdown(text);
    
    chatBox.appendChild(msgDiv);
}

function showTypingIndicator() {
    typingIndicator.classList.remove('hidden');
    typingIndicator.removeAttribute('aria-hidden');
    scrollToBottom();
}

function hideTypingIndicator() {
    typingIndicator.classList.add('hidden');
    typingIndicator.setAttribute('aria-hidden', 'true');
}

function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

