const PY_PALS = [
  { nickname: "Byte", avatar: "duck", xp: 40, stars: 2 },
  { nickname: "Pixel", avatar: "otter", xp: 95, stars: 4 },
  { nickname: "Nibble", avatar: "hedgehog", xp: 165, stars: 7 },
  { nickname: "Loop", avatar: "gecko", xp: 260, stars: 10 },
  { nickname: "Vector", avatar: "kangaroo", xp: 345, stars: 13 },
  { nickname: "Cache", avatar: "penguin", xp: 430, stars: 15 },
];

function buildLeaderboardRows() {
  const real = AppStore.listProfiles().map((profile) => ({
    nickname: profile.nickname,
    avatarIcon: AppStore.getAvatar(profile.avatar).icon,
    avatarLabel: AppStore.getAvatar(profile.avatar).label,
    xp: profile.xp,
    stars: profile.stars,
    isReal: true,
    isActive: profile.isActive,
  }));

  const pals = PY_PALS.map((pal) => ({
    nickname: pal.nickname,
    avatarIcon: AppStore.getAvatar(pal.avatar).icon,
    avatarLabel: AppStore.getAvatar(pal.avatar).label,
    xp: pal.xp,
    stars: pal.stars,
    isReal: false,
    isActive: false,
  }));

  return [...real, ...pals].sort((a, b) => b.xp - a.xp);
}

function rankMedal(index) {
  if (index === 0) return "🥇";
  if (index === 1) return "🥈";
  if (index === 2) return "🥉";
  return `#${index + 1}`;
}

function renderLeaderboard() {
  const list = document.getElementById("leaderboard-list");
  if (!list) return;

  const rows = buildLeaderboardRows();
  list.innerHTML = "";

  rows.forEach((row, index) => {
    const item = document.createElement("article");
    item.className = "leaderboard-row" + (row.isActive ? " active" : "") + (!row.isReal ? " pal" : "");
    item.innerHTML = `
      <span class="leaderboard-rank">${rankMedal(index)}</span>
      <span class="leaderboard-avatar"><img src="${row.avatarIcon}" alt="${row.avatarLabel}" /></span>
      <span class="leaderboard-name">
        ${row.nickname}
        ${row.isActive ? '<span class="leaderboard-tag">You</span>' : ""}
        ${!row.isReal ? '<span class="leaderboard-tag leaderboard-tag-pal">Py’s pal</span>' : ""}
      </span>
      <span class="leaderboard-stat">⭐ ${row.stars}</span>
      <span class="leaderboard-stat leaderboard-xp">${row.xp} XP</span>
    `;
    list.appendChild(item);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.body.dataset.page !== "leaderboard") return;
  if (AppStore.needsProfileSetup()) {
    LessonUI.showProfileSetupModal({ onDone: renderLeaderboard });
  } else {
    renderLeaderboard();
  }
  AppStore.onStoreChange(renderLeaderboard);
});
