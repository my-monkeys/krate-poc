export default function CaseCard({ caseData, onOpen, disabled }) {
  return (
    <div
      className="flex flex-col items-center rounded-lg overflow-hidden cursor-pointer group transition-transform duration-200 hover:scale-[1.02]"
      style={{
        background: '#1e2235',
        border: '1px solid #2a2f45',
        width: 200,
      }}
      onClick={() => !disabled && onOpen(caseData)}
    >
      <div
        className="w-full flex items-center justify-center"
        style={{ height: 140, background: 'linear-gradient(135deg, #1a1d2e, #252a3f)' }}
      >
        {caseData.image ? (
          <img src={caseData.image} alt={caseData.name} className="w-full h-full object-contain p-3" draggable={false} />
        ) : (
          <svg viewBox="0 0 80 60" className="w-28 opacity-70" fill="none">
            <rect x="4" y="16" width="72" height="40" rx="4" fill="#2a3050" stroke="#4b5280" strokeWidth="1.5" />
            <rect x="16" y="8" width="48" height="16" rx="3" fill="#232840" stroke="#4b5280" strokeWidth="1.5" />
            <path d="M28 36 L40 26 L52 36" stroke="#6b7eb8" strokeWidth="2" fill="none" />
            <circle cx="40" cy="38" r="4" fill="#6b7eb8" />
          </svg>
        )}
      </div>

      <div className="w-full px-4 py-3 flex flex-col gap-2">
        <p className="text-sm font-semibold text-white/90 text-center leading-tight" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em' }}>
          {caseData.name}
        </p>
        <button
          disabled={disabled}
          className="w-full py-2 rounded text-sm font-bold transition-colors"
          style={{
            background: disabled ? '#2a2f45' : '#f5a623',
            color: disabled ? '#6b7280' : '#0f1117',
            fontFamily: 'Rajdhani, sans-serif',
            letterSpacing: '0.05em',
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
        >
          Ouvrir — {caseData.price.toFixed(2)} €
        </button>
      </div>
    </div>
  );
}
