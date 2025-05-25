// Interactive Skills Visualization
document.addEventListener('DOMContentLoaded', function() {
    // Only run on Skills page
    if (!document.querySelector('.skills-section')) return;
    
    // Convert skill tags to interactive code elements
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        const skillName = tag.textContent.trim();
        
        // Create code snippet container
        const snippetContainer = document.createElement('div');
        snippetContainer.className = 'code-snippet hidden';
        
        // Generate different code snippets based on the skill
        let codeSnippet = '';
        
        switch(skillName.toLowerCase()) {
            case 'html':
                codeSnippet = `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <title>Portfolio</title>\n</head>\n<body>\n    <h1>Welcome to my Portfolio</h1>\n</body>\n</html>`;
                break;
                
            case 'css':
                codeSnippet = `.portfolio-container {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    background: linear-gradient(to right, #1a1a1a, #2a2a2a);\n    color: white;\n    padding: 2rem;\n}`;
                break;
                
            case 'javascript':
                codeSnippet = `// Interactive portfolio element\nconst projects = document.querySelectorAll('.project-card');\n\nprojects.forEach(project => {\n    project.addEventListener('click', () => {\n        project.classList.toggle('expanded');\n    });\n});`;
                break;
                
            case 'react.js':
                codeSnippet = `import React, { useState } from 'react';\n\nfunction SkillCard({ name, level }) {\n    const [expanded, setExpanded] = useState(false);\n    \n    return (\n        <div className="skill-card" onClick={() => setExpanded(!expanded)}>\n            <h3>{name}</h3>\n            <div className="progress-bar" style={{ width: \`\${level}%\` }} />\n        </div>\n    );\n}`;
                break;
                
            case 'tailwind css':
                codeSnippet = `<div className="flex flex-col p-4 bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">\n    <h2 className="text-xl font-bold text-blue-400 mb-2">Project Title</h2>\n    <p className="text-gray-300">Project description goes here</p>\n</div>`;
                break;
                
            case 'php':
                codeSnippet = `<?php\n\nfunction connectToDatabase() {\n    $host = 'localhost';\n    $user = 'username';\n    $pass = 'password';\n    $db = 'portfolio';\n    \n    $conn = new mysqli($host, $user, $pass, $db);\n    \n    if ($conn->connect_error) {\n        die("Connection failed: " . $conn->connect_error);\n    }\n    \n    return $conn;\n}`;
                break;
                
            case 'laravel':
                codeSnippet = `<?php\n\nnamespace App\\Http\\Controllers;\n\nuse App\\Models\\Project;\nuse Illuminate\\Http\\Request;\n\nclass ProjectController extends Controller\n{\n    public function index()\n    {\n        $projects = Project::all();\n        return view('projects.index', compact('projects'));\n    }\n}`;
                break;
                
            case 'mysql':
                codeSnippet = `CREATE TABLE projects (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    title VARCHAR(255) NOT NULL,\n    description TEXT,\n    image_url VARCHAR(255),\n    github_url VARCHAR(255),\n    live_url VARCHAR(255),\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);`;
                break;
                
            default:
                codeSnippet = `// ${skillName} code example\nfunction demonstrate${skillName.replace(/\s+/g, '')}() {\n    console.log("This is a ${skillName} example");\n    // More code would go here\n}`;
        }
        
        // Set the code snippet
        const formattedSnippet = document.createElement('pre');
        formattedSnippet.className = 'language-' + getLanguageClass(skillName);
        formattedSnippet.innerHTML = `<code>${escapeHtml(codeSnippet)}</code>`;
        
        snippetContainer.appendChild(formattedSnippet);
        
        // Add a close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'snippet-close';
        closeBtn.innerHTML = '×';
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            snippetContainer.classList.add('hidden');
        });
        
        snippetContainer.appendChild(closeBtn);
        
        // Add to DOM after the skill item
        tag.parentElement.appendChild(snippetContainer);
        
        // Add click handler to the skill tag
        tag.addEventListener('click', function() {
            // Hide all other open snippets
            document.querySelectorAll('.code-snippet').forEach(snippet => {
                if (snippet !== snippetContainer) {
                    snippet.classList.add('hidden');
                }
            });
            
            // Toggle this snippet
            snippetContainer.classList.toggle('hidden');
            
            // Apply syntax highlighting if Prism is available
            if (typeof Prism !== 'undefined') {
                Prism.highlightElement(formattedSnippet.querySelector('code'));
            }
        });
    });
    
    // Helper function to determine language class for syntax highlighting
    function getLanguageClass(skillName) {
        const skill = skillName.toLowerCase();
        if (skill.includes('html')) return 'html';
        if (skill.includes('css') || skill.includes('tailwind')) return 'css';
        if (skill.includes('javascript') || skill.includes('react')) return 'javascript';
        if (skill.includes('php') || skill.includes('laravel')) return 'php';
        if (skill.includes('mysql') || skill.includes('sql')) return 'sql';
        return 'javascript'; // default
    }
    
    // Helper function to escape HTML
    function escapeHtml(html) {
        const div = document.createElement('div');
        div.textContent = html;
        return div.innerHTML;
    }
    
    // Add 3D skill visualization with chart.js if available
    if (typeof Chart !== 'undefined') {
        // Create canvas for chart
        const chartContainer = document.createElement('div');
        chartContainer.className = 'skill-chart-container mt-8 mb-8';
        chartContainer.innerHTML = '<canvas id="skillRadarChart"></canvas>';
        
        // Add to DOM at the end of skills section
        document.querySelector('.skills-section').appendChild(chartContainer);
        
        // Create radar chart
        const ctx = document.getElementById('skillRadarChart').getContext('2d');
        
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Frontend', 'Backend', 'Design', 'Databases', 'DevOps', 'Mobile'],
                datasets: [{
                    label: 'Skills',
                    data: [85, 75, 70, 80, 65, 60],
                    backgroundColor: 'rgba(0, 122, 204, 0.2)',
                    borderColor: 'rgba(0, 122, 204, 1)',
                    pointBackgroundColor: 'rgba(0, 122, 204, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(0, 122, 204, 1)'
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(255, 255, 255, 0.2)'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.2)'
                        },
                        pointLabels: {
                            color: '#cccccc'
                        },
                        ticks: {
                            color: '#cccccc',
                            backdropColor: 'transparent'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#cccccc'
                        }
                    }
                }
            }
        });
    } else {
        // If Chart.js is not available, add a placeholder for skill distribution
        const skillDistribution = document.createElement('div');
        skillDistribution.className = 'skill-distribution mt-8 p-5 bg-[#2a2d2e] rounded shadow-md';
        skillDistribution.innerHTML = `
            <h3 class="text-lg font-semibold mb-4 text-[#4dc4ff] border-b border-[#3c3c3c] pb-2">Skill Distribution</h3>
            <div class="distribution-grid grid grid-cols-2 md:grid-cols-3 gap-4">
                <div class="distribution-item">
                    <div class="flex justify-between mb-1">
                        <span>Frontend</span>
                        <span class="text-xs text-[#9cdcfe]">85%</span>
                    </div>
                    <div class="w-full h-2 bg-[#1e1e1e] rounded overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-[#007acc] to-[#4dc4ff] rounded" style="width: 85%"></div>
                    </div>
                </div>
                <div class="distribution-item">
                    <div class="flex justify-between mb-1">
                        <span>Backend</span>
                        <span class="text-xs text-[#9cdcfe]">75%</span>
                    </div>
                    <div class="w-full h-2 bg-[#1e1e1e] rounded overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-[#007acc] to-[#4dc4ff] rounded" style="width: 75%"></div>
                    </div>
                </div>
                <div class="distribution-item">
                    <div class="flex justify-between mb-1">
                        <span>Design</span>
                        <span class="text-xs text-[#9cdcfe]">70%</span>
                    </div>
                    <div class="w-full h-2 bg-[#1e1e1e] rounded overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-[#007acc] to-[#4dc4ff] rounded" style="width: 70%"></div>
                    </div>
                </div>
                <div class="distribution-item">
                    <div class="flex justify-between mb-1">
                        <span>Databases</span>
                        <span class="text-xs text-[#9cdcfe]">80%</span>
                    </div>
                    <div class="w-full h-2 bg-[#1e1e1e] rounded overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-[#007acc] to-[#4dc4ff] rounded" style="width: 80%"></div>
                    </div>
                </div>
                <div class="distribution-item">
                    <div class="flex justify-between mb-1">
                        <span>DevOps</span>
                        <span class="text-xs text-[#9cdcfe]">65%</span>
                    </div>
                    <div class="w-full h-2 bg-[#1e1e1e] rounded overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-[#007acc] to-[#4dc4ff] rounded" style="width: 65%"></div>
                    </div>
                </div>
                <div class="distribution-item">
                    <div class="flex justify-between mb-1">
                        <span>Mobile</span>
                        <span class="text-xs text-[#9cdcfe]">60%</span>
                    </div>
                    <div class="w-full h-2 bg-[#1e1e1e] rounded overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-[#007acc] to-[#4dc4ff] rounded" style="width: 60%"></div>
                    </div>
                </div>
            </div>
        `;
        
        document.querySelector('.skills-section').appendChild(skillDistribution);
    }
});
