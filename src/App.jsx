import { useState, useCallback } from 'react';
import { pickItem } from '@/lib/rng.js';
import { RARITY_SELL_PRICES } from '@/data/cases.js';
import Shop from '@/components/Shop.jsx';
import CaseOpening from '@/components/CaseOpening.jsx';
import RevealModal from '@/components/RevealModal.jsx';
import Inventory from '@/components/Inventory.jsx';

const INITIAL_BALANCE = 1000;

function loadState() {
  try {
    const balance = parseFloat(localStorage.getItem('cs-balance') ?? INITIAL_BALANCE);
    const inventory = JSON.parse(localStorage.getItem('cs-inventory') ?? '[]');
    return { balance: isNaN(balance) ? INITIAL_BALANCE : balance, inventory };
  } catch {
    return { balance: INITIAL_BALANCE, inventory: [] };
  }
}

function saveState(balance, inventory) {
  localStorage.setItem('cs-balance', String(balance));
  localStorage.setItem('cs-inventory', JSON.stringify(inventory));
}

export default function App() {
  const [phase, setPhase] = useState('shop');
  const [balance, setBalance] = useState(() => loadState().balance);
  const [inventory, setInventory] = useState(() => loadState().inventory);
  const [selectedCase, setSelectedCase] = useState(null);
  const [wonItem, setWonItem] = useState(null);

  const updateState = (newBalance, newInventory) => {
    setBalance(newBalance);
    setInventory(newInventory);
    saveState(newBalance, newInventory);
  };

  const handleOpenCase = useCallback((caseData) => {
    if (balance < caseData.price) return;
    const item = pickItem(caseData);
    const newBalance = parseFloat((balance - caseData.price).toFixed(2));
    setSelectedCase(caseData);
    setWonItem(item);
    updateState(newBalance, inventory);
    setPhase('opening');
  }, [balance, inventory]);

  const handleAnimationEnd = useCallback(() => {
    setPhase('reveal');
  }, []);

  const handleKeep = useCallback(() => {
    const newInventory = [...inventory, wonItem];
    updateState(balance, newInventory);
    setWonItem(null);
    setPhase('shop');
  }, [balance, inventory, wonItem]);

  const handleSell = useCallback((sellPrice) => {
    const newBalance = parseFloat((balance + sellPrice).toFixed(2));
    updateState(newBalance, inventory);
    setWonItem(null);
    setPhase('shop');
  }, [balance, inventory]);

  const handleSellFromInventory = useCallback((index) => {
    const item = inventory[index];
    const sellPrice = RARITY_SELL_PRICES[item.rarity] ?? 0.03;
    const newInventory = inventory.filter((_, i) => i !== index);
    const newBalance = parseFloat((balance + sellPrice).toFixed(2));
    updateState(newBalance, newInventory);
  }, [balance, inventory]);

  return (
    <>
      {phase === 'shop' && (
        <Shop
          balance={balance}
          onOpenCase={handleOpenCase}
          onViewInventory={() => setPhase('inventory')}
          inventoryCount={inventory.length}
        />
      )}

      {phase === 'opening' && selectedCase && wonItem && (
        <CaseOpening
          caseData={selectedCase}
          wonItem={wonItem}
          onAnimationEnd={handleAnimationEnd}
        />
      )}

      {phase === 'reveal' && wonItem && (
        <RevealModal
          item={wonItem}
          onKeep={handleKeep}
          onSell={handleSell}
        />
      )}

      {phase === 'inventory' && (
        <Inventory
          items={inventory}
          onBack={() => setPhase('shop')}
          onSellItem={handleSellFromInventory}
        />
      )}
    </>
  );
}
