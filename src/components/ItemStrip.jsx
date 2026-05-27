import { useEffect, useRef, useState } from 'react';
import ItemCard from './ItemCard.jsx';
import { generateStripItems } from '@/lib/rng.js';
import { playTick } from '@/lib/sound.js';

const ITEM_WIDTH = 132;   // 128px card + 4px gap
const WINNER_INDEX = 42;  // position du gagnant dans la strip
const TOTAL_ITEMS = 50;
const ANIMATION_DURATION = 8000; // ms

export default function ItemStrip({ caseData, wonItem, onAnimationEnd }) {
  const containerRef = useRef(null);
  const stripRef = useRef(null);
  const [items, setItems] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(null);

  useEffect(() => {
    const strip = generateStripItems(caseData, TOTAL_ITEMS);
    strip[WINNER_INDEX] = wonItem;
    setItems(strip);
    setHighlightedIndex(null);

    const pendingTimers = [];

    const startTimer = setTimeout(() => {
      if (!containerRef.current || !stripRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const targetX = -(WINNER_INDEX * ITEM_WIDTH) + containerWidth / 2 - ITEM_WIDTH / 2;

      stripRef.current.style.transition = `transform ${ANIMATION_DURATION}ms cubic-bezier(0.15, 0, 0.1, 1)`;
      stripRef.current.style.transform = `translateX(${targetX}px)`;

      let delay = 30;
      let tickCount = 0;
      const MAX_TICKS = 60;

      const scheduleTick = () => {
        if (tickCount >= MAX_TICKS) return;
        const t = setTimeout(() => {
          playTick();
          tickCount++;
          delay = Math.min(delay * 1.08, 400);
          scheduleTick();
        }, delay);
        pendingTimers.push(t);
      };
      scheduleTick();

      const endTimer = setTimeout(() => {
        setHighlightedIndex(WINNER_INDEX);
        const revealTimer = setTimeout(onAnimationEnd, 1200);
        pendingTimers.push(revealTimer);
      }, ANIMATION_DURATION);
      pendingTimers.push(endTimer);
    }, 100);

    return () => {
      clearTimeout(startTimer);
      pendingTimers.forEach(clearTimeout);
    };
  }, [caseData, wonItem, onAnimationEnd]);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 160 }} ref={containerRef}>
      {/* Marqueur central */}
      <div
        className="absolute top-0 bottom-0 z-10 pointer-events-none"
        style={{
          left: '50%',
          transform: 'translateX(-50%)',
          width: 2,
          background: '#f5a623',
          boxShadow: '0 0 8px #f5a623',
        }}
      />

      {/* Dégradés latéraux */}
      <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #0f1117, transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #0f1117, transparent)' }} />

      {/* Strip */}
      <div
        ref={stripRef}
        className="flex gap-1 absolute top-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
      >
        {items.map((item, i) => (
          <ItemCard
            key={i}
            item={item}
            highlighted={i === highlightedIndex}
            size="md"
          />
        ))}
      </div>
    </div>
  );
}
