import { RARITIES, ITEM_IMAGES } from '@/data/cases.js';

export default function ItemCard({ item, highlighted = false, size = 'md' }) {
  const rarity = RARITIES[item.rarity] ?? RARITIES.consumer;
  const color = rarity.color;
  const imageUrl = ITEM_IMAGES[`${item.weapon} | ${item.name}`];

  const sizeClasses = {
    sm: 'w-24 h-28',
    md: 'w-32 h-36',
    lg: 'w-40 h-44',
  }[size] ?? 'w-32 h-36';

  return (
    <div
      className={`${sizeClasses} flex-shrink-0 flex flex-col items-center justify-end rounded-sm overflow-hidden relative select-none`}
      style={{
        background: `linear-gradient(to bottom, ${color}18, ${color}08)`,
        border: `1px solid ${color}${highlighted ? 'ff' : '55'}`,
        boxShadow: highlighted ? `0 0 20px ${color}88, 0 0 40px ${color}44` : 'none',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      <div
        className="w-full flex-1 flex items-center justify-center"
        style={{ background: `${color}10` }}
      >
        {imageUrl ? (
          <img src={imageUrl} alt={item.name} className="w-full h-full object-contain p-1" draggable={false} />
        ) : (
          <svg viewBox="0 0 64 64" className="w-16 h-16 opacity-60" fill={color}>
            <rect x="8" y="24" width="48" height="28" rx="2" />
            <rect x="20" y="16" width="24" height="12" rx="2" />
            <circle cx="32" cy="38" r="6" fill={color} opacity="0.8" />
          </svg>
        )}
      </div>

      {/* Bande de rareté en bas */}
      <div
        className="w-full px-1 py-1 text-center"
        style={{ background: `${color}22`, borderTop: `1px solid ${color}44` }}
      >
        <p className="text-[10px] font-semibold truncate" style={{ color, fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em' }}>
          {item.weapon}
        </p>
        <p className="text-[9px] truncate text-white/60">
          {item.name}
        </p>
      </div>
    </div>
  );
}
