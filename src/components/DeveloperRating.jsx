
import { Award, Trophy } from "lucide-react";

const ratingLevels = [
  { min: 0, title: "Newbie", color: "text-slate-300", border: "border-slate-500/30", bg: "bg-slate-500/10" },
  { min: 1200, title: "Pupil", color: "text-green-400", border: "border-green-500/30", bg: "bg-green-500/10" },
  { min: 1400, title: "Specialist", color: "text-cyan-400", border: "border-cyan-500/30", bg: "bg-cyan-500/10" },
  { min: 1600, title: "Expert", color: "text-blue-400", border: "border-blue-500/30", bg: "bg-blue-500/10" },
  { min: 1900, title: "Candidate Master", color: "text-violet-400", border: "border-violet-500/30", bg: "bg-violet-500/10" },
  { min: 2100, title: "Master", color: "text-orange-400", border: "border-orange-500/30", bg: "bg-orange-500/10" },
  { min: 2300, title: "International Master", color: "text-orange-300", border: "border-orange-400/30", bg: "bg-orange-500/10" },
  { min: 2400, title: "Grandmaster", color: "text-red-400", border: "border-red-500/30", bg: "bg-red-500/10" },
  { min: 2600, title: "International Grandmaster", color: "text-red-300", border: "border-red-400/30", bg: "bg-red-500/10" },
  { min: 3000, title: "Legendary Grandmaster", color: "text-yellow-300", border: "border-yellow-400/30", bg: "bg-yellow-500/10" },
];

export default function DeveloperRating({ rating = 0 }) {
  const safeRating = Math.max(0, Number(rating) || 0);

  const rank = [...ratingLevels]
    .reverse()
    .find((level) => safeRating >= level.min);

  return (
    <span
      title={`Developer rating: ${safeRating}`}
      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold ${rank.color} ${rank.bg} ${rank.border}`}
    >
      {safeRating >= 2400 ? (
        <Trophy size={14} />
      ) : (
        <Award size={14} />
      )}
      {rank.title}
    </span>
  );
}
