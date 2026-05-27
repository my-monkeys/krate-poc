import { describe, it, expect } from 'vitest';
import { pickItem } from './rng.js';
import { CASES } from '../data/cases.js';

describe('pickItem', () => {
  it('returns an item from the case', () => {
    const caseData = CASES[0];
    const item = pickItem(caseData);
    expect(caseData.items.some(i => i.id === item.id)).toBe(true);
  });

  it('returns an object with id, name, weapon, rarity', () => {
    const item = pickItem(CASES[0]);
    expect(item).toHaveProperty('id');
    expect(item).toHaveProperty('name');
    expect(item).toHaveProperty('weapon');
    expect(item).toHaveProperty('rarity');
  });

  it('over 10000 draws, extraordinary items appear < 1%', () => {
    const caseData = CASES[0];
    let extraordinaryCount = 0;
    for (let i = 0; i < 10000; i++) {
      const item = pickItem(caseData);
      if (item.rarity === 'extraordinary') extraordinaryCount++;
    }
    expect(extraordinaryCount / 10000).toBeLessThan(0.01);
  });

  it('over 10000 draws, consumer items appear most often', () => {
    const caseData = CASES[0];
    const counts = {};
    for (let i = 0; i < 10000; i++) {
      const item = pickItem(caseData);
      counts[item.rarity] = (counts[item.rarity] || 0) + 1;
    }
    const rarities = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    expect(rarities[0][0]).toBe('consumer');
  });
});
