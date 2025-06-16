// Global Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    createSearchOverlay();
    
    // Listen for search command from command palette
    document.addEventListener('command-executed', function(e) {
        if (e.detail.command === 'search') {
            toggleSearch();
        }
    });
    
    // Keyboard shortcut for search (Ctrl+F)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'f' && !e.shiftKey) {
            e.preventDefault();
            toggleSearch();
        }
    });
});

function createSearchOverlay() {
    const searchHTML = `
        <div id="search-overlay" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden">
            <div class="flex items-start justify-center pt-20">
                <div class="search-container bg-[var(--sidebar-bg)] border border-[var(--vscode-border)] rounded-lg shadow-xl w-[600px] max-w-[90vw]">
                    <div class="search-header p-4 border-b border-[var(--vscode-border)]">
                        <div class="relative">
                            <i class="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--vscode-text-muted)]"></i>
                            <input type="text" id="global-search-input" 
                                   placeholder="Search across portfolio..." 
                                   class="w-full pl-10 pr-10 py-3 bg-[var(--editor-bg)] text-[var(--vscode-text)] border border-[var(--vscode-border)] rounded focus:outline-none focus:border-[var(--vscode-accent)]">
                            <button id="search-close" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--vscode-text-muted)] hover:text-[var(--vscode-text)]">
                                <i class="bi bi-x text-xl"></i>
                            </button>
                        </div>
                        <div class="flex items-center mt-3 text-sm text-[var(--vscode-text-muted)]">
                            <span>Press ↵ to search • ESC to close</span>
                        </div>
                    </div>
                    <div class="search-results max-h-[400px] overflow-y-auto">
                        <div id="search-results-content" class="p-4">
                            <div class="text-center text-[var(--vscode-text-muted)] py-8">
                                <i class="bi bi-search text-2xl mb-2"></i>
                                <p>Type to search across all portfolio content</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', searchHTML);
    
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('global-search-input');
    const searchResults = document.getElementById('search-results-content');
    const searchClose = document.getElementById('search-close');
    
    // Search data (this would ideally be generated from your content)
    const searchData = [        {
            title: "About Me",
            page: "about.html",
            content: "Adil AIT EL HOUCINE Full Stack Developer Morocco Passionate developer React Laravel JavaScript",
            category: "About"
        },
        {
            title: "MoneyMind Project",
            page: "projects.html",
            content: "Budget management application automated income tracking expense monitoring savings goals AI-powered suggestions Laravel MySQL TailwindCSS",
            category: "Projects"
        },
        {
            title: "VeilleHub Project",
            page: "projects.html",
            content: "Platform students technical presentations teachers subject validation calendar management participation analysis PHP MySQL JavaScript",
            category: "Projects"
        },
        {
            title: "Goal Tracker",
            page: "projects.html",
            content: "Task management application React Redux state management responsive design user authentication",
            category: "Projects"
        },
        {
            title: "Technical Skills",
            page: "skills.html",
            content: "JavaScript React PHP Laravel MySQL TailwindCSS CSS HTML Node.js MongoDB PostgreSQL Git Docker",
            category: "Skills"
        },
        {
            title: "Frontend Development",
            page: "skills.html",
            content: "React JavaScript HTML5 CSS3 TailwindCSS responsive design user interface experience",
            category: "Skills"
        },
        {
            title: "Backend Development",
            page: "skills.html",
            content: "PHP Laravel Node.js MySQL PostgreSQL RESTful APIs MVC architecture database design",
            category: "Skills"
        },
        {
            title: "Work Experience",
            page: "experience.html",
            content: "Full Stack Developer Tech Company Frontend Developer Startup Junior Developer Local Agency",
            category: "Experience"
        },
        {
            title: "Education",
            page: "education.html",
            content: "Bachelor Degree Computer Science web development certifications programming",
            category: "Education"
        },        {
            title: "Contact Information",
            page: "contact.html",
            content: "contact@adilaitelhoucine.dev LinkedIn GitHub Morocco email social media",
            category: "Contact"
        }
    ];
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => performSearch(this.value), 300);
    });
    
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            toggleSearch();
        } else if (e.key === 'Enter') {
            // Navigate to first result if available
            const firstResult = searchResults.querySelector('.search-result-item');
            if (firstResult) {
                const link = firstResult.getAttribute('data-link');
                if (link) {
                    window.location.href = link;
                }
            }
        }
    });
    
    searchClose.addEventListener('click', toggleSearch);
    searchOverlay.addEventListener('click', function(e) {
        if (e.target === searchOverlay) {
            toggleSearch();
        }
    });
    
    function performSearch(query) {
        if (!query.trim()) {
            searchResults.innerHTML = `
                <div class="text-center text-[var(--vscode-text-muted)] py-8">
                    <i class="bi bi-search text-2xl mb-2"></i>
                    <p>Type to search across all portfolio content</p>
                </div>
            `;
            return;
        }
        
        const results = searchData.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.content.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
        );
        
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="text-center text-[var(--vscode-text-muted)] py-8">
                    <i class="bi bi-exclamation-circle text-2xl mb-2"></i>
                    <p>No results found for "${query}"</p>
                    <p class="text-sm mt-1">Try different keywords or browse the file explorer</p>
                </div>
            `;
            return;
        }
        
        const resultsHTML = results.map(result => {
            const highlightedTitle = highlightText(result.title, query);
            const highlightedContent = highlightText(result.content.substring(0, 100) + '...', query);
            
            return `
                <div class="search-result-item p-3 border-b border-[var(--vscode-border)] hover:bg-[var(--explorer-hover)] cursor-pointer transition-colors"
                     data-link="${result.page}">
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <div class="flex items-center mb-1">
                                <i class="bi bi-file-earmark-code text-[var(--vscode-accent)] mr-2"></i>
                                <h3 class="font-medium text-[var(--vscode-text)]">${highlightedTitle}</h3>
                                <span class="ml-2 px-2 py-0.5 bg-[var(--vscode-accent)] bg-opacity-20 text-[var(--vscode-accent)] text-xs rounded">${result.category}</span>
                            </div>
                            <p class="text-sm text-[var(--vscode-text-muted)] leading-relaxed">${highlightedContent}</p>
                            <div class="flex items-center mt-2 text-xs text-[var(--vscode-text-muted)]">
                                <i class="bi bi-folder mr-1"></i>
                                <span>${result.page}</span>
                            </div>
                        </div>
                        <i class="bi bi-arrow-right text-[var(--vscode-text-muted)] ml-3"></i>
                    </div>
                </div>
            `;
        }).join('');
        
        searchResults.innerHTML = `
            <div class="search-results-header p-3 border-b border-[var(--vscode-border)] bg-[var(--editor-bg)]">
                <span class="text-sm text-[var(--vscode-text-muted)]">${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"</span>
            </div>
            ${resultsHTML}
        `;
        
        // Add click handlers to results
        searchResults.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', function() {
                const link = this.getAttribute('data-link');
                if (link) {
                    window.location.href = link;
                }
            });
        });
    }
    
    function highlightText(text, query) {
        if (!query.trim()) return text;
        const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
        return text.replace(regex, '<mark class="bg-[var(--vscode-accent)] bg-opacity-30 text-[var(--vscode-text)]">$1</mark>');
    }
    
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}

function toggleSearch() {
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('global-search-input');
    
    if (searchOverlay.classList.contains('hidden')) {
        searchOverlay.classList.remove('hidden');
        setTimeout(() => searchInput.focus(), 100);
    } else {
        searchOverlay.classList.add('hidden');
        searchInput.value = '';
        document.getElementById('search-results-content').innerHTML = `
            <div class="text-center text-[var(--vscode-text-muted)] py-8">
                <i class="bi bi-search text-2xl mb-2"></i>
                <p>Type to search across all portfolio content</p>
            </div>
        `;
    }
}
