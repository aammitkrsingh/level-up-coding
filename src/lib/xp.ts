export function xpForNextLevel(level: number) {
  return 100 * Math.pow(level, 2);
}

export function addXp(currentXp: number, gainedXp: number, level: number) {
  let xp = currentXp + gainedXp;
  let lvl = level;

  while (xp >= xpForNextLevel(lvl)) {
    xp -= xpForNextLevel(lvl);
    lvl++;
  }

  return { xp, lvl };
}