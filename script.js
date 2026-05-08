/**
 * script.js
 * Handles scroll-based animations, progress bars, and active navigation links.
 */

document.addEventListener("DOMContentLoaded", () => {

    // --- 0. Update Copyright Year ---
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // --- Hamburger Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // --- 1. Fade-In and Progress Bar Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Fade in elements
                if (entry.target.classList.contains('fade-in')) {
                    entry.target.classList.add('visible');
                }
                
                // Unobserve after animating once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in');
    animatedElements.forEach(el => scrollObserver.observe(el));


    // --- 2. Active Link Highlighting (ScrollSpy) ---
    const sections = document.querySelectorAll("section");
    const navLinkItems = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach((section) => {
            // Get the top offset of the section, subtract navbar height + a little buffer
            const sectionTop = section.offsetTop - 80; 
            if (scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinkItems.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });

    // --- 3. Project Modal Functionality ---
    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const viewDetailsButtons = document.querySelectorAll('.view-details');

    // Project data
    const projectData = {
        'crowd-detection': {
            title: 'Crowd Behaviour Detection',
            image: 'project1.jpg',
            techStack: 'Python, OpenCV, TensorFlow, Scikit-learn, NumPy, Pandas',
            description: 'An advanced computer vision system designed to analyze crowd dynamics, detect anomalies, and prevent potential hazards using swarm intelligence algorithms and ensemble learning techniques. The system processes real-time video feeds to identify unusual crowd behaviors and alert security personnel.',
            features: [
                'Real-time video processing and analysis',
                'Swarm intelligence algorithms for crowd behavior modeling',
                'Ensemble learning for anomaly detection',
                'Multi-camera support with synchronization',
                'Alert system with customizable thresholds',
                'Web-based dashboard for monitoring'
            ],
            githubLink: 'https://github.com/loga-anand/Abnormal-Crowd-Detection-Using-Swarm-Based-Segmentation-',
            liveLink: 'https://github.com/loga-anand/Abnormal-Crowd-Detection-Using-Swarm-Based-Segmentation-'
        },
        'employee-attrition': {
            title: 'Employee Attrition Prediction',
            image: 'project2.jpg',
            techStack: 'Python, Scikit-learn, Pandas, Matplotlib, Seaborn, Jupyter Notebook',
            description: 'A machine learning model built to predict employee turnover by analyzing HR data, helping organizations proactively improve retention strategies and workplace satisfaction. The system uses various classification algorithms to identify employees at risk of leaving.',
            features: [
                'Data preprocessing and feature engineering',
                'Multiple ML algorithms (Random Forest, SVM, Logistic Regression)',
                'Feature importance analysis',
                'Interactive visualizations and dashboards',
                'Model performance evaluation metrics',
                'Predictive insights for HR decision-making'
            ],
            githubLink: 'https://github.com/logaanand/employee-attrition-prediction',
            liveLink: 'https://github.com/logaanand/employee-attrition-prediction'
        },
        'fake-bot-detection': {
            title: 'Fake Bot Detection on X (Explainable AI)',
            image: 'project3.jpg',
            techStack: 'Machine Learning, Explainable AI (XAI), NLP',
            description: 'An intelligent system designed to detect fake accounts and social bots on the X platform by analyzing user behavior, content patterns, and network activity. It provides transparent, interpretable predictions so users can understand why an account is classified as malicious.',
            features: [
                'Social bot detection using behavioral signals',
                'Explainable AI for interpretable model outputs',
                'Natural language processing for text analysis',
                'User trust scoring and risk assessment',
                'Real-time monitoring of suspicious activity',
                'Dashboard for classification transparency'
            ],
            githubLink: 'https://github.com/loga-anand/Fake-Bot-Detection-on-X',
            liveLink: 'https://github.com/loga-anand/Fake-Bot-Detection-on-X'
        }
    };

    // Open modal function
    function openModal(projectKey) {
        const project = projectData[projectKey];
        if (!project) return;

        // Populate modal content
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalProjectImage').src = project.image;
        document.getElementById('modalProjectImage').alt = project.title;
        document.getElementById('modalTechStack').textContent = project.techStack;
        document.getElementById('modalDescription').textContent = project.description;

        // Populate features list
        const featuresList = document.getElementById('modalFeatures');
        featuresList.innerHTML = '';
        project.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });

        // Set up links
        document.getElementById('modalGithubLink').href = project.githubLink;
        const liveLinkBtn = document.getElementById('modalLiveLink');
        if (project.liveLink) {
            liveLinkBtn.href = project.liveLink;
            liveLinkBtn.style.display = 'inline-block';
        } else {
            liveLinkBtn.style.display = 'none';
        }

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Close modal function
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    // Event listeners
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const projectKey = button.getAttribute('data-project');
            openModal(projectKey);
        });
    });

    modalClose.addEventListener('click', closeModal);

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // --- 4. Contact Form Functionality ---
    const contactForm = document.querySelector('.contact-form form');
    const contactModal = document.getElementById('contactSuccessModal');
    const contactModalClose = document.getElementById('contactModalClose');
    const contactModalOk = document.getElementById('contactModalOk');

    // Show success modal when form is submitted
    contactForm.addEventListener('submit', (e) => {
        // Let Formspree handle the form submission naturally
        // Show success modal after a short delay
        setTimeout(() => {
            contactModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }, 500);
    });

    // Close contact modal function
    function closeContactModal() {
        contactModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Event listeners for contact modal
    contactModalClose.addEventListener('click', closeContactModal);
    contactModalOk.addEventListener('click', closeContactModal);

    // Close modal when clicking outside
    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            closeContactModal();
        }
    });


// Close modal with Escape key

document.addEventListener('keydown', (e) => {

    if (e.key === 'Escape' && contactModal.classList.contains('active')) {

        closeContactModal();

    }

});