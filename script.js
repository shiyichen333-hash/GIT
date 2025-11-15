// Smooth scrolling para los enlaces de navegación
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

// Efecto de scroll para la navbar
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Animación de las barras de habilidades cuando entran en vista
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos
document.querySelectorAll('.skill-category, .project-card, .timeline-item, .stat').forEach(el => {
    observer.observe(el);
});

// Manejo del formulario de contacto
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aquí puedes agregar lógica para enviar el formulario
        // Por ahora, mostraremos una alerta
        alert('¡Gracias por tu mensaje! Me pondré en contacto pronto.');
        
        // Limpiar el formulario
        this.reset();
        
        // Opcional: agregar animación visual
        const button = this.querySelector('.btn-primary');
        const originalText = button.textContent;
        button.textContent = '¡Mensaje enviado!';
        button.style.background = 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 3000);
    });
}

// Efecto de hover en las tarjetas
document.querySelectorAll('.project-card, .skill-category, .timeline-content').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Animación de conteo de números para las estadísticas
const stats = document.querySelectorAll('.stat h3');
const statSection = document.querySelector('.about-stats');

let hasAnimated = false;

const observerStats = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            stats.forEach(stat => {
                const target = parseInt(stat.textContent);
                const increment = target / 30;
                let current = 0;
                
                const counter = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target + '+';
                        clearInterval(counter);
                    } else {
                        stat.textContent = Math.floor(current) + '+';
                    }
                }, 30);
            });
            observerStats.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

if (statSection) {
    observerStats.observe(statSection);
}

// Efecto de scroll parallax (opcional)
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-content');
    
    parallaxElements.forEach(element => {
        element.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
});

// Agregar clase activa al navegar
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Estilos para el link activo
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #f1f5f9;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Función para descargar CV (conectar con un PDF real)
function downloadCV() {
    // Reemplazar con tu URL de CV real
    const cvUrl = 'tu-cv.pdf';
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'CV_Big_Data.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Agregar feedback visual al hacer clic en botones
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Añadir animación de ripple al CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

console.log('Script CV cargado correctamente');
