// ====================================================
// PO NACITANIE STRANKY - NACITANIE OD ZACIATKU WEB */
// ====================================================

// TOTO zabezpečí, že stránka po reload/reštarte vždy začne hore a nie v strede
if ("scrollRestoration" in history) {
  // Nastavujeme, že manuálne budeme riadiť správanie scrollovania po obnovení stránky
  history.scrollRestoration = "manual";
}

//  Keď sa stránka načíta, nastavíme scroll na úplný začiatok (len pre istotu)
window.addEventListener("load", () => {
  // Odstráni hash z URL bez reloadu stránky
  history.replaceState(
    null,
    "",
    window.location.pathname + window.location.search
  );

  // Pre istotu nastavíme scroll hore
  window.scrollTo(0, 0);
});

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("pageshow", function (event) {
  // Ak bola stránka načítaná z cache
  if (event.persisted) {
    setTimeout(() => {
      window.scrollTo(0, 0); // Alebo iná pozícia
    }, 0);
  }
});

// =============================
// HAMBURGER MENU TOGGLE
// =============================

// Táto funkcia sa spustí, keď click na hamburger ikonu (na mobile).
// Účel: zobrazí alebo skryje hlavné menu (navigáciu) podľa toho, či už je otvorené alebo zatvorené.
function toggleMenu() {
  // Nájde element navigácie podľa ID, ktoré si nastavil v HTML ako "nav-menu".
  const navMenu = document.getElementById("nav-menu");

  // Prepne triedu "active" na navMenu:
  // - Ak trieda "active" ešte nie je pridaná → pridá ju a tým zobrazí menu.
  // - Ak tam "active" už je → odstráni ju a tým menu skryje.
  navMenu.classList.toggle("active");
}

// =====================================================
// CLOSE ON CLICK OUTSIDE (FOR MOBILE AND DESKTOP)
// =====================================================

