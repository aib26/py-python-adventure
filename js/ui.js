const LessonUI = (() => {
  function createOverlay(id, className) {
    let overlay = document.getElementById(id);
    if (overlay) return overlay;

    overlay = document.createElement("div");
    overlay.id = id;
    overlay.className = `modal-overlay ${className || ""}`;
    overlay.innerHTML = `<div class="modal-card" role="dialog" aria-modal="true"></div>`;
    document.body.appendChild(overlay);
    return overlay;
  }

  function closeOverlay(overlay) {
    overlay.classList.remove("open");
  }

  function showLogicQuiz(lessonId, onDone) {
    const questions = getLogicQuestions(lessonId);
    if (!questions.length) {
      onDone(0);
      return;
    }

    const overlay = createOverlay("logic-modal", "logic-modal");
    const card = overlay.querySelector(".modal-card");
    let index = 0;
    let correctCount = 0;

    function render() {
      const q = questions[index];
      card.innerHTML = `
        <div class="modal-emoji">💡</div>
        <h2>Think Like a Coder!</h2>
        <p class="modal-sub">${questions.length > 1 ? `Question ${index + 1} of ${questions.length}` : "One quick logic question"}</p>
        <p class="modal-question">${q.question}</p>
        <div class="quiz-options" id="logic-options"></div>
        <p class="quiz-feedback" id="logic-feedback"></p>
      `;

      const optionsEl = card.querySelector("#logic-options");
      const feedbackEl = card.querySelector("#logic-feedback");

      q.options.forEach((option, i) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "quiz-option";
        btn.textContent = option;
        btn.addEventListener("click", () => {
          [...optionsEl.children].forEach((child) => (child.disabled = true));
          const correct = i === q.answer;
          if (correct) {
            correctCount += 1;
            btn.classList.add("correct");
            feedbackEl.textContent = "Smart thinking! 🧠 " + q.explain;
            feedbackEl.className = "quiz-feedback success";
            AppStore.addXp(15);
          } else {
            btn.classList.add("wrong");
            feedbackEl.textContent = "Good try! " + q.explain;
            feedbackEl.className = "quiz-feedback hint";
            AppStore.addXp(5);
          }
          setTimeout(() => {
            index += 1;
            if (index < questions.length) {
              render();
            } else {
              closeOverlay(overlay);
              onDone(correctCount);
            }
          }, 2600);
        });
        optionsEl.appendChild(btn);
      });
    }

    render();
    overlay.classList.add("open");
  }

  function showJokeBreak(lessonId, onDone) {
    const jokes = getJokesForLesson(lessonId);
    if (!jokes.length) {
      onDone();
      return;
    }

    const overlay = createOverlay("joke-modal", "joke-modal");
    const card = overlay.querySelector(".modal-card");
    let index = 0;

    function render() {
      const joke = jokes[index];
      const isLast = index === jokes.length - 1;
      card.innerHTML = `
        <div class="modal-emoji">😂</div>
        <h2>Joke Break!${jokes.length > 1 ? ` (${index + 1}/${jokes.length})` : ""}</h2>
        <p class="joke-setup">${joke.setup}</p>
        <button class="btn btn-accent btn-block" id="reveal-joke" type="button">Tell me the answer!</button>
        <p class="joke-punchline hidden" id="joke-punchline">${joke.punchline}</p>
        <button class="btn btn-primary btn-block hidden" id="joke-continue" type="button">${isLast ? "Ha! Keep going →" : "Another one! 😄"}</button>
      `;

      const revealBtn = card.querySelector("#reveal-joke");
      const punchline = card.querySelector("#joke-punchline");
      const continueBtn = card.querySelector("#joke-continue");

      revealBtn.addEventListener("click", () => {
        punchline.classList.remove("hidden");
        continueBtn.classList.remove("hidden");
        revealBtn.classList.add("hidden");
      });

      continueBtn.addEventListener("click", () => {
        index += 1;
        if (index < jokes.length) {
          render();
        } else {
          closeOverlay(overlay);
          onDone();
        }
      });
    }

    render();
    overlay.classList.add("open");
  }

  function showRecapQuiz(lessonId, onDone) {
    const questions = getRecapForLesson(lessonId);
    const overlay = createOverlay("recap-modal", "recap-modal");
    const card = overlay.querySelector(".modal-card");
    let index = 0;
    let correct = 0;

    function render() {
      const q = questions[index];
      card.innerHTML = `
        <div class="modal-emoji">🧠</div>
        <h2>Quick Recap!</h2>
        <p class="modal-sub">Question ${index + 1} of ${questions.length} — what did you learn?</p>
        <p class="modal-question">${q.question}</p>
        <div class="quiz-options" id="quiz-options"></div>
        <p class="quiz-feedback" id="quiz-feedback"></p>
      `;

      const optionsEl = card.querySelector("#quiz-options");
      const feedbackEl = card.querySelector("#quiz-feedback");

      q.options.forEach((option, i) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "quiz-option";
        btn.textContent = option;
        btn.addEventListener("click", () => {
          [...optionsEl.children].forEach((child) => (child.disabled = true));
          if (i === q.answer) {
            correct += 1;
            btn.classList.add("correct");
            feedbackEl.textContent = "Yes! You remembered! 🎉";
            feedbackEl.className = "quiz-feedback success";
          } else {
            btn.classList.add("wrong");
            feedbackEl.textContent = "Good try! The answer was: " + q.options[q.answer];
            feedbackEl.className = "quiz-feedback hint";
          }
          setTimeout(() => {
            index += 1;
            if (index < questions.length) {
              render();
            } else {
              const percent = Math.round((correct / questions.length) * 100);
              AppStore.saveRecapScore(lessonId, percent);
              closeOverlay(overlay);
              onDone(percent, correct, questions.length);
            }
          }, 2600);
        });
        optionsEl.appendChild(btn);
      });
    }

    render();
    overlay.classList.add("open");
  }

  function showMilestoneRecap(lessonIds, onDone) {
    const lessons = lessonIds.map((id) => getLesson(id)).filter(Boolean);
    if (lessons.length < 2) {
      onDone();
      return;
    }

    const questions = lessons.map((lesson) => {
      const pool = getRecapForLesson(lesson.id);
      return pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
    }).filter(Boolean);

    if (!questions.length) {
      onDone();
      return;
    }

    const overlay = createOverlay("milestone-modal", "milestone-modal");
    const card = overlay.querySelector(".modal-card");
    let index = 0;
    let correct = 0;

    function renderSummary() {
      card.innerHTML = `
        <div class="modal-emoji">🌟</div>
        <h2>Milestone Check-In!</h2>
        <p class="modal-sub">Here's everything you just learned:</p>
        <div class="milestone-summary-list">
          ${lessons
            .map(
              (lesson) => `
            <div class="milestone-summary-item">
              <span class="milestone-summary-emoji">${lesson.emoji}</span>
              <div>
                <strong>Lesson ${lesson.id}: ${lesson.title}</strong>
                <p>${lesson.summary}</p>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
        <button class="btn btn-primary btn-block" id="milestone-start-quiz" type="button">Quiz me! 🧠</button>
      `;

      card.querySelector("#milestone-start-quiz").addEventListener("click", renderQuiz);
    }

    function renderQuiz() {
      const q = questions[index];
      card.innerHTML = `
        <div class="modal-emoji">🧠</div>
        <h2>Milestone Quiz!</h2>
        <p class="modal-sub">Question ${index + 1} of ${questions.length} — mixing it all together</p>
        <p class="modal-question">${q.question}</p>
        <div class="quiz-options" id="milestone-options"></div>
        <p class="quiz-feedback" id="milestone-feedback"></p>
      `;

      const optionsEl = card.querySelector("#milestone-options");
      const feedbackEl = card.querySelector("#milestone-feedback");

      q.options.forEach((option, i) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "quiz-option";
        btn.textContent = option;
        btn.addEventListener("click", () => {
          [...optionsEl.children].forEach((child) => (child.disabled = true));
          if (i === q.answer) {
            correct += 1;
            btn.classList.add("correct");
            feedbackEl.textContent = "Yes! You remembered! 🎉";
            feedbackEl.className = "quiz-feedback success";
          } else {
            btn.classList.add("wrong");
            feedbackEl.textContent = "Good try! The answer was: " + q.options[q.answer];
            feedbackEl.className = "quiz-feedback hint";
          }
          setTimeout(() => {
            index += 1;
            if (index < questions.length) {
              renderQuiz();
            } else {
              renderResult();
            }
          }, 2600);
        });
        optionsEl.appendChild(btn);
      });
    }

    function renderResult() {
      const percent = Math.round((correct / questions.length) * 100);
      const great = percent >= 80;
      const ok = percent >= 50;
      card.innerHTML = `
        <div class="modal-emoji">${great ? "🏅" : ok ? "👍" : "🌱"}</div>
        <h2>${great ? "Milestone Mastered!" : ok ? "Nice Progress!" : "Keep Practicing!"}</h2>
        <p class="modal-sub">You got ${correct} of ${questions.length} right (${percent}%) across your last ${lessons.length} lessons</p>
        <button class="btn btn-accent btn-block" id="milestone-continue" type="button">Continue adventure →</button>
      `;
      card.querySelector("#milestone-continue").addEventListener("click", () => {
        closeOverlay(overlay);
        onDone(percent);
      });
    }

    renderSummary();
    overlay.classList.add("open");
  }

  function showFunFact(lessonId, onDone) {
    const facts = getFunFactsForLesson(lessonId);
    if (!facts.length) {
      onDone();
      return;
    }

    const overlay = createOverlay("funfact-modal", "funfact-modal");
    const card = overlay.querySelector(".modal-card");
    let index = 0;

    function render() {
      const fact = facts[index];
      const isLast = index === facts.length - 1;
      card.innerHTML = `
        <div class="modal-emoji">${fact.emoji}</div>
        <h2>Did You Know?${facts.length > 1 ? ` (${index + 1}/${facts.length})` : ""}</h2>
        <p class="modal-sub">${fact.topic} fun fact</p>
        <p class="fun-fact-text">${fact.fact}</p>
        <button class="btn btn-primary btn-block" id="funfact-continue" type="button">${isLast ? "Cool! Continue →" : "Another fact! 🤓"}</button>
      `;

      card.querySelector("#funfact-continue").addEventListener("click", () => {
        index += 1;
        if (index < facts.length) {
          render();
        } else {
          closeOverlay(overlay);
          onDone();
        }
      });
    }

    render();
    overlay.classList.add("open");
  }

  function showEncouragement(lessonId, onDone) {
    const cheer = getEncouragementForLesson(lessonId);
    if (!cheer) {
      onDone();
      return;
    }

    const overlay = createOverlay("encourage-modal", "encourage-modal");
    const card = overlay.querySelector(".modal-card");

    card.innerHTML = `
      <div class="modal-emoji">${cheer.emoji}</div>
      <h2>${cheer.title}</h2>
      <p class="encourage-text">${cheer.message}</p>
      <button class="btn btn-accent btn-block" id="encourage-continue" type="button">Thanks Py! Let's go! 🚀</button>
    `;

    card.querySelector("#encourage-continue").addEventListener("click", () => {
      closeOverlay(overlay);
      onDone();
    });

    overlay.classList.add("open");
  }

  function showFinalQuiz(onDone) {
    const questions = getFinalQuizQuestions();
    const overlay = createOverlay("final-quiz-modal", "final-quiz-modal");
    const card = overlay.querySelector(".modal-card");
    let index = 0;
    let correct = 0;

    function showResult(percent) {
      const passed = percent >= FINAL_QUIZ_PASS_PERCENT;
      if (passed) {
        AppStore.passFinalQuiz(percent);
      } else {
        AppStore.saveFinalQuizScore(percent);
      }

      card.innerHTML = `
        <div class="modal-emoji">${passed ? "🎓" : "💪"}</div>
        <h2>${passed ? "You passed!" : "Good try!"}</h2>
        <p class="modal-sub">You got ${correct} out of ${questions.length} right (${percent}%)</p>
        <p class="modal-question">
          ${
            passed
              ? "Amazing! You earned your Python Coder Certificate!"
              : `You need ${FINAL_QUIZ_PASS_PERCENT}% to pass. Read the lessons and try again!`
          }
        </p>
        <div class="modal-actions final-quiz-actions">
          ${
            passed
              ? `<a class="btn btn-accent btn-block" href="certificate.html">Get my certificate 🏆</a>`
              : `<button class="btn btn-primary btn-block" id="final-retry" type="button">Try again 🔄</button>`
          }
          <button class="btn btn-ghost btn-block" id="final-close" type="button">Back to map</button>
        </div>
      `;

      card.querySelector("#final-close").addEventListener("click", () => {
        closeOverlay(overlay);
        onDone(percent, passed);
      });

      const retryBtn = card.querySelector("#final-retry");
      if (retryBtn) {
        retryBtn.addEventListener("click", () => {
          index = 0;
          correct = 0;
          render();
        });
      }
    }

    function render() {
      const q = questions[index];
      card.innerHTML = `
        <div class="modal-emoji">🎓</div>
        <h2>Final Quiz!</h2>
        <p class="modal-sub">Question ${index + 1} of ${questions.length} — show what you learned!</p>
        <p class="modal-question">${q.question}</p>
        <div class="quiz-options" id="final-quiz-options"></div>
        <p class="quiz-feedback" id="final-quiz-feedback"></p>
      `;

      const optionsEl = card.querySelector("#final-quiz-options");
      const feedbackEl = card.querySelector("#final-quiz-feedback");

      q.options.forEach((option, i) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "quiz-option";
        btn.textContent = option;
        btn.addEventListener("click", () => {
          [...optionsEl.children].forEach((child) => (child.disabled = true));
          if (i === q.answer) {
            correct += 1;
            btn.classList.add("correct");
            feedbackEl.textContent = "Yes! You remembered! 🎉";
            feedbackEl.className = "quiz-feedback success";
          } else {
            btn.classList.add("wrong");
            feedbackEl.textContent = "Good try! The answer was: " + q.options[q.answer];
            feedbackEl.className = "quiz-feedback hint";
          }
          setTimeout(() => {
            index += 1;
            if (index < questions.length) {
              render();
            } else {
              const percent = Math.round((correct / questions.length) * 100);
              showResult(percent);
            }
          }, 2600);
        });
        optionsEl.appendChild(btn);
      });
    }

    render();
    overlay.classList.add("open");
  }

  function showRatingModal(lessonId, lessonTitle, onDone) {
    const overlay = createOverlay("rating-modal", "rating-modal");
    const card = overlay.querySelector(".modal-card");
    let selected = null;

    card.innerHTML = `
      <div class="modal-emoji">💖</div>
      <h2>How did you like this lesson?</h2>
      <p class="modal-sub">${lessonTitle}</p>
      <p class="rating-prompt">Pick one — tap the heart if you LOVED it!</p>
      <div class="rating-choices" id="rating-choices"></div>
      <p class="rating-label" id="rating-label">Choose a rating above</p>
      <button class="btn btn-accent btn-block" id="rating-submit" type="button" disabled>Send my rating (+5 XP!)</button>
    `;

    const choicesEl = card.querySelector("#rating-choices");
    const submit = card.querySelector("#rating-submit");
    const label = card.querySelector("#rating-label");

    getRatingOptions().forEach((option) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "rating-choice";
      btn.dataset.stars = option.stars;
      btn.innerHTML = `
        <span class="rating-choice-emoji">${option.emoji}</span>
        <span class="rating-choice-text">
          <strong>${option.label}</strong>
          <span class="rating-choice-stars">${option.starText}</span>
        </span>
      `;
      btn.addEventListener("click", () => {
        selected = option;
        choicesEl.querySelectorAll(".rating-choice").forEach((el) => el.classList.remove("selected"));
        btn.classList.add("selected");
        label.textContent =
          option.stars === 5
            ? "Aww, you LOVED it! ❤️"
            : `You picked: ${option.label} ${option.starText}`;
        submit.disabled = false;
      });
      choicesEl.appendChild(btn);
    });

    submit.addEventListener("click", () => {
      if (!selected) return;
      AppStore.saveRating(lessonId, selected.stars, selected.label, selected.emoji);
      closeOverlay(overlay);
      onDone(selected);
    });

    overlay.classList.add("open");
  }

  function showParentHelpModal(lesson, onSent) {
    const overlay = createOverlay("help-modal", "help-modal");
    const card = overlay.querySelector(".modal-card");

    card.innerHTML = `
      <div class="modal-emoji"><svg viewBox="0 0 24 24" width="44" height="44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="vertical-align: -8px;"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4H6.5A2.5 2.5 0 0 1 4 13.5v-8Z" fill="#93c5fd"/><path d="M12 11.3c1.7-1.2 2.5-2.1 2.5-3.1 0-.9-.7-1.6-1.6-1.6-.6 0-1.1.3-1.4.8-.3-.5-.8-.8-1.4-.8-.9 0-1.6.7-1.6 1.6 0 1 .8 1.9 2.5 3.1Z" fill="#fff"/></svg></div>
      <h2>Ask a grown-up!</h2>
      <p class="modal-sub">We'll let your parent know you're on Lesson ${lesson.id}: ${lesson.title}</p>
      <textarea id="help-message" class="help-textarea" maxlength="200" placeholder="Optional: tell them what feels tricky..."></textarea>
      <div class="modal-actions">
        <button class="btn btn-ghost" id="help-cancel" type="button">Cancel</button>
        <button class="btn btn-parent" id="help-send" type="button">📣 Send to Parent</button>
      </div>
      <p class="modal-note">Your parent should open the Parent Dashboard on this computer and turn on notifications.</p>
    `;

    card.querySelector("#help-cancel").addEventListener("click", () => closeOverlay(overlay));
    card.querySelector("#help-send").addEventListener("click", () => {
      const message = card.querySelector("#help-message").value.trim();
      const request = AppStore.addHelpRequest({
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        message: ContentGuardrails.containsBlocked(message)
          ? "I need help with this lesson!"
          : message || "I need help with this lesson!",
      });
      closeOverlay(overlay);
      onSent(request);
    });

    overlay.classList.add("open");
  }

  function showScreenBreak(onDone) {
    const brk = getRandomScreenBreak();
    const overlay = createOverlay("break-modal", "break-modal " + (brk.type === "move" ? "break-move" : "break-eyes"));
    const card = overlay.querySelector(".modal-card");
    let remaining = brk.seconds;

    card.innerHTML = `
      <div class="modal-emoji">${brk.emoji}</div>
      <h2>${brk.type === "move" ? "Move Break!" : "Eye Break!"}</h2>
      <p class="modal-sub">${brk.title}</p>
      <p class="modal-question break-instruction">${brk.instruction}</p>
      <div class="break-timer" id="break-timer">${remaining}</div>
      <button class="btn btn-accent btn-block" id="break-continue" type="button" disabled>Back to coding in ${remaining}s</button>
    `;

    const timerEl = card.querySelector("#break-timer");
    const continueBtn = card.querySelector("#break-continue");

    const interval = setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        clearInterval(interval);
        timerEl.textContent = "✓";
        continueBtn.disabled = false;
        continueBtn.textContent = "Back to coding! →";
      } else {
        timerEl.textContent = remaining;
        continueBtn.textContent = `Back to coding in ${remaining}s`;
      }
    }, 1000);

    continueBtn.addEventListener("click", () => {
      clearInterval(interval);
      closeOverlay(overlay);
      onDone();
    });

    overlay.classList.add("open");
  }

  function showProfileSetupModal(options = {}) {
    const overlay = createOverlay("profile-setup-modal", "profile-setup-modal");
    overlay.classList.add("no-close");
    const card = overlay.querySelector(".modal-card");
    let selectedAvatar = AVATAR_OPTIONS[Math.floor(Math.random() * AVATAR_OPTIONS.length)].id;

    card.innerHTML = `
      <div class="modal-emoji">🐍</div>
      <h2>${options.isNewPlayer ? "Welcome, new player!" : "Welcome!"}</h2>
      <p class="modal-sub">Pick a fun nickname and an animal buddy. No real names needed — keep it anonymous!</p>
      <label class="parent-label" for="profile-nickname-input">Nickname</label>
      <input id="profile-nickname-input" class="profile-nickname-input" type="text" maxlength="18" placeholder="CoolCoder42" autocomplete="off" />
      <p class="profile-setup-error" id="profile-setup-error"></p>
      <p class="parent-label">Pick your avatar</p>
      <div class="avatar-picker-grid" id="profile-avatar-grid"></div>
      <button class="btn btn-accent btn-block" id="profile-setup-save" type="button">Let's go! 🚀</button>
    `;

    const grid = card.querySelector("#profile-avatar-grid");
    const input = card.querySelector("#profile-nickname-input");
    const error = card.querySelector("#profile-setup-error");

    function renderGrid() {
      grid.innerHTML = "";
      AVATAR_OPTIONS.forEach((avatar) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "avatar-choice" + (avatar.id === selectedAvatar ? " selected" : "");
        btn.title = avatar.label;
        btn.innerHTML = `<img class="avatar-emoji" src="${avatar.icon}" alt="${avatar.label}" />`;
        btn.addEventListener("click", () => {
          selectedAvatar = avatar.id;
          renderGrid();
        });
        grid.appendChild(btn);
      });
    }
    renderGrid();

    card.querySelector("#profile-setup-save").addEventListener("click", () => {
      const nickname = input.value.trim();
      if (!nickname) {
        error.textContent = "Type a nickname first!";
        return;
      }
      const issue = ContentGuardrails.getNicknameIssue(nickname);
      if (issue === "gibberish") {
        error.textContent = "That doesn't look like a real nickname yet — try a fun word or name! 🙂";
        return;
      }
      if (issue) {
        error.textContent = "Let's pick a kind, friendly nickname! Try something else. 😊";
        return;
      }
      AppStore.setupProfile(nickname, selectedAvatar);
      closeOverlay(overlay);
      overlay.classList.remove("no-close");
      if (options.onDone) options.onDone();
    });

    overlay.classList.add("open");
    input.focus();
  }

  function showProfileSwitchModal() {
    const overlay = createOverlay("profile-switch-modal", "profile-switch-modal");
    const card = overlay.querySelector(".modal-card");

    function render() {
      const profiles = AppStore.listProfiles();
      card.innerHTML = `
        <div class="modal-emoji">🔀</div>
        <h2>Switch player</h2>
        <p class="modal-sub">Sharing this device? Pick your profile or add a new one.</p>
        <div class="profile-switch-list" id="switch-list"></div>
        <button class="btn btn-primary btn-block" id="switch-add-btn" type="button">➕ Add a new player</button>
        <button class="btn btn-ghost btn-block" id="switch-close-btn" type="button">Close</button>
      `;

      const list = card.querySelector("#switch-list");
      profiles.forEach((profile) => {
        const avatar = AppStore.getAvatar(profile.avatar);
        const row = document.createElement("div");
        row.className = "profile-switch-row" + (profile.isActive ? " active" : "");
        row.innerHTML = `
          <span class="profile-switch-avatar"><img src="${avatar.icon}" alt="${avatar.label}" /></span>
          <span class="profile-switch-name">${profile.nickname}</span>
          <span class="profile-switch-meta">${profile.xp} XP</span>
          ${profile.isActive ? '<span class="profile-switch-tag">Playing now</span>' : '<button class="btn btn-ghost btn-sm switch-profile-btn" type="button">Play</button>'}
        `;
        if (!profile.isActive) {
          row.querySelector(".switch-profile-btn").addEventListener("click", () => {
            AppStore.switchProfile(profile.id);
            closeOverlay(overlay);
            window.location.href = "index.html";
          });
        }
        list.appendChild(row);
      });

      card.querySelector("#switch-add-btn").addEventListener("click", () => {
        AppStore.addProfile();
        closeOverlay(overlay);
        showProfileSetupModal({
          isNewPlayer: true,
          onDone: () => window.location.reload(),
        });
      });

      card.querySelector("#switch-close-btn").addEventListener("click", () => closeOverlay(overlay));
    }

    render();
    overlay.classList.add("open");
  }

  function showSuccessBurst(message) {
    const burst = document.createElement("div");
    burst.className = "success-burst";
    burst.textContent = message;
    document.body.appendChild(burst);
    setTimeout(() => burst.remove(), 2400);
  }

  function renderXpBar(container) {
    const stats = AppStore.stats();
    const level = stats.level;
    const pct = Math.round((stats.completed / stats.total) * 100);
    container.innerHTML = `
      <div class="xp-bar-slim">
        <div class="xp-bar-slim-top">
          <span class="xp-level">${level.emoji} ${level.title}</span>
          <span class="xp-lessons">${stats.completed} / ${stats.total} lessons</span>
        </div>
        <div class="xp-bar xp-bar-thin">
          <div class="xp-fill" style="width: ${pct}%"></div>
        </div>
      </div>
    `;
  }

  function renderBadgeShelf(container) {
    if (!container) return;
    const stats = AppStore.stats();
    if (!stats.badges.length) {
      container.hidden = true;
      container.innerHTML = "";
      return;
    }
    container.hidden = false;
    container.innerHTML = stats.badges
      .map((b) => `<span class="badge badge-earned badge-mini" title="${b.desc}">${b.emoji}</span>`)
      .join("");
  }

  function showVoiceSettingsModal() {
    const overlay = createOverlay("voice-modal", "voice-modal");
    const card = overlay.querySelector(".modal-card");

    function render() {
      const prefs = VoiceReader.getPrefs();
      const voices = VoiceReader.getVoices();
      const selected = VoiceReader.getSelectedVoice();
      const disabled = !VoiceReader.supported;

      card.innerHTML = `
        <div class="modal-emoji">🔊</div>
        <h2>Coach Py's Voice</h2>
        <p class="modal-sub">Pick a voice and make it sound just right.</p>
        <div class="voice-settings-form">
          <label class="voice-field">
            <span>Voice</span>
            <select id="voice-select" ${disabled ? "disabled" : ""}></select>
          </label>
          <label class="voice-field">
            <span>Speed</span>
            <input type="range" id="voice-rate" min="0.7" max="1.3" step="0.05" value="${prefs.rate}" ${disabled ? "disabled" : ""} />
          </label>
          <label class="voice-field">
            <span>Pitch</span>
            <input type="range" id="voice-pitch" min="0.8" max="1.6" step="0.05" value="${prefs.pitch}" ${disabled ? "disabled" : ""} />
          </label>
          <label class="voice-field voice-field-toggle">
            <span>Read Coach Py's replies out loud automatically</span>
            <input type="checkbox" id="voice-autoread" ${prefs.autoRead ? "checked" : ""} ${disabled ? "disabled" : ""} />
          </label>
        </div>
        <div class="modal-actions">
          <button class="btn btn-ghost" id="voice-test" type="button" ${disabled ? "disabled" : ""}>▶ Try it</button>
          <button class="btn btn-primary" id="voice-done" type="button">Done</button>
        </div>
        <p class="modal-note">
          ${
            disabled
              ? "This browser can't read text aloud yet — try Chrome, Safari, or Edge."
              : "Try a few voices from the list above — each one plays a quick preview. Still sounds robotic? Your device may have better voices to download under \"Natural\" or \"Enhanced\" in its accessibility or spoken-content settings."
          }
        </p>
      `;

      const select = card.querySelector("#voice-select");
      if (!voices.length) {
        const opt = document.createElement("option");
        opt.textContent = disabled ? "Not available" : "Loading voices...";
        select.appendChild(opt);
      } else {
        voices.forEach((v) => {
          const opt = document.createElement("option");
          opt.value = v.voiceURI;
          opt.textContent = `${v.name} (${v.lang})`;
          if (selected && v.voiceURI === selected.voiceURI) opt.selected = true;
          select.appendChild(opt);
        });
      }

      select.addEventListener("change", () => {
        VoiceReader.setPrefs({ voiceURI: select.value });
        VoiceReader.speak("Hi! I'm Coach Py. Does this sound better?");
      });
      card.querySelector("#voice-rate").addEventListener("input", (e) => {
        VoiceReader.setPrefs({ rate: Number(e.target.value) });
      });
      card.querySelector("#voice-pitch").addEventListener("input", (e) => {
        VoiceReader.setPrefs({ pitch: Number(e.target.value) });
      });
      card.querySelector("#voice-autoread").addEventListener("change", (e) => {
        VoiceReader.setPrefs({ autoRead: e.target.checked });
      });
      card.querySelector("#voice-test")?.addEventListener("click", () => {
        VoiceReader.speak("Hi! I'm Coach Py. Let's write some code together!");
      });
      card.querySelector("#voice-done").addEventListener("click", () => {
        VoiceReader.stop();
        closeOverlay(overlay);
      });
    }

    render();
    VoiceReader.onVoicesReady(() => render());
    overlay.classList.add("open");
  }

  return {
    showLogicQuiz,
    showJokeBreak,
    showFunFact,
    showRecapQuiz,
    showMilestoneRecap,
    showFinalQuiz,
    showEncouragement,
    showRatingModal,
    showParentHelpModal,
    showProfileSetupModal,
    showProfileSwitchModal,
    showScreenBreak,
    showSuccessBurst,
    showVoiceSettingsModal,
    renderXpBar,
    renderBadgeShelf,
  };
})();
