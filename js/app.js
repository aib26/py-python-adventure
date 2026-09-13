function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildLessonStory(lesson) {
  let html = "";

  if (lesson.story) {
    html += `<div class="lesson-narrative"><span class="learn-label">🐍 Py says</span>${lesson.story}</div>`;
  }

  if (lesson.bigIdea) {
    html += `<div class="learn-big-idea"><span class="learn-label">💡 Main idea</span><p>${lesson.bigIdea}</p></div>`;
  }

  if (lesson.syntax) {
    html += `<div class="syntax-card"><span class="learn-label">📝 How to write it</span><pre class="syntax-code">${escapeHtml(lesson.syntax)}</pre>`;
    if (lesson.syntaxNote) {
      html += `<p class="syntax-note">${lesson.syntaxNote}</p>`;
    }
    html += `</div>`;
  }

  if (lesson.history) {
    html += `
      <div class="history-placard">
        <div class="history-placard-year">${escapeHtml(lesson.history.year)}</div>
        <div class="history-placard-body">
          <span class="history-placard-label">🏛️ Tech History</span>
          <p>${escapeHtml(lesson.history.fact)}</p>
        </div>
      </div>
    `;
  }

  return html;
}

function buildCoachTip(lesson) {
  let html = "";
  if (lesson.steps?.length) {
    html += `<ol class="coach-tip-steps">`;
    lesson.steps.forEach((step) => {
      html += `<li><strong>${escapeHtml(step.label)}:</strong> ${step.text}</li>`;
    });
    html += `</ol>`;
  }
  if (lesson.tip) {
    html += `<p class="coach-tip-note">${escapeHtml(lesson.tip)}</p>`;
  }
  return html;
}

function renderPracticeExamples(lessonId, gridEl, editorEl, feedbackEl) {
  if (!gridEl) return;
  const examples = getPracticeExamples(lessonId);
  gridEl.innerHTML = "";

  examples.forEach((ex, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "practice-card";
    card.innerHTML = `
      <span class="practice-num">${index + 1}</span>
      <div class="practice-body">
        <span class="practice-title">${escapeHtml(ex.title)}</span>
        <span class="practice-prompt">${escapeHtml(ex.prompt)}</span>
      </div>
    `;
    card.addEventListener("click", () => {
      editorEl.value = ex.code;
      feedbackEl.textContent = `Loaded "${ex.title}" — guess what will print, then press ▶ Run!`;
      feedbackEl.className = "feedback show hint";
      editorEl.focus();
    });
    gridEl.appendChild(card);
  });
}

function showLessonFeedback(feedbackEl, verdict) {
  feedbackEl.className = `feedback show ${verdict.level}`;
  let html = `<p class="feedback-main">${escapeHtml(verdict.message)}</p>`;

  if (verdict.detail) {
    html += `<p class="feedback-detail"><strong>Python said:</strong> ${escapeHtml(verdict.detail)}</p>`;
  }

  if (verdict.steps && verdict.steps.length) {
    html += `<p class="feedback-steps-title"><strong>Steps to unstuck:</strong></p><ol class="unstuck-steps">`;
    verdict.steps.forEach((step) => {
      html += `<li>${escapeHtml(step)}</li>`;
    });
    html += `</ol>`;
    if (verdict.canSkip) {
      html += `<p class="feedback-skip">Or tap <strong>Continue anyway ⏭️</strong> below.</p>`;
    }
  }

  feedbackEl.innerHTML = html;
}

