// Interactive Terminal with real commands
document.addEventListener('DOMContentLoaded', function() {
    let terminalVisible = false;
    let commandHistory = [];
    let historyIndex = -1;
    
    // Add terminal toggle to command palette events
    document.addEventListener('command-executed', function(e) {
        if (e.detail.command === 'toggle-terminal') {
            toggleTerminal();
        }
    });
    
    function createInteractiveTerminal() {
        const terminalHTML = `
            <div id="interactive-terminal" class="fixed bottom-0 left-[300px] right-0 h-[250px] bg-[#1e1e1e] border-t border-[#333] z-40 transform translate-y-full transition-transform duration-300">
                <div class="terminal-header flex items-center justify-between px-3 py-2 bg-[#252526] border-b border-[#333]">
                    <div class="flex items-center space-x-3">
                        <i class="bi bi-terminal text-[#cccccc]"></i>
                        <span class="text-[#cccccc] text-sm">Terminal</span>
                        <div class="flex space-x-2 ml-4">
                            <button class="terminal-tab active px-2 py-1 text-xs bg-[#1e1e1e] text-[#cccccc] border-t-2 border-[#007acc] rounded-t">powershell</button>
                        </div>
                    </div>
                    <div class="flex">
                        <button id="terminal-minimize" class="px-2 py-1 text-xs text-[#cccccc] hover:bg-[#333]">─</button>
                        <button id="terminal-close" class="px-2 py-1 text-xs text-[#cccccc] hover:bg-[#e81123]">×</button>
                    </div>
                </div>
                <div class="terminal-body h-[200px] p-3 font-mono text-sm text-[#cccccc] overflow-y-auto">
                    <div id="terminal-output"></div>
                    <div class="terminal-input-line flex items-center">
                        <span class="terminal-prompt text-[#569cd6]">PS C:\\Users\\LENOVO\\Desktop\\Portfolio></span>
                        <input type="text" id="terminal-input" class="flex-1 bg-transparent text-[#cccccc] ml-1 border-none outline-none" autocomplete="off">
                        <span class="cursor-blink">_</span>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', terminalHTML);
        
        const terminal = document.getElementById('interactive-terminal');
        const terminalInput = document.getElementById('terminal-input');
        const terminalOutput = document.getElementById('terminal-output');
        
        // Terminal commands
        const commands = {
            'help': () => `Available commands:
  help      - Show this help message
  about     - Display information about me
  skills    - List my technical skills
  projects  - Show my projects
  contact   - Get my contact information
  experience- View my work experience
  education - View my education
  clear     - Clear terminal screen
  ls        - List directory contents
  pwd       - Print working directory
  whoami    - Display current user
  date      - Show current date and time
  tree      - Display project structure
  npm start - Start development server
  git status- Show git repository status`,
            
            'about': () => `Adil AIT EL HOUCINE
Full Stack Developer from Morocco

Passionate developer with expertise in building modern web applications
using React, Laravel, and other cutting-edge technologies. I specialize
in creating clean, efficient, and scalable solutions for complex
development challenges.`,
            
            'skills': () => `Technical Skills:
  Frontend: JavaScript, React, HTML5, CSS3, TailwindCSS
  Backend:  PHP, Laravel, Node.js
  Database: MySQL, PostgreSQL, MongoDB
  Tools:    Git, VS Code, Docker, Postman
  Other:    RESTful APIs, MVC Architecture, Responsive Design`,
            
            'projects': () => `Recent Projects:
  1. VSCode Portfolio - Interactive portfolio website mimicking VS Code
  2. E-commerce Platform - Full-stack Laravel application
  3. Task Management App - React with Redux state management
  4. Restaurant Booking System - PHP/MySQL backend with React frontend
  
Use the file explorer or visit projects.html for more details!`,
              'contact': () => `Contact Information:
  Email:    adilaitelhoucine1@gmail.com
  LinkedIn: https://linkedin.com/in/adilaitelhoucine
  GitHub:   https://github.com/adilaitelhoucine
  Location: Morocco
  
Visit contact.html to send me a message!`,
            
            'experience': () => `Work Experience:
  • Full Stack Developer at Tech Company (2023-Present)
  • Frontend Developer at Startup (2022-2023)
  • Junior Developer at Local Agency (2021-2022)
  
Visit about.html for more details!`,
            
            'education': () => `Education:
  • Bachelor's Degree in Computer Science (2019-2022)
  • Various online certifications in web development
  
Visit education.html for complete details!`,
            
            'clear': () => { terminalOutput.innerHTML = ''; return ''; },
            
            'ls': () => `Directory: C:\\Users\\LENOVO\\Desktop\\Portfolio

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----        6/16/2025   2:30 PM                src
d-----        6/16/2025   2:30 PM                styles
d-----        6/16/2025   2:30 PM                js
d-----        6/16/2025   2:30 PM                images
-a----        6/16/2025   2:30 PM           2134 about.html
-a----        6/16/2025   2:30 PM           1856 contact.html
-a----        6/16/2025   2:30 PM           1923 projects.html
-a----        6/16/2025   2:30 PM           1834 skills.html
-a----        6/16/2025   2:30 PM           1789 experience.html
-a----        6/16/2025   2:30 PM           1567 education.html
-a----        6/16/2025   2:30 PM            456 package.json
-a----        6/16/2025   2:30 PM            834 README.md`,
            
            'pwd': () => 'C:\\Users\\LENOVO\\Desktop\\Portfolio',
            
            'whoami': () => 'adilaitelhoucine\\developer',
            
            'date': () => new Date().toString(),
              'tree': () => `Portfolio/
│   about.html
│   contact.html
│   projects.html
│   skills.html
│   experience.html
│   education.html
│   certifications.html
│   package.json
│   README.md
│
├───src/
│   ├───components/
│   │       About.jsx
│   │       Experience.jsx
│   │       Projects.jsx
│   │       Skills.jsx
│   │
│   └───data/
│           experience.json
│           projects.json
│           skills.json
│
├───styles/
│       colors.css
│       editor-features.css
│       command-palette.css
│       theme-switcher.css
│
├───js/
│       portfolio-script.js
│       editor-features.js
│       command-palette.js
│       terminal-startup.js
│       theme-switcher.js
│
└───images/
        github.png
        linkedin.png
        sociale.png`,
        
            'npm start': () => `> portfolio-vscode@1.0.0 start
> node server.js

Starting development server...
Compiled successfully!

You can now view Portfolio-VSCode in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.5:3000

Development server is already running!`,
            
            'git status': () => `On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   index.html
        modified:   styles/colors.css

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        js/interactive-terminal.js

no changes added to commit (use "git add ." or "git commit -a")`
        };
        
        // Handle input
        terminalInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const command = this.value.trim();
                if (command) {
                    // Add to history
                    commandHistory.push(command);
                    historyIndex = commandHistory.length;
                    
                    // Display command
                    const commandLine = document.createElement('div');
                    commandLine.innerHTML = `<span class="text-[#569cd6]">PS C:\\Users\\LENOVO\\Desktop\\Portfolio></span> ${command}`;
                    terminalOutput.appendChild(commandLine);
                    
                    // Execute command
                    const output = executeCommand(command);
                    if (output) {
                        const outputDiv = document.createElement('div');
                        outputDiv.className = 'mb-2 whitespace-pre-line';
                        outputDiv.textContent = output;
                        terminalOutput.appendChild(outputDiv);
                    }
                    
                    // Clear input and scroll to bottom
                    this.value = '';
                    terminalOutput.scrollTop = terminalOutput.scrollHeight;
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (historyIndex > 0) {
                    historyIndex--;
                    this.value = commandHistory[historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    this.value = commandHistory[historyIndex];
                } else {
                    historyIndex = commandHistory.length;
                    this.value = '';
                }
            }
        });
        
        function executeCommand(cmd) {
            const lowerCmd = cmd.toLowerCase();
            if (commands[lowerCmd]) {
                return commands[lowerCmd]();
            } else {
                return `'${cmd}' is not recognized as an internal or external command.
Type 'help' to see available commands.`;
            }
        }
        
        // Handle terminal controls
        document.getElementById('terminal-close').addEventListener('click', () => {
            toggleTerminal();
        });
        
        document.getElementById('terminal-minimize').addEventListener('click', () => {
            terminal.style.height = '40px';
            terminal.querySelector('.terminal-body').style.display = 'none';
        });
        
        // Focus input when terminal is clicked
        terminal.addEventListener('click', () => {
            if (terminalVisible) {
                terminalInput.focus();
            }
        });
    }
    
    function toggleTerminal() {
        if (!document.getElementById('interactive-terminal')) {
            createInteractiveTerminal();
        }
        
        const terminal = document.getElementById('interactive-terminal');
        const terminalInput = document.getElementById('terminal-input');
        
        if (terminalVisible) {
            terminal.style.transform = 'translateY(100%)';
            terminalVisible = false;
        } else {
            terminal.style.transform = 'translateY(0)';
            terminalVisible = true;
            setTimeout(() => terminalInput.focus(), 300);
        }
    }
    
    // Add keyboard shortcut for terminal
    document.addEventListener('keydown', function(e) {
        // Ctrl+` or Ctrl+Shift+` to toggle terminal
        if ((e.ctrlKey && e.key === '`') || (e.ctrlKey && e.shiftKey && e.key === '~')) {
            e.preventDefault();
            toggleTerminal();
        }
    });
});
