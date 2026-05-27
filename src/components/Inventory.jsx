import { RARITY_SELL_PRICES, RARITIES } from '@/data/cases.js';
import ItemCard from './ItemCard.jsx';

export default function Inventory({ items, onBack, onSellItem }) {
  const totalValue = items.reduce((sum, item) => sum + (RARITY_SELL_PRICES[item.rarity] ?? 0), 0);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0f1117' }}>
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4" style={{ borderBottom: '1px solid #1e2235' }}>
        <button
          onClick={onBack}
          className="text-sm text-white/50 hover:text-white/80 transition-colors flex items-center gap-2"
        >
          ← Retour
        </button>
        <h2 className="text-xl font-bold tracking-widest uppercase" style={{ color: '#f5a623', fontFamily: 'Rajdhani, sans-serif' }}>
          Inventaire
        </h2>
        <div className="text-sm text-white/50">
          Valeur totale : <span className="font-bold" style={{ color: '#f5a623' }}>{totalValue.toFixed(2)} €</span>
        </div>
      </header>

      {/* Grid */}
      <main className="flex-1 p-8">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-white/20">
            <p className="text-lg">Inventaire vide</p>
            <p className="text-sm mt-2">Ouvrez des caisses pour obtenir des items.</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3 justify-start">
            {items.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-1 group cursor-pointer" onClick={() => onSellItem(i)}>
                <ItemCard item={item} size="md" />
                <span className="text-[10px] text-white/30 group-hover:text-white/60 transition-colors">
                  Vendre {RARITY_SELL_PRICES[item.rarity]?.toFixed(2)} €
                </span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
