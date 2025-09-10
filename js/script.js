// Variables
let currentTestimonial = 0;
let currentStep = 1;
const totalSteps = 3;
const toggleBtn = document.querySelector('.toogle-btn');
const menuToggle = document.querySelector('.menu-toogle');
const closeBtn = document.querySelector('.menu-toogle .close-btn');

toggleBtn.addEventListener('click', () => {
    menuToggle.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    menuToggle.classList.remove('active');
});

menuToggle.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
    });
});


// Contador
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".number h3");

    const animateCount = (el) => {
        const target = +el.getAttribute("data-target");
        let count = 0;
        const increment = target / 200;

        const update = () => {
            count += increment;
            if (count < target) {
                el.textContent = formatNumber(Math.ceil(count));
                requestAnimationFrame(update);
            } else {
                el.textContent = formatNumber(target);
            }
        };
        update();
    };

    const formatNumber = (num) => {
        return new Intl.NumberFormat("en-US").format(num) + "K+";
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observer.observe(counter);
    });
});


// Fade In
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.2
};

const appearOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // Para que no se repita
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// Modal de formulario
const modal = document.getElementById('formModal');
const thankYouModal = document.getElementById('thankYouModal');
const openModalButtons = document.querySelectorAll('.open-modal');
const closeModalButton = document.getElementById('closeModal');
const closeThankYouButton = document.getElementById('closeThankYou');
const form = document.getElementById('ticketForm');
const progressBar = document.getElementById('progressBar');

// Abrir modal
openModalButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Cerrar modal
closeModalButton.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    resetForm();
});

// Cerrar modal de agradecimiento
closeThankYouButton.addEventListener('click', () => {
    thankYouModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Navegación entre pasos del formulario
const nextStepButtons = document.querySelectorAll('.next-step');
const prevStepButtons = document.querySelectorAll('.prev-step');

nextStepButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (validateStep(currentStep)) {
            goToStep(currentStep + 1);
        }
    });
});

prevStepButtons.forEach(button => {
    button.addEventListener('click', () => {
        goToStep(currentStep - 1);
    });
});

// Enviar formulario
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
        // Simular envío exitoso
        setTimeout(() => {
            modal.classList.remove('active');
            thankYouModal.classList.add('active');

            // Aquí podríamos activar una animación más elaborada de fuegos artificiales
            // Por simplicidad, mostramos el modal de agradecimiento
        }, 1000);
    }
});

// Validar paso actual del formulario
function validateStep(step) {
    let isValid = true;
    const currentStepElement = document.getElementById(`step${step}`);
    const inputs = currentStepElement.querySelectorAll('input[required], select[required]');

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'var(--primary)';
        } else {
            input.style.borderColor = '';
        }
    });

    return isValid;
}

// Navegar entre pasos del formulario
function goToStep(step) {
    // Ocultar paso actual
    document.getElementById(`step${currentStep}`).classList.remove('active');

    // Mostrar nuevo paso
    document.getElementById(`step${step}`).classList.add('active');

    // Actualizar barra de progreso
    progressBar.style.width = `${(step / totalSteps) * 100}%`;

    // Actualizar paso actual
    currentStep = step;
}

// Resetear formulario
function resetForm() {
    document.getElementById('ticketForm').reset();
    goToStep(1);
    progressBar.style.width = '0%';
}

// Inicializar carrusel de testimonios
function initTestimonialSlider() {
    const track = document.getElementById('testimonialTrack');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slideWidth = slides[0].getBoundingClientRect().width;

    // Posicionar slides
    slides.forEach((slide, index) => {
        slide.style.left = `${slideWidth * index}px`;
    });

    // Mover al slide específico
    function moveToSlide(index) {
        track.style.transform = `translateX(-${slideWidth * index}px)`;
        currentTestimonial = index;
    }

    // Slide anterior
    prevBtn.addEventListener('click', () => {
        let newIndex = currentTestimonial - 1;
        if (newIndex < 0) newIndex = slides.length - 1;
        moveToSlide(newIndex);
    });

    // Slide siguiente
    nextBtn.addEventListener('click', () => {
        let newIndex = currentTestimonial + 1;
        if (newIndex >= slides.length) newIndex = 0;
        moveToSlide(newIndex);
    });

    // Auto slide cada 5 segundos
    setInterval(() => {
        let newIndex = currentTestimonial + 1;
        if (newIndex >= slides.length) newIndex = 0;
        moveToSlide(newIndex);
    }, 5000);
}

initTestimonialSlider();