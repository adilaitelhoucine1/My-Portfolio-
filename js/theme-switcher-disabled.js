// Theme Switcher Implementation - DISABLED
// This theme switcher has been replaced by the Universal Terminal theme system
// Use the terminal command 'theme light' or 'theme dark' instead

document.addEventListener('DOMContentLoaded', function() {
    console.log('Legacy theme switcher disabled - Use terminal theme commands instead');
    
    // Optional: Remove the palette button from title bar to avoid confusion
    const titleBarActions = document.querySelector('.title-bar > div:last-child');
    if (titleBarActions) {
        const paletteBtn = titleBarActions.querySelector('button i.bi-palette');
        if (paletteBtn && paletteBtn.parentElement) {
            paletteBtn.parentElement.style.display = 'none';
        }
    }
    
    // Add a note about how to change themes
    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #007acc;
        color: white;
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 12px;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    statusMessage.innerHTML = 'Press Ctrl+` and type "theme light" or "theme dark" to change themes';
    document.body.appendChild(statusMessage);
    
    // Show the message briefly
    setTimeout(() => {
        statusMessage.style.opacity = '1';
        setTimeout(() => {
            statusMessage.style.opacity = '0';
            setTimeout(() => {
                statusMessage.remove();
            }, 300);
        }, 5000);
    }, 1000);
});
