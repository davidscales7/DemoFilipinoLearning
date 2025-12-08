// XP needed to reach a given level
export function getTotalXPForLevel(level: number): number {
  let total = 0;
  for (let L = 1; L < level; L++) {
    total += 500 + L * 200;
  }
  return total;
}

// Determine level based on TOTAL XP
export function getLevelFromXP(xp: number) {
  let level = 1;
  while (xp >= getTotalXPForLevel(level + 1)) {
    level++;
  }
  return level;
}

// Percent progress toward next level
export function getProgressPercent(xp: number) {
  const level = getLevelFromXP(xp);
  const currXP = getTotalXPForLevel(level);
  const nextXP = getTotalXPForLevel(level + 1);

  const percent = ((xp - currXP) / (nextXP - currXP)) * 100;

  return { percent, level, currXP, nextXP };
}
