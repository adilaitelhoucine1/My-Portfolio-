// Theme Switcher Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Create theme selection menu
    const themeMenu = document.createElement('div');
    themeMenu.className = 'theme-menu hidden';
    themeMenu.innerHTML = `
        <div class="theme-menu-header">
            <h3>Select Color Theme</h3>
            <button class="theme-menu-close">×</button>
        </div>
        <div class="theme-menu-options">
            <div class="theme-option" data-theme="dark">
                <div class="theme-preview dark-preview"></div>
                <div class="theme-name">Dark+ (default)</div>
            </div>
            <div class="theme-option" data-theme="light">
                <div class="theme-preview light-preview"></div>
                <div class="theme-name">Light+</div>
            </div>
            <div class="theme-option" data-theme="monokai">
                <div class="theme-preview monokai-preview"></div>
                <div class="theme-name">Monokai</div>
            </div>
            <div class="theme-option" data-theme="dracula">
                <div class="theme-preview dracula-preview"></div>
                <div class="theme-name">Dracula</div>
            </div>
            <div class="theme-option" data-theme="github">
                <div class="theme-preview github-preview"></div>
                <div class="theme-name">GitHub</div>
            </div>
            <div class="theme-option" data-theme="nord">
                <div class="theme-preview nord-preview"></div>
                <div class="theme-name">Nord</div>
            </div>
            <div class="theme-option" data-theme="synthwave">
                <div class="theme-preview synthwave-preview"></div>
                <div class="theme-name">SynthWave '84</div>
            </div>
        </div>
    `;
    
    // Add theme menu to body
    document.body.appendChild(themeMenu);
    
    // Create theme toggle button in title bar
    const titleBarActions = document.querySelector('.title-bar > div:last-child');
    const themeToggleBtn = document.createElement('button');
    themeToggleBtn.className = 'hover:bg-[#404040] px-4 py-1';
    themeToggleBtn.innerHTML = '<i class="bi bi-palette"></i>';
    titleBarActions.insertBefore(themeToggleBtn, titleBarActions.firstChild);
    
    // Theme menu toggle
    themeToggleBtn.addEventListener('click', function() {
        themeMenu.classList.toggle('hidden');
        
        // Position the menu below the button
        if (!themeMenu.classList.contains('hidden')) {
            const btnRect = themeToggleBtn.getBoundingClientRect();
            themeMenu.style.top = (btnRect.bottom + 5) + 'px';
            themeMenu.style.right = (window.innerWidth - btnRect.right) + 'px';
            
            // Add overlay
            const overlay = document.createElement('div');
            overlay.className = 'theme-overlay';
            document.body.appendChild(overlay);
            
            overlay.addEventListener('click', function() {
                closeThemeMenu();
            });
        } else {
            const overlay = document.querySelector('.theme-overlay');
            if (overlay) overlay.remove();
        }
    });
    
    // Close button
    document.querySelector('.theme-menu-close').addEventListener('click', closeThemeMenu);
    
    function closeThemeMenu() {
        themeMenu.classList.add('hidden');
        const overlay = document.querySelector('.theme-overlay');
        if (overlay) overlay.remove();
    }
    
    // Theme switching
    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            setTheme(theme);
            
            // Update active state
            document.querySelectorAll('.theme-option').forEach(opt => {
                opt.classList.remove('active');
            });
            this.classList.add('active');
            
            // Close menu
            closeThemeMenu();
            
            // Show status message
            displayStatusMessage(`Theme changed to ${this.querySelector('.theme-name').textContent}`);
        });
    });
    
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('vscodeTheme') || 'dark';
    setTheme(savedTheme);
    
    // Set active state on the saved theme
    document.querySelector(`.theme-option[data-theme="${savedTheme}"]`).classList.add('active');
    
    // Theme setting function
    function setTheme(theme) {
        const root = document.documentElement;
        
        // Remove any existing theme classes
        const themeClasses = ['theme-dark', 'theme-light', 'theme-monokai', 
                             'theme-dracula', 'theme-github', 'theme-nord', 'theme-synthwave'];
        
        themeClasses.forEach(cls => {
            root.classList.remove(cls);
        });
        
        // Add the new theme class
        root.classList.add(`theme-${theme}`);
        
        // Save to localStorage
        localStorage.setItem('vscodeTheme', theme);
    }
    
    // Status message function
    function displayStatusMessage(message) {
        // Create status bar if it doesn't exist
        let statusBar = document.querySelector('.status-message');
        if (!statusBar) {
            statusBar = document.createElement('div');
            statusBar.className = 'status-message';
            document.body.appendChild(statusBar);
        }
        
        // Set message and show
        statusBar.textContent = message;
        statusBar.classList.add('active');
        
        // Hide after 3 seconds
        setTimeout(() => {
            statusBar.classList.remove('active');
        }, 3000);
    }
});
