const navigationLinks =
  document.querySelectorAll<HTMLAnchorElement>("[data-nav-section]");

const sections = document.querySelectorAll<HTMLElement>(
  "#projects, #about, #experience, #contact",
);

if (navigationLinks.length && sections.length) {
  function setActiveSection(sectionId: string | null) {
    navigationLinks.forEach((link) => {
      const isActive =
        sectionId !== null && link.dataset.navSection === sectionId;

      link.classList.toggle("font-semibold", isActive);
      link.classList.toggle("text-blue-600", isActive);
      link.classList.toggle("dark:text-blue-400", isActive);

      link.classList.toggle("text-gray-600", !isActive);
      link.classList.toggle("dark:text-slate-300", !isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const sectionId = link.dataset.navSection;

      if (sectionId) {
        setActiveSection(sectionId);
      }
    });
  });

  function updateActiveSection() {
    const headerOffset = 120;
    let activeSection: HTMLElement | null = null;

    for (const section of sections) {
      const sectionTop = section.getBoundingClientRect().top;

      if (sectionTop <= headerOffset) {
        activeSection = section;
      }
    }

    if (activeSection !== null) {
      setActiveSection(activeSection.id);
    } else {
      setActiveSection(null);
    }
  }

  window.addEventListener("scroll", updateActiveSection, {
    passive: true,
  });

  const currentHash = window.location.hash.replace("#", "");

  if (currentHash && document.getElementById(currentHash)) {
    setActiveSection(currentHash);
  } else {
    setActiveSection(null);
  }

  updateActiveSection();
}