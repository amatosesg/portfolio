const themeSwitchers = document.querySelectorAll<HTMLButtonElement>(".theme-switcher");

function updateThemeIcons(themeSwitcher: HTMLButtonElement, theme: "dark" | "light") {
  const darkIcon = themeSwitcher.querySelector<SVGElement>(".theme-icon-dark");
  const lightIcon = themeSwitcher.querySelector<SVGElement>(".theme-icon-light");

  const labelLight = themeSwitcher.dataset.labelLight;
  const labelDark = themeSwitcher.dataset.labelDark;

  if (!darkIcon || !lightIcon || !labelLight || !labelDark) {
    return;
  }

  darkIcon.classList.toggle("hidden", theme !== "dark");
  lightIcon.classList.toggle("hidden", theme !== "light");

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
      updateThemeIcons(switcher, newTheme);
    });
  });
});