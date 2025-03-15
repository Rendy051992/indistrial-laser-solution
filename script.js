// === SCROLL RESTORATION ===
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// === DROPDOWN MENU ===
function toggleDropdown(event, element) {
  event.preventDefault();
  const dropdown = element.parentElement;

  document.querySelectorAll('.dropdown').forEach((drop) => {
    if (drop !== dropdown) {
      drop.classList.remove('open');
    }
  });

  dropdown.classList.toggle('open');
}

// === HAMBURGER MENU ===
function toggleMenu() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.toggle("active");
}

// === SCROLL HEADER ===
window.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// === AFTER CLICK DROPDOWN ===
document.addEventListener('click', function(event) {
  const isDropdownClick = event.target.closest('.dropdown');
  const isToggleClick = event.target.closest('.dropdown-toggle');

  if (!isDropdownClick && !isToggleClick) {
    document.querySelectorAll('.dropdown').forEach((drop) => {
      drop.classList.remove('open');
    });
  }
});

// === HERO TITLE LASER & SPARKS ===
window.addEventListener('load', () => {
  const canvas = document.getElementById('laserCanvas');
  const ctx = canvas.getContext('2d');

  const heroTitle = document.querySelector('.hero-title');
  const letters = heroTitle.querySelectorAll('span');

  let sparks = [];
  const sparkCount = 30; // Počet iskier

  function resizeCanvas() {
    canvas.width = heroTitle.offsetWidth;
    canvas.height = heroTitle.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  let laserIndex = 0;

  function moveLaserAndCreateSparks() {
    if (laserIndex >= letters.length) return;

    const letter = letters[laserIndex];
    const rect = letter.getBoundingClientRect();
    const parentRect = heroTitle.getBoundingClientRect();

    const x = rect.left - parentRect.left + rect.width / 2;
    const y = rect.top - parentRect.top + rect.height / 2;

    // Rozsvietime písmeno presne v momente, kedy vytvárame iskry
    letter.classList.add('active');

    // Create sparks
    for (let i = 0; i < sparkCount; i++) {
      sparks.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 4, // rýchlosť iskier
        vy: (Math.random() - 0.5) * 4, // rýchlosť iskier
        alpha: 1,
        size: Math.random() * 3 + 1 // menšie iskry
      });
    }

    // Presun na ďalšie písmeno
    laserIndex++;
    setTimeout(moveLaserAndCreateSparks, 250); // rýchlosť prepnutia medzi písmenami
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw sparks
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 165, 0, ${s.alpha})`; // oranžová farba
      ctx.fill();

      s.x += s.vx;
      s.y += s.vy;
      s.alpha -= 0.03;

      if (s.alpha <= 0) sparks.splice(i, 1);
    }

    requestAnimationFrame(animate);
  }

  moveLaserAndCreateSparks();
  animate();
});
