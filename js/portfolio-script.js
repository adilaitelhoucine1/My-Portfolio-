// VS Code Portfolio JavaScript

// File content data
const fileContents = {
    'About.jsx': {
        language: 'jsx',
        content: `import React from 'react';
import '../styles/main.css';

const About = () => {
    return (
        <div className="about-section">
            <h1>Adil AIT EL HOUCINE</h1>
            <p className="role">Full Stack Developer</p>
            <p className="location">📍 Morocco</p>
            <p className="bio">Passionate developer with expertise in building modern web applications using React, Laravel, and other cutting-edge technologies.</p>
        </div>
    );
};

export default About;`
    },
    'Experience.jsx': {
        language: 'jsx',
        content: `import React from 'react';
import experienceData from '../data/experience.json';

const Experience = () => {
    return (
        <div className="experience-section">
            <h2>Work Experience</h2>
            {experienceData.experiences.map((exp, index) => (
                <div key={index} className="experience-card">
                    <h3>{exp.position} @ {exp.company}</h3>
                    <p className="period">{exp.period}</p>
                    <p className="location">{exp.location}</p>
                    <ul>
                        {exp.responsibilities.map((resp, idx) => (
                            <li key={idx}>{resp}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Experience;`
    },
    'Projects.jsx': {
        language: 'jsx',
        content: `import React from 'react';
import projectsData from '../data/projects.json';

const Projects = () => {
    return (
        <div className="projects-section">
            <h2>Featured Projects</h2>
            <div className="projects-grid">
                {projectsData.projects.map((project, index) => (
                    <div key={index} className="project-card">
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                        <div className="tech-stack">
                            {project.technologies.map((tech, idx) => (
                                <span key={idx} className="tech-tag">{tech}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;`
    },
    'Skills.jsx': {
        language: 'jsx',
        content: `import React from 'react';
import skillsData from '../data/skills.json';

const Skills = () => {
    return (
        <div className="skills-section">
            <h2>Technical Skills</h2>
            
            <div className="skill-category">
                <h3>Frontend Development</h3>
                <div className="skills-grid">
                    {skillsData.technicalSkills.frontendDevelopment.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                    ))}
                </div>
            </div>
            
            <div className="skill-category">
                <h3>Backend Development</h3>
                <div className="skills-grid">
                    {skillsData.technicalSkills.backendDevelopment.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Skills;`
    },
    'Education.jsx': {
        language: 'jsx',
        content: `import React from 'react';
import educationData from '../data/education.json';

const Education = () => {
    return (
        <div className="education-section">
            <h2>Education</h2>
            {educationData.education.map((edu, index) => (
                <div key={index} className="education-card">
                    <h3>{edu.degree}</h3>
                    <p className="institution">{edu.institution}</p>
                    <p className="period">{edu.period}</p>
                    <p className="location">{edu.location}</p>
                </div>
            ))}
        </div>
    );
};

export default Education;`
    },
    'experience.json': {
        language: 'json',
        content: `{
    "experiences": [
        {
            "position": "Full Stack Developer Intern",
            "company": "Proface SARL",
            "location": "Marrakech",
            "period": "01/07/2021 - 01/09/2021",
            "responsibilities": [
                "Backend Development and Database Management with Laravel and MySQL",
                "Admin and Client Interface Development using HTML/CSS",
                "Order Management and Reservation System Implementation",
                "Route Protection and Security Implementation",
                "End-to-end Project Management"
            ]
        }
    ]
}`
    },
    'education.json': {
        language: 'json',
        content: `{
    "education": [
        {
            "period": "09/10/2024 - Present",
            "institution": "YouCode, Fondation OCP / UM6P",
            "location": "Nador",
            "degree": "Full-Stack Development"
        },
        {
            "period": "05/10/2021 - 24/07/2023",
            "institution": "BTS Ouarzazate",
            "location": "Morocco",
            "degree": "Higher Technician in Information Systems Development"
        },
        {            "period": "09/10/2020 - 12/07/2021",
            "institution": "Lycee Boumaln Dades",
            "location": "Boumalne Dades",
            "degree": "Baccalaureate in Mathematical Sciences A"
        }
    ]
}`
    },
    'projects.json': {
        language: 'json',
        content: `{
    "projects": [
        {
            "name": "MoneyMind",
            "description": "Budget management application with automated income tracking, expense monitoring, and savings goals. Features AI-powered suggestions and advanced expense categorization.",
            "technologies": ["Laravel", "MySQL", "Tailwind CSS", "HTML", "CSS", "Azure", "Jira"]
        },
        {
            "name": "VeilleHub",
            "description": "Platform enabling students to propose and track technical presentations, while providing teachers with tools for subject validation, calendar management, and participation analysis.",
            "technologies": ["PHP", "MySQL", "JavaScript", "Tailwind CSS", "HTML", "CSS", "Jira"]
        }
    ]
}`
    },
    'skills.json': {
        language: 'json',
        content: `{
    "technicalSkills": {
        "frontendDevelopment": ["HTML", "CSS", "JavaScript", "React.js", "Tailwind CSS"],
        "backendDevelopment": ["PHP", "Laravel", "MySQL"],
        "toolsAndTechnologies": ["Git", "GitHub", "Figma", "UML", "Jira", "WordPress"]
    },
    "softSkills": [
        "Agile Methodology",
        "Team Collaboration",
        "Creativity",
        "Adaptability",
        "Communication",
        "Time Management"
    ]
}`
    },
    'README.md': {
        language: 'markdown',
        content: `# VS Code Portfolio

A portfolio website styled as a VS Code editor, showcasing my skills, projects, and experience as a developer.

## Features

- VS Code-like UI with Dark+ theme
- Interactive file browser
- Syntax highlighting
- Multiple views for different sections
- Mobile responsive design

## Technologies Used

- HTML5
- CSS3
- JavaScript
- TailwindCSS

## Setup

1. Clone the repository
2. Open index.html in your browser
3. Explore the portfolio!

## Contact

Feel free to reach out at contact@adilaitelhoucine.dev`
    },
    'main.css': {
        language: 'css',
        content: `/* Main CSS file for the portfolio */

.about-section {
    padding: 20px;
}

.about-section h1 {
    font-size: 2rem;
    font-weight: bold;
    color: #fff;
    margin-bottom: 8px;
}

.about-section .role {
    font-size: 1.2rem;
    color: #4dc4ff;
    margin-bottom: 8px;
}

.about-section .location {
    color: #dcdcaa;
    margin-bottom: 16px;
}

.about-section .bio {
    line-height: 1.6;
    max-width: 600px;
}

/* Experience section styles */
.experience-section {
    padding: 20px;
}

.experience-card {
    margin-bottom: 24px;
    padding: 16px;
    background: rgba(38, 38, 38, 0.5);
    border-radius: 4px;
    border-left: 2px solid #007acc;
}

/* Skills section styles */
.skills-section {
    padding: 20px;
}

.skill-category {
    margin-bottom: 24px;
}

.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    margin-top: 16px;
}

/* Project section styles */
.projects-section {
    padding: 20px;
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
    margin-top: 20px;
}

.tech-tag {
    display: inline-block;
    background: #333;
    color: #4dc4ff;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    margin-right: 6px;
    margin-top: 6px;
}

/* Education section styles */
.education-section {
    padding: 20px;
}

.education-card {
    margin-bottom: 24px;
    padding: 16px;
    background: rgba(38, 38, 38, 0.5);
    border-radius: 4px;
    border-left: 2px solid #4dc4ff;
}`
    },
    'package.json': {
        language: 'json',
        content: `{
    "name": "vscode-portfolio",
    "version": "1.0.0",
    "description": "A VS Code-themed portfolio website",
    "author": "Adil AIT EL HOUCINE",
    "license": "MIT",
    "scripts": {
        "start": "serve .",
        "build": "echo 'No build step required'"
    },
    "devDependencies": {
        "serve": "^14.0.0"
    }
}`
    }
};

