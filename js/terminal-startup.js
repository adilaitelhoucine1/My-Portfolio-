// Terminal Simulation for startup
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the index page to show terminal
    if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
        setTimeout(showStartupTerminal, 500);
    }
});

function showStartupTerminal() {
    // Create terminal container
    const terminalContainer = document.createElement('div');
    terminalContainer.className = 'terminal-container fixed bottom-6 right-6 w-[600px] h-[300px] bg-[#1e1e1e] rounded-lg shadow-lg overflow-hidden z-50 border border-[#333] flex flex-col';
    
    // Create terminal header
    const terminalHeader = document.createElement('div');
    terminalHeader.className = 'terminal-header flex items-center justify-between px-2 py-1 bg-[#252526] border-b border-[#333]';
    terminalHeader.innerHTML = `
        <div class="flex items-center">
            <i class="bi bi-terminal text-[#cccccc] mr-2"></i>
            <span class="text-[#cccccc] text-xs">Terminal: PowerShell</span>
        </div>
        <div class="flex">
            <button id="minimize-terminal" class="px-2 py-1 text-xs text-[#cccccc] hover:bg-[#333]">─</button>
            <button id="maximize-terminal" class="px-2 py-1 text-xs text-[#cccccc] hover:bg-[#333]">□</button>
            <button id="close-terminal" class="px-2 py-1 text-xs text-[#cccccc] hover:bg-[#e81123]">×</button>
        </div>
    `;
    
    // Create terminal content
    const terminalContent = document.createElement('div');
    terminalContent.className = 'terminal-content flex-1 p-3 font-mono text-sm text-[#cccccc] overflow-y-auto';
    terminalContent.innerHTML = '<div id="terminal-lines"></div>';
    
    // Append elements
    terminalContainer.appendChild(terminalHeader);
    terminalContainer.appendChild(terminalContent);
    document.body.appendChild(terminalContainer);
    
    // Handle close button
    document.getElementById('close-terminal').addEventListener('click', function() {
        terminalContainer.style.animation = 'fadeOut 0.3s';
        setTimeout(() => terminalContainer.remove(), 300);
    });
    
    // Handle minimize button
    document.getElementById('minimize-terminal').addEventListener('click', function() {
        terminalContainer.style.height = '30px';
        terminalContent.style.display = 'none';
        this.id = 'restore-terminal';
    });
    
    // Handle maximize button (toggle)
    document.getElementById('maximize-terminal').addEventListener('click', function() {
        if (terminalContainer.style.height === '80vh') {
            terminalContainer.style.height = '300px';
            terminalContainer.style.width = '600px';
        } else {
            terminalContainer.style.height = '80vh';
            terminalContainer.style.width = '80vw';
        }
    });
    
    // If we click on the header when minimized, restore it
    terminalHeader.addEventListener('click', function(e) {
        if (e.target.id !== 'close-terminal' && e.target.id !== 'maximize-terminal' && terminalContent.style.display === 'none') {
            terminalContainer.style.height = '300px';
            terminalContent.style.display = 'block';
            document.getElementById('restore-terminal').id = 'minimize-terminal';
        }
    });
    
    // Simulate terminal typing
    const lines = [
        { text: "PS C:\\Users\\LENOVO\\Desktop\\Projects\\My-Portfolio-> npm start", delay: 500 },
        { text: "> portfolio-vscode@1.0.0 start", delay: 300 },
        { text: "> node server.js", delay: 300 },
        { text: "", delay: 500 },
        { text: "Starting development server...", delay: 700 },
        { text: "Compiled successfully!", delay: 1000 },
        { text: "", delay: 200 },
        { text: "You can now view Portfolio-VSCode in the browser.", delay: 300 },
        { text: "", delay: 200 },
        { text: "  Local:            http://localhost:3000", delay: 300 },
        { text: "  On Your Network:  http://192.168.1.5:3000", delay: 300 },
        { text: "", delay: 200 },
        { text: "Note that the development build is not optimized.", delay: 500 },
        { text: "To create a production build, use npm run build.", delay: 300 },
        { text: "", delay: 500 },
        { text: "Welcome to my VSCode Portfolio! Navigate through the sidebar to explore different sections.", delay: 1000 }
    ];
    
    const terminalLines = document.getElementById('terminal-lines');
    let lineIndex = 0;
    
    function typeLine() {
        if (lineIndex < lines.length) {
            const line = document.createElement('div');
            line.className = 'mb-1';
            line.innerText = lines[lineIndex].text;
            terminalLines.appendChild(line);
            
            // Auto scroll to bottom
            terminalContent.scrollTop = terminalContent.scrollHeight;
            
            lineIndex++;
            setTimeout(typeLine, lines[lineIndex-1].delay);
        } else {
            // Add a blinking cursor at the end
            const promptLine = document.createElement('div');
            promptLine.className = 'flex';
            promptLine.innerHTML = `
                <span class="text-[#569cd6]">PS C:\\Users\\LENOVO\\Desktop\\Projects\\My-Portfolio-></span>
                <span class="blink-cursor ml-1">█</span>
            `;
            terminalLines.appendChild(promptLine);
        }
    }
    
    // Start typing animation
    typeLine();
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    .blink-cursor {
        animation: blink 1s step-end infinite;
    }
    
    @keyframes blink {
        from, to { opacity: 1; }
        50% { opacity: 0; }
    }
    
    .terminal-container {
        animation: slideUp 0.3s ease-out;
    }
    
    @keyframes slideUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
`;
document.head.appendChild(style);
