// Navigation is now handled in render-nodes.js after sections are created

// Mobile menu toggle (if needed)
const createMobileToggle = () => {
    if (window.innerWidth <= 768) {
        const sidebar = document.querySelector('.sidebar');
        const content = document.querySelector('.content');

        // Add toggle button if not exists
        if (!document.querySelector('.menu-toggle')) {
            const toggle = document.createElement('button');
            toggle.className = 'menu-toggle';
            toggle.innerHTML = '☰';
            content.prepend(toggle);

            toggle.addEventListener('click', () => {
                sidebar.classList.toggle('open');
            });
        }
    }
};

window.addEventListener('resize', createMobileToggle);
createMobileToggle();
