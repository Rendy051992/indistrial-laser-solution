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

let laserY = canvas.height / 2;
let speed = 2;
let direction = 1;

function animateLaser() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const gradient = ctx.createLinearGradient(0, laserY, canvas.width, laserY);
  gradient.addColorStop(0, 'rgba(255, 0, 0, 0)');
  gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.8)');
  gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

  ctx.beginPath();
  ctx.moveTo(0, laserY);
  ctx.lineTo(canvas.width, laserY);
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 2;
  ctx.shadowColor = 'red';
  ctx.shadowBlur = 15;
  ctx.stroke();

  laserY += speed * direction;

  if (laserY >= canvas.height || laserY <= 0) {
    direction *= -1;
  }

  requestAnimationFrame(animateLaser);
}

animateLaser();

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