// Rains pieces from the top AND fires two corner "cannons" that arc up and
// across the screen, so a celebration fills the whole viewport (Golden
// Buzzer style) instead of a thin strip drifting down from the top edge.
function launchConfetti(pieceCount = 55) {
  const layer = document.createElement("div");
  layer.className = "confetti";
  const colors = ["#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff", "#ff85c0", "#9b5de5"];
  const rainCount = Math.round(pieceCount * 0.45);
  const cannonCount = Math.round((pieceCount - rainCount) / 2);

  const makePiece = (className) => {
    const piece = document.createElement("span");
    piece.className = className;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.width = 8 + Math.random() * 8 + "px";
    piece.style.animationDelay = Math.random() * 0.5 + "s";
    return piece;
  };

  for (let i = 0; i < rainCount; i += 1) {
    const piece = makePiece("");
    piece.style.left = Math.random() * 100 + "%";
    piece.style.setProperty("--drift", (Math.random() * 16 - 8) + "vw");
    piece.style.setProperty("--rot-end", 480 + Math.random() * 480 + "deg");
    layer.appendChild(piece);
  }

  for (let i = 0; i < cannonCount; i += 1) {
    const left = makePiece("cannon cannon-left");
    left.style.setProperty("--dx-mid", 22 + Math.random() * 30 + "vw");
    left.style.setProperty("--dx-end", 35 + Math.random() * 45 + "vw");
    left.style.setProperty("--peak", -(45 + Math.random() * 35) + "vh");
    left.style.setProperty("--rot-mid", 180 + Math.random() * 360 + "deg");
    left.style.setProperty("--rot-end", 600 + Math.random() * 480 + "deg");
    layer.appendChild(left);

    const right = makePiece("cannon cannon-right");
    right.style.setProperty("--dx-mid", -(22 + Math.random() * 30) + "vw");
    right.style.setProperty("--dx-end", -(35 + Math.random() * 45) + "vw");
    right.style.setProperty("--peak", -(45 + Math.random() * 35) + "vh");
    right.style.setProperty("--rot-mid", -(180 + Math.random() * 360) + "deg");
    right.style.setProperty("--rot-end", -(600 + Math.random() * 480) + "deg");
    layer.appendChild(right);
  }

  document.body.appendChild(layer);
  setTimeout(() => layer.remove(), 2900);
}

function buildLessonCard(lesson, options = {}) {
  const completed = AppStore.isCompleted(lesson.id);
  const skipped = AppStore.isSkipped(lesson.id);
  const challengePassed = AppStore.isChallengePassed(lesson.id);
  const unlocked = AppStore.isUnlocked(lesson.id);
  const rating = AppStore.read().ratings[lesson.id];
  const isNext = options.isNext;

  const card = document.createElement("article");
  card.className = "lesson-card panel";
  if (lesson.id <= 5) card.classList.add("level-1");
  else if (lesson.id >= 26) card.classList.add("level-4");
  else if (lesson.id >= 21) card.classList.add("level-3");
  if (completed) card.classList.add("completed");
  if (challengePassed && !completed) card.classList.add("almost-done");
  if (isNext) card.classList.add("next-up");
  if (!unlocked) card.classList.add("locked");

  let statusBadge = "";
  if (completed) {
    statusBadge = '<span class="badge badge-star">⭐ Done</span>';
  } else if (challengePassed) {
    statusBadge = '<span class="badge badge-almost">Quizzes left</span>';
  } else if (!unlocked) {
    statusBadge = '<span class="badge badge-lock">Locked</span>';
  } else if (isNext) {
    statusBadge = '<span class="badge badge-next">Up next</span>';
  }

  let button = "";
  if (!unlocked) {
    button = `<button class="btn btn-primary" disabled>Locked</button>`;
  } else if (completed) {
    button = `<a class="btn btn-ghost btn-bounce" href="lesson.html?id=${lesson.id}">Play again 🔄</a>`;
  } else if (challengePassed) {
    button = `<a class="btn btn-accent btn-bounce" href="lesson.html?id=${lesson.id}&resume=1">Finish lesson ✨</a>`;
  } else {
    button = `<a class="btn btn-primary btn-bounce" href="lesson.html?id=${lesson.id}">${isNext ? "Continue →" : "Let's Go!"}</a>`;
  }

  card.innerHTML = `
    <div class="lesson-emoji ${completed || isNext ? "bounce" : ""}">${lesson.emoji}</div>
    <h3>Lesson ${lesson.id}: ${lesson.title}</h3>
    <p>${lesson.summary}</p>
    <div class="badge-row">
      ${statusBadge}
    </div>
    ${button}
  `;

  return card;
}

