// VS Code Command Palette Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Add Command Palette HTML to all pages
    const body = document.body;
    const commandPaletteHTML = `
        <div id="command-palette" class="command-palette hidden">
            <div class="command-palette-header">
                <i class="bi bi-chevron-right command-icon"></i>
                <input type="text" id="command-input" placeholder="Type a command or search...">
            </div>
            <div class="command-results">
                <div class="command-category">
                    <div class="command-category-title">Commands</div>
                    <div class="command-item" data-command="home">
                        <i class="bi bi-house-door"></i>
                        <span>Go to Home</span>
                    </div>
                    <div class="command-item" data-command="experience">
                        <i class="bi bi-briefcase"></i>
                        <span>View Experience</span>
                    </div>
                    <div class="command-item" data-command="education">
                        <i class="bi bi-mortarboard"></i>
                        <span>View Education</span>
                    </div>
                    <div class="command-item" data-command="projects">
                        <i class="bi bi-code-square"></i>
                        <span>View Projects</span>
                    </div>
                    <div class="command-item" data-command="skills">
                        <i class="bi bi-stars"></i>
                        <span>View Skills</span>
                    </div>
                    <div class="command-item" data-command="readme">
                        <i class="bi bi-file-text"></i>
                        <span>View README</span>
                    </div>
                    <div class="command-item" data-command="package">
                        <i class="bi bi-box"></i>
                        <span>View Package.json</span>
                    </div>
                    <div class="command-item" data-command="toggle-theme">
                        <i class="bi bi-palette"></i>
                        <span>Toggle Light/Dark Theme</span>
                    </div>
                    <div class="command-item" data-command="toggle-terminal">
                        <i class="bi bi-terminal"></i>
                        <span>Toggle Terminal</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Create command palette element
    const paletteContainer = document.createElement('div');
    paletteContainer.innerHTML = commandPaletteHTML;
    body.appendChild(paletteContainer.firstElementChild);
    
    // Get DOM elements
    const commandPalette = document.getElementById('command-palette');
    const commandInput = document.getElementById('command-input');
    const commandItems = document.querySelectorAll('.command-item');
    
    // Function to toggle command palette
    function toggleCommandPalette() {
        commandPalette.classList.toggle('hidden');
        commandPalette.classList.toggle('active');
        if (!commandPalette.classList.contains('hidden')) {
            commandInput.focus();
            // Add overlay
            const overlay = document.createElement('div');
            overlay.id = 'command-overlay';
            overlay.className = 'command-overlay';
            document.body.appendChild(overlay);
            
            // Add close on overlay click
            overlay.addEventListener('click', function() {
                closeCommandPalette();
            });
        } else {
            const overlay = document.getElementById('command-overlay');
            if (overlay) overlay.remove();
        }
    }
    
    function closeCommandPalette() {
        commandPalette.classList.add('hidden');
        commandPalette.classList.remove('active');
        const overlay = document.getElementById('command-overlay');
        if (overlay) overlay.remove();
    }
    
    // Handle keyboard shortcut
    document.addEventListener('keydown', function(e) {
        // Ctrl+Shift+P or Cmd+Shift+P
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
            e.preventDefault();
            toggleCommandPalette();
        }
        
        // Escape to close
        if (e.key === 'Escape' && !commandPalette.classList.contains('hidden')) {
            closeCommandPalette();
        }
    });
    
    // Filter commands as user types
    commandInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        
        commandItems.forEach(item => {
            const commandText = item.querySelector('span').textContent.toLowerCase();
            if (commandText.includes(query)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
    
    // Execute command on click
    commandItems.forEach(item => {
        item.addEventListener('click', function() {
            const command = this.getAttribute('data-command');
            executeCommand(command);
            closeCommandPalette();
        });
    });
    
    // Execute commands
    function executeCommand(command) {
        // Navigation commands
        const navigationCommands = {
            'home': 'index.html',
            'experience': 'experience.html',
            'education': 'education.html',
            'projects': 'projects.html',
            'skills': 'skills.html',
            'readme': 'readme.html',
            'package': 'package.html'
        };
        
        if (navigationCommands[command]) {
            window.location.href = navigationCommands[command];
            return;
        }
        
        // Other commands
        switch(command) {
            case 'toggle-theme':
                // Will implement theme toggling later
                displayStatusMessage('Theme toggling not implemented yet');
                break;
                
            case 'toggle-terminal':
                toggleTerminal();
                break;
                
            default:
                displayStatusMessage(`Command '${command}' not found`);
        }
    }
    
    // Function to toggle terminal
    function toggleTerminal() {
        let terminal = document.querySelector('.terminal-panel');
        
        if (!terminal) {
            // Create terminal if it doesn't exist
            terminal = document.createElement('div');
            terminal.className = 'terminal-panel';
            terminal.innerHTML = `
                <div class="terminal-header">
                    <div class="terminal-title">Terminal</div>
                    <div class="terminal-actions">
                        <button class="terminal-action"><i class="bi bi-plus"></i></button>
                        <button class="terminal-action"><i class="bi bi-trash"></i></button>
                        <button class="terminal-action terminal-close"><i class="bi bi-x"></i></button>
                    </div>
                </div>
                <div class="terminal-content">
                    <div class="terminal-line">
                        <span class="terminal-prompt">$ </span>
                        <span class="terminal-text">Welcome to Adil's portfolio terminal</span>
                    </div>
                    <div class="terminal-line">
                        <span class="terminal-prompt">$ </span>
                        <span class="terminal-text blinking-cursor">_</span>
                    </div>
                </div>
            `;
            document.body.appendChild(terminal);
            
            // Add close button functionality
            terminal.querySelector('.terminal-close').addEventListener('click', function() {
                terminal.remove();
            });
            
            // Animate terminal opening
            setTimeout(() => {
                terminal.classList.add('active');
            }, 10);
        } else {
            // Remove existing terminal
            terminal.classList.remove('active');
            setTimeout(() => {
                terminal.remove();
            }, 300);
        }
    }
    
    // Function to display status message
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
