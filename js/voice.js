const VoiceReader = (() => {
  const STORAGE_KEY = "pyVoicePrefs";
  const DEFAULT_PREFS = { voiceURI: null, rate: 0.95, pitch: 1.0, autoRead: false };
  // Pitch-shifting a synthetic voice away from 1.0 is what made it sound "robotic" —
  // this was the shipped default, not a user choice, so treat it as unset on load.
  const OLD_DEFAULT_PITCH = 1.15;

  const supported = typeof window !== "undefined" && "speechSynthesis" in window;
  let voices = [];
  let readyCallbacks = [];
  let speakingChangeCallbacks = [];

  function loadPrefs() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...DEFAULT_PREFS };
      const saved = JSON.parse(raw);
      if (saved.pitch === OLD_DEFAULT_PITCH) delete saved.pitch;
      return { ...DEFAULT_PREFS, ...saved };
    } catch (e) {
      return { ...DEFAULT_PREFS };
    }
  }

  function savePrefs() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch (e) {}
  }

  let prefs = loadPrefs();

  function refreshVoices() {
    if (!supported) return;
    voices = window.speechSynthesis.getVoices();
    if (voices.length && readyCallbacks.length) {
      readyCallbacks.forEach((cb) => cb(getVoices()));
      readyCallbacks = [];
    }
  }

  if (supported) {
    refreshVoices();
    window.speechSynthesis.addEventListener("voiceschanged", refreshVoices);
  }

  // Explicit user preference: Alex, confirmed by ear to sound better than the
  // alternatives tried. Only used when the listener hasn't picked their own
  // voice in settings.
  const PREFERRED_VOICE_NAMES = ["alex"];

  function getVoices() {
    const english = voices.filter((v) => v.lang && v.lang.toLowerCase().startsWith("en"));
    const rest = voices.filter((v) => !english.includes(v));
    return [...english, ...rest];
  }

  function onVoicesReady(cb) {
    if (voices.length) cb(getVoices());
    else readyCallbacks.push(cb);
  }

  function getSelectedVoice() {
    if (!voices.length) return null;
    if (prefs.voiceURI) {
      const match = voices.find((v) => v.voiceURI === prefs.voiceURI);
      if (match) return match;
    }
    for (const name of PREFERRED_VOICE_NAMES) {
      const match = voices.find((v) => v.name.toLowerCase() === name);
      if (match) return match;
    }
    const defaultVoice = voices.find((v) => v.default);
    const english = voices.filter((v) => v.lang && v.lang.toLowerCase().startsWith("en"));
    return defaultVoice || english[0] || voices[0] || null;
  }

  function stripForSpeech(text) {
    return String(text || "")
      .replace(/<[^>]+>/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      // Strip emoji — most TTS engines announce them by name ("party popper",
      // "snake"), which sounds worse than just skipping them. Covers emoji
      // pictographs, flag letters, variation selector, and zero-width joiner.
      .replace(/[\u{1F1E6}-\u{1F1FF}\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function notifySpeakingChange(isSpeaking) {
    speakingChangeCallbacks.forEach((cb) => cb(isSpeaking));
  }

  function onSpeakingChange(cb) {
    speakingChangeCallbacks.push(cb);
  }

  function speak(text, opts = {}) {
    if (!supported) return false;
    const clean = stripForSpeech(text);
    if (!clean) return false;
    stop();

    const utter = new SpeechSynthesisUtterance(clean);
    const voice = getSelectedVoice();
    if (voice) utter.voice = voice;
    utter.rate = opts.rate ?? prefs.rate;
    utter.pitch = opts.pitch ?? prefs.pitch;
    utter.volume = 1;
    utter.onstart = () => notifySpeakingChange(true);
    utter.onend = () => {
      notifySpeakingChange(false);
      if (opts.onEnd) opts.onEnd();
    };
    utter.onerror = () => {
      notifySpeakingChange(false);
      if (opts.onEnd) opts.onEnd();
    };

    window.speechSynthesis.speak(utter);
    return true;
  }

  function stop() {
    if (!supported) return;
    window.speechSynthesis.cancel();
    notifySpeakingChange(false);
  }

  function isSpeaking() {
    return supported && window.speechSynthesis.speaking;
  }

  function getPrefs() {
    return { ...prefs };
  }

  function setPrefs(next) {
    prefs = { ...prefs, ...next };
    savePrefs();
  }

  return {
    supported,
    getVoices,
    onVoicesReady,
    getSelectedVoice,
    speak,
    stop,
    isSpeaking,
    onSpeakingChange,
    getPrefs,
    setPrefs,
  };
})();