// Táto funkcia sa spustí, keď klikneš hocikde na stránku.
// Účel: zatvoriť menu a dropdowny, ak klikneš mimo navigácie alebo hamburger menu.
document.addEventListener("click", function (event) {
  // Znova si vyberáme navigačné menu.
  const navMenu = document.getElementById("nav-menu");

  // Vyberáme hamburger menu
  const hamburger = document.querySelector(".hamburger");

  // Skontrolujeme, či kliknutie prebehlo vo vnútri navigácie (menu).
  const clickedInsideMenu = navMenu.contains(event.target);

  // Skontrolujeme, či kliknutie prebehlo na hamburger ikonu.
  const clickedHamburger = hamburger.contains(event.target);

  // Ak sme NEklikli ani na navigáciu, ani na hamburger ikonu...
  if (!clickedInsideMenu && !clickedHamburger) {
    // ... zatvoríme hamburger menu (skryjeme ho), ak bolo otvorené.
    navMenu.classList.remove("active");

    // A zatvoríme aj všetky otvorené dropdown menu (tie podponuky).
    document.querySelectorAll(".dropdown").forEach((drop) => {
      drop.classList.remove("open");
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
  document.querySelectorAll(".dropdown").forEach((drop) => {
    // Ak aktuálny dropdown NIE JE ten, na ktorý si klikol...
    if (drop !== dropdown) {
      // ... tak ho zavrieme (odstránime triedu 'open').
      drop.classList.remove("open");
    }
  });

  // Prepni triedu 'open' na kliknutom dropdown menu:
  // - Ak nebolo otvorené → otvorí ho.
  // - Ak bolo otvorené → zavrie ho.
  dropdown.classList.toggle("open");
}

// ===========================================
// SCROLL EFFECTS (hlavička a zatváranie menu)
// ===========================================

// Táto funkcia sa spustí vždy, keď používateľ scrolluje (posúva stránku).
window.addEventListener("scroll", () => {
  const header = document.querySelector(".site-header");
  const navMenu = document.getElementById("nav-menu");

  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // ZATVÁRANIE MENU IBA NA PC
  if (window.innerWidth > 768) {
    navMenu.classList.remove("active");

    document.querySelectorAll(".dropdown").forEach((drop) => {
      drop.classList.remove("open");
    });
  }
});


// =========================================
// === HERO TITLE LASER & SPARKS ANIMATION
// =========================================

window.addEventListener("load", () => {
  // Toto čaká na načítanie celej stránky, aby bol HTML obsah pripravený.

  // === 1. VYBERIEME ELEMENTY Z HTML ===

  const canvas = document.getElementById("laserCanvas");
  // Zoberieme si <canvas> element, do ktorého budeme kresliť iskry.

  const ctx = canvas.getContext("2d");
  // Nastavíme si "kresliaci priestor" (2D kontext), aby sme mohli kresliť kruhy (iskry).

  const heroTitle = document.querySelector(".hero-title");
  // Vyberieme hlavný nadpis, napríklad LASER CLEANING. Tento nadpis obsahuje jednotlivé písmená.

  const letters = heroTitle.querySelectorAll("span");
  // Získame všetky písmená v nadpise. Každé písmeno je v elemente <span>.

  let sparks = [];
  // Pole, kde budeme ukladať všetky aktuálne iskry na obrazovke.

  let laserIndex = 0;
  // Ktoré písmeno sa práve "vypaľuje" laserom (začína na prvom).

  // === 2. DETEKUJEME, ČI JE ZARIADENIE MOBIL ALEBO PC ===

  const isMobile = window.innerWidth <= 768;
  // Ak je šírka okna menšia alebo rovná 768 pixelov, považujeme to za mobil.
  // Môžeš zmeniť číslo 768 podľa svojho dizajnu (napr. 600 pre menšie telefóny).

  // === 3. NASTAVÍME PARAMETRE PODĽA ZARIADENIA ===

  const settings = {
    sparkCount: isMobile ? 20 : 50,
    // Počet iskier, ktoré sa vygenerujú pri jednom písmeni.
    // Mobil: 30, PC: 50 → môžeš si meniť čísla podľa výkonu.

    sparkSizeMin: isMobile ? 0.5 : 1.5,
    // Minimálna veľkosť iskier.
    // Na mobile menšie, na PC väčšie. Menšie hodnoty = menšie iskry.

    sparkSizeMax: isMobile ? 0.9 : 4,
    // Maximálna veľkosť iskier.
    // Čím väčšie číslo, tým väčšie iskry.

    sparkSpeed: isMobile ? 2 : 4,
    // Rýchlosť, akou sa iskry pohybujú.
    // Vyššia hodnota = rýchlejší pohyb iskier od stredu písmena.

    alphaDecay: 0.03,
    // Ako rýchlo miznú iskry. Číslo 0.03 znamená, že pri každom frame sa iskra viac stráca.
    // Vyššie číslo = iskry zmiznú rýchlejšie. Nižšie číslo = iskry budú na obrazovke dlhšie.
  };

  // === 4. PRISPÔSOBÍME VEĽKOSŤ CANVASU PODĽA VEĽKOSTI NADPISU ===

  function resizeCanvas() {
    canvas.width = heroTitle.offsetWidth;
    // Nastaví šírku plátna presne podľa šírky nadpisu LASER CLEANING.

    canvas.height = heroTitle.offsetHeight;
    // Nastaví výšku plátna podľa výšky nadpisu.
  }

  resizeCanvas();
  // Spustíme túto funkciu hneď pri načítaní stránky.

  window.addEventListener("resize", resizeCanvas);
  // Ak niekto zmení veľkosť okna (napríklad otočí mobil), canvas sa automaticky prispôsobí.

  // === 5. LASER IDE OD PÍSMENA K PÍSMENU A VYTVÁRA ISKRY ===

  function moveLaserAndCreateSparks() {
    if (laserIndex >= letters.length) return;
    // Ak sme už na konci nadpisu (za posledným písmenom), nič nerobíme.

    const letter = letters[laserIndex];
    // Vyberieme aktuálne písmeno, na ktoré "mieri laser".

    const rect = letter.getBoundingClientRect();
    const parentRect = heroTitle.getBoundingClientRect();
    // Získame presné súradnice písmena a celého nadpisu.

    const x = rect.left - parentRect.left + rect.width / 2;
    const y = rect.top - parentRect.top + rect.height / 2;
    // Vypočítame stred písmena X a Y, kde budeme generovať iskry.

    letter.classList.add("active");
    // Pridáme triedu, aby sa písmeno vizuálne zmenilo (rozsvietilo).

    // === VYTVORÍME NOVÉ ISKRY ===
    for (let i = 0; i < settings.sparkCount; i++) {
      sparks.push({
        x: x, // Štartovacia X pozícia iskry (stred písmena)
        y: y, // Štartovacia Y pozícia iskry (stred písmena)

        vx: (Math.random() - 0.5) * settings.sparkSpeed,
        // Horizontálna rýchlosť. Čím väčšie settings.sparkSpeed, tým rýchlejšie sa rozpŕchnu.

        vy: (Math.random() - 0.5) * settings.sparkSpeed,
        // Vertikálna rýchlosť.

        alpha: 1,
        // Nepriehľadnosť (1 = úplne viditeľná). Toto číslo budeme postupne znižovať, aby iskra zmizla.

        size:
          Math.random() * (settings.sparkSizeMax - settings.sparkSizeMin) +
          settings.sparkSizeMin,
        // Náhodná veľkosť iskry v rozsahu od sparkSizeMin po sparkSizeMax.
      });
    }

    laserIndex++;
    // Presunieme laser na ďalšie písmeno.

    setTimeout(moveLaserAndCreateSparks, 250);
    // O koľko milisekúnd sa presunie na ďalšie písmeno.
    // Zmeň 250 na viac/menej, ak chceš rýchlejší/pomalší laser.
  }

  // === 6. HLAVNÁ ANIMÁCIA SPARKOV ===

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Vymažeme predchádzajúci frame (inak by sa iskry kreslili stále na seba).

    // Prejdeme všetky iskry v poli "sparks"
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];

      ctx.beginPath();
      // Začíname kreslenie novej cesty (každej iskry).

      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      // Nakreslíme kruh, ktorý reprezentuje iskru.
      // s.x a s.y sú pozície
      // s.size je polomer kruhu

      ctx.fillStyle = `rgba(255, 165, 0, ${s.alpha})`;
      // Farba iskry. 255, 165, 0 je oranžová (RGB), s.alpha riadi priehľadnosť.

      ctx.fill();
      // Vyplníme kruh farbou.

      s.x += s.vx;
      // Posunieme iskru horizontálne podľa jej rýchlosti.

      s.y += s.vy;
      // Posunieme iskru vertikálne.

      s.alpha -= settings.alphaDecay;
      // Znížime priehľadnosť iskry. Čím vyššia settings.alphaDecay, tým rýchlejšie zmizne.

      if (s.alpha <= 0) {
        sparks.splice(i, 1);
        // Ak je iskra úplne priehľadná, vymažeme ju z poľa (ušetrenie výkonu).
      }
    }

    requestAnimationFrame(animate);
    // Znova spustí funkciu animate() → vytvára plynulú animáciu (cca 60 FPS).
  }

  // === 7. SPUSTENIE CELEJ ANIMÁCIE ===

  moveLaserAndCreateSparks();
  // Spustíme laser na prvé písmeno.

  animate();
  // Spustíme animáciu, ktorá bude neustále vykresľovať iskry.
});

const scrollArrow = document.querySelector(".scroll-down-arrow");

// Ak je šírka okna väčšia ako 768px = PC
if (window.innerWidth > 768) {
  scrollArrow.addEventListener("click", (event) => {
    // Môžeš tu mať animáciu pri kliknutí
    scrollArrow.classList.add("clicked");

    setTimeout(() => {
      scrollArrow.classList.remove("clicked");
    }, 1000);
  });
} else {
  // Na mobile chceme len scroll bez animácií
  scrollArrow.addEventListener("click", (event) => {
    // Ak nechceš robiť nič, tento blok môže byť prázdny.
    // Ale zabezpečujeme, že NIKDY nepridáme triedu "clicked".
    // Ak chceš, môžeš aj prescrollovať ručne (ale href="#info" to rieši)
  });
}

const backToTopBtn = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

