

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

// === SCROLL HEADER ===
window.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
// === AFTER CLICK DRPDOWN ===
document.addEventListener('click', function(event) {
  const isDropdownClick = event.target.closest('.dropdown');
  const isToggleClick = event.target.closest('.dropdown-toggle');

  if (!isDropdownClick && !isToggleClick) {
    document.querySelectorAll('.dropdown').forEach((drop) => {
      drop.classList.remove('open');
    });
  }
});

/*LASER BEAM*/

  window.addEventListener('load', () => {
    const laser = document.querySelector('.laser-beam');
    const heroTitle = document.querySelector('.hero-title');

    setTimeout(() => {
      laser.style.opacity = '1';
      laser.style.transition = 'transform 0.6s ease-out, opacity 0.3s ease 0.6s';
      laser.style.transform = 'translateX(100vw)';

      setTimeout(() => {
        laser.style.opacity = '0';
        heroTitle.classList.add('glow-pulse');
      }, 600);
    }, 500); 
  });

// === LASER CANVAS ===
const heroSection = document.querySelector('.hero'); 
const canvas = document.getElementById('laserCanvas');
const ctx = canvas.getContext('2d'); 

function resizeCanvas() {
  canvas.width = heroSection.offsetWidth;
  canvas.height = heroSection.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let laserX = -50;         // Počiatočná pozícia lasera
let speed = 5;            // Rýchlosť pohybu lasera
let particles = [];       // Pole pre iskry
let smokeParticles = [];  // Pole pre dym

// Funkcia pre vytvorenie iskier
function createParticles(x, y) {
  for (let i = 0; i < 30; i++) { // Počet iskier
    particles.push({
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 2, // Rýchlosť iskier
      vy: Math.random() * -9,  // Smer iskier
      alpha: 1 // Priehľadnosť iskier
    });
  }
}

// Funkcia pre vytvorenie dymu
function createSmoke(x, y) {
  smokeParticles.push({
    x: x,
    y: y,
    alpha: 1,
    size: Math.random() * 5 + 5 // Veľkosť dymu
  });
}

// Kreslenie iskier
function drawParticles() {
  for (let i = particles.length - 1; i >= 0; i--) { // Prechádzanie všetkými iskrami
    const p = particles[i];
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 165, 0, ${p.alpha})`; // Oranžové iskry
    ctx.fill();
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 0.02;
    if (p.alpha <= 0) {
      particles.splice(i, 1);
    }
  }
}

// Kreslenie dymu
function drawSmoke() {
  for (let i = smokeParticles.length - 1; i >= 0; i--) { 
    const s = smokeParticles[i];
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2); // Kruhový tvar dymu
    ctx.fillStyle = `rgba(200, 200, 200, ${s.alpha})`; // Sivý dym
    ctx.fill();
    s.y -= 0.3;
    s.alpha -= 0.005; // Zmenšovanie priehľadnosti dymu
    if (s.alpha <= 0) {
      smokeParticles.splice(i, 1); // Odstránenie dymu z poľa ak je priehľadnosť 0
    }
  }
}

// Hlavná funkcia animácie lasera
function animateLaser() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const centerY = canvas.height / 2;

  // Gradient lasera
  const gradient = ctx.createLinearGradient(laserX, centerY, laserX + 100, centerY); 
  gradient.addColorStop(0, 'rgba(255, 0, 0, 0)');
  gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.8)');
  gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

  ctx.beginPath();
  ctx.moveTo(laserX, centerY);
  ctx.lineTo(laserX + 10, centerY); // Dĺžka lasera
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 4; // Šírka lasera
  ctx.shadowColor = 'red'; // Farba tieňa
  ctx.shadowBlur = 20; // Rozostrenie tieňa
  ctx.stroke();

  // Pridanie efektov na konci lasera
  createParticles(laserX + 100, centerY);   
  createSmoke(laserX + 100, centerY); 

  // Kreslenie iskier a dymu
  drawParticles();
  drawSmoke();

  // Pohyb lasera
  laserX += speed;

  if (laserX < canvas.width + 100) {
    requestAnimationFrame(animateLaser);
  } else {
    // Keď laser dokončí pohyb, spustí sa glow efekt
    const heroTitle = document.querySelector('.hero-title');
    heroTitle.classList.add('glow-pulse');
  }
}

// Spustenie animácie pri načítaní stránky
window.addEventListener('load', () => {
  animateLaser();
});
