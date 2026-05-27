import ItemStrip from './ItemStrip.jsx';

export default function CaseOpening({ caseData, wonItem, onAnimationEnd }) {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-50"
      style={{ background: '#0a0c15' }}
    >
      <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-8">
        Ouverture de la {caseData.name}
      </p>

      <div className="w-full max-w-4xl">
        <ItemStrip
          caseData={caseData}
          wonItem={wonItem}
          onAnimationEnd={onAnimationEnd}
        />
      </div>

      <p className="text-xs text-white/20 mt-8 tracking-widest uppercase">
        Ne fermez pas cette fenêtre...
      </p>
    </div>
  );
}
