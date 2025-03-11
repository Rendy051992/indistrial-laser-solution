// PARTICLES.JS CONFIGURATION
particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 80
      },
      "color": {
        "value": ["#03dac6", "#ff0266", "#ffffff"]
      },
      "shape": {
        "type": "circle"
      },
      "opacity": {
        "value": 0.5
      },
      "size": {
        "value": 3
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 4
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        }
      }
    }
  });
  
  // DROPDOWN MENU FUNCTION
  function toggleDropdown(event, element) {
    event.preventDefault();
    
    const dropdown = element.parentElement;
  
    // Zavri všetky otvorené dropdowny
    document.querySelectorAll(".dropdown").forEach((drop) => {
      if (drop !== dropdown) {
        drop.classList.remove("open");
      }
    });
  
    // Prepni aktuálny dropdown
    dropdown.classList.toggle("open");
  }
  
  // HAMBURGER MENU FUNCTION
  function toggleMenu() {
    const navMenu = document.getElementById("nav-menu");
    navMenu.classList.toggle("active");
  }
  