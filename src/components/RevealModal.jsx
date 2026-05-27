import { useEffect } from 'react';
import { RARITIES, RARITY_SELL_PRICES } from '@/data/cases.js';
import ItemCard from './ItemCard.jsx';
import { playReveal } from '@/lib/sound.js';

export default function RevealModal({ item, onKeep, onSell }) {
  const rarity = RARITIES[item.rarity] ?? RARITIES.consumer;
  const sellPrice = RARITY_SELL_PRICES[item.rarity] ?? 0.03;

  useEffect(() => {
    playReveal(item.rarity);
  }, [item.rarity]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: 'rgba(5, 7, 15, 0.92)', backdropFilter: 'blur(4px)' }}
    >
      <div
        className="flex flex-col items-center gap-6 p-10 rounded-xl"
        style={{
          background: '#13161f',
          border: `1px solid ${rarity.color}55`,
          boxShadow: `0 0 60px ${rarity.color}22`,
          minWidth: 320,
        }}
      >
        <p className="text-xs tracking-[0.3em] uppercase" style={{ color: rarity.color }}>
          {rarity.label}
        </p>

        <ItemCard item={item} highlighted size="lg" />

        <div className="text-center">
          <p className="text-lg font-bold text-white" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em' }}>
            {item.weapon}
          </p>
          <p className="text-sm text-white/60">{item.name}</p>
        </div>

        <div className="flex gap-3 w-full">
          <button
            onClick={onKeep}
            className="flex-1 py-3 rounded font-bold text-sm transition-colors"
            style={{
              background: '#1e2235',
              border: '1px solid #2a2f45',
              color: '#e8eaf6',
              fontFamily: 'Rajdhani, sans-serif',
              letterSpacing: '0.05em',
            }}
          >
            Garder
          </button>
          <button
            onClick={() => onSell(sellPrice)}
            className="flex-1 py-3 rounded font-bold text-sm transition-colors"
            style={{
              background: `${rarity.color}22`,
              border: `1px solid ${rarity.color}55`,
              color: rarity.color,
              fontFamily: 'Rajdhani, sans-serif',
              letterSpacing: '0.05em',
            }}
          >
            Vendre — {sellPrice.toFixed(2)} €
          </button>
        </div>
      </div>
    </div>
  );
}
