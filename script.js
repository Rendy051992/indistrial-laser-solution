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

// --- Hero Title laser effect ---
const heroTitle = document.querySelector('.hero-title');
const letters = heroTitle.querySelectorAll('span');

// Vytvorenie laserovej bodky
const laserDot = document.createElement('div');
laserDot.classList.add('laser-dot');
document.body.appendChild(laserDot);

// Parametre pre iskry
let sparks = [];
const sparkCount = 30;      // Počet iskier
const sparkSize = 4;        // Veľkosť iskry
const sparkSpeed = 5;       // Rýchlosť iskry
const sparkLife = 40;       // Dĺžka života iskry (frame count)

// Spustenie animácie po načítaní stránky
window.addEventListener('load', () => {
  animateLetters(0);
});

// Funkcia: animuje každé písmeno po jednom
function animateLetters(index) {
  if (index >= letters.length) {
    laserDot.style.display = 'none'; // skryje bodku po skončení
    return;
  }

  const letter = letters[index];
  const rect = letter.getBoundingClientRect();

  // Nastavenie pozície laserovej bodky
  laserDot.style.left = `${rect.left + rect.width / 2}px`;
  laserDot.style.top = `${rect.top + rect.height / 2}px`;

  // Zapneme animáciu písmena
  letter.classList.add('active');

  // Vytvoríme iskry
  createSparks(rect.left + rect.width / 2, rect.top + rect.height / 2);

  // Animujeme ďalšie písmeno po krátkej pauze
  setTimeout(() => {
    animateLetters(index + 1);
  }, 400); // rýchlosť prechodu na ďalšie písmeno
}

// Funkcia: vytvorí iskry na zadaných súradniciach
function createSparks(x, y) {
  for (let i = 0; i < sparkCount; i++) {
    sparks.push({
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * sparkSpeed * 2,
      vy: (Math.random() - 0.5) * sparkSpeed * 2,
      life: sparkLife
    });
  }
}

// Animácia iskier
function animateSparks() {
  // Odstránime všetky predošlé iskry zo DOM
  document.querySelectorAll('.spark').forEach(s => s.remove());

  for (let i = sparks.length - 1; i >= 0; i--) {
    const spark = sparks[i];

    // Pohyb iskry
    spark.x += spark.vx;
    spark.y += spark.vy;
    spark.life--;

    // Ak dožil, vymažeme ho
    if (spark.life <= 0) {
      sparks.splice(i, 1);
      continue;
    }

    // Vytvorenie DOM prvku iskry
    const sparkElement = document.createElement('div');
    sparkElement.classList.add('spark');
    sparkElement.style.left = `${spark.x}px`;
    sparkElement.style.top = `${spark.y}px`;

    document.body.appendChild(sparkElement);
  }

  requestAnimationFrame(animateSparks);
}

// Spusti animáciu iskier
animateSparks();














