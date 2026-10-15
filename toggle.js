/*
 * Page button that switches the dark theme off and on.
 *
 * Every rule in espn-dark.css is scoped to html:not(.espn-dark-off), so adding
 * that class to <html> turns the theme off. The choice is kept in localStorage
 * because it can be read synchronously at document_start, before the page
 * paints; chrome.storage answers asynchronously and would flash the old mode.
 * localStorage is per origin, so each espn.com subdomain remembers its own.
 *
 * Keyboard: the button is the first Tab stop on the page (tabindex 1; ESPN
 * uses no positive tabindex), so Tab then Enter toggles. Alt+Shift+D
 * (Option+Shift+D on a Mac) toggles from anywhere outside a text field.
 */
const OFF_CLASS = "espn-dark-off";
const STORAGE_KEY = "espnDarkOff";
const SHORTCUT_CODE = "KeyD";
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
    button.title = (off ? "Turn dark mode on" : "Turn dark mode off") + " (Alt+Shift+D)";
    button.setAttribute("aria-pressed", String(!off));
  }
}

function toggle(button) {
  const off = !root.classList.contains(OFF_CLASS);
  saveOff(off);
  applyOff(off, button);
}

function isTyping(target) {
  return target instanceof HTMLElement &&
    (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
}

function addButton() {
  const button = document.createElement("button");
  button.id = "espnDarkToggle";
  button.type = "button";
  button.tabIndex = 1;
  button.textContent = "◐";
  button.addEventListener("click", () => toggle(button));
  applyOff(root.classList.contains(OFF_CLASS), button);
  document.body.prepend(button);

  // e.code, not e.key: Option+Shift+D types a symbol on a Mac.
  document.addEventListener("keydown", (event) => {
    if (event.altKey && event.shiftKey && !event.ctrlKey && !event.metaKey &&
        event.code === SHORTCUT_CODE && !isTyping(event.target)) {
      event.preventDefault();
      toggle(button);
    }
  });
}

applyOff(readOff());

if (document.body) {
  addButton();
} else {
  document.addEventListener("DOMContentLoaded", addButton, { once: true });
}
