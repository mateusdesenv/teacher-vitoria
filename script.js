const header = document.querySelector('[data-header]');
const toggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

toggle?.addEventListener('click', () => {
  nav.classList.toggle('open');
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

if (window.lucide) {
  lucide.createIcons();
}

// Mobile/desktop drag support for testimonial horizontal carousel.
const testimonialTrack = document.querySelector('[data-carousel]');

if (testimonialTrack) {
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  let hasDragged = false;

  testimonialTrack.addEventListener('pointerdown', (event) => {
    isDown = true;
    hasDragged = false;
    testimonialTrack.classList.add('dragging');
    testimonialTrack.setPointerCapture?.(event.pointerId);
    startX = event.clientX;
    scrollLeft = testimonialTrack.scrollLeft;
  });

  testimonialTrack.addEventListener('pointermove', (event) => {
    if (!isDown) return;

    const walk = event.clientX - startX;

    if (Math.abs(walk) > 4) {
      hasDragged = true;
      event.preventDefault();
    }

    testimonialTrack.scrollLeft = scrollLeft - walk;
  });

  const stopDragging = (event) => {
    if (!isDown) return;
    isDown = false;
    testimonialTrack.classList.remove('dragging');
    testimonialTrack.releasePointerCapture?.(event.pointerId);
  };

  testimonialTrack.addEventListener('pointerup', stopDragging);
  testimonialTrack.addEventListener('pointercancel', stopDragging);
  testimonialTrack.addEventListener('pointerleave', stopDragging);

  testimonialTrack.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (hasDragged) event.preventDefault();
    });
  });
}
