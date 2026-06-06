// Main Entry Point
import { initChat } from './js/chatUI.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Automation helper for testing/screenshots - clear storage first if in demo
    const params = new URLSearchParams(window.location.search);
    const demoMode = params.get('demo');
    
    if (demoMode) {
        localStorage.clear();
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
        }
    }
});


