import { usePrices, IMAGE_BASE } from "../usePrices";
import { useState, useEffect } from "react";
import "./App.css";
import type { Farm, Drop, ExpensesPreSet } from "./type";
import { PricesContext } from "./PricesContext";

//импорты компонентов 
import { demoDrop, getDemoFarm } from "./components/DemoFarm";
import { NewFarm } from "./components/NewFarm";
import { Modal } from "./components/Modal";
import { RunCollector } from "./components/RunCollector";
import { FarmActions } from "./components/FarmActions";
import { ExpensesMain } from "./components/Expenses/ExpensesMain";
import { MainInfo } from "./components/MainInfo";
import { ItemSelectorPanel } from "./components/Drop/ItemSelectorPanel";


const FARMS_STORAGE_KEY = "farms";

function getInitialFarms() {
  try {
    const saved = localStorage.getItem(FARMS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function App({}) {
  const { status, items, error, updatedAt, getItemPrice } = usePrices();


  const [nameHolderArr, setNameHolderArr] = useState<Farm[]>(getInitialFarms);

  useEffect(() => {
    localStorage.setItem(FARMS_STORAGE_KEY, JSON.stringify(nameHolderArr));
  }, [nameHolderArr]);

  const [selector, setSelector] = useState<number | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentDrop, setCurrentDrop] = useState<Drop[]>([]);
  const [activeModal, setActiveModal] = useState<"expenses" | "drop" | null>(null,);
  const [runPreSet, setRunPreSet] = useState<"A" | "B" | "C">("A")
  const [time, setTime] = useState<string>("00:00:00");

  const [expensesPreSet, setExpensesPreSet] = useState<ExpensesPreSet>({
    A: [],
    B: [],
    C: [],
  });

  const [expensesSelector, setExpensesSelector] = useState<"A" | "B" | "C">(
    "A",
  );

  const selectedFarm = nameHolderArr.find((e) => e.id === selector);
  

  function createDemoFarm() {
    const now = Date.now();
    setNameHolderArr((prev) => [...prev, getDemoFarm(now)]);
    setSelector(now);
    setSelectedItems(demoDrop.map((d) => d.item));
    setCurrentDrop(demoDrop);
  }
  if (status === "loading") return <p>Загружаю цены…</p>;
  if (status === "error") return <p>Не удалось загрузить цены: {error}</p>;

  return (
    <PricesContext.Provider value={items}>
    <div className="farm-page">
      <header className="farm-header">
        <span className="farm-eyebrow">Path of Exile II / Atlas Journal</span>
        <h1>Farm Tracker</h1>
        <p>Expeditions journal</p>
      </header>
      <div className="farm-row">
        <div className="farm-main">
          <NewFarm
            nameHolderArr={nameHolderArr}
            setNameHolderArr={setNameHolderArr}
            selector={selector}
            setSelector={setSelector}
            createDemoFarm={createDemoFarm}
          />
          {selector !== null && <MainInfo 
          selectedFarm={selectedFarm} 
          expensesPreSet={expensesPreSet}/>}
          <RunCollector
            setNameHolderArr={setNameHolderArr}
            selector={selector}
            selectedFarm={selectedFarm}
            currentDrop={currentDrop}
            setCurrentDrop={setCurrentDrop}
            time={time}
            setTime={setTime}
            runPreSet={runPreSet}
            setRunPreSet={setRunPreSet}
            expensesPreSet={expensesPreSet}
            items={items}
          />
        </div>
        {selector !== null && (
          <FarmActions
            onOpenExpenses={() => setActiveModal("expenses")}
            onOpenDrop={() => setActiveModal("drop")}
          />
        )}
        {selector === null && nameHolderArr.length > 0 && (
          <p className="farm-placeholder">
            Select an expedition to view its runs.
          </p>
        )}
      </div>

      {activeModal === "expenses" && (
        <Modal title="Expenses" onClose={() => setActiveModal(null)}>
          <ExpensesMain
            expensesSelector={expensesSelector}
            setExpensesSelector={setExpensesSelector}
            expensesPreSet={expensesPreSet}
            setExpensesPreSet={setExpensesPreSet}
          />
        </Modal>
      )}

      {activeModal === "drop" && (
        <Modal title="Drop" wide onClose={() => setActiveModal(null)}>
          <ItemSelectorPanel
            onClose={() => setActiveModal(null)}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            items={items}
            currentDrop={currentDrop}
            setCurrentDrop={setCurrentDrop}
          />
        </Modal>
      )}
    </div>
    </PricesContext.Provider>
  );
}

export default App;
