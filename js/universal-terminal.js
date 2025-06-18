// Universal Portfolio Terminal
// This terminal works across all portfolio pages

class PortfolioTerminal {
    constructor() {
        this.commandHistory = [];
        this.historyIndex = -1;
        this.currentPage = this.getCurrentPage();
        this.isVisible = false;
        
        this.init();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop().toLowerCase();
        
        if (filename.includes('about')) return 'about';
        if (filename.includes('contact')) return 'contact';
        if (filename.includes('experience')) return 'experience';
        if (filename.includes('education')) return 'education';
        if (filename.includes('projects')) return 'projects';
        if (filename.includes('skills')) return 'skills';
        if (filename.includes('certifications')) return 'certifications';
        return 'home';
    }    init() {
        this.createTerminalHTML();
        this.setupEventListeners();
        this.setupKeyboardShortcuts();
        this.loadSavedTheme();
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
        this.switchTheme(savedTheme);
    }

    createTerminalHTML() {
        // Remove existing terminal if any
        const existingTerminal = document.getElementById('universalTerminal');
        if (existingTerminal) {
            existingTerminal.remove();
        }

        const terminalHTML = `
            <div id="universalTerminal" class="universal-terminal">
                <div class="terminal-header">
                    <div class="flex items-center gap-2">
                        <i class="bi bi-terminal text-[#4dc4ff]"></i>
                        <span>Portfolio Terminal</span>
                        <span class="text-[#858585]">v0.1</span>
                        <span class="page-indicator">[${this.currentPage}]</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <button onclick="portfolioTerminal.minimizeTerminal()" class="text-[#858585] hover:text-white text-xs">─</button>
                        <button onclick="portfolioTerminal.clearTerminal()" class="text-[#858585] hover:text-white text-xs">Clear</button>
                        <button onclick="portfolioTerminal.closeTerminal()" class="text-[#858585] hover:text-white">×</button>
                    </div>
                </div>
                <div class="terminal-content" id="universalTerminalContent">
                    <div id="universalTerminalOutput">
                        <div class="text-[#4dc4ff]">🚀 Universal Portfolio Terminal v2.0</div>
                        <div class="text-[#00ff88]">Welcome to ${this.currentPage} page!</div>
                        <div class="text-[#ffd700]">Type 'help' for available commands or 'nav' for navigation</div>
                        <br>
                    </div>
                    <div class="flex items-center">
                        <span class="text-[#4dc4ff]">portfolio@${this.currentPage}:~$ </span>
                        <input type="text" id="universalTerminalInput" class="bg-transparent border-none outline-none text-white flex-1 ml-2" autocomplete="off" placeholder="Type command here...">
                    </div>
                </div>
            </div>
        `;

        // Add CSS if not exists
        if (!document.getElementById('terminalStyles')) {
            const styles = document.createElement('style');
            styles.id = 'terminalStyles';
            styles.textContent = `
                .universal-terminal {
                    position: fixed;
                    bottom: 22px;
                    left: 300px;
                    right: 20px;
                    height: 0;
                    background: #1e1e1e;
                    border-top: 1px solid #3c3c3c;
                    border-left: 1px solid #3c3c3c;
                    border-right: 1px solid #3c3c3c;
                    border-radius: 8px 8px 0 0;
                    transition: height 0.3s ease;
                    z-index: 1000;
                    overflow: hidden;
                    box-shadow: 0 -4px 12px rgba(0,0,0,0.3);
                }
                .universal-terminal.show {
                    height: 250px;
                }
                .universal-terminal.minimized {
                    height: 40px;
                }
                .terminal-header {
                    background: #2d2d30;
                    padding: 8px 12px;
                    font-size: 12px;
                    border-bottom: 1px solid #3c3c3c;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .terminal-content {
                    padding: 12px;
                    font-family: 'Cascadia Code', 'Courier New', monospace;
                    font-size: 14px;
                    color: #cccccc;
                    height: calc(100% - 40px);
                    overflow-y: auto;
                }
                .page-indicator {
                    background: #007acc;
                    color: white;
                    padding: 2px 6px;
                    border-radius: 3px;
                    font-size: 10px;
                }
                .terminal-toggle-btn {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    background: #007acc;
                    color: white;
                    border: none;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 18px;
                    z-index: 1001;
                    box-shadow: 0 4px 12px rgba(0, 122, 204, 0.3);
                    transition: all 0.3s;
                }
                .terminal-toggle-btn:hover {
                    background: #005a9e;
                    transform: scale(1.1);
                }
            `;
            document.head.appendChild(styles);
        }

        // Add terminal to body
        document.body.insertAdjacentHTML('beforeend', terminalHTML);

        // Add toggle button if not exists
        if (!document.getElementById('terminalToggleBtn')) {
            const toggleBtn = document.createElement('button');
            toggleBtn.id = 'terminalToggleBtn';
            toggleBtn.className = 'terminal-toggle-btn';
            toggleBtn.innerHTML = '<i class="bi bi-terminal"></i>';
            toggleBtn.onclick = () => this.toggleTerminal();
            toggleBtn.title = 'Toggle Terminal (Ctrl+`)';
            document.body.appendChild(toggleBtn);
        }
    }

