import { RARITIES } from '../data/cases.js';

function buildWeightedPool(caseData) {
  const byRarity = {};
  for (const item of caseData.items) {
    if (!byRarity[item.rarity]) byRarity[item.rarity] = [];
    byRarity[item.rarity].push(item);
  }

  const pool = [];
  for (const [rarity, items] of Object.entries(byRarity)) {
    const rarityWeight = RARITIES[rarity]?.weight ?? 0;
    const itemWeight = rarityWeight / items.length;
    for (const item of items) {
      pool.push({ item, weight: itemWeight });
    }
  }
  return pool;
}

export function pickItem(caseData) {
  const pool = buildWeightedPool(caseData);
  const totalWeight = pool.reduce((sum, entry) => sum + entry.weight, 0);
  let rand = Math.random() * totalWeight;
  for (const entry of pool) {
    rand -= entry.weight;
    if (rand <= 0) return entry.item;
  }
  return pool[pool.length - 1].item;
}

export function generateStripItems(caseData, count = 50) {
  return Array.from({ length: count }, () => pickItem(caseData));
}
