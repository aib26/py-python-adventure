const AVATAR_OPTIONS = [
  { id: "koala", icon: "assets/avatars/koala.svg", label: "Koala" },
  { id: "sloth", icon: "assets/avatars/sloth.svg", label: "Sloth" },
  { id: "otter", icon: "assets/avatars/otter.svg", label: "Otter" },
  { id: "beaver", icon: "assets/avatars/beaver.svg", label: "Beaver" },
  { id: "hedgehog", icon: "assets/avatars/hedgehog.svg", label: "Hedgehog" },
  { id: "kangaroo", icon: "assets/avatars/kangaroo.svg", label: "Kangaroo" },
  { id: "llama", icon: "assets/avatars/llama.svg", label: "Llama" },
  { id: "flamingo", icon: "assets/avatars/flamingo.svg", label: "Flamingo" },
  { id: "seal", icon: "assets/avatars/seal.svg", label: "Seal" },
  { id: "penguin", icon: "assets/avatars/penguin.svg", label: "Penguin" },
  { id: "gecko", icon: "assets/avatars/gecko.svg", label: "Gecko" },
  { id: "octopus", icon: "assets/avatars/octopus.svg", label: "Octopus" },
  { id: "duck", icon: "assets/avatars/duck.svg", label: "Duck" },
  { id: "badger", icon: "assets/avatars/badger.svg", label: "Badger" },
  { id: "chipmunk", icon: "assets/avatars/chipmunk.svg", label: "Chipmunk" },
];

