// Main Entry Point
import { initChat } from './js/chatUI.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Automation helper for testing/screenshots - clear storage first if in demo
    const params = new URLSearchParams(window.location.search);
    const demoMode = params.get('demo');
    
    if (demoMode) {
        localStorage.clear();
        localStorage.setItem('is_logged_in', 'true');
        
        // Inject style to disable animations and blurs for sharp headless screenshots
        const style = document.createElement('style');
        style.textContent = `
            * {
                animation: none !important;
                transition: none !important;
            }
            .blob {
                display: none !important;
            }
            .chat-card, .login-card {
                backdrop-filter: none !important;
                background: rgba(255, 255, 255, 0.95) !important;
                border: 1px solid rgba(0, 0, 0, 0.15) !important;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15) !important;
            }
            body.dark .chat-card, body.dark .login-card {
                background: rgba(28, 28, 30, 0.95) !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
            }
            .windmill-container, .birds-container {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Now initialize chat with clean storage
    initChat();
    
    if (demoMode) {
        const userInput = document.getElementById('user-input');
        const sendBtn = document.getElementById('send-btn');
        const themeToggle = document.getElementById('theme-toggle');
        
        if (demoMode === 'welcome') {
            // Storage was cleared, welcome is already shown
            return;
        }
        
        if (demoMode === 'city') {
            userInput.value = "Bydgoszcz";
            await new Promise(r => setTimeout(r, 100));
            sendBtn.click();
        } else if (demoMode === 'desc') {
            userInput.value = "Jest 7 stopni i pada deszcz";
            await new Promise(r => setTimeout(r, 100));
            sendBtn.click();
        } else if (demoMode === 'dark') {
            // Force dark theme
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.querySelector('.toggle-icon').textContent = '☀️';
            
            userInput.value = "Słonecznie i 25 stopni";
            await new Promise(r => setTimeout(r, 100));
            sendBtn.click();
        } else if (demoMode === 'warszawa') {
            userInput.value = "Warszawa";
            await new Promise(r => setTimeout(r, 100));
            sendBtn.click();
        } else if (demoMode === 'gdansk') {
            userInput.value = "Gdańsk";
            await new Promise(r => setTimeout(r, 100));
            sendBtn.click();
        } else if (demoMode === 'zakopane') {
            userInput.value = "Zakopane";
            await new Promise(r => setTimeout(r, 100));
            sendBtn.click();
        }
    }
});


