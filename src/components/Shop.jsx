import { CASES } from '@/data/cases.js';
import CaseCard from './CaseCard.jsx';
import BalanceDisplay from './BalanceDisplay.jsx';

export default function Shop({ balance, onOpenCase, onViewInventory, inventoryCount }) {
  const canAfford = (price) => balance >= price;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0f1117' }}>
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4" style={{ borderBottom: '1px solid #1e2235' }}>
        <h1 className="text-2xl font-bold tracking-widest uppercase" style={{ color: '#f5a623', fontFamily: 'Rajdhani, sans-serif' }}>
          CS Case Opening
        </h1>
        <div className="flex items-center gap-4">
          <BalanceDisplay balance={balance} />
          <button
            onClick={onViewInventory}
            className="px-4 py-2 rounded text-sm font-semibold relative"
            style={{ background: '#1e2235', border: '1px solid #2a2f45', color: '#e8eaf6', fontFamily: 'Rajdhani, sans-serif' }}
          >
            Inventaire
            {inventoryCount > 0 && (
              <span className="absolute -top-1 -right-1 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold" style={{ background: '#f5a623', color: '#0f1117' }}>
                {inventoryCount > 99 ? '99+' : inventoryCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Cases grid */}
      <main className="flex-1 flex flex-col items-center py-12 px-8">
        <p className="text-white/40 text-sm mb-10 tracking-widest uppercase">Choisissez une caisse</p>
        <div className="flex flex-wrap justify-center gap-6">
          {CASES.map((c) => (
            <CaseCard
              key={c.id}
              caseData={c}
              onOpen={onOpenCase}
              disabled={!canAfford(c.price)}
            />
          ))}
        </div>
        {balance < 2.49 && (
          <p className="mt-10 text-sm" style={{ color: '#eb4b4b' }}>
            Solde insuffisant pour ouvrir une caisse (min. 2,49 €).
          </p>
        )}
      </main>
    </div>
  );
}
