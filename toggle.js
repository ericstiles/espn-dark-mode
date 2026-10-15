/*
 * Page button that switches the dark theme off and on.
 *
 * Every rule in espn-dark.css is scoped to html:not(.espn-dark-off), so adding
 * that class to <html> turns the theme off. The choice is kept in localStorage
 * because it can be read synchronously at document_start, before the page
 * paints; chrome.storage answers asynchronously and would flash the old mode.
 * localStorage is per origin, so each espn.com subdomain remembers its own.
 */
const OFF_CLASS = "espn-dark-off";
const STORAGE_KEY = "espnDarkOff";
const root = document.documentElement;

function readOff() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch (error) {
    console.warn("ESPN Dark Mode: could not read the saved setting", error);
    return false;
  }
}

function saveOff(off) {
  try {
    localStorage.setItem(STORAGE_KEY, off ? "1" : "0");
  } catch (error) {
    console.warn("ESPN Dark Mode: could not save the setting", error);
  }
}

function applyOff(off, button) {
  root.classList.toggle(OFF_CLASS, off);
  if (button) {
    button.title = off ? "Turn dark mode on" : "Turn dark mode off";
    button.setAttribute("aria-pressed", String(!off));
  }
}

function addButton() {
  const button = document.createElement("button");
  button.id = "espnDarkToggle";
  button.type = "button";
  button.textContent = "◐";
  button.addEventListener("click", () => {
    const off = !root.classList.contains(OFF_CLASS);
    saveOff(off);
    applyOff(off, button);
  });
  applyOff(root.classList.contains(OFF_CLASS), button);
  document.body.append(button);
}

applyOff(readOff());

if (document.body) {
  addButton();
} else {
  document.addEventListener("DOMContentLoaded", addButton, { once: true });
}
