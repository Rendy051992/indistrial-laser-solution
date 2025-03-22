// ==============================================
// === SCROLL RESTORATION NA ZAČIATKU STRÁNKY ===
// ==============================================

// Zabezpečí, že stránka po reload/reštarte vždy začne hore
if ("scrollRestoration" in history) history.scrollRestoration = "manual";

// ====================================
// === GLOBÁLNE PREMENNÉ (SPARKS)  ===
// ====================================

let numberOfSparks = 50;     // počet iskier
let sparkSpeed = 4;          // rýchlosť pohybu iskier
let sparkSizeMin = 1.5;      // minimálna veľkosť iskier
let sparkSizeMax = 4;        // maximálna veľkosť iskier
let sparkAlphaDecay = 0.03;  // ako rýchlo miznú iskry
let delayBetweenLetters = 300; // čas medzi jednotlivými písmenami

// ===============================
// === FUNKCIA SPARK NASTAVENIA ===
// ===============================

function setSparkSettings() {

  if (window.innerWidth >= 1024) { // PC verzia
    numberOfSparks = 50; // veľa iskier na PC
    sparkSpeed = 4; // rýchlejšie iskry
    sparkSizeMin = 1.5; // minimálna veľkosť iskier
    sparkSizeMax = 4; // maximálna veľkosť iskier
    delayBetweenLetters = 300; // oneskorenie medzi písmenami
  }

  else if (window.innerWidth < 768) { // mobilná verzia (portrait)
    numberOfSparks = 20; // menej iskier pre výkon
    sparkSpeed = 2; // pomalšie iskry
    sparkSizeMin = 1; // menšie minimálne iskry
    sparkSizeMax = 2.5; // menšie maximálne iskry
    delayBetweenLetters = 400; // dlhšie oneskorenie medzi písmenami
  }

  else if (window.innerWidth >= 768 && window.innerWidth < 1024) { // tablety, iPad (portrait)
    numberOfSparks = 40; // stredný počet iskier
    sparkSpeed = 3.5; // stredná rýchlosť iskier
    sparkSizeMin = 1.3; // stredná minimálna veľkosť iskier
    sparkSizeMax = 3.5; // stredná maximálna veľkosť iskier
    delayBetweenLetters = 320; // oneskorenie medzi písmenami
  }

  if (window.matchMedia("(orientation: landscape)").matches) { // landscape mód (telefón/tablet na šírku)
    numberOfSparks = 30; // menej iskier ako PC, viac ako mobile
    sparkSpeed = 3; // stredná rýchlosť iskier
    sparkSizeMin = 1.2; // menšia minimálna veľkosť iskier
    sparkSizeMax = 3; // menšia maximálna veľkosť iskier
    delayBetweenLetters = 350; // oneskorenie medzi písmenami
  }

}


