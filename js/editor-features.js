// VS Code Portfolio Interactive Effects

// Add a typing effect to the About page
document.addEventListener('DOMContentLoaded', function() {
    // Only run on About page
    if (document.querySelector('.about-section')) {
        // Create typing cursor effect
        const bioText = document.querySelector('.bio');
        if (bioText) {
            const originalText = bioText.textContent.trim();
            bioText.textContent = '';
            let i = 0;
            
            function typeWriter() {
                if (i < originalText.length) {
                    bioText.textContent += originalText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 25); // typing speed
                } else {
                    // Add blinking cursor at the end when done typing
                    const cursor = document.createElement('span');
                    cursor.className = 'terminal-cursor-inline';
                    cursor.style.display = 'inline-block';
                    cursor.style.width = '2px';
                    cursor.style.height = '18px';
                    cursor.style.backgroundColor = '#aeafad';
                    cursor.style.marginLeft = '2px';
                    cursor.style.verticalAlign = 'middle';
                    cursor.style.animation = 'blink 1s step-end infinite';
                    bioText.appendChild(cursor);
                }
            }
            
            // Start typing after a small delay
            setTimeout(typeWriter, 800);
        }
    }
    
    // Enhance folder icon animations
    document.querySelectorAll('.folder-icon').forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add hover effects to project cards
    document.querySelectorAll('.project-card, .experience-card, .education-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add a VS Code-style status message animation
    const statusBar = document.querySelector('.fixed.bottom-0');
    if (statusBar) {
        // Create a status message element
        const statusMessage = document.createElement('div');
        statusMessage.className = 'status-message hidden';
        statusMessage.style.position = 'absolute';
        statusMessage.style.bottom = '30px';
        statusMessage.style.left = '10px';
        statusMessage.style.backgroundColor = '#1e1e1e';
        statusMessage.style.border = '1px solid #333';
        statusMessage.style.padding = '5px 10px';
        statusMessage.style.borderRadius = '3px';
        statusMessage.style.fontSize = '12px';
        statusMessage.style.zIndex = '100';
        statusMessage.style.opacity = '0';
        statusMessage.style.transition = 'opacity 0.3s ease';
        
        // Add to the DOM
        document.body.appendChild(statusMessage);
        
        // Show a message after 3 seconds
        setTimeout(() => {
            statusMessage.textContent = '🚀 Portfolio loaded successfully';
            statusMessage.style.opacity = '1';
            statusMessage.classList.remove('hidden');
            
            // Hide after 3 seconds
            setTimeout(() => {
                statusMessage.style.opacity = '0';
                
                // Remove from DOM after fade out
                setTimeout(() => {
                    statusMessage.remove();
                }, 500);
            }, 3000);
        }, 3000);
    }
    
    // Add subtle particle background to the editor area
    const editorArea = document.querySelector('.ml-\\[300px\\]');
    if (editorArea) {
        // Create canvas for particles
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.opacity = '0.05';
        canvas.style.zIndex = '0';
        
        // Prepend canvas to editor area (so it's behind content)
        editorArea.style.position = 'relative';
        editorArea.prepend(canvas);
        
        // Set canvas size
        canvas.width = editorArea.offsetWidth;
        canvas.height = editorArea.offsetHeight;
        
        // Draw particles
        const ctx = canvas.getContext('2d');
        const particles = [];
        
        // Create particles
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5 + 0.5,
                color: '#ffffff',
                vx: Math.random() * 0.2 - 0.1,
                vy: Math.random() * 0.2 - 0.1
            });
        }
        
        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                // Move particle
                p.x += p.vx;
                p.y += p.vy;
                
                // Wrap around screen
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            });
            
            requestAnimationFrame(animate);
        }
        
        // Start animation
        animate();
    }
    
    // Animate skill progress bars when they come into view
    if (document.querySelector('.skills-section')) {
        // Add initial style to hide progress bars
        const progressBars = document.querySelectorAll('.skill-progress-bar');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            bar.dataset.width = width;
        });
        
        // Function to check if element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        
        // Function to animate progress bars in viewport
        function animateProgressBars() {
            progressBars.forEach(bar => {
                if (isInViewport(bar) && bar.style.width === '0%') {
                    setTimeout(() => {
                        bar.style.width = bar.dataset.width;
                    }, 200);
                }
            });
        }
        
        // Listen for scroll and load events
        window.addEventListener('scroll', animateProgressBars);
        window.addEventListener('load', animateProgressBars);
        
        // Trigger once on load
        animateProgressBars();
    }
});

// Add smooth transitions between pages
window.addEventListener('beforeunload', function() {
    document.body.classList.add('fade-out');
});