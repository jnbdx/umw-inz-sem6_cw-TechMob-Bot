// Chat UI Module
import { getRecommendation } from './Recommender.js';
import { fetchWeather } from './weatherAPI.js';
import { saveHistory, loadHistory } from './storage.js';

// DOM Elements cache
let chatBox;
let userInput;
let sendBtn;
let themeToggleBtn;
let typingIndicator;
let quickTags;
let loginContainer;
let chatContainer;
let usernameInput;
let passwordInput;
let loginBtn;
let loginError;
let logoutBtn;

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
    loginContainer = document.getElementById('login-container');
    chatContainer = document.getElementById('chat-container');
    usernameInput = document.getElementById('username-input');
    passwordInput = document.getElementById('password-input');
    loginBtn = document.getElementById('login-btn');
    loginError = document.getElementById('login-error');
    logoutBtn = document.getElementById('logout-btn');

    // Bind Event Listeners
    sendBtn.addEventListener('click', handleUserSend);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUserSend();
    });
    themeToggleBtn.addEventListener('click', toggleTheme);
    loginBtn.addEventListener('click', handleLogin);
    logoutBtn.addEventListener('click', handleLogout);
    
    usernameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
    });
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
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

    // Check Login Session
    const isLoggedIn = localStorage.getItem('is_logged_in') === 'true';
    if (isLoggedIn) {
        showChatView();
    } else {
        showLoginView();
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

function showChatView() {
    loginContainer.classList.add('hidden');
    chatContainer.classList.remove('hidden');
    userInput.focus();
}

function showLoginView() {
    chatContainer.classList.add('hidden');
    loginContainer.classList.remove('hidden');
    usernameInput.value = '';
    passwordInput.value = '';
    loginError.classList.add('hidden');
    usernameInput.focus();
}

function handleLogin() {
    const user = usernameInput.value.trim();
    const pass = passwordInput.value;
    
    if (user === 'admin' && pass === 'admin123') {
        localStorage.setItem('is_logged_in', 'true');
        loginError.classList.add('hidden');
        showChatView();
    } else {
        loginError.textContent = "Błędny login lub hasło";
        loginError.classList.remove('hidden');
    }
}

function handleLogout() {
    localStorage.removeItem('is_logged_in');
    showLoginView();
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
        // Strip common prepositions and time words to isolate the city name
        let cleanText = text
            .replace(/^pogoda\s+(?:w\s+|we\s+)?/i, '')
            .replace(/^(?:w\s+|we\s+|dzisiaj\s+|jutro\s+|teraz\s+)/i, '')
            .replace(/(?:\s+dzisiaj|\s+jutro|\s+teraz)$/i, '')
            .trim();
            
        const words = cleanText.split(/\s+/);
        const hasNumbers = /\d/.test(text);
        
        // Define if the user is describing weather instead of querying a city
        const isWeatherDescription = /stopn|deszc|wiatr|słoń|śnieg|zimn|ciepł|gorąc|chłod|mróz|pada|wichur|upał/i.test(text);
        
        // If it looks like a city query (no numbers, up to 4 words, not describing weather, and has min length)
        if (!hasNumbers && words.length <= 4 && !isWeatherDescription && cleanText.length > 2) {
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
                const errorDetail = weather && weather.error ? `Powód: ${weather.error}` : "Upewnij się, że nazwa miasta jest poprawna.";
                botText = `Niestety nie udało mi się pobrać pogody dla miasta **${cleanText}**.\n\n⚠️ **${errorDetail}**`;
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

