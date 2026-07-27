const PyCare = (() => {
  const CARE_GOAL = 100;

  // Coding-themed snacks instead of generic fruit — a Python mascot should
  // snack on programmer puns, not carrots! Internal ids (berry/apple/loaf/
  // star/veggie) stay the same since store.js keys rewards off of them.
  const SNACKS = {
    berry: { id: "berry", name: "Bug", emoji: "🐛", happiness: 10, credits: 5 },
    apple: { id: "apple", name: "Pi", emoji: "🥧", happiness: 12, credits: 6 },
    loaf: { id: "loaf", name: "Byte", emoji: "💾", happiness: 18, credits: 8 },
    star: { id: "star", name: "Cookie", emoji: "🍪", happiness: 22, credits: 10 },
    veggie: { id: "veggie", name: "Egg", emoji: "🥚", happiness: 8, credits: 4 },
  };

  const MOODS = [
    { min: 65, label: "Py hisses with joy! 🐍" },
    { min: 40, label: "Py's feeling good!" },
    { min: 20, label: "Py could use a snack..." },
    { min: 0, label: "Py's feeling low..." },
  ];

  function getMood(happiness) {
    return MOODS.find((m) => happiness >= m.min) || MOODS[MOODS.length - 1];
  }

  function snackList(stats) {
    return Object.values(SNACKS).map((s) => ({
      ...s,
      count: stats.snacks[s.id] || 0,
    }));
  }

  function totalSnacks(stats) {
    return Object.values(stats.snacks).reduce((sum, n) => sum + n, 0);
  }

  function render(container, onUpdate) {
    if (!container) return;
    const stats = AppStore.getPyCareStats();
    const mood = getMood(stats.happiness);
    const snacks = snackList(stats);
    const total = totalSnacks(stats);

    container.innerHTML = `
      <div class="py-care-slim panel">
        <div class="py-care-row">
          <div class="py-avatar py-avatar-sm" id="py-avatar-react">
            <img src="assets/mascot.svg?v=2" alt="Py" class="py-avatar-img" />
          </div>
          <div class="py-care-body">
            <div class="py-care-label">
              <strong>Py</strong>
              <span>${mood.label}</span>
            </div>
            <div class="py-bar py-bar-slim">
              <div class="py-bar-fill happiness-fill" style="width:${stats.happiness}%"></div>
            </div>
            <p class="py-care-sub">
              ${
                total > 0
                  ? `${total} snack${total === 1 ? "" : "s"} ready — tap to feed`
                  : "Finish a lesson to earn a snack"
              }
            </p>
          </div>
        </div>
        ${
          total > 0
            ? `<div class="py-snack-row" id="py-snack-grid"></div>`
            : ""
        }
      </div>
    `;

    const grid = container.querySelector("#py-snack-grid");
    if (grid) {
      snacks
        .filter((s) => s.count > 0)
        .forEach((snack) => {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "py-snack-chip";
          btn.title = `Feed Py ${snack.name}`;
          btn.textContent = `${snack.emoji} ×${snack.count}`;
          btn.addEventListener("click", () => {
            const result = AppStore.feedPy(snack.id);
            if (result.ok) {
              showFeedBurst(snack, result);
              render(container, onUpdate);
              reactAvatar(container);
              if (onUpdate) onUpdate();
            }
          });
          grid.appendChild(btn);
        });
    }
  }

  // A little physical reaction instead of a number — Py wiggles and hisses
  // happily when fed, rather than the UI reporting a happiness percentage.
  function reactAvatar(container) {
    const avatar = container.querySelector("#py-avatar-react");
    if (!avatar) return;

    avatar.classList.remove("py-avatar-hiss");
    void avatar.offsetWidth;
    avatar.classList.add("py-avatar-hiss");

    const hiss = document.createElement("span");
    hiss.className = "py-hiss-bubble";
    hiss.textContent = "ssssss~";
    avatar.appendChild(hiss);
    setTimeout(() => hiss.remove(), 1100);
  }

  function showFeedBurst(snack, result) {
    LessonUI.showSuccessBurst(`Py loved the ${snack.emoji}!`);
    if (result?.newBadge) {
      setTimeout(() => LessonUI.showSuccessBurst("🏆 Py's Best Pal badge!"), 1800);
    }
  }

  function formatEarnMessage(snackId) {
    const s = SNACKS[snackId];
    if (!s) return "Snack for Py! 🐛";
    return `Snack for Py ${s.emoji}`;
  }

  return {
    SNACKS,
    CARE_GOAL,
    render,
    formatEarnMessage,
    getMood,
  };
})();
