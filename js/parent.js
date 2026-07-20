let parentEventsBound = false;

function renderParentDashboard() {
  const data = AppStore.read();
  const stats = AppStore.stats();

  document.getElementById("child-name-display").textContent = data.nickname || "New player";
  document.getElementById("child-avatar-display").innerHTML = `<img class="header-avatar-icon" src="${stats.avatar.icon}" alt="${stats.avatar.label}" />`;
  document.getElementById("parent-stars").textContent = `${stats.completed} / ${stats.total}`;
  document.getElementById("parent-streak").textContent = `${stats.streak} day${stats.streak === 1 ? "" : "s"}`;

  const level = stats.level;
  document.getElementById("parent-level").textContent = `${level.emoji} ${level.title}`;

  const progressList = document.getElementById("lesson-progress-list");
  progressList.innerHTML = "";

  const certStatus = document.getElementById("certificate-status");
  if (certStatus) {
    const allDone = data.completedLessons.length >= getAllLessons().length;
    if (!allDone) {
      certStatus.innerHTML = `<p class="muted-text">Complete all lessons to unlock the final quiz.</p>`;
    } else if (data.finalQuizPassed) {
      const date = data.certificateEarnedAt
        ? new Date(data.certificateEarnedAt).toLocaleDateString()
        : "—";
      certStatus.innerHTML = `
        <p class="certificate-status-pass">Passed (${data.finalQuizScore}%)</p>
        <p>Earned: <strong>${date}</strong></p>
        <a class="btn btn-primary btn-sm" href="certificate.html" target="_blank">View certificate</a>
      `;
    } else if (data.finalQuizScore != null) {
      certStatus.innerHTML = `
        <p class="certificate-status-pending">Scored ${data.finalQuizScore}% — needs ${FINAL_QUIZ_PASS_PERCENT}%</p>
      `;
    } else {
      certStatus.innerHTML = `<p class="muted-text">All lessons done — final quiz not taken yet.</p>`;
    }
  }

  getAllLessons().forEach((lesson) => {
    const done = data.completedLessons.includes(lesson.id);
    const passed = data.challengePassedLessons.includes(lesson.id);
    const row = document.createElement("div");
    row.className = "parent-lesson-row";
    const status = done ? "✅" : passed ? "🎯" : "⬜";
    row.innerHTML = `
      <span>${lesson.emoji} L${lesson.id}: ${lesson.title}</span>
      <span class="parent-lesson-meta">${status}</span>
    `;
    progressList.appendChild(row);
  });

  const helpList = document.getElementById("help-requests-list");
  const pending = data.helpRequests.filter((r) => r.status === "pending");
  document.getElementById("pending-count").textContent = pending.length;

  if (!data.helpRequests.length) {
    helpList.innerHTML = `<p class="muted-text">No help requests yet.</p>`;
  } else {
    helpList.innerHTML = "";
    data.helpRequests.forEach((request) => {
      const card = document.createElement("article");
      card.className = `help-request-card ${request.status}`;
      const time = new Date(request.createdAt).toLocaleString();
      card.innerHTML = `
        <div class="help-request-top">
          <strong>Lesson ${request.lessonId}: ${request.lessonTitle}</strong>
          <span class="help-status">${request.status === "pending" ? "Needs you" : "Resolved"}</span>
        </div>
        <p>${request.message}</p>
        <small>${time}</small>
        ${
          request.status === "pending"
            ? `<button class="btn btn-primary btn-sm resolve-btn" data-id="${request.id}" type="button">Mark helped</button>`
            : ""
        }
      `;
      helpList.appendChild(card);
    });

    helpList.querySelectorAll(".resolve-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        AppStore.resolveHelpRequest(Number(btn.dataset.id));
        renderParentDashboard();
      });
    });
  }

  const notifStatus = document.getElementById("notif-status");
  if ("Notification" in window) {
    notifStatus.textContent =
      Notification.permission === "granted"
        ? "Notifications on."
        : Notification.permission === "denied"
          ? "Notifications blocked in browser settings."
          : "Enable notifications for help alerts.";
  } else {
    notifStatus.textContent = "Notifications not supported in this browser.";
  }

  renderAvatarPicker(data.avatar);
  renderProfileSwitchList();
}

function renderAvatarPicker(activeAvatarId) {
  const grid = document.getElementById("avatar-picker-grid");
  if (!grid) return;
  grid.innerHTML = "";
  AVATAR_OPTIONS.forEach((avatar) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "avatar-choice" + (avatar.id === activeAvatarId ? " selected" : "");
    btn.title = avatar.label;
    btn.innerHTML = `<img class="avatar-emoji" src="${avatar.icon}" alt="${avatar.label}" />`;
    btn.addEventListener("click", () => {
      const data = AppStore.read();
      AppStore.setupProfile(data.nickname || "Coder", avatar.id);
      renderParentDashboard();
    });
    grid.appendChild(btn);
  });
}

function renderProfileSwitchList() {
  const list = document.getElementById("profile-switch-list");
  if (!list) return;
  list.innerHTML = "";
  AppStore.listProfiles().forEach((profile) => {
    const avatar = AppStore.getAvatar(profile.avatar);
    const row = document.createElement("div");
    row.className = "profile-switch-row" + (profile.isActive ? " active" : "");
    row.innerHTML = `
      <span class="profile-switch-avatar"><img src="${avatar.icon}" alt="${avatar.label}" /></span>
      <span class="profile-switch-name">${profile.nickname}</span>
      <span class="profile-switch-meta">${profile.xp} XP</span>
      ${profile.isActive ? '<span class="profile-switch-tag">Active</span>' : '<button class="btn btn-ghost btn-sm switch-profile-btn" type="button">Switch</button>'}
    `;
    if (!profile.isActive) {
      row.querySelector(".switch-profile-btn").addEventListener("click", () => {
        AppStore.switchProfile(profile.id);
        renderParentDashboard();
      });
    }
    list.appendChild(row);
  });
}

function bindParentEvents() {
  if (parentEventsBound) return;
  parentEventsBound = true;

  document.getElementById("enable-notifications").addEventListener("click", async () => {
    const permission = await AppStore.requestNotificationPermission();
    if (permission === "granted") {
      AppStore.setParentNotifications(true);
      new Notification("Parent alerts enabled!", {
        body: "You'll be notified when your child asks for help.",
      });
    }
    renderParentDashboard();
  });

  document.getElementById("save-child-name").addEventListener("click", () => {
    const raw = document.getElementById("child-name-input").value.trim();
    const issue = raw ? ContentGuardrails.getNicknameIssue(raw) : null;
    if (issue === "gibberish") {
      alert("That doesn't look like a real nickname yet — try a fun word or name!");
      return;
    }
    if (issue) {
      alert("Let's pick a kind, friendly nickname!");
      return;
    }
    const data = AppStore.read();
    AppStore.setupProfile(raw || "Coder", data.avatar);
    renderParentDashboard();
  });

  document.getElementById("add-profile-btn").addEventListener("click", () => {
    AppStore.addProfile();
    document.getElementById("child-name-input").value = "";
    renderParentDashboard();
  });

  AppStore.onStoreChange(renderParentDashboard);
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.body.dataset.page === "parent") {
    bindParentEvents();
    document.getElementById("child-name-input").value = AppStore.read().nickname || "";
    renderParentDashboard();
  }
});
