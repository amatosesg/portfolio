const menuButton = document.querySelector<HTMLButtonElement>("#mobile-menu-button");
const mobileMenu = document.querySelector<HTMLElement>("#mobile-menu");
const openIcon = document.querySelector<SVGElement>("#mobile-menu-open-icon");
const closeIcon = document.querySelector<SVGElement>("#mobile-menu-close-icon");
const mobileMenuLinks = document.querySelectorAll<HTMLAnchorElement>("[data-mobile-menu-link]");

if (menuButton && mobileMenu && openIcon && closeIcon) {
  function closeMenu(button: HTMLButtonElement, menu: HTMLElement, menuOpenIcon: SVGElement, menuCloseIcon: SVGElement) {
    button.setAttribute("aria-expanded", "false");
    menu.classList.add("hidden");
    menuOpenIcon.classList.remove("hidden");
    menuCloseIcon.classList.add("hidden");
  }

  function openMenu(button: HTMLButtonElement, menu: HTMLElement, menuOpenIcon: SVGElement, menuCloseIcon: SVGElement) {
    button.setAttribute("aria-expanded", "true");
    menu.classList.remove("hidden");
    menuOpenIcon.classList.add("hidden");
    menuCloseIcon.classList.remove("hidden");
  }

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      closeMenu(menuButton, mobileMenu, openIcon, closeIcon);
    } else {
      openMenu(menuButton, mobileMenu, openIcon, closeIcon);
    }
  });

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu(menuButton, mobileMenu, openIcon, closeIcon);
    });
  });

  document.addEventListener("close-mobile-menu", () => {
    closeMenu(menuButton, mobileMenu, openIcon, closeIcon);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu(menuButton, mobileMenu, openIcon, closeIcon);
    }
  });
}