// Syntax highlighting function - Fixed to properly handle JSX
function syntaxHighlight(content, language) {
    let processed = content;
    
    // Only escape dangerous HTML characters for non-JSX content
    if (language !== 'jsx' && language !== 'javascript') {
        processed = processed
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;');
    } else {
        // For JSX, only escape ampersands to prevent HTML issues
        processed = processed.replace(/&/g, '&amp;');
    }
    
    // Apply syntax highlighting
    if (language === 'jsx' || language === 'javascript') {
        // Comments
        processed = processed.replace(/(\/\/.*$)/gm, '<span class="syntax-comment">$1</span>');
        processed = processed.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="syntax-comment">$1</span>');
        
        // Strings
        processed = processed.replace(/("([^"\\]|\\.)*")/g, '<span class="syntax-string">$1</span>');
        processed = processed.replace(/('([^'\\]|\\.)*')/g, '<span class="syntax-string">$1</span>');
        processed = processed.replace(/(`([^`\\]|\\.)*`)/g, '<span class="syntax-string">$1</span>');
        
        // JSX tags
        processed = processed.replace(/(<\/?)([A-Z][A-Za-z0-9]*)/g, '$1<span class="syntax-function">$2</span>');
        processed = processed.replace(/(<\/?)([a-z][a-z0-9-]*)/g, '$1<span class="syntax-variable">$2</span>');
        
        // Keywords
        processed = processed.replace(/\b(import|export|from|const|let|var|function|return|if|else|for|while|class|extends|default|React|useState|useEffect)\b/g, '<span class="syntax-keyword">$1</span>');
        
        // JSX attributes
        processed = processed.replace(/\s([a-zA-Z][a-zA-Z0-9]*?)=/g, ' <span class="syntax-property">$1</span>=');
        
        // Numbers
        processed = processed.replace(/\b(\d+\.?\d*)\b/g, '<span class="syntax-number">$1</span>');
        
        // Operators
        processed = processed.replace(/([{}()[\].,;])/g, '<span class="syntax-operator">$1</span>');
    } else if (language === 'json') {
        // JSON highlighting
        processed = processed.replace(/(&quot;[^&]*?&quot;)(\s*:)/g, '<span class="syntax-property">$1</span>$2');
        processed = processed.replace(/(:\s*)(&quot;[^&]*?&quot;)/g, '$1<span class="syntax-string">$2</span>');
        processed = processed.replace(/\b(true|false|null)\b/g, '<span class="syntax-constant">$1</span>');
        processed = processed.replace(/(:\s*)(\d+\.?\d*)/g, '$1<span class="syntax-number">$2</span>');
        processed = processed.replace(/([{}[\],])/g, '<span class="syntax-operator">$1</span>');
        
    } else if (language === 'css') {
        // CSS highlighting
        processed = processed.replace(/^([.#][a-zA-Z0-9_-]+)/gm, '<span class="syntax-class">$1</span>');
        processed = processed.replace(/^([a-zA-Z][a-zA-Z0-9_-]*)\s*{/gm, '<span class="syntax-variable">$1</span> {');
        processed = processed.replace(/\s+([a-zA-Z-]+)(\s*:)/g, '  <span class="syntax-property">$1</span>$2');
        processed = processed.replace(/(:\s*)([^;{}]+);/g, '$1<span class="syntax-string">$2</span>;');
        processed = processed.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="syntax-comment">$1</span>');
        processed = processed.replace(/([{}])/g, '<span class="syntax-operator">$1</span>');
          } else if (language === 'markdown') {
        // Handle markdown headers
        processed = processed.replace(/^(#{1,6})\s+(.*)$/gm, '<span class="syntax-keyword">$1</span> <span class="syntax-function">$2</span>');
        
        // Handle markdown bold/italic
        processed = processed.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        processed = processed.replace(/\*([^*]+)\*/g, '<em>$1</em>');
        
        // Handle markdown code
        processed = processed.replace(/`([^`]+)`/g, '<span class="syntax-string">`$1`</span>');
        
        // Handle markdown links
        processed = processed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '[<span class="syntax-variable">$1</span>](<span class="syntax-string">$2</span>)');
    }
      // Format with line breaks and indentation
    return processed.split('\n').map(line => {
        const indent = line.match(/^\s*/)[0].length;
        const trimmedLine = line.trim();
        if (trimmedLine === '') return '<br>';
        
        return `<span style="display: inline-block; width: ${indent * 0.5}em;"></span>${line.substring(indent)}`;
    }).join('<br>');
}

