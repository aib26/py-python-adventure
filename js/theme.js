const ThemeToggle = (() => {
  const KEY = "pyThemePreference";

  function getSystemTheme() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function getSavedTheme() {
    try {
      return localStorage.getItem(KEY);
    } catch {
      return null;
    }
  }

  function getActiveTheme() {
    return getSavedTheme() || getSystemTheme();
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.textContent = theme === "dark" ? "☀️" : "🌙";
      btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    }
  }

  function setTheme(theme) {
    try {
      localStorage.setItem(KEY, theme);
    } catch {
      // ignore storage errors (private browsing, etc.)
    }
    applyTheme(theme);
  }

  function toggle() {
    const current = document.documentElement.getAttribute("data-theme") || getActiveTheme();
    setTheme(current === "dark" ? "light" : "dark");
  }

  function mount() {
    applyTheme(getActiveTheme());
    const btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.addEventListener("click", toggle);
    }
  }

  return { mount, toggle, setTheme, getActiveTheme };
})();

document.addEventListener("DOMContentLoaded", ThemeToggle.mount);