function startFinalQuiz() {
  LessonUI.showFinalQuiz((percent, passed) => {
    if (passed) {
      launchConfetti();
      LessonUI.showSuccessBurst("Certificate earned! 🎓");
    }
    renderHomePage();
  });
}

function renderHomePage() {
  const grid = document.getElementById("lesson-grid");
  const welcomeBack = document.getElementById("welcome-back");
  const heroIntro = document.getElementById("hero-intro");
  const xpEl = document.getElementById("xp-bar");
  const badgesEl = document.getElementById("badge-shelf");
  if (!grid) return;

  AppStore.syncPyCare();
  const gotDailySnack = AppStore.trackVisitWithPySnack();

  const data = AppStore.read();
  const stats = AppStore.stats();
  const nextLessonId = stats.nextLessonId;
  const hasProgress = stats.completed > 0 || data.challengePassedLessons.length > 0;

  const pyCareRoot = document.getElementById("py-care-root");
  if (pyCareRoot) {
    PyCare.render(pyCareRoot, () => {
      if (badgesEl) LessonUI.renderBadgeShelf(badgesEl);
    });
    if (gotDailySnack) {
      setTimeout(() => LessonUI.showSuccessBurst("Daily snack for Py 🥚"), 400);
    }
  }

  if (xpEl) LessonUI.renderXpBar(xpEl);
  if (badgesEl) LessonUI.renderBadgeShelf(badgesEl);

  const greeting = document.getElementById("kid-greeting");
  if (greeting) {
    if (data.finalQuizPassed) {
      greeting.textContent = `Hey ${stats.nickname} — you're a Python Coder! 🎓`;
    } else if (stats.completed === stats.total) {
      greeting.textContent = `All lessons done, ${stats.nickname}! Take the final quiz 🎓`;
    } else if (stats.completed > 0) {
      greeting.textContent = `Welcome back, ${stats.nickname}!`;
    } else {
      greeting.textContent = `Hey ${stats.nickname}! Ready to code?`;
    }
  }

  if (welcomeBack && heroIntro) {
    if (hasProgress) {
      welcomeBack.hidden = false;
      heroIntro.hidden = true;

      const welcomeText = document.getElementById("welcome-back-text");
      const trail = document.getElementById("completed-trail");
      const continueBtn = document.getElementById("continue-btn");

      if (stats.completed === stats.total) {
        if (data.finalQuizPassed) {
          welcomeText.textContent =
            "You earned your certificate! Show it off or replay any lesson for fun.";
          continueBtn.textContent = "View my certificate 🏆";
          continueBtn.href = "certificate.html";
          delete continueBtn.dataset.action;
        } else if (data.finalQuizScore != null) {
          welcomeText.textContent = `You scored ${data.finalQuizScore}% on the final quiz. You need ${FINAL_QUIZ_PASS_PERCENT}% to earn your certificate — you can do it!`;
          continueBtn.textContent = "Try final quiz again 🔄";
          continueBtn.href = "#";
          continueBtn.dataset.action = "final-quiz";
        } else {
          welcomeText.textContent =
            "You completed the whole adventure! Take the final quiz to earn your Python Coder Certificate.";
          continueBtn.textContent = "Take the final quiz 🎓";
          continueBtn.href = "#";
          continueBtn.dataset.action = "final-quiz";
        }
      } else if (data.challengePassedLessons.some((id) => !data.completedLessons.includes(id))) {
        const pending = data.challengePassedLessons.find((id) => !data.completedLessons.includes(id));
        const pendingLesson = getLesson(pending);
        welcomeText.textContent = `You already beat the coding part of Lesson ${pending}! Finish the quizzes to earn your star.`;
        continueBtn.textContent = `Finish Lesson ${pending} ✨`;
        continueBtn.href = `lesson.html?id=${pending}&resume=1`;
        delete continueBtn.dataset.action;
      } else {
        const nextLesson = getLesson(nextLessonId);
        welcomeText.textContent =
          stats.completed > 0
            ? `Great job so far! Your next adventure is Lesson ${nextLessonId}: ${nextLesson?.title || "next lesson"}.`
            : `Pick up your quest right where you stopped.`;
        continueBtn.textContent = `Continue Lesson ${nextLessonId} →`;
        continueBtn.href = `lesson.html?id=${nextLessonId}`;
        delete continueBtn.dataset.action;
      }

      if (trail) {
        trail.innerHTML = "";
        let trailIndex = 0;
        getAllLessons().forEach((lesson) => {
          const done = data.completedLessons.includes(lesson.id);
          const passed = data.challengePassedLessons.includes(lesson.id);
          if (!done && !passed) return;

          const chip = document.createElement("a");
          chip.className = `trail-chip ${done ? "done" : "passed"}`;
          chip.href = `lesson.html?id=${lesson.id}${passed && !done ? "&resume=1" : ""}`;
          chip.title = `Lesson ${lesson.id}: ${lesson.title}`;
          chip.textContent = lesson.id;
          chip.style.setProperty("--i", trailIndex);
          chip.style.setProperty("--wave", `${Math.round(Math.sin(trailIndex * 0.9) * 6)}px`);
          trail.appendChild(chip);
          trailIndex += 1;
        });
      }
    } else {
      welcomeBack.hidden = true;
      heroIntro.hidden = false;
    }
  }

  const finalQuizSection = document.getElementById("final-quiz-section");
  if (finalQuizSection) {
    if (stats.allLessonsComplete) {
      finalQuizSection.hidden = false;
      const finalTitle = document.getElementById("final-quiz-title");
      const finalText = document.getElementById("final-quiz-text");
      const finalActions = document.getElementById("final-quiz-actions");

      if (data.finalQuizPassed) {
        finalTitle.textContent = "🏆 You're a Graduate!";
        finalText.textContent = `Amazing work, ${stats.nickname}! You passed the final quiz and earned your certificate.`;
        finalActions.innerHTML = `
          <a class="btn btn-accent btn-bounce" href="certificate.html">View my certificate 🎓</a>
          <button class="btn btn-ghost" id="retake-final-quiz" type="button">Take quiz again 🔄</button>
        `;
        finalActions.querySelector("#retake-final-quiz")?.addEventListener("click", startFinalQuiz);
      } else if (data.finalQuizScore != null) {
        finalTitle.textContent = "🎓 Almost there!";
        finalText.textContent = `You scored ${data.finalQuizScore}%. Get ${FINAL_QUIZ_PASS_PERCENT}% or higher to unlock your certificate.`;
        finalActions.innerHTML = `
          <button class="btn btn-primary btn-bounce" id="start-final-quiz" type="button">Try again 🔄</button>
        `;
        finalActions.querySelector("#start-final-quiz")?.addEventListener("click", startFinalQuiz);
      } else {
        finalTitle.textContent = "🎓 Final Quiz — earn your certificate!";
        finalText.textContent =
          `Answer ${getFinalQuizQuestions().length} questions about everything you learned. Pass with ${FINAL_QUIZ_PASS_PERCENT}% or higher to get your official Python Coder Certificate!`;
        finalActions.innerHTML = `
          <button class="btn btn-primary btn-bounce" id="start-final-quiz" type="button">Start final quiz 🎓</button>
        `;
        finalActions.querySelector("#start-final-quiz")?.addEventListener("click", startFinalQuiz);
      }
    } else {
      finalQuizSection.hidden = true;
    }
  }

  const continueBtnEl = document.getElementById("continue-btn");
  if (continueBtnEl) {
    if (continueBtnEl.dataset.action === "final-quiz") {
      continueBtnEl.onclick = (event) => {
        event.preventDefault();
        startFinalQuiz();
      };
    } else {
      continueBtnEl.onclick = null;
    }
  }


  const upNextTitle = document.getElementById("up-next-title");
  if (upNextTitle) {
    upNextTitle.textContent = "Lessons";
  }

  grid.innerHTML = "";
  const TIERS = [
    { test: (id) => id <= 20, dividerClass: "divider-teal", label: "🌱 Explorer <em>· Ages 7-10</em>" },
    { test: (id) => id >= 21 && id <= 25, dividerClass: "divider-gold", label: "🧭 Adventurer <em>· Ages 10-14</em>" },
    { test: (id) => id >= 26, dividerClass: "divider-slate", label: "🎓 Trailblazer <em>· High School</em>" },
  ];

  const allLessons = getAllLessons();
  let cardIndex = 0;
  TIERS.forEach((tier) => {
    const tierLessons = allLessons.filter((lesson) => tier.test(lesson.id));
    if (!tierLessons.length) return;

    const section = document.createElement("div");
    section.className = "tier-group";

    const divider = document.createElement("div");
    divider.className = `level-divider ${tier.dividerClass}`;
    divider.innerHTML = `<span>${tier.label}</span>`;
    section.appendChild(divider);

    const tierGrid = document.createElement("div");
    tierGrid.className = "lesson-grid";
    tierLessons.forEach((lesson) => {
      const card = buildLessonCard(lesson, { isNext: lesson.id === nextLessonId });
      card.style.setProperty("--i", cardIndex);
      card.style.setProperty("--tilt", `${(Math.sin(lesson.id * 2.3) * 1.1).toFixed(2)}deg`);
      tierGrid.appendChild(card);
      cardIndex += 1;
    });
    section.appendChild(tierGrid);

    grid.appendChild(section);
  });

  const resetBtn = document.getElementById("reset-progress");
  if (resetBtn) {
    resetBtn.onclick = () => {
      if (confirm("Start over? This clears all progress.")) {
        AppStore.reset();
        renderHomePage();
      }
    };
  }
}

