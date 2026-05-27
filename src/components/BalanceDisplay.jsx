export default function BalanceDisplay({ balance }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded" style={{ background: '#1e2235', border: '1px solid #2a2f45' }}>
      <span className="text-sm text-white/50 font-medium">Solde</span>
      <span className="text-lg font-bold" style={{ color: '#f5a623', fontFamily: 'Rajdhani, sans-serif' }}>
        {balance.toFixed(2)} €
      </span>
    </div>
  );
}