    setupEventListeners() {
        const input = document.getElementById('universalTerminalInput');
        if (input) {
            input.addEventListener('keydown', (e) => this.handleInput(e));
        }
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === '`') {
                e.preventDefault();
                this.toggleTerminal();
            }
            if (e.key === 'Escape' && this.isVisible) {
                this.closeTerminal();
            }
        });
    }

    toggleTerminal() {
        const terminal = document.getElementById('universalTerminal');
        if (terminal.classList.contains('show')) {
            this.closeTerminal();
        } else {
            this.openTerminal();
        }
    }

    openTerminal() {
        const terminal = document.getElementById('universalTerminal');
        const toggleBtn = document.getElementById('terminalToggleBtn');
        
        terminal.classList.add('show');
        terminal.classList.remove('minimized');
        toggleBtn.innerHTML = '<i class="bi bi-x"></i>';
        this.isVisible = true;
        
        setTimeout(() => {
            document.getElementById('universalTerminalInput').focus();
        }, 100);
    }

    closeTerminal() {
        const terminal = document.getElementById('universalTerminal');
        const toggleBtn = document.getElementById('terminalToggleBtn');
        
        terminal.classList.remove('show', 'minimized');
        toggleBtn.innerHTML = '<i class="bi bi-terminal"></i>';
        this.isVisible = false;
    }

    minimizeTerminal() {
        const terminal = document.getElementById('universalTerminal');
        terminal.classList.remove('show');
        terminal.classList.add('minimized');
    }

    clearTerminal() {        const output = document.getElementById('universalTerminalOutput');
        output.innerHTML = `
            <div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
            <div class="text-[#4dc4ff] font-bold">🚀 Universal Portfolio Terminal v2.0</div>
            <div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
            <br>
            <div class="text-[#00ff88]">✓ Terminal cleared successfully</div>
            <div class="text-[#cccccc]">Welcome back to <span class="text-[#ffd700] font-bold">${this.currentPage}</span> page!</div>
            <div class="text-[#4dc4ff]">Type <span class="text-[#00ff88]">'help'</span> for available commands or <span class="text-[#00ff88]">'nav'</span> for navigation</div>
            <br>
            <div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
            <br>
        `;
    }

    handleInput(e) {
        const input = e.target;
        
        if (e.key === 'Enter') {
            const command = input.value.trim().toLowerCase();
            
            if (command) {
                this.commandHistory.unshift(command);
                this.historyIndex = -1;
                
                this.executeCommand(command);
                input.value = '';
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (this.historyIndex < this.commandHistory.length - 1) {
                this.historyIndex++;
                input.value = this.commandHistory[this.historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (this.historyIndex > 0) {
                this.historyIndex--;
                input.value = this.commandHistory[this.historyIndex];
            } else if (this.historyIndex === 0) {
                this.historyIndex = -1;
                input.value = '';
            }
        }
    }

    executeCommand(command) {
        const output = document.getElementById('universalTerminalOutput');
        
        // Display command
        const commandLine = document.createElement('div');
        commandLine.innerHTML = `<span class="text-[#4dc4ff]">portfolio@${this.currentPage}:~$ </span><span class="text-[#cccccc]">${command}</span>`;
        output.appendChild(commandLine);
        
        // Execute command
        const result = this.getCommandOutput(command);
        if (result) {
            const outputLine = document.createElement('div');
            outputLine.innerHTML = result;
            output.appendChild(outputLine);
        }
        
        // Add spacing
        output.appendChild(document.createElement('br'));
        
        // Scroll to bottom
        const terminalContent = document.getElementById('universalTerminalContent');
        terminalContent.scrollTop = terminalContent.scrollHeight;
    }    getCommandOutput(command) {
        const commands = {
            'help': () => this.getHelpCommand(),
            'nav': () => this.getNavigationCommand(),
            'contact': () => this.getContactCommand(),
            'about': () => this.getAboutCommand(),
            'skills': () => this.getSkillsCommand(),
            'projects': () => this.getProjectsCommand(),
            'experience': () => this.getExperienceCommand(),
            'education': () => this.getEducationCommand(),
            'certifications': () => this.getCertificationsCommand(),
            'social': () => this.getSocialCommand(),
            'status': () => this.getStatusCommand(),
            'whoami': () => this.getWhoamiCommand(),
            'theme': (args) => this.handleThemeCommand(args),
            'date': () => `<div class="text-[#cccccc]">${new Date().toString()}</div>`,
            'pwd': () => `<div class="text-[#cccccc]">/portfolio/${this.currentPage}</div>`,
            'ls': () => this.getLsCommand(),
            'tree': () => this.getTreeCommand(),
            'goto': (args) => this.handleGotoCommand(args),
            'email': () => this.handleEmailCommand(),
            'linkedin': () => this.handleLinkedInCommand(),
            'github': () => this.handleGitHubCommand(),
            'download': () => this.handleDownloadCommand(),
            'hire': () => this.getHireCommand(),
            'cv': () => this.handleCVCommand(),
            'portfolio': () => this.getPortfolioCommand(),
            'clear': () => { this.clearTerminal(); return ''; }
        };

        const [cmd, ...args] = command.split(' ');
        
        if (commands[cmd]) {
            return commands[cmd](args);
        } else {
            return `<div class="text-[#f14c4c]">Command not found: ${cmd}</div>
<div class="text-[#ffd700]">Type 'help' for available commands</div>`;
        }
    }    getHelpCommand() {
        return `<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<div class="text-[#4dc4ff] font-bold">📚 PORTFOLIO TERMINAL - COMMAND REFERENCE</div>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<br>
<div class="text-[#ffd700] font-bold">🧭 NAVIGATION COMMANDS:</div>
<div class="text-[#cccccc]">  <span class="text-[#00ff88]">nav</span>             Show navigation menu</div>
<div class="text-[#cccccc]">  <span class="text-[#00ff88]">goto [page]</span>     Navigate to specific page</div>
<div class="text-[#cccccc]">  <span class="text-[#00ff88]">pwd</span>             Show current location</div>
<div class="text-[#cccccc]">  <span class="text-[#00ff88]">ls</span>              List portfolio sections</div>
<div class="text-[#cccccc]">  <span class="text-[#00ff88]">tree</span>            Show portfolio structure</div>
<br>
<div class="text-[#ffd700] font-bold">📋 INFORMATION COMMANDS:</div>
<div class="text-[#cccccc]">  <span class="text-[#00ff88]">contact</span>         Show contact information</div>
<div class="text-[#cccccc]">  <span class="text-[#00ff88]">about</span>           Show about information</div>
<div class="text-[#cccccc]">  <span class="text-[#00ff88]">skills</span>          Show technical skills</div>
<div class="text-[#cccccc]">  <span class="text-[#00ff88]">projects</span>        Show projects overview</div>
<div class="text-[#cccccc]">  <span class="text-[#00ff88]">experience</span>      Show work experience</div>
<div class="text-[#cccccc]">  <span class="text-[#00ff88]">education</span>       Show education background</div>
<div class="text-[#cccccc]">  <span class="text-[#00ff88]">certifications</span>  Show certifications</div>
<br>
<div class="text-[#ffd700] font-bold">🔗 ACTION COMMANDS:</div>
<div class="text-[#cccccc]">  <span class="text-[#00ff88]">email</span>           Open email client</div>
<div class="text-[#cccccc]">  <span class="text-[#00ff88]">linkedin</span>        Open LinkedIn profile</div>
<div class="text-[#cccccc]">  <span class="text-[#00ff88]">github</span>          Open GitHub profile</div>
<div class="text-[#cccccc]">  <span class="text-[#00ff88]">cv</span>              Download CV/Resume</div>
<div class="text-[#cccccc]">  <span class="text-[#00ff88]">hire</span>            Get hiring information</div>
<br>
<div class="text-[#ffd700] font-bold">⚙️ UTILITY COMMANDS:</div>
<div class="text-[#cccccc]">  <span class="text-[#00ff88]">help</span>            Show this help</div>
<div class="text-[#cccccc]">  <span class="text-[#00ff88]">clear</span>           Clear terminal</div>
<div class="text-[#cccccc]">  <span class="text-[#00ff88]">theme</span>           Switch themes (dark/light)</div>
<div class="text-[#cccccc]">  <span class="text-[#00ff88]">date</span>            Show current date</div>
<div class="text-[#cccccc]">  <span class="text-[#00ff88]">whoami</span>          Show developer info</div>
<div class="text-[#cccccc]">  <span class="text-[#00ff88]">status</span>          Show availability</div>
<br>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<div class="text-[#ffd700]">💡 TIP: Use ↑/↓ arrows to browse command history</div>
<div class="text-[#ffd700]">💡 TIP: Press Ctrl+\` to toggle terminal on any page</div>
<div class="text-[#ffd700]">💡 TIP: Type 'theme light' or 'theme dark' to switch themes</div>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>`;
    }

    getNavigationCommand() {
        return `<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<div class="text-[#4dc4ff] font-bold">🧭 PORTFOLIO NAVIGATION MENU</div>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<br>
<div class="text-[#ffd700] font-bold">📄 AVAILABLE PAGES:</div>
<div class="text-[#cccccc]">  <span class="text-[#00ff88]">goto about</span>          Personal information & biography</div>
<div class="text-[#cccccc]">  <span class="text-[#00ff88]">goto contact</span>        Contact information & form</div>
<div class="text-[#cccccc]">  <span class="text-[#00ff88]">goto experience</span>     Work experience & roles</div>
<div class="text-[#cccccc]">  <span class="text-[#00ff88]">goto education</span>      Educational background</div>
<div class="text-[#cccccc]">  <span class="text-[#00ff88]">goto projects</span>       Portfolio projects showcase</div>
<div class="text-[#cccccc]">  <span class="text-[#00ff88]">goto skills</span>         Technical skills & tools</div>
<div class="text-[#cccccc]">  <span class="text-[#00ff88]">goto certifications</span> Certificates & achievements</div>
<br>
<div class="text-[#ffd700] font-bold">📍 CURRENT LOCATION:</div>
<div class="text-[#cccccc]">  You are currently on: <span class="text-[#4dc4ff] font-bold">${this.currentPage}</span> page</div>
<br>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<div class="text-[#ffd700]">💡 Example: Type "goto projects" to navigate to projects page</div>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>`;
    }

    handleGotoCommand(args) {
        if (!args || args.length === 0) {
            return `<div class="text-[#f14c4c]">Usage: goto [page]</div>
<div class="text-[#ffd700]">Available pages: about, contact, experience, education, projects, skills, certifications</div>`;
        }

        const page = args[0].toLowerCase();
        const pageMap = {
            'about': 'about.html',
            'contact': 'Contact.html',
            'experience': 'experience.html',
            'education': 'education.html',
            'projects': 'projects.html',
            'skills': 'skills.html',
            'certifications': 'certifications.html',
            'home': 'index.html'
        };

        if (pageMap[page]) {
            setTimeout(() => {
                window.location.href = pageMap[page];
            }, 500);
            return `<div class="text-[#00ff88]">🚀 Navigating to ${page} page...</div>`;
        } else {
            return `<div class="text-[#f14c4c]">Page not found: ${page}</div>
<div class="text-[#ffd700]">Available pages: ${Object.keys(pageMap).join(', ')}</div>`;
        }
    }    // Add all the other command methods here...
    getContactCommand() {
        return `<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<div class="text-[#4dc4ff] font-bold">📧 CONTACT INFORMATION</div>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<br>
<div class="text-[#ffd700] font-bold">📨 EMAIL:</div>
<div class="text-[#cccccc]">  Address: <span class="text-[#00ff88]">contact@adilaitelhoucine.dev</span></div>
<div class="text-[#cccccc]">  Type: <span class="text-[#4dc4ff]">Professional Email</span></div>
<div class="text-[#cccccc]">  Action: <span class="text-[#ffd700]">Type 'email' to open email client</span></div>
<br>
<div class="text-[#ffd700] font-bold">📍 LOCATION:</div>
<div class="text-[#cccccc]">  Country: <span class="text-[#00ff88]">Morocco</span></div>
<div class="text-[#cccccc]">  Timezone: <span class="text-[#4dc4ff]">GMT+1 (Central European Time)</span></div>
<div class="text-[#cccccc]">  Availability: <span class="text-[#00ff88]">9:00 AM - 6:00 PM (GMT+1)</span></div>
<br>
<div class="text-[#ffd700] font-bold">⏱️ RESPONSE TIME:</div>
<div class="text-[#cccccc]">  Expected: <span class="text-[#00ff88]">24-48 hours</span></div>
<div class="text-[#cccccc]">  Urgency: <span class="text-[#4dc4ff]">Same day for urgent matters</span></div>
<div class="text-[#cccccc]">  Business Hours: <span class="text-[#ffd700]">2-4 hours response time</span></div>
<br>
<div class="text-[#ffd700] font-bold">💼 AVAILABILITY STATUS:</div>
<div class="text-[#cccccc]">  Status: <span class="text-[#00ff88]">🟢 AVAILABLE FOR OPPORTUNITIES</span></div>
<div class="text-[#cccccc]">  Type: <span class="text-[#4dc4ff]">Full-time, Part-time, Freelance</span></div>
<div class="text-[#cccccc]">  Remote: <span class="text-[#00ff88]">Yes, Remote-friendly</span></div>
<br>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<div class="text-[#ffd700]">💡 Quick Actions: 'email', 'linkedin', 'github', 'hire'</div>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>`;
    }

    getSocialCommand() {
        return `<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<div class="text-[#4dc4ff] font-bold">🌐 SOCIAL MEDIA & PROFESSIONAL PROFILES</div>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<br>
<div class="text-[#ffd700] font-bold">💼 LINKEDIN:</div>
<div class="text-[#cccccc]">  Profile: <span class="text-[#00ff88]">https://linkedin.com/in/adilaitelhoucine</span></div>
<div class="text-[#cccccc]">  Username: <span class="text-[#4dc4ff]">adilaitelhoucine</span></div>
<div class="text-[#cccccc]">  Content: <span class="text-[#ffd700]">Professional network, career updates</span></div>
<div class="text-[#cccccc]">  Action: <span class="text-[#00ff88]">Type 'linkedin' to open profile</span></div>
<br>
<div class="text-[#ffd700] font-bold">🐙 GITHUB:</div>
<div class="text-[#cccccc]">  Profile: <span class="text-[#00ff88]">https://github.com/adilaitelhoucine</span></div>
<div class="text-[#cccccc]">  Username: <span class="text-[#4dc4ff]">adilaitelhoucine</span></div>
<div class="text-[#cccccc]">  Content: <span class="text-[#ffd700]">Open source projects, code repositories</span></div>
<div class="text-[#cccccc]">  Languages: <span class="text-[#00ff88]">JavaScript, Python, React, Node.js</span></div>
<div class="text-[#cccccc]">  Action: <span class="text-[#00ff88]">Type 'github' to open profile</span></div>
<br>
<div class="text-[#ffd700] font-bold">🌍 PORTFOLIO:</div>
<div class="text-[#cccccc]">  Website: <span class="text-[#00ff88]">Currently viewing!</span></div>
<div class="text-[#cccccc]">  Type: <span class="text-[#4dc4ff]">VS Code themed portfolio</span></div>
<div class="text-[#cccccc]">  Features: <span class="text-[#ffd700]">Interactive terminal, live preview</span></div>
<br>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<div class="text-[#ffd700]">💡 Connect with me on LinkedIn for professional networking!</div>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>`;
    }    handleEmailCommand() {
        window.open('mailto:contact@adilaitelhoucine.dev');
        return `<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<div class="text-[#00ff88] font-bold">✓ EMAIL CLIENT LAUNCHED</div>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<br>
<div class="text-[#cccccc]">  Opening default email application...</div>
<div class="text-[#cccccc]">  To: <span class="text-[#4dc4ff]">contact@adilaitelhoucine.dev</span></div>
<div class="text-[#cccccc]">  Status: <span class="text-[#00ff88]">Ready to compose</span></div>
<br>
<div class="text-[#ffd700]">💡 If email client didn't open, please copy the address manually</div>`;
    }

    handleLinkedInCommand() {
        window.open('https://linkedin.com/in/adilaitelhoucine', '_blank');
        return `<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<div class="text-[#00ff88] font-bold">✓ LINKEDIN PROFILE OPENING</div>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<br>
<div class="text-[#cccccc]">  Opening LinkedIn profile in new tab...</div>
<div class="text-[#cccccc]">  Profile: <span class="text-[#4dc4ff]">Adil AIT EL HOUCINE</span></div>
<div class="text-[#cccccc]">  URL: <span class="text-[#00ff88]">linkedin.com/in/adilaitelhoucine</span></div>
<br>
<div class="text-[#ffd700]">💡 Connect with me for professional networking!</div>`;
    }

    handleGitHubCommand() {
        window.open('https://github.com/adilaitelhoucine', '_blank');
        return `<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<div class="text-[#00ff88] font-bold">✓ GITHUB PROFILE OPENING</div>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<br>
<div class="text-[#cccccc]">  Opening GitHub profile in new tab...</div>
<div class="text-[#cccccc]">  Profile: <span class="text-[#4dc4ff]">adilaitelhoucine</span></div>
<div class="text-[#cccccc]">  URL: <span class="text-[#00ff88]">github.com/adilaitelhoucine</span></div>
<br>
<div class="text-[#ffd700]">💡 Check out my repositories and open source contributions!</div>`;
    }

    getAboutCommand() {
        return `<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<div class="text-[#4dc4ff] font-bold">ℹ️ ABOUT ADIL AIT EL HOUCINE</div>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<br>
<div class="text-[#ffd700] font-bold">👨‍💻 PROFESSIONAL OVERVIEW:</div>
<div class="text-[#cccccc]">  Full Stack Developer passionate about creating</div>
<div class="text-[#cccccc]">  innovative web applications and digital solutions.</div>
<div class="text-[#cccccc]">  Specialized in modern JavaScript technologies</div>
<div class="text-[#cccccc]">  and responsive user interface design.</div>
<br>
<div class="text-[#ffd700] font-bold">🎯 FOCUS AREAS:</div>
<div class="text-[#cccccc]">  • <span class="text-[#00ff88]">Frontend: React, Vue.js, Modern CSS</span></div>
<div class="text-[#cccccc]">  • <span class="text-[#4dc4ff]">Backend: Node.js, Python, APIs</span></div>
<div class="text-[#cccccc]">  • <span class="text-[#ffd700]">UI/UX: Responsive Design, User Experience</span></div>
<div class="text-[#cccccc]">  • <span class="text-[#00ff88]">DevOps: Modern deployment workflows</span></div>
<br>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<div class="text-[#ffd700]">💡 Type 'goto about' for detailed biography and background</div>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>`;
    }

    getProjectsCommand() {
        return `<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<div class="text-[#4dc4ff] font-bold">🚀 PROJECTS OVERVIEW</div>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<br>
<div class="text-[#ffd700] font-bold">💼 FEATURED PROJECTS:</div>
<div class="text-[#cccccc]">  Portfolio showcasing modern web development</div>
<div class="text-[#cccccc]">  projects built with cutting-edge technologies.</div>
<br>
<div class="text-[#ffd700] font-bold">🛠️ TECHNOLOGIES USED:</div>
<div class="text-[#cccccc]">  • <span class="text-[#00ff88]">Frontend: React, Vue.js, Vanilla JS</span></div>
<div class="text-[#cccccc]">  • <span class="text-[#4dc4ff]">Styling: Tailwind CSS, SASS, Bootstrap</span></div>
<div class="text-[#cccccc]">  • <span class="text-[#ffd700]">Backend: Node.js, Express, MongoDB</span></div>
<div class="text-[#cccccc]">  • <span class="text-[#00ff88]">Deployment: Vercel, Netlify, AWS</span></div>
<br>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<div class="text-[#ffd700]">💡 Type 'goto projects' to explore detailed project showcase</div>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>`;
    }

    getExperienceCommand() {
        return `<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<div class="text-[#4dc4ff] font-bold">💼 WORK EXPERIENCE</div>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<br>
<div class="text-[#ffd700] font-bold">🏢 PROFESSIONAL BACKGROUND:</div>
<div class="text-[#cccccc]">  Experienced in full-stack web development</div>
<div class="text-[#cccccc]">  with focus on modern technologies and</div>
<div class="text-[#cccccc]">  scalable application architecture.</div>
<br>
<div class="text-[#ffd700] font-bold">🎯 KEY RESPONSIBILITIES:</div>
<div class="text-[#cccccc]">  • <span class="text-[#00ff88]">Frontend development with React/Vue</span></div>
<div class="text-[#cccccc]">  • <span class="text-[#4dc4ff]">Backend API development</span></div>
<div class="text-[#cccccc]">  • <span class="text-[#ffd700]">Database design and optimization</span></div>
<div class="text-[#cccccc]">  • <span class="text-[#00ff88]">Code review and team collaboration</span></div>
<br>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<div class="text-[#ffd700]">💡 Type 'goto experience' for detailed work history</div>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>`;
    }

    getEducationCommand() {
        return `<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<div class="text-[#4dc4ff] font-bold">🎓 EDUCATION BACKGROUND</div>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<br>
<div class="text-[#ffd700] font-bold">📚 ACADEMIC FOUNDATION:</div>
<div class="text-[#cccccc]">  Strong educational background in</div>
<div class="text-[#cccccc]">  computer science and software development</div>
<div class="text-[#cccccc]">  with continuous learning approach.</div>
<br>
<div class="text-[#ffd700] font-bold">🎯 FOCUS AREAS:</div>
<div class="text-[#cccccc]">  • <span class="text-[#00ff88]">Computer Science Fundamentals</span></div>
<div class="text-[#cccccc]">  • <span class="text-[#4dc4ff]">Software Engineering Principles</span></div>
<div class="text-[#cccccc]">  • <span class="text-[#ffd700]">Web Development Technologies</span></div>
<div class="text-[#cccccc]">  • <span class="text-[#00ff88]">Modern Development Practices</span></div>
<br>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<div class="text-[#ffd700]">💡 Type 'goto education' for detailed educational background</div>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>`;
    }    getCertificationsCommand() {
        return `<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<div class="text-[#4dc4ff] font-bold">🏆 CERTIFICATIONS & ACHIEVEMENTS</div>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<br>
<div class="text-[#ffd700] font-bold">📜 PROFESSIONAL CERTIFICATIONS:</div>
<div class="text-[#cccccc]">  Continuously improving skills through</div>
<div class="text-[#cccccc]">  professional certifications and</div>
<div class="text-[#cccccc]">  industry-recognized credentials.</div>
<br>
<div class="text-[#ffd700] font-bold">🎯 CERTIFICATION AREAS:</div>
<div class="text-[#cccccc]">  • <span class="text-[#00ff88]">Web Development Frameworks</span></div>
<div class="text-[#cccccc]">  • <span class="text-[#4dc4ff]">Cloud Technologies & Deployment</span></div>
<div class="text-[#cccccc]">  • <span class="text-[#ffd700]">Modern JavaScript & TypeScript</span></div>
<div class="text-[#cccccc]">  • <span class="text-[#00ff88]">UI/UX Design Principles</span></div>
<br>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<div class="text-[#ffd700]">💡 Type 'goto certifications' for detailed certificates list</div>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>`;
    }

    getLsCommand() {
        return `<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<div class="text-[#4dc4ff] font-bold">📂 PORTFOLIO DIRECTORY LISTING</div>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<br>
<div class="text-[#ffd700] font-bold">📁 Available Sections:</div>
<div class="text-[#cccccc]">  <span class="text-[#4dc4ff]">drwxr-xr-x</span>  <span class="text-[#00ff88]">about/</span>          Personal information</div>
<div class="text-[#cccccc]">  <span class="text-[#4dc4ff]">drwxr-xr-x</span>  <span class="text-[#00ff88]">contact/</span>        Contact details</div>
<div class="text-[#cccccc]">  <span class="text-[#4dc4ff]">drwxr-xr-x</span>  <span class="text-[#00ff88]">experience/</span>     Work history</div>
<div class="text-[#cccccc]">  <span class="text-[#4dc4ff]">drwxr-xr-x</span>  <span class="text-[#00ff88]">education/</span>      Academic background</div>
<div class="text-[#cccccc]">  <span class="text-[#4dc4ff]">drwxr-xr-x</span>  <span class="text-[#00ff88]">projects/</span>       Portfolio showcase</div>
<div class="text-[#cccccc]">  <span class="text-[#4dc4ff]">drwxr-xr-x</span>  <span class="text-[#00ff88]">skills/</span>         Technical abilities</div>
<div class="text-[#cccccc]">  <span class="text-[#4dc4ff]">drwxr-xr-x</span>  <span class="text-[#00ff88]">certifications/</span> Achievements</div>
<br>
<div class="text-[#ffd700] font-bold">📍 Current Location:</div>
<div class="text-[#cccccc]">  You are here: <span class="text-[#4dc4ff]">/portfolio/${this.currentPage}/</span></div>
<br>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>`;
    }

    getTreeCommand() {
        return `<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<div class="text-[#4dc4ff] font-bold">🌳 PORTFOLIO STRUCTURE TREE</div>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<br>
<div class="text-[#cccccc]">portfolio/</div>
<div class="text-[#cccccc]">├── <span class="text-[#00ff88]">about/</span>          👨‍💻 Personal & professional info</div>
<div class="text-[#cccccc]">├── <span class="text-[#00ff88]">contact/</span>        📧 Get in touch</div>
<div class="text-[#cccccc]">├── <span class="text-[#00ff88]">experience/</span>     💼 Work history & roles</div>
<div class="text-[#cccccc]">├── <span class="text-[#00ff88]">education/</span>      🎓 Academic background</div>
<div class="text-[#cccccc]">├── <span class="text-[#00ff88]">projects/</span>       🚀 Featured work</div>
<div class="text-[#cccccc]">├── <span class="text-[#00ff88]">skills/</span>         🛠️ Technical expertise</div>
<div class="text-[#cccccc]">└── <span class="text-[#00ff88]">certifications/</span> 🏆 Achievements</div>
<br>
<div class="text-[#ffd700] font-bold">📍 You are here:</div>
<div class="text-[#cccccc]">portfolio/<span class="text-[#4dc4ff] font-bold">${this.currentPage}</span>/ <span class="text-[#00ff88]">← Current location</span></div>
<br>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>`;
    }

    handleDownloadCommand() {
        return `<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<div class="text-[#4dc4ff] font-bold">📄 CV/RESUME DOWNLOAD</div>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<br>
<div class="text-[#ffd700] font-bold">📋 AVAILABLE FORMATS:</div>
<div class="text-[#cccccc]">  • <span class="text-[#00ff88]">PDF Format</span> - Professional layout</div>
<div class="text-[#cccccc]">  • <span class="text-[#4dc4ff]">Word Format</span> - Editable document</div>
<br>
<div class="text-[#ffd700] font-bold">📧 REQUEST PROCESS:</div>
<div class="text-[#cccccc]">  Please contact me via email to request</div>
<div class="text-[#cccccc]">  the latest version of my CV/Resume.</div>
<br>
<div class="text-[#ffd700] font-bold">🚀 QUICK ACTION:</div>
<div class="text-[#cccccc]">  Type <span class="text-[#00ff88]">'email'</span> to send a CV request</div>
<br>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>`;
    }

    handleCVCommand() {
        return this.handleDownloadCommand();
    }

    getPortfolioCommand() {
        return `<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<div class="text-[#4dc4ff] font-bold">🌟 PORTFOLIO OVERVIEW</div>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<br>
<div class="text-[#ffd700] font-bold">🎨 PORTFOLIO FEATURES:</div>
<div class="text-[#cccccc]">  • <span class="text-[#00ff88]">VS Code Theme</span> - Professional developer aesthetic</div>
<div class="text-[#cccccc]">  • <span class="text-[#4dc4ff]">Interactive Terminal</span> - Command-line navigation</div>
<div class="text-[#cccccc]">  • <span class="text-[#ffd700]">Modern Design</span> - Clean, responsive layout</div>
<div class="text-[#cccccc]">  • <span class="text-[#00ff88]">Live Features</span> - Dynamic content and animations</div>
<br>
<div class="text-[#ffd700] font-bold">🛠️ BUILT WITH:</div>
<div class="text-[#cccccc]">  • <span class="text-[#00ff88]">HTML5, CSS3, JavaScript</span></div>
<div class="text-[#cccccc]">  • <span class="text-[#4dc4ff]">Tailwind CSS for styling</span></div>
<div class="text-[#cccccc]">  • <span class="text-[#ffd700]">Bootstrap Icons for UI elements</span></div>
<div class="text-[#cccccc]">  • <span class="text-[#00ff88]">Custom terminal implementation</span></div>
<br>
<div class="text-[#ffd700] font-bold">🎯 NAVIGATION:</div>
<div class="text-[#cccccc]">  Type <span class="text-[#00ff88]">'nav'</span> to see all available sections</div>
<div class="text-[#cccccc]">  Type <span class="text-[#4dc4ff]">'help'</span> for complete command list</div>
<br>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<div class="text-[#00ff88] font-bold">🚀 Welcome to my interactive portfolio!</div>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>`;
    }// Add more command methods as needed...
    getWhoamiCommand() {
        return `<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<div class="text-[#4dc4ff] font-bold">👨‍💻 DEVELOPER PROFILE</div>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<br>
<div class="text-[#ffd700] font-bold">👤 PERSONAL:</div>
<div class="text-[#cccccc]">  Name: <span class="text-[#00ff88]">Adil AIT EL HOUCINE</span></div>
<div class="text-[#cccccc]">  Role: <span class="text-[#4dc4ff]">Full Stack Developer</span></div>
<div class="text-[#cccccc]">  Location: <span class="text-[#00ff88]">Morocco</span></div>
<div class="text-[#cccccc]">  Experience: <span class="text-[#ffd700]">Professional Software Developer</span></div>
<br>
<div class="text-[#ffd700] font-bold">🎯 PASSION:</div>
<div class="text-[#cccccc]">  Focus: <span class="text-[#00ff88]">Building innovative web applications</span></div>
<div class="text-[#cccccc]">  Interests: <span class="text-[#4dc4ff]">Modern web technologies, UI/UX</span></div>
<div class="text-[#cccccc]">  Goal: <span class="text-[#ffd700]">Creating impactful digital solutions</span></div>
<br>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>`;
    }

    getStatusCommand() {
        return `<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<div class="text-[#4dc4ff] font-bold">💼 AVAILABILITY STATUS</div>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<br>
<div class="text-[#ffd700] font-bold">🟢 CURRENT STATUS:</div>
<div class="text-[#cccccc]">  Availability: <span class="text-[#00ff88]">OPEN TO OPPORTUNITIES</span></div>
<div class="text-[#cccccc]">  Type: <span class="text-[#4dc4ff]">Full-time, Part-time, Freelance</span></div>
<div class="text-[#cccccc]">  Remote Work: <span class="text-[#00ff88]">Available</span></div>
<div class="text-[#cccccc]">  Start Date: <span class="text-[#ffd700]">Immediate to 2 weeks notice</span></div>
<br>
<div class="text-[#ffd700] font-bold">📞 CONTACT PREFERENCE:</div>
<div class="text-[#cccccc]">  Primary: <span class="text-[#00ff88]">Email (contact@adilaitelhoucine.dev)</span></div>
<div class="text-[#cccccc]">  Response: <span class="text-[#4dc4ff]">24-48 hours</span></div>
<div class="text-[#cccccc]">  LinkedIn: <span class="text-[#ffd700]">Professional networking</span></div>
<br>
<div class="text-[#ffd700] font-bold">📅 LAST UPDATED:</div>
<div class="text-[#cccccc]">  Date: <span class="text-[#00ff88]">June 18, 2025</span></div>
<div class="text-[#cccccc]">  Time: <span class="text-[#4dc4ff]">${new Date().toLocaleTimeString()}</span></div>
<br>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<div class="text-[#ffd700]">💡 Ready to discuss opportunities! Type 'hire' for more info</div>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>`;
    }

    getSkillsCommand() {
        return `<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<div class="text-[#4dc4ff] font-bold">🚀 TECHNICAL SKILLS & EXPERTISE</div>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<br>
<div class="text-[#ffd700] font-bold">🌐 FRONTEND TECHNOLOGIES:</div>
<div class="text-[#cccccc]">  Languages: <span class="text-[#00ff88]">HTML5, CSS3, JavaScript (ES6+)</span></div>
<div class="text-[#cccccc]">  Frameworks: <span class="text-[#4dc4ff]">React.js, Vue.js, Angular</span></div>
<div class="text-[#cccccc]">  Styling: <span class="text-[#ffd700]">Tailwind CSS, Bootstrap, SASS</span></div>
<div class="text-[#cccccc]">  Tools: <span class="text-[#00ff88]">Webpack, Vite, Parcel</span></div>
<br>
<div class="text-[#ffd700] font-bold">⚙️ BACKEND TECHNOLOGIES:</div>
<div class="text-[#cccccc]">  Languages: <span class="text-[#00ff88]">Node.js, Python, PHP</span></div>
<div class="text-[#cccccc]">  Frameworks: <span class="text-[#4dc4ff]">Express.js, Django, Laravel</span></div>
<div class="text-[#cccccc]">  Databases: <span class="text-[#ffd700]">MongoDB, MySQL, PostgreSQL</span></div>
<div class="text-[#cccccc]">  APIs: <span class="text-[#00ff88]">REST, GraphQL, WebSocket</span></div>
<br>
<div class="text-[#ffd700] font-bold">🛠️ DEVELOPMENT TOOLS:</div>
<div class="text-[#cccccc]">  Version Control: <span class="text-[#00ff88]">Git, GitHub, GitLab</span></div>
<div class="text-[#cccccc]">  IDE/Editors: <span class="text-[#4dc4ff]">VS Code, WebStorm, Sublime</span></div>
<div class="text-[#cccccc]">  DevOps: <span class="text-[#ffd700]">Docker, CI/CD, AWS, Vercel</span></div>
<br>
<div class="text-[#ffd700] font-bold">📊 SPECIALIZATIONS:</div>
<div class="text-[#cccccc]">  • <span class="text-[#00ff88]">Full Stack Development</span></div>
<div class="text-[#cccccc]">  • <span class="text-[#4dc4ff]">Modern Web Applications</span></div>
<div class="text-[#cccccc]">  • <span class="text-[#ffd700]">Responsive UI/UX Design</span></div>
<div class="text-[#cccccc]">  • <span class="text-[#00ff88]">Performance Optimization</span></div>
<br>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<div class="text-[#ffd700]">💡 Type 'goto skills' to see interactive skills showcase</div>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>`;
    }

    getHireCommand() {
        return `<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<div class="text-[#4dc4ff] font-bold">💼 READY TO HIRE ME?</div>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<br>
<div class="text-[#ffd700] font-bold">📧 GET IN TOUCH:</div>
<div class="text-[#cccccc]">  Email: <span class="text-[#00ff88]">contact@adilaitelhoucine.dev</span></div>
<div class="text-[#cccccc]">  LinkedIn: <span class="text-[#4dc4ff]">Professional networking</span></div>
<div class="text-[#cccccc]">  Response: <span class="text-[#ffd700]">Quick turnaround (24-48 hours)</span></div>
<br>
<div class="text-[#ffd700] font-bold">💰 COLLABORATION OPTIONS:</div>
<div class="text-[#cccccc]">  • <span class="text-[#00ff88]">Full-time Employment</span></div>
<div class="text-[#cccccc]">  • <span class="text-[#4dc4ff]">Part-time Contracts</span></div>
<div class="text-[#cccccc]">  • <span class="text-[#ffd700]">Freelance Projects</span></div>
<div class="text-[#cccccc]">  • <span class="text-[#00ff88]">Remote Work Available</span></div>
<br>
<div class="text-[#ffd700] font-bold">🎯 WHAT I BRING:</div>
<div class="text-[#cccccc]">  • <span class="text-[#00ff88]">Modern web development expertise</span></div>
<div class="text-[#cccccc]">  • <span class="text-[#4dc4ff]">Clean, maintainable code</span></div>
<div class="text-[#cccccc]">  • <span class="text-[#ffd700]">Strong problem-solving skills</span></div>
<div class="text-[#cccccc]">  • <span class="text-[#00ff88]">Excellent communication</span></div>
<br>
<div class="text-[#ffd700] font-bold">🚀 NEXT STEPS:</div>
<div class="text-[#cccccc]">  1. <span class="text-[#00ff88]">Type 'email' to send me a message</span></div>
<div class="text-[#cccccc]">  2. <span class="text-[#4dc4ff]">Type 'linkedin' to connect professionally</span></div>
<div class="text-[#cccccc]">  3. <span class="text-[#ffd700]">Type 'cv' to download my resume</span></div>
<br>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<div class="text-[#00ff88] font-bold">🤝 Let's build something amazing together!</div>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>`;
    }

    handleThemeCommand(args) {
        if (!args || args.length === 0) {
            const currentTheme = document.body.getAttribute('data-theme') || 'dark';
            return `<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<div class="text-[#4dc4ff] font-bold">🎨 THEME SWITCHER</div>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<br>
<div class="text-[#ffd700] font-bold">📋 CURRENT THEME:</div>
<div class="text-[#cccccc]">  Active: <span class="text-[#00ff88]">${currentTheme.toUpperCase()}</span></div>
<br>
<div class="text-[#ffd700] font-bold">🎨 AVAILABLE THEMES:</div>
<div class="text-[#cccccc]">  • <span class="text-[#00ff88]">dark</span>    - Professional dark mode (VS Code style)</div>
<div class="text-[#cccccc]">  • <span class="text-[#4dc4ff]">light</span>   - Clean light mode (Modern & bright)</div>
<br>
<div class="text-[#ffd700] font-bold">🚀 USAGE:</div>
<div class="text-[#cccccc]">  <span class="text-[#00ff88]">theme dark</span>     Switch to dark mode</div>
<div class="text-[#cccccc]">  <span class="text-[#4dc4ff]">theme light</span>    Switch to light mode</div>
<div class="text-[#cccccc]">  <span class="text-[#ffd700]">theme</span>          Show current theme info</div>
<br>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>`;
        }

        const theme = args[0].toLowerCase();
        
        if (theme === 'dark' || theme === 'light') {
            this.switchTheme(theme);
            return `<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<div class="text-[#00ff88] font-bold">✓ THEME SWITCHED TO ${theme.toUpperCase()}</div>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>
<br>
<div class="text-[#cccccc]">  Theme: <span class="text-[#4dc4ff]">${theme.charAt(0).toUpperCase() + theme.slice(1)} Mode</span></div>
<div class="text-[#cccccc]">  Status: <span class="text-[#00ff88]">Applied Successfully</span></div>
<div class="text-[#cccccc]">  Scope: <span class="text-[#ffd700]">Entire Portfolio</span></div>
<br>
<div class="text-[#ffd700]">💡 Theme preference saved locally!</div>
<div class="text-[#569cd6]">═══════════════════════════════════════════════════════════════</div>`;
        } else {
            return `<div class="text-[#f14c4c]">Invalid theme: ${theme}</div>
<div class="text-[#ffd700]">Available themes: dark, light</div>
<div class="text-[#cccccc]">Usage: theme [dark|light]</div>`;
        }
    }

    switchTheme(theme) {
        // Apply theme to body
        document.body.setAttribute('data-theme', theme);
        
        // Save theme preference
        localStorage.setItem('portfolio-theme', theme);
        
        // Apply theme-specific styles
        if (theme === 'light') {
            this.applyLightTheme();
        } else {
            this.applyDarkTheme();
        }
        
        // Update terminal colors
        this.updateTerminalTheme(theme);
    }    applyLightTheme() {
        // Create or update light theme CSS
        let lightThemeStyle = document.getElementById('lightThemeStyle');
        if (!lightThemeStyle) {
            lightThemeStyle = document.createElement('style');
            lightThemeStyle.id = 'lightThemeStyle';
            document.head.appendChild(lightThemeStyle);
        }
        
        lightThemeStyle.textContent = `
            /* Additional dynamic light theme styles */
            [data-theme="light"] .bg-\\[\\#1e1e1e\\] {
                background: #ffffff !important;
            }
            
            [data-theme="light"] .bg-\\[\\#252526\\] {
                background: #f8f9fa !important;
            }
            
            [data-theme="light"] .bg-\\[\\#2d2d30\\] {
                background: #e9ecef !important;
            }
            
            [data-theme="light"] .text-\\[\\#4dc4ff\\] {
                color: #3182ce !important;
            }
            
            [data-theme="light"] .text-\\[\\#00ff88\\] {
                color: #38a169 !important;
            }
            
            [data-theme="light"] .text-\\[\\#ffd700\\] {
                color: #d69e2e !important;
            }
            
            [data-theme="light"] .text-\\[\\#f14c4c\\] {
                color: #e53e3e !important;
            }
            
            [data-theme="light"] .text-\\[\\#569cd6\\] {
                color: #6f42c1 !important;
            }
            
            [data-theme="light"] .text-\\[\\#ce9178\\] {
                color: #d73a49 !important;
            }
            
            [data-theme="light"] .border-\\[\\#3c3c3c\\] {
                border-color: #e2e8f0 !important;
            }
            
            /* Override specific Tailwind classes */
            [data-theme="light"] .bg-gray-900 {
                background: #ffffff !important;
            }
            
            [data-theme="light"] .bg-gray-800 {
                background: #f8f9fa !important;
            }
            
            [data-theme="light"] .bg-gray-700 {
                background: #e9ecef !important;
            }
            
            [data-theme="light"] .text-gray-100 {
                color: #2d3748 !important;
            }
            
            [data-theme="light"] .text-gray-300 {
                color: #4a5568 !important;
            }
            
            [data-theme="light"] .text-gray-400 {
                color: #718096 !important;
            }
            
            /* Ensure all elements transition smoothly */
            [data-theme="light"] * {
                transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
            }
        `;
        
        // Update page title to show light mode
        document.title = document.title.replace(' - VSCode Portfolio', ' - VSCode Portfolio (Light Mode)');
    }    applyDarkTheme() {
        // Remove light theme styles
        const lightThemeStyle = document.getElementById('lightThemeStyle');
        if (lightThemeStyle) {
            lightThemeStyle.remove();
        }
        
        // Update page title to show dark mode (default)
        document.title = document.title.replace(' (Light Mode)', '');
    }

    updateTerminalTheme(theme) {
        const terminal = document.getElementById('universalTerminal');
        if (terminal) {
            terminal.setAttribute('data-theme', theme);
        }
    }
}

// Initialize terminal when page loads
let portfolioTerminal;
document.addEventListener('DOMContentLoaded', function() {
    portfolioTerminal = new PortfolioTerminal();
});
