console.log("Je to mobil? ", window.innerWidth <= 768);

// === SCROLL RESTORATION ===
// Ak obnovíš stránku, pozícia scrollu sa nenastaví automaticky
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'; // nastavíme, aby sa stránka po obnovení vždy načítala od vrchu
}

// === DROPDOWN MENU ===
// Funkcia na otváranie a zatváranie rozbaľovacích menu (dropdown)
function toggleDropdown(event, element) {
  event.preventDefault(); // zamedzí predvolenému správaniu odkazu (nepresmeruje stránku)
  const dropdown = element.parentElement; // nájde rodiča kliknutého prvku, teda <li> s triedou dropdown

  // Pre každý iný otvorený dropdown (okrem aktuálneho) ho zatvoríme
  document.querySelectorAll('.dropdown').forEach((drop) => {
    if (drop !== dropdown) {
      drop.classList.remove('open'); // zavrie všetky ostatné otvorené dropdowny
    }
  });

  dropdown.classList.toggle('open'); // ak má otvorené, zavrie; ak zatvorené, otvorí
}

// === HAMBURGER MENU ===
// Funkcia na otvorenie/zatvorenie navigácie v mobilnom zobrazení
function toggleMenu() {
  const navMenu = document.getElementById("nav-menu"); // nájde menu podľa ID
  navMenu.classList.toggle("active"); // ak má aktívne, vypne; ak nie, zapne (zobrazí/skryje menu)
}

// === SCROLL HEADER ===
// Keď používateľ skroluje, pridáme alebo odstránime triedu 'scrolled' na hlavičke
window.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header'); // nájdeme hlavičku
  if (window.scrollY > 50) { // ak skrolujeme viac ako 50 pixelov
    header.classList.add('scrolled'); // pridáme efekt scrolled (červené pozadie a tieň)
  } else {
    header.classList.remove('scrolled'); // ak skrolujeme hore, odstránime scrolled efekt
  }
});

// === AFTER CLICK DROPDOWN ===
// Ak klikneme hocikde mimo dropdownu, zatvoríme všetky otvorené dropdown menu
document.addEventListener('click', function(event) {
  const isDropdownClick = event.target.closest('.dropdown'); // zistí, či klikol na dropdown
  const isToggleClick = event.target.closest('.dropdown-toggle'); // zistí, či si klikla na prepínač menu (hamburger

  // Ak sme neklikli ani na jedno z toho, zatvárame všetky otvorené menu
  if (!isDropdownClick && !isToggleClick) {
    document.querySelectorAll('.dropdown').forEach((drop) => {
      drop.classList.remove('open'); // zavrie všetky dropdowny
    });
  }
});

// === HERO TITLE LASER & SPARKS ANIMATION ===

window.addEventListener('load', () => {

  const canvas = document.getElementById('laserCanvas'); // plátno, kde sa budú vykresľovať efekty
  const ctx = canvas.getContext('2d'); // získame 2D kresliaci kontext

  const heroTitle = document.querySelector('.hero-title'); // nájdeme hlavičkový text (LASER CLEANING)
  const letters = heroTitle.querySelectorAll('span'); // všetky písmená ako jednotlivé elementy

  let sparks = []; // pole, kde budeme ukladať jednotlivé iskry
  const sparkCount = 50; // počet iskier, ktoré sa vygenerujú pre jedno písmeno

  // Zisti veľkosť obrazovky
  const isMobile = window.innerWidth <= 768;
  
  


// Príklad podmienky pre sparks:
const sparkSizeMin = isMobile ? 0.5 : 1.5;
const sparkSizeMax = isMobile ? 1.5 : 4;


  // Funkcia, ktorá nastaví veľkosť canvasu podľa veľkosti nadpisu
  function resizeCanvas() {
    canvas.width = heroTitle.offsetWidth; // šírka podľa veľkosti nadpisu
    canvas.height = heroTitle.offsetHeight; // výška podľa veľkosti nadpisu
  }
  resizeCanvas(); // spustíme hneď pri načítaní
  window.addEventListener('resize', resizeCanvas); // ak zmeníme veľkosť okna, prispôsobíme canvas

  let laserIndex = 0; // index aktuálneho písmena, ktoré "vypaľujeme"

  // Funkcia, ktorá sa volá na vypálenie jedného písmena a vytvorenie iskier
  function moveLaserAndCreateSparks() {
    if (laserIndex >= letters.length) return; // ak sme prešli všetky písmená, skončíme

    const letter = letters[laserIndex]; // vyberieme aktuálne písmeno
    const rect = letter.getBoundingClientRect(); // zistíme jeho pozíciu na stránke
    const parentRect = heroTitle.getBoundingClientRect(); // zistíme pozíciu celého nadpisu

    // Vypočítame súradnice stredu písmena (voči heroTitle)
    const x = rect.left - parentRect.left + rect.width / 2;
    const y = rect.top - parentRect.top + rect.height / 2;

    letter.classList.add('active'); // písmeno sa rozsvieti (dostane triedu active)

    // Vygenerujeme iskry na aktuálnej pozícii písmena
    for (let i = 0; i < sparkCount; i++) {
      sparks.push({
  x: x,
  y: y,
  vx: (Math.random() - 0.5) * 4,
  vy: (Math.random() - 0.5) * 4,
  alpha: 1,
  size: Math.random() * (sparkSizeMax - sparkSizeMin) + sparkSizeMin // TOTO sme upravili
});

    }

    laserIndex++; // posunieme sa na ďalšie písmeno
    setTimeout(moveLaserAndCreateSparks, 250); // oneskorenie pred vypálením ďalšieho písmena (0,25s)
  }

  // Funkcia, ktorá vykresľuje animáciu (iskry)
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // vymaže predchádzajúci frame

    // Prejdeme každú iskru a vykreslíme ju
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i]; // vezmeme aktuálnu iskru
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2); // nakreslíme kruh
      ctx.fillStyle = `rgba(255, 165, 0, ${s.alpha})`; // oranžová farba + priehľadnosť
      ctx.fill();

      s.x += s.vx; // posunieme iskru X smerom
      s.y += s.vy; // posunieme iskru Y smerom
      s.alpha -= 0.03; // postupne znižujeme priehľadnosť (iskra mizne)

      if (s.alpha <= 0) sparks.splice(i, 1); // ak je priehľadná, odstránime ju z poľa
    }

    requestAnimationFrame(animate); // plynulé vykresľovanie (60fps)
  }

  moveLaserAndCreateSparks(); // spustíme laser na prvé písmeno
  animate(); // spustíme animáciu iskier
});

