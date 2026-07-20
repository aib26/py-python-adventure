const RATING_OPTIONS = [
  { stars: 5, label: "Love it!", emoji: "❤️", starText: "⭐⭐⭐⭐⭐" },
  { stars: 4, label: "Great!", emoji: "🌟", starText: "⭐⭐⭐⭐" },
  { stars: 3, label: "Good", emoji: "🙂", starText: "⭐⭐⭐" },
  { stars: 2, label: "Okay", emoji: "👍", starText: "⭐⭐" },
  { stars: 1, label: "Not really", emoji: "😕", starText: "⭐" },
];

function getRatingOptions() {
  return RATING_OPTIONS;
}

function normalizeRating(rating) {
  if (!rating) return null;
  if (typeof rating === "object") {
    return {
      stars: rating.stars,
      label: rating.label || RATING_OPTIONS.find((o) => o.stars === rating.stars)?.label || "",
      emoji: rating.emoji || RATING_OPTIONS.find((o) => o.stars === rating.stars)?.emoji || "⭐",
      starText: rating.starText || "⭐".repeat(rating.stars),
    };
  }
  const option = RATING_OPTIONS.find((o) => o.stars === rating);
  return option
    ? { stars: option.stars, label: option.label, emoji: option.emoji, starText: option.starText }
    : { stars: rating, label: "", emoji: "⭐", starText: "⭐".repeat(rating) };
}

function formatRatingBadge(rating) {
  const r = normalizeRating(rating);
  if (!r) return "";
  if (r.stars === 5) return `❤️ ${r.label}`;
  return `${r.emoji} ${r.label}`;
}
