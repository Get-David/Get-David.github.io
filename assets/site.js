const root = document.documentElement;
const themeButton = document.querySelector("[data-theme-toggle]");
const storedTheme = localStorage.getItem("david-course-hub-theme");

if (storedTheme) {
  root.dataset.theme = storedTheme;
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  root.dataset.theme = "dark";
}

function syncThemeControl() {
  themeButton?.setAttribute("aria-pressed", String(root.dataset.theme === "dark"));
}

syncThemeControl();

themeButton?.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  localStorage.setItem("david-course-hub-theme", next);
  syncThemeControl();
});

const dialog = document.querySelector("[data-search-dialog]");
const input = document.querySelector("[data-search-input]");
const results = document.querySelector("[data-search-results]");
const isNested = location.pathname.includes("/claude-code/") || location.pathname.includes("/codex/");
const prefix = isNested ? "../" : "";

const searchIndex = [
  { title: "Claude Code：工具定位", group: "Claude Code", href: `${prefix}claude-code/index.html#what` },
  { title: "Claude Code：开始使用", group: "Claude Code", href: `${prefix}claude-code/index.html#start` },
  { title: "Claude Code：提示词与工作流", group: "Claude Code", href: `${prefix}claude-code/index.html#workflow` },
  { title: "Claude Code：权限与安全", group: "Claude Code", href: `${prefix}claude-code/index.html#safety` },
  { title: "Codex：四种入口", group: "Codex", href: `${prefix}codex/index.html#what` },
  { title: "Codex：AGENTS.md", group: "Codex", href: `${prefix}codex/index.html#agents` },
  { title: "Codex：计划与验证", group: "Codex", href: `${prefix}codex/index.html#workflow` },
  { title: "Codex：沙箱与审批", group: "Codex", href: `${prefix}codex/index.html#safety` },
];

function renderResults(query = "") {
  if (!results) return;
  const keyword = query.trim().toLowerCase();
  const matches = searchIndex.filter((item) => `${item.title} ${item.group}`.toLowerCase().includes(keyword));
  results.innerHTML = matches.length
    ? matches.map((item) => `<a href="${item.href}"><small>${item.group}</small><span>${item.title}</span><b>↗</b></a>`).join("")
    : '<p class="empty-result">没有找到相关内容</p>';
}

function openSearch() {
  if (!dialog) return;
  dialog.showModal();
  renderResults("");
  setTimeout(() => input?.focus(), 0);
}

document.querySelectorAll("[data-search-open]").forEach((button) => button.addEventListener("click", openSearch));
input?.addEventListener("input", (event) => renderResults(event.target.value));
document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openSearch();
  }
});

document.querySelector("[data-menu-toggle]")?.addEventListener("click", () => {
  document.body.classList.toggle("sidebar-open");
});

document.querySelectorAll(".sidebar a").forEach((link) => link.addEventListener("click", () => document.body.classList.remove("sidebar-open")));

const progressBar = document.querySelector("[data-reading-progress]");
function updateReadingProgress() {
  if (!progressBar) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)) : 0;
  progressBar.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateReadingProgress, { passive: true });
updateReadingProgress();

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("in"));
}

const sectionLinks = [...document.querySelectorAll('.sidebar a[href^="#"], .toc a[href^="#"]')];
const sections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (sections.length && "IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!current) return;
    sectionLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${current.target.id}`));
  }, { rootMargin: "-20% 0px -65% 0px", threshold: [0, .25, .5] });
  sections.forEach((section) => sectionObserver.observe(section));
}

document.querySelector("[data-terminal-demo]")?.addEventListener("click", (event) => {
  const terminal = event.currentTarget;
  terminal.classList.remove("replay");
  requestAnimationFrame(() => terminal.classList.add("replay"));
});