// Function to get file icon class
function getFileIcon(fileName) {
    const ext = fileName.split('.').pop().toLowerCase();
    switch (ext) {
        case 'jsx':
        case 'js':
            return 'text-[#e37933]';
        case 'json':
            return 'text-[#cbcb41]';
        case 'css':
            return 'text-[#519aba]';
        case 'md':
            return 'text-[#519aba]';
        default:
            return 'text-[#d4d4d4]';
    }
}

// Function to update editor content
function updateEditorContent(fileName) {
    const fileData = fileContents[fileName];
    if (!fileData) return;

    // Update tab
    const tabsContainer = document.querySelector('.flex.bg-\\[\\#252526\\]');
    if (tabsContainer) {
        tabsContainer.innerHTML = `
            <div class="editor-tab active flex items-center gap-2">
                <i class="bi bi-file-earmark-code ${getFileIcon(fileName)}"></i>
                <span>${fileName}</span>
                <button class="ml-2 text-[#808080] hover:text-white">×</button>
            </div>
        `;
    }

    // Update breadcrumbs
    const breadcrumbs = document.querySelector('.breadcrumb');
    if (breadcrumbs) {
        let folder = 'components';
        if (fileName.endsWith('.json')) {
            folder = 'data';
        } else if (fileName.endsWith('.css')) {
            folder = 'styles';
        } else if (fileName === 'README.md' || fileName === 'package.json') {
            folder = '';
        }
        
        breadcrumbs.innerHTML = `
            <div class="breadcrumb-item"><span>portfolio</span></div>
            ${folder ? `<div class="breadcrumb-item"><span>src</span></div>` : ''}
            ${folder ? `<div class="breadcrumb-item"><span>${folder}</span></div>` : ''}
            <div class="breadcrumb-item"><span>${fileName}</span></div>
        `;
    }    // Update line numbers
    const lines = fileData.content.split('\n').length;
    const lineNumbers = document.querySelector('.line-numbers');
    if (lineNumbers) {
        lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join('<br>');
    }

    // Update content with syntax highlighting
    const editorContent = document.querySelector('.editor-content');
    if (editorContent) {
        editorContent.innerHTML = `
            <div class="code-section relative mb-6 font-mono">
                ${syntaxHighlight(fileData.content, fileData.language)}
                <div class="terminal-cursor absolute" style="top: 4px; left: ${Math.random() * 50 + 200}px;"></div>
            </div>
        `;
        
        // Add fade-in animation
        editorContent.classList.add('fade-in');
        setTimeout(() => {
            editorContent.classList.remove('fade-in');
        }, 300);
        
        // Add a random current line highlight to simulate editing
        const randomLine = Math.floor(Math.random() * lines) + 1;
        const lineHeight = 20; // approximate height of a line
        const yPosition = (randomLine - 1) * lineHeight + 12;

        const currentLine = document.createElement('div');
        currentLine.className = 'current-line';
        currentLine.style.top = `${yPosition}px`;
        document.querySelector('.code-section').appendChild(currentLine);

        // Also highlight the corresponding line number
        const lineNumberElements = lineNumbers.innerHTML.split('<br>');
        if (lineNumberElements[randomLine-1]) {
            lineNumberElements[randomLine-1] = `<span style="color: white;">${randomLine}</span>`;
            lineNumbers.innerHTML = lineNumberElements.join('<br>');
        }
    }

    // Update page title
    document.title = `${fileName} - VSCode Portfolio`;
}

