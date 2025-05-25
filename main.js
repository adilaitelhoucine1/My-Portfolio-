document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true
    });

    // Initialize Particles.js if available
    if (window.particlesJS) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#ffffff' },
                opacity: { value: 0.1 },
                size: { value: 3 },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'repulse' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                }
            },
            retina_detect: true
        });
    }

    // Window Management
    const folderWindow = document.getElementById('folder-window');
    const folders = document.querySelectorAll('.group');
    let activeWindow = null;
    let zIndex = 100;
    
    if (!folderWindow) {
        console.error('Folder window element not found');
        return;
    }

    // Setup window dragging
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;

    function dragStart(e) {
        const windowHeader = e.target.closest('.h-8');
        if (!windowHeader) return;

        initialX = e.clientX - (parseFloat(folderWindow.style.left) || 0);
        initialY = e.clientY - (parseFloat(folderWindow.style.top) || 0);
        
        if (windowHeader) {
            isDragging = true;
            folderWindow.style.zIndex = (++zIndex).toString();
        }
    }

    function drag(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;

        folderWindow.style.left = `${currentX}px`;
        folderWindow.style.top = `${currentY}px`;
    }

    function dragEnd() {
        isDragging = false;
    }

    // Window drag events
    folderWindow.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    // Folder Management
    folders.forEach(folder => {
        folder.addEventListener('click', (e) => {
            e.stopPropagation();
            const folderName = folder.querySelector('span')?.textContent;
            if (folderName) {
                openFolder(folderName);
            }
        });
    });

    function openFolder(folderName) {
        const folderTitle = folderWindow.querySelector('.folder-title');
        const folderContent = folderWindow.querySelector('.p-6');
        
        if (!folderTitle || !folderContent) {
            console.error('Required folder elements not found');
            return;
        }

        folderTitle.textContent = folderName;
        folderContent.innerHTML = '<div class="flex justify-center items-center h-full"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div></div>';
        
        // Center the window if it hasn't been moved
        if (!folderWindow.style.left) {
            const rect = folderWindow.getBoundingClientRect();
            folderWindow.style.left = `${(window.innerWidth - rect.width) / 2}px`;
            folderWindow.style.top = `${(window.innerHeight - rect.height) / 2}px`;
        }

        setTimeout(() => {
            switch(folderName) {
                case 'Projects':
                    folderContent.innerHTML = loadProjects();
                    break;
                case 'Skills':
                    folderContent.innerHTML = loadSkills();
                    break;
                case 'About Me':
                    folderContent.innerHTML = loadAbout();
                    break;
                case 'Contact':
                    folderContent.innerHTML = loadContact();
                    break;
                default:
                    folderContent.innerHTML = '<p class="text-center text-gray-400">No content available</p>';
            }
        }, 300);

        folderWindow.classList.remove('hidden');
        folderWindow.style.zIndex = (++zIndex).toString();
    }

    // Window Controls
    const closeButton = folderWindow.querySelector('.bg-red-500');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            folderWindow.classList.add('hidden');
        });
    }

    // Time Update
    function updateTime() {
        const timeElement = document.querySelector('.text-sm:last-child');
        if (timeElement) {
            const now = new Date();
            timeElement.textContent = now.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit'
            });
        }
    }
    
    updateTime();
    setInterval(updateTime, 60000);

    // Close window with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !folderWindow.classList.contains('hidden')) {
            folderWindow.classList.add('hidden');
        }
    });

    // Content loading functions
    function loadProjects() {
        return `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-gray-800 p-4 rounded-lg">
                    <h3 class="text-xl font-bold mb-2">Project 1</h3>
                    <p class="text-gray-400">Project description goes here</p>
                </div>
            </div>
        `;
    }

    function loadSkills() {
        return `
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-gray-800 p-4 rounded-lg text-center">
                    <div class="text-4xl mb-2">💻</div>
                    <div>Frontend</div>
                </div>
            </div>
        `;
    }

    function loadAbout() {
        return `
            <div class="max-w-2xl mx-auto">
                <h2 class="text-2xl font-bold mb-4">About Me</h2>
                <p class="text-gray-400">Your bio goes here...</p>
            </div>
        `;
    }

    function loadContact() {
        return `
            <div class="max-w-md mx-auto">
                <form class="space-y-4">
                    <input type="text" placeholder="Name" class="w-full p-2 rounded bg-gray-800">
                    <input type="email" placeholder="Email" class="w-full p-2 rounded bg-gray-800">
                    <textarea placeholder="Message" class="w-full p-2 rounded bg-gray-800 h-32"></textarea>
                    <button class="bg-blue-500 px-4 py-2 rounded">Send</button>
                </form>
            </div>
        `;
    }

    // Folder bounce animation
    function bounce(element) {
        element.classList.add('folder-bounce');
        setTimeout(() => {
            element.classList.remove('folder-bounce');
        }, 600);
    }

    // Custom scrollbar styles
    const style = document.createElement('style');
    style.textContent = `
        .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.3);
        }
    `;
    document.head.appendChild(style);

    // Enhanced window interactions
    const windows = document.querySelectorAll('[id$="-window"]');
    windows.forEach(window => {
        // Add smooth transition when dragging
        window.style.transition = 'transform 0.1s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Add hover effect to window header
        const header = window.querySelector('.h-12');
        header.addEventListener('mouseenter', () => {
            header.classList.add('bg-white/5');
        });
        header.addEventListener('mouseleave', () => {
            header.classList.remove('bg-white/5');
        });
    });

    // Add click handler for windows
    windows.forEach(window => {
        window.addEventListener('click', () => {
            // Bring clicked window to front
            window.style.zIndex = (++zIndex).toString();
            
            if (activeWindow) {
                activeWindow.classList.remove('active-window');
            }
            window.classList.add('active-window');
            activeWindow = window;
        });
    });

    // Add taskbar click handlers
    const taskbarIcons = document.querySelectorAll('.taskbar-hover');
    taskbarIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            // Find corresponding window using data attribute
            const targetId = icon.getAttribute('data-window-target');
            const targetWindow = document.getElementById(targetId);
            
            if (targetWindow) {
                if (targetWindow.classList.contains('hidden')) {
                    // Show window if hidden
                    targetWindow.classList.remove('hidden');
                    targetWindow.style.zIndex = (++zIndex).toString();
                } else {
                    // Toggle minimize if visible
                    targetWindow.classList.add('hidden');
                }
                
                // Update active state
                if (activeWindow) {
                    activeWindow.classList.remove('active-window');
                }
                targetWindow.classList.add('active-window');
                activeWindow = targetWindow;
            }
        });
    });
}); 
