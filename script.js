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

// TLAČIDLO "SPÄŤ HORE"
// Nájde tlačidlo podľa triedy .back-to-top
const backToTopButton = document.querySelector('.back-to-top');

// Počas scrollovania skontroluje, či stránka je viac ako 300px dole
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) { // Ak je scroll viac ako 300px
    backToTopButton.style.display = 'block'; // Zobrazí tlačidlo
  } else {
    backToTopButton.style.display = 'none'; // Inak ho skryje
  }
});

// HLAVIČKA: Transparentná na začiatku, modrá po scrolle
window.addEventListener('scroll', function () {
  const header = document.querySelector('.site-header'); // Nájde element hlavičky

  if (window.scrollY > 50) { // Ak užívateľ scrolne aspoň 50px
    header.classList.add('scrolled'); // Pridá triedu, ktorá zmení farbu na modrú
  } else {
    header.classList.remove('scrolled'); // Zmizne trieda = bude transparentná
  }
});

// Nájdi nadpis a podnadpis v DOM-e
const heroTitle = document.querySelector('.hero-title');
const heroSubtitle = document.querySelector('.hero-subtitle');

// Funkcia na scrollovanie o 100px dole (jemný scroll)
function scrollDownSlightly() {
  window.scrollBy({
    top: 200,  // O koľko pixelov dole
    behavior: 'smooth' // Plynulý posun
  });
}

// Klik na hero-title → scroll down
heroTitle.addEventListener('click', scrollDownSlightly);

// Klik na hero-subtitle → scroll down
heroSubtitle.addEventListener('click', scrollDownSlightly);


/* Credit and Thanks:
Matrix - Particles.js;
SliderJS - Ettrics;
Design - Sara Mazal Web;
Fonts - Google Fonts
*/

window.onload = function () {
  Particles.init({
    selector: ".background"
  });
};
const particles = Particles.init({
  selector: ".background",
  color: ["#03dac6", "#ff0266", "#000000"],
  connectParticles: true,
  responsive: [
    {
      breakpoint: 768,
      options: {
        color: ["#faebd7", "#03dac6", "#ff0266"],
        maxParticles: 43,
        connectParticles: false
      }
    }
  ]
});

class NavigationPage {
  constructor() {
    this.currentId = null;
    this.currentTab = null;
    this.tabContainerHeight = 70;
    this.lastScroll = 0;
    let self = this;
    $(".nav-tab").click(function () {
      self.onTabClick(event, $(this));
    });
    $(window).scroll(() => {
      this.onScroll();
    });
    $(window).resize(() => {
      this.onResize();
    });
  }

  onTabClick(event, element) {
    event.preventDefault();
    let scrollTop =
      $(element.attr("href")).offset().top - this.tabContainerHeight + 1;
    $("html, body").animate({ scrollTop: scrollTop }, 600);
  }

  onScroll() {
    this.checkHeaderPosition();
    this.findCurrentTabSelector();
    this.lastScroll = $(window).scrollTop();
  }

  onResize() {
    if (this.currentId) {
      this.setSliderCss();
    }
  }

  checkHeaderPosition() {
    const headerHeight = 75;
    if ($(window).scrollTop() > headerHeight) {
      $(".nav-container").addClass("nav-container--scrolled");
    } else {
      $(".nav-container").removeClass("nav-container--scrolled");
    }
    let offset =
      $(".nav").offset().top +
      $(".nav").height() -
      this.tabContainerHeight -
      headerHeight;
    if (
      $(window).scrollTop() > this.lastScroll &&
      $(window).scrollTop() > offset
    ) {
      $(".nav-container").addClass("nav-container--move-up");
      $(".nav-container").removeClass("nav-container--top-first");
      $(".nav-container").addClass("nav-container--top-second");
    } else if (
      $(window).scrollTop() < this.lastScroll &&
      $(window).scrollTop() > offset
    ) {
      $(".nav-container").removeClass("nav-container--move-up");
      $(".nav-container").removeClass("nav-container--top-second");
      $(".nav-container-container").addClass("nav-container--top-first");
    } else {
      $(".nav-container").removeClass("nav-container--move-up");
      $(".nav-container").removeClass("nav-container--top-first");
      $(".nav-container").removeClass("nav-container--top-second");
    }
  }

  findCurrentTabSelector(element) {
    let newCurrentId;
    let newCurrentTab;
    let self = this;
    $(".nav-tab").each(function () {
      let id = $(this).attr("href");
      let offsetTop = $(id).offset().top - self.tabContainerHeight;
      let offsetBottom =
        $(id).offset().top + $(id).height() - self.tabContainerHeight;
      if (
        $(window).scrollTop() > offsetTop &&
        $(window).scrollTop() < offsetBottom
      ) {
        newCurrentId = id;
        newCurrentTab = $(this);
      }
    });
    if (this.currentId != newCurrentId || this.currentId === null) {
      this.currentId = newCurrentId;
      this.currentTab = newCurrentTab;
      this.setSliderCss();
    }
  }

  setSliderCss() {
    let width = 0;
    let left = 0;
    if (this.currentTab) {
      width = this.currentTab.css("width");
      left = this.currentTab.offset().left;
    }
    $(".nav-tab-slider").css("width", width);
    $(".nav-tab-slider").css("left", left);
  }
}

// Nájde šípku
const scrollArrow = document.querySelector('.scroll-down-arrow');

// Keď na ňu klikneš:
scrollArrow.addEventListener('click', function(e) {
  e.preventDefault(); // nezbehne klasické preskočenie
  document.querySelector('#info').scrollIntoView({
    behavior: 'smooth' // pekný plynulý posun
  });
  
  scrollArrow.style.display = 'none'; // schová šípku po kliknutí
});

// Keď scrolluješ hore/dole:
window.addEventListener('scroll', function() {
  const scrollPosition = window.scrollY;
  if (scrollPosition > 200) {
    scrollArrow.style.display = 'none';  // schová šípku
  } else {
    scrollArrow.style.display = 'flex'; // zobrazí znova, ak si hore
  }
});

// Posunie stránku na vrch pri načítaní
window.onload = function() {
    window.scrollTo(0, 0); // Posunie stránku na súradnice (x=0, y=0)
};

window.addEventListener('load', function() {
  document.body.style.overflow = "visible"; // Po načítaní zobrazí scrollbar
  window.scrollTo(0, 0); // Posunie stránku na vrch
});

// Pri načítaní alebo reloade posunie stránku na vrch
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};



new NavigationPage();
/* Credit and Thanks:
Matrix - Particles.js;
SliderJS - Ettrics;
Design - Sara Mazal Web;
Fonts - Google Fonts
*/