// Helper function to find previous sibling with smaller or equal padding
function getPreviousSiblingWithSmallerPadding(element, paddingLevel) {
    let prev = element.previousElementSibling;
    
    while (prev) {
        const prevPaddingMatch = prev.className.match(/pl-(\d+)/);
        if (prevPaddingMatch) {
            const prevPadding = parseInt(prevPaddingMatch[1]);
            if (prevPadding < paddingLevel) {
                return prev;
            }
        }
        prev = prev.previousElementSibling;
    }
    
    return null;
}

// Initialize the portfolio with just one event handler
document.addEventListener('DOMContentLoaded', function() {
    // Add click event listeners to file tree items
    document.querySelectorAll('.file-tree-item').forEach(item => {
        item.addEventListener('click', function() {
            const fileName = this.querySelector('span').textContent.trim();
            const isFolder = this.getAttribute('data-is-folder') === 'true';
            
            if (isFolder) {
                // If it's a folder, toggle its children's visibility
                const level = parseInt(this.className.match(/pl-(\d+)/)[1]);
                const childLevel = level + 4;
                const childSelector = `.file-tree-item.pl-${childLevel}`;
                
                const childItems = document.querySelectorAll(childSelector);
                
                // Get the folder icon
                const folderIcon = this.querySelector('i');
                
                // Check if this folder has any direct children
                let hasVisibleChildren = false;
                  childItems.forEach(child => {
                    // Check if this child belongs to the clicked folder
                    const prevSibling = getPreviousSiblingWithSmallerPadding(child, childLevel);
                    if (prevSibling === this) {
                        if (child.style.display === 'none' || child.style.display === '') {
                            child.style.display = 'flex';
                            hasVisibleChildren = true;
                            
                            // If it's a folder that was previously collapsed, make sure its children stay hidden
                            if (child.getAttribute('data-is-folder') === 'true') {
                                const childFolderIcon = child.querySelector('i');
                                if (childFolderIcon && childFolderIcon.classList.contains('bi-folder-fill')) {
                                    // Keep folder icon as is
                                }
                            }
                        } else {
                            child.style.display = 'none';
                            
                            // Hide all descendants too
                            const descendantLevel = parseInt(child.className.match(/pl-(\d+)/)[1]);
                            const descendants = document.querySelectorAll(`.file-tree-item[class*="pl-"]:not(.pl-${descendantLevel})`);
                            
                            descendants.forEach(desc => {
                                const descLevel = parseInt(desc.className.match(/pl-(\d+)/)[1]);
                                if (descLevel > descendantLevel) {
                                    desc.style.display = 'none';
                                }
                            });
                        }
                    }
                });
                
                // Toggle folder icon
                if (hasVisibleChildren) {
                    folderIcon.classList.remove('bi-folder-fill');
                    folderIcon.classList.add('bi-folder2-open');
                } else {
                    folderIcon.classList.remove('bi-folder2-open');
                    folderIcon.classList.add('bi-folder-fill');
                }            } else {
                // It's a file, update active state
                document.querySelectorAll('.file-tree-item').forEach(el => {
                    el.classList.remove('active');
                });
                this.classList.add('active');
                
                // Update editor content if we have content for this file
                if (fileContents[fileName]) {
                    updateEditorContent(fileName);
                }
            }
        });
    });    
    // Set default content
    updateEditorContent('About.jsx');
    
    // Try to activate the first JSX file in the sidebar
    document.querySelectorAll('.file-tree-item').forEach(item => {
        if (item.querySelector('span').textContent.trim() === 'About.jsx') {
            item.classList.add('active');
        }
    });
});

// Make functions globally available
window.fileContents = fileContents;
window.updateEditorContent = updateEditorContent;
window.getFileIcon = getFileIcon;
window.syntaxHighlight = syntaxHighlight;
