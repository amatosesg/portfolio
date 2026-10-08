const themeSwitchers = document.querySelectorAll<HTMLButtonElement>(".theme-switcher");

function updateThemeIcons(
  themeSwitcher: HTMLButtonElement,
  theme: "dark" | "light",
  animate = false,
) {
  const darkIcon = themeSwitcher.querySelector<SVGElement>(".theme-icon-dark");
  const lightIcon = themeSwitcher.querySelector<SVGElement>(".theme-icon-light");

  const labelLight = themeSwitcher.dataset.labelLight;
  const labelDark = themeSwitcher.dataset.labelDark;

  if (!darkIcon || !lightIcon || !labelLight || !labelDark) {
    return;
  }

  const activeIcon = theme === "dark" ? darkIcon : lightIcon;
  const inactiveIcon = theme === "dark" ? lightIcon : darkIcon;

  if (animate) {
    inactiveIcon.animate(
      [
        {
          opacity: 1,
          transform: "rotate(0deg) scale(1)",
        },
        {
          opacity: 0,
          transform: "rotate(45deg) scale(0.7)",
        },
      ],
      {
        duration: 180,
        easing: "ease-in",
        fill: "forwards",
      },
    );

    activeIcon.animate(
      [
        {
          opacity: 0,
          transform: "rotate(-45deg) scale(0.7)",
        },
        {
          opacity: 1,
          transform: "rotate(0deg) scale(1)",
        },
      ],
      {
        duration: 220,
        easing: "ease-out",
        fill: "forwards",
      },
    );
  } else {
    activeIcon.style.opacity = "1";
    activeIcon.style.transform = "rotate(0deg) scale(1)";

    inactiveIcon.style.opacity = "0";
    inactiveIcon.style.transform = "rotate(0deg) scale(0.7)";
  }

  themeSwitcher.setAttribute(
    "aria-label",
    theme === "dark" ? labelLight : labelDark,
  );
}

themeSwitchers.forEach((themeSwitcher) => {
  const storageKey = themeSwitcher.dataset.storageKey;

  if (!storageKey) {
    return;
  }

  const currentTheme: "dark" | "light" = document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";

  updateThemeIcons(themeSwitcher, currentTheme);

  themeSwitcher.addEventListener("click", () => {
    const isDark = document.documentElement.classList.contains("dark");
    const newTheme: "dark" | "light" = isDark ? "light" : "dark";

    document.documentElement.classList.toggle("dark", newTheme === "dark");

    localStorage.setItem(storageKey, newTheme);

    themeSwitchers.forEach((switcher) => {
      updateThemeIcons(switcher, newTheme, true);
    });
  });
});