const AppStore = (() => {
  const KEY = "kidsPythonProgress";
  const CHANNEL = "kids-python-adventure";

  // Bumped when lesson ids are renumbered so existing saved progress can be
  // migrated forward instead of silently pointing at the wrong lesson.
  const CONTENT_VERSION = 2;

  const PROFILE_DEFAULTS = {
    contentVersion: CONTENT_VERSION,
    nickname: null,
    avatar: null,
    createdAt: null,
    completedLessons: [],
    currentLesson: 1,
    xp: 0,
    gems: 0,
    streak: 0,
    lastVisit: null,
    ratings: {},
    recapScores: {},
    badges: [],
    helpRequests: [],
    parentNotifications: false,
    sessionMinutes: 0,
    lessonAttempts: {},
    challengePassedLessons: [],
    skippedLessons: [],
    lastActiveLesson: 1,
    finalQuizPassed: false,
    finalQuizScore: null,
    certificateEarnedAt: null,
    pyHappiness: 72,
    pySnacks: {},
    pyCareCredits: 0,
    pyTimesFed: 0,
    pyLastDecayDate: null,
    pyDailySnackDate: null,
    pySnackLog: { challenge: [], lesson: [], recap: [] },
  };

  const LEVELS = [
    { min: 0, title: "Beginner Coder", emoji: "🌱" },
    { min: 100, title: "Code Explorer", emoji: "🚀" },
    { min: 250, title: "Python Wizard", emoji: "🧙" },
    { min: 500, title: "Super Coder", emoji: "🏆" },
  ];

  const BADGE_DEFS = {
    first_star: { name: "First Star", emoji: "⭐", desc: "Finished your first lesson" },
    five_lessons: { name: "High Five", emoji: "🖐️", desc: "Completed 5 lessons" },
    quiz_whiz: { name: "Quiz Whiz", emoji: "🧠", desc: "Perfect recap on 3 lessons" },
    streak_3: { name: "On Fire", emoji: "🔥", desc: "3-day coding streak" },
    champion: { name: "Champion", emoji: "👑", desc: "Finished all lessons" },
    graduate: { name: "Graduate", emoji: "🎓", desc: "Passed the final quiz and earned a certificate" },
    py_best_pal: { name: "Py's Best Pal", emoji: "🐍", desc: "Earned 100 care points feeding Py" },
    helper: { name: "Team Player", emoji: "🤝", desc: "Asked for help and kept going" },
  };

  let bc = null;
  try {
    bc = new BroadcastChannel(CHANNEL);
  } catch {
    bc = null;
  }

  function makeId() {
    return "p_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  function freshProfile() {
    return { ...PROFILE_DEFAULTS, createdAt: new Date().toISOString() };
  }

  function migrateLessonIds(data, offset) {
    const shiftArray = (arr) => (arr || []).map((id) => id + offset);
    const shiftKeys = (obj) => {
      const out = {};
      Object.entries(obj || {}).forEach(([id, value]) => {
        out[Number(id) + offset] = value;
      });
      return out;
    };

    data.completedLessons = shiftArray(data.completedLessons);
    data.challengePassedLessons = shiftArray(data.challengePassedLessons);
    data.skippedLessons = shiftArray(data.skippedLessons);

    // Grandfather in the new lessons 1-5 (offset range) that didn't exist yet
    // when this profile was created, so the unlock chain into (old lesson 1,
    // now id 6) doesn't suddenly show as locked for a player who already
    // finished it under the old numbering. Skip this for a genuinely blank
    // profile — they'll naturally start at lesson 1 like anyone else.
    if (data.completedLessons.length > 0) {
      for (let id = 1; id <= offset; id += 1) {
        if (!data.completedLessons.includes(id)) data.completedLessons.push(id);
        if (!data.challengePassedLessons.includes(id)) data.challengePassedLessons.push(id);
        if (!data.skippedLessons.includes(id)) data.skippedLessons.push(id);
      }
      data.completedLessons.sort((a, b) => a - b);
      data.challengePassedLessons.sort((a, b) => a - b);
      data.skippedLessons.sort((a, b) => a - b);
    }
    if (typeof data.currentLesson === "number") data.currentLesson += offset;
    if (typeof data.lastActiveLesson === "number") data.lastActiveLesson += offset;
    data.ratings = shiftKeys(data.ratings);
    data.recapScores = shiftKeys(data.recapScores);
    data.lessonAttempts = shiftKeys(data.lessonAttempts);
    if (data.pySnackLog) {
      data.pySnackLog.challenge = shiftArray(data.pySnackLog.challenge);
      data.pySnackLog.lesson = shiftArray(data.pySnackLog.lesson);
      data.pySnackLog.recap = shiftArray(data.pySnackLog.recap);
    }
    return data;
  }

  function normalizeProfile(raw) {
    let data = { ...PROFILE_DEFAULTS, ...raw };
    if (!raw?.contentVersion || raw.contentVersion < 2) {
      data = migrateLessonIds(data, 5);
    }
    data.contentVersion = CONTENT_VERSION;
    data.challengePassedLessons = data.challengePassedLessons || [];
    data.finalQuizPassed = !!data.finalQuizPassed;
    data.finalQuizScore = data.finalQuizScore ?? null;
    data.certificateEarnedAt = data.certificateEarnedAt || null;
    data.pyHappiness = typeof data.pyHappiness === "number" ? data.pyHappiness : 72;
    data.pySnacks = data.pySnacks || {};
    data.pyCareCredits = data.pyCareCredits || 0;
    data.pyTimesFed = data.pyTimesFed || 0;
    data.pyLastDecayDate = data.pyLastDecayDate || null;
    data.pyDailySnackDate = data.pyDailySnackDate || null;
    data.pySnackLog = data.pySnackLog || { challenge: [], lesson: [], recap: [] };
    data.pySnackLog.challenge = data.pySnackLog.challenge || [];
    data.pySnackLog.lesson = data.pySnackLog.lesson || [];
    data.pySnackLog.recap = data.pySnackLog.recap || [];
    data.completedLessons.forEach((id) => {
      if (!data.challengePassedLessons.includes(id)) {
        data.challengePassedLessons.push(id);
      }
    });
    return data;
  }

  function readState() {
    let raw = null;
    try {
      raw = JSON.parse(localStorage.getItem(KEY) || "null");
    } catch {
      raw = null;
    }

    if (!raw || typeof raw !== "object") {
      const id = makeId();
      return { activeProfileId: id, profiles: { [id]: freshProfile() } };
    }

    if (!raw.profiles) {
      // Legacy single-profile shape: wrap it into a profile, drop the old
      // hardcoded "Alex" placeholder name so the player picks a real nickname.
      const legacy = { ...raw };
      delete legacy.childName;
      const id = makeId();
      return {
        activeProfileId: id,
        profiles: { [id]: normalizeProfile({ ...legacy, nickname: null, avatar: null }) },
      };
    }

    const profiles = {};
    Object.entries(raw.profiles).forEach(([id, profile]) => {
      profiles[id] = normalizeProfile(profile);
    });

    let activeProfileId = raw.activeProfileId;
    if (!activeProfileId || !profiles[activeProfileId]) {
      activeProfileId = Object.keys(profiles)[0];
    }
    if (!activeProfileId) {
      const id = makeId();
      profiles[id] = freshProfile();
      activeProfileId = id;
    }

    return { activeProfileId, profiles };
  }

  function writeState(state) {
    localStorage.setItem(KEY, JSON.stringify(state));
    if (bc) {
      bc.postMessage({ type: "store-updated", at: Date.now() });
    }
  }

  function read() {
    const state = readState();
    return state.profiles[state.activeProfileId];
  }

  function write(data) {
    const state = readState();
    state.profiles[state.activeProfileId] = data;
    writeState(state);
  }

  function update(mutator) {
    const state = readState();
    const data = state.profiles[state.activeProfileId];
    mutator(data);
    state.profiles[state.activeProfileId] = data;
    writeState(state);
    return data;
  }

  function needsProfileSetup() {
    return !read().nickname;
  }

  function setupProfile(nickname, avatarId) {
    return update((data) => {
      data.nickname = String(nickname || "").slice(0, 18) || "Coder";
      data.avatar = AVATAR_OPTIONS.some((a) => a.id === avatarId) ? avatarId : AVATAR_OPTIONS[0].id;
      if (!data.createdAt) data.createdAt = new Date().toISOString();
    });
  }

  function getActiveProfileId() {
    return readState().activeProfileId;
  }

  function listProfiles() {
    const state = readState();
    return Object.entries(state.profiles)
      .filter(([, data]) => !!data.nickname)
      .map(([id, data]) => ({
        id,
        nickname: data.nickname,
        avatar: data.avatar,
        xp: data.xp,
        stars: data.completedLessons.length,
        badges: data.badges.length,
        isActive: id === state.activeProfileId,
      }));
  }

  function switchProfile(id) {
    const state = readState();
    if (!state.profiles[id]) return false;
    state.activeProfileId = id;
    writeState(state);
    return true;
  }

  function addProfile() {
    const state = readState();
    const id = makeId();
    state.profiles[id] = freshProfile();
    state.activeProfileId = id;
    writeState(state);
    return id;
  }

  function removeProfile(id) {
    const state = readState();
    if (!state.profiles[id]) return;
    delete state.profiles[id];
    const remainingIds = Object.keys(state.profiles);
    if (state.activeProfileId === id) {
      state.activeProfileId = remainingIds[0] || null;
    }
    if (!state.activeProfileId) {
      const newId = makeId();
      state.profiles[newId] = freshProfile();
      state.activeProfileId = newId;
    }
    writeState(state);
  }

  function getAvatar(avatarId) {
    return AVATAR_OPTIONS.find((a) => a.id === avatarId) || AVATAR_OPTIONS[0];
  }

  function isCompleted(id) {
    return read().completedLessons.includes(id);
  }

  function isChallengePassed(id) {
    const data = read();
    return data.challengePassedLessons.includes(id) || data.completedLessons.includes(id);
  }

  function markChallengePassed(id) {
    return update((data) => {
      if (!data.challengePassedLessons.includes(id)) {
        data.challengePassedLessons.push(id);
        data.challengePassedLessons.sort((a, b) => a - b);
      }
      data.lastActiveLesson = id;
      data.currentLesson = Math.max(data.currentLesson, id);
    });
  }

  function setLastActiveLesson(id) {
    return update((data) => {
      data.lastActiveLesson = id;
    });
  }

  function getNextLessonId() {
    const data = read();
    const lessons = getAllLessons();
    const pending = lessons.find(
      (lesson) =>
        !data.completedLessons.includes(lesson.id) &&
        data.challengePassedLessons.includes(lesson.id)
    );
    if (pending) return pending.id;

    const next = lessons.find((lesson) => !data.completedLessons.includes(lesson.id));
    return next ? next.id : null;
  }

  function isUnlocked(id) {
    if (id === 1) return true;
    return isCompleted(id - 1);
  }

  function continueAnyway(id) {
    return update((data) => {
      if (!data.skippedLessons.includes(id)) {
        data.skippedLessons.push(id);
        data.skippedLessons.sort((a, b) => a - b);
      }
      if (!data.challengePassedLessons.includes(id)) {
        data.challengePassedLessons.push(id);
        data.challengePassedLessons.sort((a, b) => a - b);
      }
      if (!data.completedLessons.includes(id)) {
        data.completedLessons.push(id);
        data.completedLessons.sort((a, b) => a - b);
        data.xp += 15;
        data.gems += 2;
      }
      data.lastActiveLesson = id;
      data.currentLesson = Math.max(data.currentLesson, id + 1);
      awardBadges(data);
    });
  }

  function isSkipped(id) {
    return read().skippedLessons.includes(id);
  }

  function getLevel(xp) {
    let level = LEVELS[0];
    LEVELS.forEach((entry) => {
      if (xp >= entry.min) level = entry;
    });
    const next = LEVELS.find((entry) => entry.min > xp);
    return {
      ...level,
      xp,
      nextAt: next ? next.min : null,
      progress: next ? ((xp - level.min) / (next.min - level.min)) * 100 : 100,
    };
  }

  function updateStreak(data) {
    const today = new Date().toISOString().slice(0, 10);
    if (data.lastVisit === today) return data;
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (data.lastVisit === yesterday) {
      data.streak += 1;
    } else if (data.lastVisit !== today) {
      data.streak = 1;
    }
    data.lastVisit = today;
    return data;
  }

  function awardBadges(data) {
    const earned = new Set(data.badges);
    if (data.completedLessons.length >= 1) earned.add("first_star");
    if (data.completedLessons.length >= 5) earned.add("five_lessons");
    if (data.completedLessons.length >= getAllLessons().length) earned.add("champion");
    const perfectRecaps = Object.values(data.recapScores).filter((s) => s === 100).length;
    if (perfectRecaps >= 3) earned.add("quiz_whiz");
    if (data.streak >= 3) earned.add("streak_3");
    if (data.helpRequests.some((r) => r.status === "resolved")) earned.add("helper");
    if (data.finalQuizPassed) earned.add("graduate");
    if (data.pyCareCredits >= 100) earned.add("py_best_pal");
    data.badges = [...earned];
    return data;
  }

  function addXp(amount) {
    return update((data) => {
      updateStreak(data);
      data.xp += amount;
      data.gems += Math.floor(amount / 10);
      awardBadges(data);
    });
  }

  function recordAttempt(lessonId) {
    update((data) => {
      data.lessonAttempts[lessonId] = (data.lessonAttempts[lessonId] || 0) + 1;
    });
  }

  function saveRating(lessonId, stars, label, emoji) {
    return update((data) => {
      data.ratings[lessonId] = { stars, label, emoji };
      data.xp += 5;
      awardBadges(data);
    });
  }

  function saveRecapScore(lessonId, percent) {
    return update((data) => {
      data.recapScores[lessonId] = percent;
      if (percent === 100) data.xp += 25;
      else if (percent >= 50) data.xp += 10;
      awardBadges(data);
    });
  }

  function isAllLessonsComplete() {
    return read().completedLessons.length >= getAllLessons().length;
  }

  function saveFinalQuizScore(percent) {
    return update((data) => {
      data.finalQuizScore = percent;
      if (percent === 100) data.xp += 50;
      else if (percent >= FINAL_QUIZ_PASS_PERCENT) data.xp += 30;
      else if (percent >= 50) data.xp += 10;
      awardBadges(data);
    });
  }

  function passFinalQuiz(percent) {
    return update((data) => {
      data.finalQuizScore = percent;
      const alreadyPassed = data.finalQuizPassed;
      if (percent >= FINAL_QUIZ_PASS_PERCENT) {
        data.finalQuizPassed = true;
        if (!data.certificateEarnedAt) {
          data.certificateEarnedAt = new Date().toISOString();
          if (percent === 100) data.xp += 50;
          else data.xp += 30;
          data.gems += 10;
        }
      } else if (!alreadyPassed && percent >= 50) {
        data.xp += 10;
      }
      awardBadges(data);
    });
  }

  function applyPyDecay(data) {
    const today = new Date().toISOString().slice(0, 10);
    if (data.pyLastDecayDate === today) return data;
    if (data.pyLastDecayDate) {
      const last = new Date(data.pyLastDecayDate);
      const now = new Date(today);
      const days = Math.floor((now - last) / 86400000);
      if (days > 0) {
        data.pyHappiness = Math.max(0, data.pyHappiness - Math.min(days * 8, 40));
      }
    }
    data.pyLastDecayDate = today;
    return data;
  }

  function earnPySnack(snackId, count = 1) {
    if (!count || count < 1) return read();
    return update((data) => {
      applyPyDecay(data);
      data.pySnacks[snackId] = (data.pySnacks[snackId] || 0) + count;
    });
  }

  function feedPy(snackId) {
    const snack = PyCare.SNACKS[snackId];
    if (!snack) return { ok: false, error: "Unknown snack" };

    let result = { ok: false };
    update((data) => {
      applyPyDecay(data);
      const have = data.pySnacks[snackId] || 0;
      if (have < 1) {
        result = { ok: false, error: "No snacks left" };
        return;
      }
      data.pySnacks[snackId] = have - 1;
      const happinessGain = Math.min(snack.happiness, 100 - data.pyHappiness);
      data.pyHappiness = Math.min(100, data.pyHappiness + snack.happiness);
      data.pyCareCredits += snack.credits;
      data.pyTimesFed += 1;
      const hadBadge = data.badges.includes("py_best_pal");
      awardBadges(data);
      result = {
        ok: true,
        happinessGain,
        creditsGain: snack.credits,
        happiness: data.pyHappiness,
        careCredits: data.pyCareCredits,
        newBadge: !hadBadge && data.badges.includes("py_best_pal"),
      };
    });
    return result;
  }

  function getPyCareStats() {
    const data = read();
    return {
      happiness: data.pyHappiness,
      snacks: { ...data.pySnacks },
      careCredits: data.pyCareCredits,
      timesFed: data.pyTimesFed,
      careGoal: PyCare.CARE_GOAL,
    };
  }

  function syncPyCare() {
    return update((data) => {
      applyPyDecay(data);
    });
  }

  function awardChallengePySnack(lessonId) {
    let awarded = false;
    update((data) => {
      if (data.pySnackLog.challenge.includes(lessonId)) return;
      data.pySnackLog.challenge.push(lessonId);
      data.pySnackLog.challenge.sort((a, b) => a - b);
      data.pySnacks.berry = (data.pySnacks.berry || 0) + 1;
      awarded = true;
    });
    return awarded;
  }

  function awardLessonPySnacks(lessonId) {
    let awarded = false;
    update((data) => {
      if (data.pySnackLog.lesson.includes(lessonId)) return;
      data.pySnackLog.lesson.push(lessonId);
      data.pySnackLog.lesson.sort((a, b) => a - b);
      data.pySnacks.apple = (data.pySnacks.apple || 0) + 1;
      data.pySnacks.loaf = (data.pySnacks.loaf || 0) + 1;
      awarded = true;
    });
    return awarded;
  }

  function awardPerfectRecapPySnack(lessonId) {
    let awarded = false;
    update((data) => {
      if (data.pySnackLog.recap.includes(lessonId)) return;
      data.pySnackLog.recap.push(lessonId);
      data.pySnackLog.recap.sort((a, b) => a - b);
      data.pySnacks.star = (data.pySnacks.star || 0) + 1;
      awarded = true;
    });
    return awarded;
  }

  function awardDailyPySnack() {
    const today = new Date().toISOString().slice(0, 10);
    const data = read();
    if (data.pyDailySnackDate === today) return false;
    update((d) => {
      d.pyDailySnackDate = today;
      d.pySnacks.veggie = (d.pySnacks.veggie || 0) + 1;
    });
    return true;
  }

  function completeLesson(id) {
    return update((data) => {
      updateStreak(data);
      if (!data.completedLessons.includes(id)) {
        data.completedLessons.push(id);
        data.completedLessons.sort((a, b) => a - b);
        data.xp += 50;
        data.gems += 5;
      }
      if (!data.challengePassedLessons.includes(id)) {
        data.challengePassedLessons.push(id);
        data.challengePassedLessons.sort((a, b) => a - b);
      }
      data.currentLesson = Math.max(data.currentLesson, id + 1);
      awardBadges(data);
    });
  }

  function addHelpRequest(payload) {
    const request = {
      id: Date.now(),
      lessonId: payload.lessonId,
      lessonTitle: payload.lessonTitle,
      message: payload.message || "I need help with this lesson!",
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    update((data) => {
      data.helpRequests.unshift(request);
      if (data.helpRequests.length > 20) {
        data.helpRequests = data.helpRequests.slice(0, 20);
      }
    });

    notifyParent(request);
    return request;
  }

  function resolveHelpRequest(id) {
    return update((data) => {
      const item = data.helpRequests.find((r) => r.id === id);
      if (item) item.status = "resolved";
      awardBadges(data);
    });
  }

  function setParentNotifications(enabled) {
    return update((data) => {
      data.parentNotifications = enabled;
    });
  }

  function notifyParent(request) {
    const data = read();
    const title = `${data.nickname || "Your coder"} needs help!`;
    const body = `Lesson ${request.lessonId}: ${request.lessonTitle}`;

    if (bc) {
      bc.postMessage({ type: "help-request", request });
    }

    if (data.parentNotifications && "Notification" in window && Notification.permission === "granted") {
      new Notification(title, { body, tag: `help-${request.id}` });
    }
  }

  function requestNotificationPermission() {
    if (!("Notification" in window)) {
      return Promise.resolve("unsupported");
    }
    return Notification.requestPermission();
  }

  function stats() {
    const data = read();
    const total = getAllLessons().length;
    const level = getLevel(data.xp);
    return {
      completed: data.completedLessons.length,
      total,
      stars: data.completedLessons.length,
      xp: data.xp,
      gems: data.gems,
      streak: data.streak,
      level,
      badges: data.badges.map((id) => ({ id, ...BADGE_DEFS[id] })).filter((b) => b.name),
      nickname: data.nickname,
      avatar: getAvatar(data.avatar),
      completedLessons: data.completedLessons,
      challengePassedLessons: data.challengePassedLessons,
      nextLessonId: getNextLessonId(),
      finalQuizPassed: data.finalQuizPassed,
      finalQuizScore: data.finalQuizScore,
      certificateEarnedAt: data.certificateEarnedAt,
      pyCareCredits: data.pyCareCredits,
      pyHappiness: data.pyHappiness,
      allLessonsComplete: data.completedLessons.length >= total,
    };
  }

  function reset() {
    update((data) => {
      const keep = { nickname: data.nickname, avatar: data.avatar, createdAt: data.createdAt };
      Object.assign(data, freshProfile(), keep);
    });
  }

  function onStoreChange(callback) {
    window.addEventListener("storage", (event) => {
      if (event.key === KEY) callback(read());
    });
    if (bc) {
      bc.onmessage = () => callback(read());
    }
  }

  function trackSession() {
    const start = Date.now();
    window.addEventListener("beforeunload", () => {
      const minutes = Math.round((Date.now() - start) / 60000);
      if (minutes > 0) {
        update((data) => {
          data.sessionMinutes += minutes;
        });
      }
    });
  }

  function trackVisit() {
    return update((data) => {
      const today = new Date().toISOString().slice(0, 10);
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      if (data.lastVisit === today) return;
      if (data.lastVisit === yesterday) data.streak += 1;
      else data.streak = 1;
      data.lastVisit = today;
      data.xp += 10;
      applyPyDecay(data);
      awardBadges(data);
    });
  }

  function trackVisitWithPySnack() {
    const gotSnack = awardDailyPySnack();
    trackVisit();
    return gotSnack;
  }

  return {
    read,
    update,
    isCompleted,
    isUnlocked,
    completeLesson,
    markChallengePassed,
    isChallengePassed,
    continueAnyway,
    isSkipped,
    setLastActiveLesson,
    getNextLessonId,
    addXp,
    addHelpRequest,
    resolveHelpRequest,
    saveRating,
    saveRecapScore,
    isAllLessonsComplete,
    saveFinalQuizScore,
    passFinalQuiz,
    recordAttempt,
    setParentNotifications,
    requestNotificationPermission,
    trackVisit,
    trackVisitWithPySnack,
    syncPyCare,
    feedPy,
    getPyCareStats,
    awardChallengePySnack,
    awardLessonPySnacks,
    awardPerfectRecapPySnack,
    stats,
    reset,
    onStoreChange,
    trackSession,
    getLevel,
    getAvatar,
    needsProfileSetup,
    setupProfile,
    getActiveProfileId,
    listProfiles,
    switchProfile,
    addProfile,
    removeProfile,
    BADGE_DEFS,
    AVATAR_OPTIONS,
  };
})();

// Backward-compatible alias
const ProgressStore = AppStore;