window.addEventListener("load", () => {
  // Načítanie stránky hore
  history.replaceState(null, "", window.location.pathname + window.location.search);
  window.scrollTo(0, 0);

  // ============================
  // === SPARKS A LASER ANIMÁCIA
  // ============================

  const canvas = document.getElementById("laserCanvas");
  const ctx = canvas.getContext("2d");
  const heroSection = document.querySelector(".hero");
  const heroTitle = document.querySelector(".hero-title");
  const letters = heroTitle.querySelectorAll("span");

  let sparks = [];        // pole pre iskry
  let laserIndex = 0;     // index aktuálneho písmena

  setSparkSettings();     // volanie funkcie nastavení

  function resizeCanvas() {
    const rect = heroSection.getBoundingClientRect();        // získame rozmery hero sekcie
    canvas.width = rect.width;                               // nastavíme šírku canvasu
    canvas.height = rect.height;                             // nastavíme výšku canvasu
    canvas.style.width = rect.width + "px";                  // CSS šírka
    canvas.style.height = rect.height + "px";                // CSS výška
  }

  function moveLaserAndCreateSparks() {
    if (laserIndex >= letters.length) return;                // ak sme na konci, skončíme

    const letter = letters[laserIndex];                      // aktuálne písmeno
    const letterRect = letter.getBoundingClientRect();
    const heroRect = heroSection.getBoundingClientRect();

    const x = letterRect.left - heroRect.left + letterRect.width / 2; // X pozícia iskier
    const y = letterRect.top - heroRect.top + letterRect.height / 2;  // Y pozícia iskier

    letter.classList.add("active");                          // rozsvieti písmeno

    for (let i = 0; i < numberOfSparks; i++) {               // počet iskier podľa nastavenia
      sparks.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * sparkSpeed,
        vy: (Math.random() - 0.5) * sparkSpeed,
        alpha: 1,
        size: Math.random() * (sparkSizeMax - sparkSizeMin) + sparkSizeMin,
      });
    }

    laserIndex++;                                            // ďalšie písmeno
    setTimeout(moveLaserAndCreateSparks, delayBetweenLetters); // čas medzi písmenami
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);       // vyčistí celý canvas

    for (let i = sparks.length - 1; i >= 0; i--) {          // prechádza všetky iskry
      const s = sparks[i];
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 165, 0, ${s.alpha})`;      // oranžová s alpha
      ctx.fill();

      s.x += s.vx;                                          // pohyb X
      s.y += s.vy;                                          // pohyb Y
      s.alpha -= sparkAlphaDecay;                           // miznutie iskry

      if (s.alpha <= 0) sparks.splice(i, 1);                // keď zmizne, odstrániť z poľa
    }

    requestAnimationFrame(animate);                         // ďalší frame
  }

  resizeCanvas();                                           // hneď na začiatku
  window.addEventListener("resize", () => {
    resizeCanvas();
    setSparkSettings();                                     // nové nastavenia po resize
  });

  moveLaserAndCreateSparks();                               // spusti laser
  animate();                                                // spusti animáciu
});

// =====================================
// === PAGESHOW EVENT PRE SAFARI CACHE
// =====================================

window.addEventListener("pageshow", function (event) { // Po zobrazení stránky (aj pri návrate z cache v Safari)
  if (event.persisted) {                               // Ak bola stránka načítaná z cache
    setTimeout(() => {                                 // Počkaj 0 ms (okamžite)
      window.scrollTo(0, 0);                           // Posuň stránku na úplný vrch
    }, 0);
  }
});

// ===============================
// === HAMBURGER MENU FUNKCIA  ===
// ===============================

function toggleMenu() {                                 // Funkcia na prepnutie menu (otvorenie / zatvorenie)
  const navMenu = document.getElementById("nav-menu");  // Nájde element s id "nav-menu"
  navMenu.classList.toggle("active");                   // Ak má class "active", odstráni ju. Ak nie, pridá ju.
}


// ================================
// === ZAVRIE MENU PRI KLIKNUTÍ  ===
// ================================

document.addEventListener("click", function (event) {     // Po kliknutí kdekoľvek na stránke
  const navMenu = document.getElementById("nav-menu");    // Získa element menu podľa ID "nav-menu"
  const hamburger = document.querySelector(".hamburger");  // Získa hamburger ikonu podľa class "hamburger"

  const clickedInsideMenu = navMenu.contains(event.target);  // Zistí, či klik bol vo vnútri menu
  const clickedHamburger = hamburger.contains(event.target); // Zistí, či klik bol na hamburger ikonu

  if (!clickedInsideMenu && !clickedHamburger) {    // Ak klik nebol v menu ani na hamburger
    navMenu.classList.remove("active");              // Zavrie menu (odstráni class "active")
    document.querySelectorAll(".dropdown").forEach((drop) =>   // Pre každý otvorený dropdown...
      drop.classList.remove("open")   // ...zavrie dropdown (odstráni class "open")
    );
  }
});


// ==============================
// === TOGGLE DROPDOWN (PC)   ===
// ==============================

function toggleDropdown(event, element) {                                              // Funkcia na prepínanie dropdown menu
  event.preventDefault();                                                              // Zruší predvolené správanie odkazu alebo tlačidla
  const dropdown = element.parentElement;                                              // Získa rodičovský element kliknutého prvku (menu položka)

  document.querySelectorAll(".dropdown").forEach((drop) => {                           // Pre každý dropdown menu na stránke...
    if (drop !== dropdown) drop.classList.remove("open");                              // ...ak to nie je práve otvorený dropdown, zatvor ho
  });

  dropdown.classList.toggle("open");                                                   // Otvorí/zatvorí aktuálny dropdown (prepína class "open")
}


// =====================================
// === SCROLL ZMENÍ HEADER + ZAVRIE MENU
// =====================================

window.addEventListener("scroll", () => {                                                    // Sleduje scroll udalosti na stránke
  const header = document.querySelector(".site-header");                                     // Získa element hlavičky (header)
  const navMenu = document.getElementById("nav-menu");                                       // Získa element navigačného menu

  if (window.scrollY > 50) header.classList.add("scrolled");                                 // Ak používateľ scrollne viac ako 50px, pridá triedu "scrolled" do hlavičky
  else header.classList.remove("scrolled");                                                  // Ak je menej ako 50px, trieda "scrolled" sa odstráni

  if (window.innerWidth > 768) {                                                             // Ak je obrazovka väčšia ako 768px (desktop verzia)
    navMenu.classList.remove("active");                                                      // Zavrie hlavné menu (odstráni triedu "active")
    document.querySelectorAll(".dropdown").forEach((drop) => drop.classList.remove("open")); // Zavrie všetky dropdown menu (odstráni triedu "open")
  }
});


// ======================================
// === SCROLL DOWN ARROW - BUTTON     ===
// ======================================

const scrollArrow = document.querySelector(".scroll-down-arrow");                         // Získa element šípky pre scroll dole

if (window.innerWidth > 768) {                                                            // Ak je šírka obrazovky väčšia ako 768px (PC verzia)
  scrollArrow.addEventListener("click", () => {                                           // Po kliknutí na šípku
    scrollArrow.classList.add("clicked");                                                 // Pridá triedu "clicked" (efekt kliknutia)
    setTimeout(() => scrollArrow.classList.remove("clicked"), 1000);                      // Po 1 sekunde odstráni triedu "clicked"
  });
} else {                                                                                  // Pre mobilné zariadenia (šírka menšia ako 768px)
  scrollArrow.addEventListener("click", () => {                                           // Po kliknutí na šípku
    // mobil nič nerobí - ide to cez href="#info"                                          // Scrollovanie zabezpečuje priamo odkaz v href
  });
}


// ======================================
// === BACK TO TOP BUTTON (PC & MOBILE)
// ======================================

const backToTopBtn = document.querySelector(".back-to-top");                           // Získa element tlačidla "Späť hore"

window.addEventListener("scroll", () => {                                              // Počas scrollovania stránky
  if (window.scrollY > 300) backToTopBtn.classList.add("show");                        // Ak používateľ zroluje viac ako 300px, zobrazí sa tlačidlo (pridá class "show")
  else backToTopBtn.classList.remove("show");                                          // Ak je menej ako 300px, tlačidlo zmizne (odstráni class "show")
});

backToTopBtn.addEventListener("click", (e) => {                                        // Kliknutie na tlačidlo "Späť hore"
  e.preventDefault();                                                                  // Zablokuje štandardné správanie odkazu
  window.scrollTo({ top: 0, behavior: "smooth" });                                     // Posunie stránku hladko úplne hore
});

