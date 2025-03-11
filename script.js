// Konfigurácia particles.js - robí animáciu s malými pohybujúcimi sa bodkami na pozadí.
// Tento efekt sa aplikuje na element s ID "particles-js" (nájdeš ho v HTML).

particlesJS("particles-js", { // Priraďuje particles do elementu s id="particles-js"
  "particles": { // Vlastnosti častíc
    "number": {
      "value": 80 // Počet častíc na obrazovke (čím väčšie číslo, tým viac bodiek)
    },
    "color": {
      "value": ["#03dac6", "#ff0266", "#ffffff"] // Farby častíc - môžeš meniť na tvoje farby (napr. "#FF0000")
    },
    "shape": {
      "type": "circle" // Tvar častíc: "circle" (kruh). Môžeš použiť aj "triangle", "edge"
    },
    "opacity": {
      "value": 0.5 // Priehľadnosť bodiek (0 úplne priehľadné, 1 plné)
    },
    "size": {
      "value": 3 // Veľkosť bodiek (čím väčšie číslo, tým väčšia bodka)
    },
    "line_linked": { // Čiary, ktoré spájajú bodky
      "enable": true, // Zapnutie čiar medzi bodkami (false ich vypne)
      "distance": 150, // Maximálna vzdialenosť medzi bodkami, kde sa čára zobrazí
      "color": "#ffffff", // Farba čiar medzi bodkami (biela)
      "opacity": 0.4, // Priehľadnosť čiar
      "width": 1 // Hrúbka čiar medzi bodkami
    },
    "move": { // Pohyb bodiek
      "enable": true, // Povoliť pohyb
      "speed": 4 // Rýchlosť pohybu bodiek (čím vyššie číslo, tým rýchlejšie)
    }
  },
  "interactivity": { // Reakcie na myš
    "detect_on": "canvas", // Sleduje interakciu na samotnej animácii (canvas)
    "events": {
      "onhover": { // Čo sa stane, keď prejdeš myšou nad animáciu
        "enable": true, // Povolenie reakcie na myš
        "mode": "repulse" // Mód: "repulse" znamená, že bodky utekajú od kurzora
      }
    }
  }
});

// Funkcia na otvorenie/zatvorenie rozbaľovacieho menu (dropdown).
// Používa sa pri kliknutí na "Services" alebo "Lenses".

function toggleDropdown(event, element) {
  event.preventDefault(); // Zabraňuje klasickému správaniu odkazu (nepreskočí stránka hore)

  const dropdown = element.parentElement; // Nájde element <li>, ktorý má class="dropdown"

  // Prejde všetky dropdowny v navigácii a zatvorí ich (odstráni class="open"),
  // okrem toho, na ktorý si práve klikla.
  document.querySelectorAll('.dropdown').forEach((drop) => {
    if (drop !== dropdown) { // Ak to nie je aktuálne kliknutý dropdown...
      drop.classList.remove('open'); // Zatvorí menu (odstráni "open")
    }
  });

  // Prepne aktuálny dropdown - ak bol zatvorený, otvorí ho, ak bol otvorený, zavrie ho
  dropdown.classList.toggle('open');
}

// Funkcia pre mobilné hamburger menu.
// Keď klikneš na ikonu ☰, otvorí alebo zavrie navigačné menu.

function toggleMenu() {
  const navMenu = document.getElementById("nav-menu"); // Nájde element s ID "nav-menu"
  navMenu.classList.toggle("active"); // Prepne triedu "active" -> zobrazí alebo skryje menu
}

// Tento kód sa spustí pri kliknutí hocikde na stránke.
// Ak klikneš mimo navigácie, všetky rozbalené menu sa zatvoria.

document.addEventListener("click", function(event) {
  const isClickInsideMenu = event.target.closest('.site-nav'); // Zistí, či si klikla niekde v menu (.site-nav)

  if (!isClickInsideMenu) { // Ak nie (klikla si mimo menu)
    document.querySelectorAll('.dropdown').forEach((drop) => {
      drop.classList.remove('open'); // Zatvorí všetky otvorené dropdowny
    });
  }
});