function renderLessonPage() {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id") || 1);
  const lesson = getLesson(id);

  if (!lesson) {
    window.location.href = "index.html";
    return;
  }

  if (!AppStore.isUnlocked(id)) {
    window.location.href = "index.html";
    return;
  }

  AppStore.setLastActiveLesson(id);

  const resume = params.get("resume") === "1";
  const challengePassed = AppStore.isChallengePassed(id);
  const alreadyDone = AppStore.isCompleted(id);

  document.title = `Lesson ${id}: ${lesson.title}`;
  document.getElementById("lesson-title").textContent = `Lesson ${id}: ${lesson.title}`;
  document.getElementById("lesson-emoji").textContent = lesson.emoji;

  const mascotSrc = id <= 5 ? "assets/mascot-young.svg" : "assets/mascot.svg?v=2";
  const lessonMascot = document.getElementById("lesson-mascot");
  if (lessonMascot) lessonMascot.src = mascotSrc;
  const tipMascot = document.getElementById("tip-mascot");
  if (tipMascot) tipMascot.src = mascotSrc;
  document.getElementById("lesson-story").innerHTML = buildLessonStory(lesson);
  document.getElementById("coach-tip-body").innerHTML = buildCoachTip(lesson);
  document.getElementById("example-code").textContent = lesson.exampleCode;
  document.getElementById("challenge-text").textContent = lesson.challenge;

  const editor = document.getElementById("code-editor");
  const output = document.getElementById("output");
  const feedback = document.getElementById("feedback");
  const turtleWrap = document.getElementById("turtle-wrap");
  const runBtn = document.getElementById("run-btn");
  const checkBtn = document.getElementById("check-btn");
  const quizBtn = document.getElementById("quiz-btn");
  const quizHint = document.getElementById("quiz-hint");
  const practiceGrid = document.getElementById("practice-grid");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const continueAnywayBtn = document.getElementById("continue-anyway-btn");

  editor.value = lesson.starterCode;
  renderPracticeExamples(id, practiceGrid, editor, feedback);

  function updateQuizButtonState() {
    if (!quizBtn) return;
    const passed = AppStore.isChallengePassed(id);
    const done = AppStore.isCompleted(id);

    if (done) {
      quizBtn.disabled = false;
      quizBtn.textContent = "🧠 Replay quizzes";
      if (quizHint) quizHint.textContent = "Lesson complete! Replay quizzes anytime.";
      return;
    }

    if (passed) {
      quizBtn.disabled = false;
      quizBtn.textContent = "🧠 Lesson quizzes";
      if (quizHint) quizHint.textContent = "Coding challenge passed — start quizzes when you're ready!";
      return;
    }

    quizBtn.disabled = true;
    quizBtn.textContent = "🧠 Lesson quizzes";
    if (quizHint) quizHint.textContent = "Pass the coding challenge to unlock quizzes.";
  }

  updateQuizButtonState();
  output.textContent = "";
  output.classList.add("empty");
  output.classList.remove("error");
  feedback.className = "feedback";
  feedback.textContent = "";

  if (lesson.hasTurtle) {
    turtleWrap.classList.add("visible");
  } else {
    turtleWrap.classList.remove("visible");
  }

  if (id <= 1) {
    prevBtn.style.visibility = "hidden";
  } else {
    prevBtn.style.visibility = "visible";
    prevBtn.href = `lesson.html?id=${id - 1}`;
  }

  const coachState = {
    lesson,
    code: editor.value,
    lastResult: null,
    lastCheck: null,
    challengePassed: AppStore.isChallengePassed(id),
  };

  CoachPy.mount(document.body, () => coachState, {
    onAskParent: () => {
      LessonUI.showParentHelpModal(lesson, () => {
        feedback.textContent = "Message sent! A grown-up can help you on the Parent Dashboard.";
        feedback.className = "feedback show success";
        LessonUI.showSuccessBurst("Help request sent! 🙋");
      });
    },
  });

  function setNextNav(ready) {
    if (id >= getAllLessons().length) {
      nextBtn.textContent = "🎉 Party on the Map!";
      nextBtn.href = "index.html";
      nextBtn.onclick = null;
      return;
    }

    if (ready) {
      nextBtn.textContent = "Next Adventure →";
      nextBtn.href = `lesson.html?id=${id + 1}`;
      nextBtn.onclick = null;
      return;
    }

    nextBtn.textContent = "Finish challenge first";
    nextBtn.href = "#";
    nextBtn.onclick = (event) => event.preventDefault();
  }

  setNextNav(alreadyDone);

  if (resume && challengePassed && !alreadyDone) {
    feedback.textContent = "Welcome back! You already beat the coding challenge — let's finish the quizzes! ✨";
    feedback.className = "feedback show success";
  } else if (alreadyDone) {
    feedback.textContent = "You already finished this lesson! You can play again or try the next one.";
    feedback.className = "feedback show success";
  }

  function goToNextLesson() {
    if (id < getAllLessons().length) {
      window.location.href = `lesson.html?id=${id + 1}`;
    } else {
      window.location.href = "index.html";
    }
  }

  function handleContinueAnyway() {
    AppStore.continueAnyway(id);
    launchConfetti();
    LessonUI.showSuccessBurst("Moving to the next lesson! ⏭️");
    feedback.textContent = `No worries, ${AppStore.read().nickname}! You can come back anytime. Next adventure! ⏭️`;
    feedback.className = "feedback show success";
    setNextNav(true);
    setTimeout(goToNextLesson, 1000);
  }

  async function executeCode() {
    coachState.code = editor.value;
    const guard = ContentGuardrails.validateCode(editor.value);
    if (!guard.ok) {
      output.classList.remove("empty");
      output.classList.add("error");
      output.textContent = guard.message;
      showLessonFeedback(feedback, {
        level: "hint",
        message: guard.message,
        steps: [
          "Use kind, friendly words in your code",
          "Try different words that make you smile",
          "Press ▶ Run again after you change a word",
        ],
        canSkip: true,
      });
      return { ok: false, output: "", error: guard.message };
    }

    runBtn.disabled = true;
    checkBtn.disabled = true;
    output.classList.remove("empty", "error");
    output.textContent = "Running...";
    feedback.className = "feedback";
    if (lesson.hasTurtle) {
      output.textContent = "Drawing your turtle... 🐢";
    }

    let result;
    try {
      result = await PythonRunner.run(editor.value, {
        hasTurtle: !!lesson.hasTurtle,
      });
    } catch (error) {
      result = {
        ok: false,
        output: "",
        error: "Something went wrong. Press Run again!",
      };
    } finally {
      runBtn.disabled = false;
      checkBtn.disabled = false;
    }

    coachState.lastResult = result;
    coachState.code = editor.value;
    AppStore.recordAttempt(id);

    if (result.ok) {
      const safe = ContentGuardrails.sanitizeOutput(result.output);
      output.textContent = safe || "(No output — that's okay for drawing!)";
      if (lesson.hasTurtle) {
        output.textContent = result.output || "Look at your square below! 🐢";
      }
    } else {
      output.textContent = result.error;
      output.classList.add("error");
      if (lesson.hasTurtle) {
        showLessonFeedback(feedback, {
          level: "error",
          message: result.error,
          detail: null,
          steps: UnstuckGuide.get(id, "runs").steps,
          canSkip: true,
        });
      }
    }

    return result;
  }

  function finishLessonFlow() {
    LessonUI.showLogicQuiz(id, () => {
      LessonUI.showJokeBreak(id, () => {
        LessonUI.showFunFact(id, () => {
          LessonUI.showRecapQuiz(id, (percent) => {
            if (percent === 100) {
              launchConfetti(24);
              LessonUI.showSuccessBurst("Perfect recap! 🧠");
              if (AppStore.awardPerfectRecapPySnack(id)) {
                setTimeout(() => LessonUI.showSuccessBurst("Snack for Py 🍪"), 1600);
              }
            } else if (percent >= 50) {
              LessonUI.showSuccessBurst("Nice recap!");
            }

            LessonUI.showRatingModal(id, lesson.title, () => {
              AppStore.completeLesson(id);
              if (AppStore.awardLessonPySnacks(id)) {
                setTimeout(() => LessonUI.showSuccessBurst("Snacks for Py! 🍎"), 400);
              }
              const totalLessons = getAllLessons().length;
              updateQuizButtonState();

              const afterCelebration = () => {
                launchConfetti();
                LessonUI.showSuccessBurst("Lesson complete! ⭐");
                if (id === totalLessons && !AppStore.read().finalQuizPassed) {
                  setTimeout(() => {
                    LessonUI.showSuccessBurst("All lessons done — try the final quiz! 🎓");
                  }, 2200);
                }
                setNextNav(true);
                feedback.textContent =
                  "WOW! You finished the lesson, quizzes, joke, fun fact, and rating! 🎉";
                feedback.className = "feedback show success";
              };

              const afterMilestone = () => {
                if (id % 2 === 0) {
                  LessonUI.showEncouragement(id, () => {
                    LessonUI.showScreenBreak(afterCelebration);
                  });
                } else {
                  afterCelebration();
                }
              };

              const isMilestone = id >= 3 && id % 3 === 0 && id !== totalLessons;
              if (isMilestone) {
                const milestoneIds = [id - 2, id - 1, id].filter((mid) => !!getLesson(mid));
                LessonUI.showMilestoneRecap(milestoneIds, afterMilestone);
              } else {
                afterMilestone();
              }
            });
          });
        });
      });
    });
  }

  runBtn.addEventListener("click", executeCode);

  checkBtn.addEventListener("click", async () => {
    const result = await executeCode();
    const verdict = ExerciseChecker.evaluate(lesson.checks, result, editor.value, lesson);
    coachState.code = editor.value;
    coachState.lastCheck = verdict.passed ? null : verdict;

    if (verdict.passed) {
      coachState.challengePassed = true;
      feedback.textContent = verdict.message;
      feedback.className = `feedback show ${verdict.level}`;
      if (AppStore.isCompleted(id)) {
        feedback.textContent = "You already finished this lesson! Replay quizzes or try the next one.";
        setNextNav(true);
        updateQuizButtonState();
        return;
      }
      AppStore.markChallengePassed(id);
      updateQuizButtonState();
      if (AppStore.awardChallengePySnack(id)) {
        LessonUI.showSuccessBurst("Snack for Py 🐛");
      }
      feedback.textContent = verdict.message + " Tap 🧠 Lesson quizzes when you're ready.";
      feedback.className = "feedback show success";
      launchConfetti(24);
      LessonUI.showSuccessBurst("Challenge passed! 🎯");
    } else {
      showLessonFeedback(feedback, verdict);
    }
  });

  if (quizBtn) {
    quizBtn.addEventListener("click", () => {
      if (AppStore.isCompleted(id)) {
        finishLessonFlow();
        return;
      }
      if (!AppStore.isChallengePassed(id)) {
        feedback.textContent = "Pass the coding challenge first with ✓ Check challenge.";
        feedback.className = "feedback show hint";
        return;
      }
      finishLessonFlow();
    });
  }

  continueAnywayBtn.addEventListener("click", () => {
    if (
      !confirm(
        "Move to the next lesson without finishing this challenge? You can always come back later!"
      )
    ) {
      return;
    }
    handleContinueAnyway();
  });

  editor.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      executeCode();
    }
  });

  editor.addEventListener("input", () => {
    coachState.code = editor.value;
    if (ContentGuardrails.containsBlocked(editor.value)) {
      feedback.textContent = "Let's use kind, friendly words in our code! 😊";
      feedback.className = "feedback show hint";
    }
  });

  PythonRunner.loadSkulpt().catch(() => {
    feedback.textContent = "Could not load the Python runner. Check your internet connection.";
    feedback.className = "feedback show error";
  });

  if (resume && challengePassed && !alreadyDone) {
    feedback.textContent =
      "Welcome back! Coding challenge passed — tap 🧠 Lesson quizzes when you're ready!";
    feedback.className = "feedback show success";
    updateQuizButtonState();
  }
}

function renderPlayerChip() {
  const chip = document.getElementById("player-chip");
  if (!chip) return;
  const stats = AppStore.stats();
  document.getElementById("player-chip-avatar").innerHTML = `<img class="header-avatar-icon" src="${stats.avatar.icon}" alt="${stats.avatar.label}" />`;
  document.getElementById("player-chip-name").textContent = stats.nickname;
  chip.onclick = () => LessonUI.showProfileSwitchModal();
}

function boot() {
  AppStore.trackSession();

  if (AppStore.needsProfileSetup()) {
    LessonUI.showProfileSetupModal({
      onDone: () => {
        renderPlayerChip();
        if (document.body.dataset.page === "home") renderHomePage();
        if (document.body.dataset.page === "lesson") renderLessonPage();
      },
    });
    return;
  }

  renderPlayerChip();
  if (document.body.dataset.page === "home") {
    renderHomePage();
  }
  if (document.body.dataset.page === "lesson") {
    renderLessonPage();
  }
}

document.addEventListener("DOMContentLoaded", boot);
