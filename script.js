// =============================
// HAMBURGER MENU TOGGLE
// =============================

// Táto funkcia sa spustí, keď klikneš na hamburger ikonu (na mobile).
// Účel: zobrazí alebo skryje hlavné menu (navigáciu) podľa toho, či už je otvorené alebo zatvorené.
function toggleMenu() {
  // Nájde element navigácie podľa ID, ktoré si nastavil v HTML ako "nav-menu".
  const navMenu = document.getElementById("nav-menu");

  // Prepne triedu "active" na navMenu:
  // - Ak trieda "active" ešte nie je pridaná → pridá ju a tým zobrazí menu.
  // - Ak tam "active" už je → odstráni ju a tým menu skryje.
  navMenu.classList.toggle("active");
}


// =============================
// CLOSE ON CLICK OUTSIDE (FOR MOBILE AND DESKTOP)
// =============================

// Táto funkcia sa spustí, keď klikneš hocikde na stránku.
// Účel: zatvoriť menu a dropdowny, ak klikneš mimo navigácie alebo hamburger menu.
document.addEventListener('click', function(event) {
  // Znova si vyberáme navigačné menu.
  const navMenu = document.getElementById("nav-menu");

  // Vyberáme hamburger menu (ikonu s tromi čiarami).
  const hamburger = document.querySelector('.hamburger');

  // Skontrolujeme, či kliknutie prebehlo vo vnútri navigácie (menu).
  const clickedInsideMenu = navMenu.contains(event.target);

  // Skontrolujeme, či kliknutie prebehlo na hamburger ikonu.
  const clickedHamburger = hamburger.contains(event.target);

  // Ak sme NEklikli ani na navigáciu, ani na hamburger ikonu...
  if (!clickedInsideMenu && !clickedHamburger) {
    // ... zatvoríme hamburger menu (skryjeme ho), ak bolo otvorené.
    navMenu.classList.remove("active");

    // A zatvoríme aj všetky otvorené dropdown menu (tie podponuky).
    document.querySelectorAll('.dropdown').forEach((drop) => {
      drop.classList.remove('open');
    });
  }
});


// =============================
// DROPDOWN MENU TOGGLE
// =============================

// Funkcia sa spustí po kliknutí na "Services" alebo "Lenses".
// Účel: zobrazí alebo skryje podmenu (dropdown) konkrétnej položky.
function toggleDropdown(event, element) {
  // Zastaví predvolené správanie elementu (v tomto prípade <a> odkazu).
  // Vďaka tomu sa stránka nepresmeruje, keď klikneš na odkaz.
  event.preventDefault();

  // Vyberieme rodiča odkazu, teda <li> element, v ktorom sa nachádza tento odkaz.
  const dropdown = element.parentElement;

  // Prejdeme všetky elementy s triedou .dropdown (všetky menu s podponukami).
  document.querySelectorAll('.dropdown').forEach((drop) => {
    // Ak aktuálny dropdown NIE JE ten, na ktorý si klikol...
    if (drop !== dropdown) {
      // ... tak ho zavrieme (odstránime triedu 'open').
      drop.classList.remove('open');
    }
  });

  // Prepni triedu 'open' na kliknutom dropdown menu:
  // - Ak nebolo otvorené → otvorí ho.
  // - Ak bolo otvorené → zavrie ho.
  dropdown.classList.toggle('open');
}


// =============================
// SCROLL EFFECTS (hlavička a zatváranie menu)
// =============================

// Táto funkcia sa spustí vždy, keď používateľ scrolluje (posúva stránku).
window.addEventListener('scroll', () => {
  // Nájdeme hlavičku stránky, aby sme ju vedeli upraviť pri scrollovaní.
  const header = document.querySelector('.site-header');

  // Nájdeme navigačné menu (hlavné menu).
  const navMenu = document.getElementById("nav-menu");

  // Ak používateľ scrollol o viac ako 50 pixelov smerom dole...
  if (window.scrollY > 50) {
    // ... pridáme triedu 'scrolled' → väčšinou sa zmení pozadie, pridá tieň atď.
    header.classList.add('scrolled');
  } else {
    // ... ak sme zase hore → odstránime triedu 'scrolled'.
    header.classList.remove('scrolled');
  }

  // Každým scrollom zatvoríme mobilné menu (odstránime triedu 'active').
  navMenu.classList.remove("active");

  // Zatvoríme tiež všetky otvorené dropdown menu.
  document.querySelectorAll('.dropdown').forEach((drop) => {
    drop.classList.remove('open');
  });
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
/*    sparks.push({*/

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

// Detekujeme, či je mobilné zariadenie
const isMobile = window.innerWidth <= 768;

// Funkcia na vytvorenie iskier
for (let i = 0; i < sparkCount; i++) {
  sparks.push({
    x: x,
    y: y,
    vx: (Math.random() - 0.5) * 4,
    vy: (Math.random() - 0.5) * 4,
    alpha: 1,

    // Nastavíme veľkosť iskier podľa zariadenia
    size: isMobile
      ? Math.random() * (0.8 - 0.3) + 0.3    // Mobil: 0.3 až 0.8 px
      : Math.random() * (2.5 - 1) + 1        // PC: 1 až 2.5 px
  });
}


// Vyberieme hamburger ikonku
const hamburger = document.querySelector('.hamburger');

// Vyberieme navigačné menu (ul)
const navMenu = document.querySelector('.site-nav ul');

// Po kliknutí na hamburger prepne triedu "active" na menu
hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

/* PARALAX HERO */

window.addEventListener('scroll', function() {
  const parallax = document.querySelector('.hero');
  let offset = window.pageYOffset;
  parallax.style.backgroundPositionY = offset * 0.5 + "px";
});







// === CLOSE MENUS WHEN CLICKING OUTSIDE ===
document.addEventListener('click', function(event) {
  const navMenu = document.getElementById("nav-menu");
  const hamburger = document.querySelector('.hamburger');
  const clickedInsideMenu = navMenu.contains(event.target);
  const clickedHamburger = hamburger.contains(event.target);

  // Ak klikneš mimo menu aj mimo hamburger
  if (!clickedInsideMenu && !clickedHamburger) {
    // Zatvoríme hamburger menu, ak je otvorené
    if (navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
    }

    // Zatvoríme všetky dropdowny (ak sú nejaké otvorené)
    document.querySelectorAll('.dropdown').forEach((drop) => {
      drop.classList.remove('open');
    });
  }
});


window.addEventListener('scroll', () => {
  const navMenu = document.getElementById("nav-menu");

  if (navMenu.classList.contains("active")) {
    navMenu.classList.remove("active");
  }

  // Zavrie dropdowny pri skrolovaní
  document.querySelectorAll('.dropdown').forEach((drop) => {
    drop.classList.remove('open');
  });
});








/* RESPONSIVE WEB */