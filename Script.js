// Update current year
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('current-year-footer').textContent = new Date().getFullYear();

// Skill description interactivity
const skillButtons = document.querySelectorAll('.skill-btn');
const skillDescription = document.getElementById('skill-description');

const skillInfo = {
  "HTML": "HTML (HyperText Markup Language) is the backbone of all web pages, defining their structure.",
  "CSS": "CSS (Cascading Style Sheets) is used to style the visual presentation of web pages.",
  "JavaScript": "JavaScript is a programming language that adds interactivity and dynamic behavior to web pages."
};

skillButtons.forEach(button => {
  button.addEventListener('click', () => {
    const skill = button.dataset.skill;
    skillDescription.textContent = skillInfo[skill];
    skillDescription.style.color = '#0056b3';
  });
});

// Dark mode toggle
const themeToggleBtn = document.getElementById('themeToggle');
const body = document.body;

themeToggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Load saved theme on page load
window.addEventListener('load', () => {
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
  }
});

// Load portfolio projects from JSON
const projectsContainer = document.getElementById('projects-container');

async function loadProjects() {
  try {
    const response = await fetch('data/portfolio_items.json');
    if (!response.ok) throw new Error('Failed to fetch JSON');
    const projects = await response.json();

    projects.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <a href="${project.link}" target="_blank">View Project</a>
      `;
      projectsContainer.appendChild(card);
    });
  } catch (err) {
    console.error('Error loading portfolio:', err);
    projectsContainer.innerHTML = '<p>Could not load projects.</p>';
  }
}

loadProjects();
