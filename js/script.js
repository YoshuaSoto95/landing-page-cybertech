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