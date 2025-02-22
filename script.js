document.addEventListener('DOMContentLoaded', () => {
    // Initialize work timer
    const timeDisplay = document.querySelector('.time-display .time');
    let workStarted = false;
    let workTimer;

    function updateTimer() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }

    // Update current time every second
    setInterval(updateTimer, 1000);
    updateTimer(); // Initial update

    // Work status buttons
    const startWorkBtn = document.querySelector('.action-btn.primary');
    const breakBtn = document.querySelector('.action-btn.secondary');
    const clockOutBtn = document.querySelector('.action-btn.danger');

    startWorkBtn.addEventListener('click', () => {
        if (!workStarted) {
            workStarted = true;
            startWorkBtn.textContent = 'Working...';
            startWorkBtn.style.background = '#4CAF50';
        }
    });

    breakBtn.addEventListener('click', () => {
        if (workStarted) {
            breakBtn.classList.toggle('active');
            if (breakBtn.classList.contains('active')) {
                breakBtn.textContent = 'On Break';
                breakBtn.style.background = '#FFA500';
            } else {
                breakBtn.textContent = 'Take Break';
                breakBtn.style.background = 'rgba(255, 255, 255, 0.1)';
            }
        }
    });

    clockOutBtn.addEventListener('click', () => {
        if (workStarted) {
            workStarted = false;
            startWorkBtn.textContent = 'Start Work';
            startWorkBtn.style.background = '';
            breakBtn.classList.remove('active');
            breakBtn.textContent = 'Take Break';
            breakBtn.style.background = 'rgba(255, 255, 255, 0.1)';
        }
    });

    // Navigation handling
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Header button handling
    const headerButtons = document.querySelectorAll('.header-controls .btn');
    headerButtons.forEach(button => {
        button.addEventListener('click', () => {
            headerButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Initialize progress bars
    initializeProgressBars();

    // Approval actions
    const approvalItems = document.querySelectorAll('.approval-item');
    approvalItems.forEach(item => {
        const approveBtn = item.querySelector('.btn-approve');
        const rejectBtn = item.querySelector('.btn-reject');

        approveBtn.addEventListener('click', () => {
            item.style.opacity = '0';
            setTimeout(() => {
                item.remove();
                updatePendingCount();
            }, 300);
        });

        rejectBtn.addEventListener('click', () => {
            item.style.opacity = '0';
            setTimeout(() => {
                item.remove();
                updatePendingCount();
            }, 300);
        });
    });

    function updatePendingCount() {
        const count = document.querySelectorAll('.approval-item').length;
        const countDisplay = document.querySelector('.approvals-card .count');
        countDisplay.textContent = `${count} Pending Approvals`;
    }

    // Add current date
    const dateDisplay = document.querySelector('.date-display span');
    const currentDate = new Date();
    const options = { month: 'long', weekday: 'long', day: 'numeric' };
    dateDisplay.textContent = currentDate.toLocaleDateString('en-US', options);

    // Animate metrics on load
    const metrics = document.querySelectorAll('.metric-bar, .attendance-metric');
    metrics.forEach((metric, index) => {
        setTimeout(() => {
            metric.style.opacity = '1';
            metric.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Add sample projects (you can modify these with your actual projects)
    const projectGrid = document.querySelector('.project-grid');
    const projects = [
        {
            title: 'E-commerce Dashboard',
            description: 'Modern dashboard for managing online store operations',
            tech: ['React', 'Node.js', 'MongoDB']
        },
        {
            title: 'Social Media App',
            description: 'Full-stack social networking platform',
            tech: ['Vue.js', 'Firebase', 'Tailwind CSS']
        },
        {
            title: 'Portfolio Website',
            description: 'Personal portfolio website with dark theme',
            tech: ['HTML', 'CSS', 'JavaScript']
        }
    ];

    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'project-item card';
        projectElement.innerHTML = `
            <h4>${project.title}</h4>
            <p>${project.description}</p>
            <div class="tech-stack">
                ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        `;
        projectGrid.appendChild(projectElement);
    });

    // Add sample experience timeline
    const experienceTimeline = document.querySelector('.experience-timeline');
    const experiences = [
        {
            role: 'Senior Frontend Engineer',
            company: 'Tech Corp',
            period: '2022 - Present',
            description: 'Leading frontend development team and implementing modern web solutions'
        },
        {
            role: 'Frontend Developer',
            company: 'Web Solutions Inc',
            period: '2020 - 2022',
            description: 'Developed responsive web applications using React and Vue.js'
        }
    ];

    experiences.forEach(exp => {
        const expElement = document.createElement('div');
        expElement.className = 'experience-item';
        expElement.innerHTML = `
            <div class="exp-header">
                <h4>${exp.role}</h4>
                <span class="period">${exp.period}</span>
            </div>
            <div class="company">${exp.company}</div>
            <p>${exp.description}</p>
        `;
        experienceTimeline.appendChild(expElement);
    });

    // Add smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add dynamic styles
const styles = `
    .metric-bar, .attendance-metric {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s ease;
    }

    .approval-item {
        transition: opacity 0.3s ease;
    }

    .action-btn {
        transition: background-color 0.3s ease;
    }

    .metric-box {
        transition: transform 0.3s ease;
    }

    .metric-box:hover {
        transform: translateY(-5px);
    }

    .project-item {
        padding: 20px;
        margin-bottom: 15px;
        transition: transform 0.3s ease;
    }

    .project-item:hover {
        transform: translateY(-5px);
    }

    .tech-stack {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 10px;
    }

    .tech-tag {
        background: rgba(255, 255, 255, 0.1);
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.8rem;
        color: var(--text-secondary);
    }

    .experience-item {
        padding: 20px 0;
        border-bottom: 1px solid var(--card-border);
    }

    .experience-item:last-child {
        border-bottom: none;
    }

    .exp-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
    }

    .period {
        color: var(--text-secondary);
        font-size: 0.9rem;
    }

    .company {
        color: var(--accent-blue);
        margin-bottom: 8px;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Initialize progress bars with animation
function initializeProgressBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const level = item.getAttribute('data-level');
        const circle = item.querySelector('.skill-circle path:last-child');
        
        // Calculate the stroke-dashoffset based on the percentage
        const offset = 100 - level;
        
        // Set a small delay for each item to create a cascade effect
        setTimeout(() => {
            circle.style.strokeDashoffset = offset;
        }, 300);
        
        // Add hover effect
        item.addEventListener('mouseenter', () => {
            circle.style.stroke = '#4d94ff';
            circle.style.filter = 'drop-shadow(0 0 3px rgba(0, 102, 255, 0.5))';
        });
        
        item.addEventListener('mouseleave', () => {
            circle.style.stroke = 'var(--accent-blue)';
            circle.style.filter = 'none';
        });
    });
} 