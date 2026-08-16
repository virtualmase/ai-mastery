const panelNames = new Set([
  "overview", "architecture", "built", "knowledge", "loop", "trust", "machine-web", "mason",
]);

const panelPaths = {
  overview: "C:\\AI_MASTERY\\OVERVIEW",
  architecture: "C:\\AI_MASTERY\\ARCHITECTURE",
  built: "C:\\AI_MASTERY\\BUILT_SYSTEMS",
  knowledge: "C:\\AI_MASTERY\\KNOWLEDGE\\*.SYS",
  loop: "C:\\AI_MASTERY\\CLOSED_LOOP.SYS",
  trust: "C:\\AI_MASTERY\\TRUST_LAYER",
  "machine-web": "C:\\AI_MASTERY\\MACHINE_WEB",
  mason: "C:\\AI_MASTERY\\AUTHORS\\MASON_NGUYEN",
};

const osWindow = document.querySelector("[data-window]");
const startButton = document.querySelector("[data-start]");
const startMenu = document.querySelector("[data-start-menu]");
const shutdownDialog = document.querySelector("[data-shutdown]");

function openPanel(name, updateHash = true) {
  if (!panelNames.has(name)) name = "overview";
  const shouldScrollWindow = window.innerWidth < 701;

  document.querySelectorAll("[data-panel]").forEach((panel) => {
    const isActive = panel.dataset.panel === name;
    panel.hidden = !isActive;
    panel.classList.toggle("active", isActive);
  });

  document.querySelectorAll("[data-open-panel]").forEach((control) => {
    control.classList.toggle("active", control.dataset.openPanel === name);
  });

  const path = document.querySelector("[data-active-path]");
  if (path) path.textContent = panelPaths[name];

  closeStartMenu();
  osWindow?.classList.remove("minimized");
  if (updateHash) history.replaceState(null, "", `#${name}`);

  const activePanel = document.querySelector(`[data-panel="${name}"]`);
  activePanel?.focus({ preventScroll: true });
  if (shouldScrollWindow && updateHash) osWindow?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeStartMenu() {
  if (!startMenu || !startButton) return;
  startMenu.hidden = true;
  startButton.setAttribute("aria-expanded", "false");
}

document.addEventListener("click", (event) => {
  const panelControl = event.target.closest("[data-open-panel]");
  if (panelControl) {
    event.preventDefault();
    openPanel(panelControl.dataset.openPanel);
    return;
  }

  if (!event.target.closest("[data-start-menu], [data-start]")) closeStartMenu();
});

startButton?.addEventListener("click", () => {
  const open = startButton.getAttribute("aria-expanded") !== "true";
  startButton.setAttribute("aria-expanded", String(open));
  if (startMenu) startMenu.hidden = !open;
});

document.querySelector("[data-minimize]")?.addEventListener("click", () => {
  osWindow?.classList.toggle("minimized");
  closeStartMenu();
});

document.querySelector("[data-maximize]")?.addEventListener("click", () => {
  osWindow?.classList.toggle("maximized");
});

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => {
    closeStartMenu();
    shutdownDialog?.showModal();
  });
});

document.querySelectorAll("[data-dialog-close]").forEach((button) => {
  button.addEventListener("click", () => shutdownDialog?.close());
});

shutdownDialog?.addEventListener("click", (event) => {
  if (event.target === shutdownDialog) shutdownDialog.close();
});

function updateClock() {
  const now = new Date();
  const display = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  document.querySelectorAll("[data-clock]").forEach((target) => { target.textContent = display; });
}

updateClock();
setInterval(updateClock, 1000);
document.querySelectorAll("[data-year]").forEach((target) => { target.textContent = new Date().getFullYear(); });

const bootScreen = document.querySelector("[data-boot]");
const bootLog = document.querySelector("[data-boot-log]");
const bootProgress = document.querySelector("[data-boot-progress]");
const bootLines = [
  "Memory check..................... KNOWLEDGE GRAPH OK",
  "Mounting C:\\AI_MASTERY......... READY",
  "Loading context.engine.......... READY",
  "Starting agentic_runtime.sys.... READY",
  "Verifying trust_layer.dll....... IN DEVELOPMENT",
  "Launching closed_loop.sys....... THE MACHINE TALKS BACK",
];
let bootTimer;

function finishBoot() {
  clearInterval(bootTimer);
  if (bootScreen) bootScreen.hidden = true;
}

function startBoot() {
  if (!bootScreen || !bootLog || !bootProgress) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    return;
  }

  clearInterval(bootTimer);
  bootLog.replaceChildren();
  bootProgress.style.width = "0";
  bootScreen.hidden = false;
  let line = 0;
  bootTimer = setInterval(() => {
    if (line < bootLines.length) {
      const entry = document.createElement("p");
      entry.textContent = `> ${bootLines[line]}`;
      bootLog.append(entry);
      line += 1;
      bootProgress.style.width = `${Math.round((line / bootLines.length) * 100)}%`;
    } else {
      finishBoot();
    }
  }, 95);
}

document.querySelector("[data-skip-boot]")?.addEventListener("click", finishBoot);
document.querySelector("[data-boot-replay]")?.addEventListener("click", () => {
  closeStartMenu();
  startBoot();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && bootScreen && !bootScreen.hidden) finishBoot();
});

window.addEventListener("hashchange", () => openPanel(location.hash.slice(1), false));
openPanel(location.hash.slice(1) || "overview", false);
