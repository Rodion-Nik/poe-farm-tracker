import { allItems, getItemPrice } from "../ApiDataBase"
import { useState, useEffect } from 'react'
import './App.css'

function NewFarm({
    nameHolderArr,
    setNameHolderArr,
    selector,
    setSelector,
    createDemoFarm
}) {

  const [name, setName] = useState("");
  const [add, setAdd] = useState(false);


  function addFarm() {
    setNameHolderArr(prev => [
      ...prev,
      { id: Date.now(),
        name,
        runs:[]

       }
       ]
      );
    setName("");
    setAdd(false);
  }

  function deleteFarm(farmId) {
    setNameHolderArr(prev => prev.filter(farm => farm.id !== farmId));
    if (selector === farmId) {
      setSelector(null);
    }
  }

  return (
    <div className="farm-selector">
      {nameHolderArr.length === 0 && (
        <h1 className="farm-empty-title">It's empty here, but nothing stops you from creating a new one</h1>
      )}

      {(nameHolderArr.length === 0 || add) && (
        <div className="farm-create">
          Enter a name{" "}
          <input className="farm-name-input"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <button className="button button-primary" onClick={addFarm}>
            Create
          </button>
        </div>
      )}

      {nameHolderArr.map((farm) => (
        <div className="farm-tab-wrap" key={farm.id}>
          <button
            className={selector === farm.id ? "farm-tab is-selected" : "farm-tab"}
            onClick={() => setSelector(farm.id)}
          >
            {farm.name}
          </button>
          <button
            type="button"
            className="button button-danger farm-tab-delete"
            onClick={() => deleteFarm(farm.id)}
          >
            ×
          </button>
        </div>
      ))}

      {nameHolderArr.length > 0 && !add && (
        <button className="button farm-add" onClick={() => setAdd(true)}>
          +
        </button>
      )}

      <button className="button" onClick={createDemoFarm}>
        Demo data
      </button>
    </div>
  );
}

function SidePanelWithInfo({ onOpenExpenses, onOpenDrop }) {
  return(
    <aside className="side-panel">
      <button className="button side-panel-button" onClick={onOpenExpenses}>expenses</button>
      <button className="button side-panel-button" onClick={onOpenDrop}>drop</button>
    </aside>
  )
}

function Modal({ title, onClose, wide, children }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={wide ? "modal-window modal-window--wide" : "modal-window"} onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="button modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  )
}

const ITEM_CATEGORIES = [
  "All", "Currency", "Essences", "Delirium", "Breach",
  "Abyss", "Temple of Atzoatl", "Fragments", "Runes", "Ritual", "Soul Cores",
  "Idols", "Uncut Gems", "Expedition", "Gems"
];

function ItemSelectorPanel({setSelectedItems,selectedItems,currentDrop,setCurrentDrop,onClose}) {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <section className="item-selector" aria-label="Item selector">
      <aside className="item-selector-sidebar">
        <div className="item-category-list" aria-label="Item categories">
          {ITEM_CATEGORIES.map(category => (
            <button
              type="button"
              key={category}
              className={category === activeCategory ? "item-category is-active" : "item-category"}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="item-selector-actions">
          <button
            type="button"
            className="button item-selector-save"
            onClick={() => {setCurrentDrop(selectedItems.map(id => ({
              item: id,
              count: currentDrop.find(d => d.item === id)?.count ?? 0
            }))), selectedItems.length === 0 ? "" : onClose()}}
          >
            Save
          </button>
        </div>
      </aside>

      <div className="item-selector-content">
        <h3 className="item-section-title" id="item-currency-title">Currency</h3>
        <div className="item-scroll" role="region" aria-labelledby="item-currency-title" tabIndex={0}>
          <div className="item-grid">
            {allItems.map(cur => (
              <button
                type="button"
                key={cur.id}
                className={selectedItems.includes(cur.id) ? "item-card is-selected" : "item-card"}
                aria-pressed={selectedItems.includes(cur.id)}
                onClick={() => {setSelectedItems(prev => prev.includes(cur.id) ? prev.filter(id => id !== cur.id) : [...prev, cur.id])}}
              >
                <img className="item-icon" src={`https://web.poecdn.com${cur.image}`} alt="" loading="lazy"/>
                <span className="item-name">{cur.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


function Main({
  selectedFarm
}) {
  const profit = (selectedFarm?.runs ?? []).reduce((total, run) =>
    total + run.drop.reduce((sum, drop) => sum + drop.count * getItemPrice(drop.item), 0)
  , 0);

  return (
    <div className="farm-summary">
      <h4 className="summary-card">runs count {selectedFarm?.runs?.length ?? 0}</h4>
      <h4 className="summary-card">profit {profit.toFixed(2)} div</h4>
      <h4 className="summary-card">profit per hour</h4>
      <h4 className="summary-card">total costs</h4>
    </div>
  )
}



function RunCollector ({
  selectedFarm,
  setNameHolderArr,
  selector,
  currentDrop,
  setCurrentDrop
}){
let idForDell = null

  function arrayChange (){



      setNameHolderArr(prev =>
        prev.map(farm =>
          farm.id === selector
            ?{
              ...farm,
                runs :[
                  ...farm.runs,
                  {
                    saved: true,
                    id: Date.now(),
                    drop: currentDrop,
                  }
                ]
              }
            :farm
          )
        );

      setCurrentDrop(prev => prev.map(item => ({ ...item, count: 0 })));}

  function deleteRun (){
    setNameHolderArr(prev =>
      prev.map(farm =>
        farm.id === selector
         ? {
          ...farm,
            runs: farm.runs.filter(run => run.id !== idForDell)
         }
         :farm
      )
    )
    }
    idForDell = null


  return (
    <>
    {selector !== null &&
    <div className="run-editor">
      <h4 className="run-title">current run info</h4>
      <h4 className="run-number">run number: {(selectedFarm?.runs?.length ?? 0) + 1}</h4>
      <div className="run-drops">
      <span className="run-label">drop:</span> {currentDrop.map((drop,index) =>{
        const itemInfo = allItems.find(cur=> cur.id === drop.item);
        return(
        <div className="drop-row" key={drop.item}>
          <img className="item-icon" src={`https://web.poecdn.com${itemInfo.image}`}/>
          <input type="number" value={drop.count} className="drop-count-input" onChange={(event) => setCurrentDrop((prev)=> prev.map(item => item.item === drop.item ? {...item,count:Number(event.target.value)} : item))}/>


        </div>)
  } )}
      </div>
      {currentDrop.length === 0 && (
        <p className="run-hint">select drop first</p>
      )}
      <button className="button button-primary" onClick={arrayChange} disabled={currentDrop.length === 0}>
      save</button>
    </div>}

    <div className="run-history">
    {selectedFarm?.runs?.map((runs,index) =>(
      <div className="run-card" key={runs.id}>
        <h4 className="run-title">run: {index + 1} </h4>
        <div className="run-drops">
        <span className="run-label">drop:</span> {runs.drop.map((drop,index) =>{
        const itemInfo = allItems.find(cur=> cur.id === drop.item);
        return(
        <div className="drop-row" key={index}>
          <img className="item-icon" src={`https://web.poecdn.com${itemInfo.image}`}/>:{drop.count}
        </div>)})}
        </div>

        <button className="button button-danger" onClick={() => {idForDell = runs.id, deleteRun()}}>delete run</button>

      </div>))}
    </div>
    </>
  )
}




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
  const [nameHolderArr, setNameHolderArr] = useState(getInitialFarms);

  useEffect(() => {
    localStorage.setItem(FARMS_STORAGE_KEY, JSON.stringify(nameHolderArr));
  }, [nameHolderArr]);

  const [selector, setSelector] = useState(null)
  const [selectedItems, setSelectedItems] = useState([])
  const [currentDrop, setCurrentDrop] = useState([])
  const [activeModal, setActiveModal] = useState(null) // null | "expenses" | "drop"

  const selectedFarm = nameHolderArr.find(e => e.id === selector)

  function createDemoFarm() {
    const now = Date.now();
    const demoFarm = {
      id: now,
      name: "Demo farm",
      runs: [
        { id: now + 1, saved: true, drop: [
          { item: "alch", count: 48 },
          { item: "chaos", count: 15 },
          { item: "exalted", count: 4 },
          { item: "aug", count: 60 },
          { item: "chance", count: 9 },
        ]},
        { id: now + 2, saved: true, drop: [
          { item: "divine", count: 2 },
          { item: "regal", count: 10 },
          { item: "adept-rune", count: 3 },
          { item: "annul", count: 5 },
          { item: "bauble", count: 18 },
        ]},
        { id: now + 3, saved: true, drop: [
          { item: "chaos", count: 22 },
          { item: "vaal", count: 7 },
          { item: "mirror", count: 1 },
          { item: "gcp", count: 3 },
        ]},
      ],
    };
    setNameHolderArr(prev => [...prev, demoFarm]);
    setSelector(now);
    setSelectedItems(["alch", "regal", "chance"]);
    setCurrentDrop([
      { item: "alch", count: 7 },
      { item: "regal", count: 1 },
      { item: "chance", count: 4 },
    ]);
  }

  return (
  <div className="farm-page">
  <div className="farm-row">
  <div className="farm-main">
  <NewFarm
    nameHolderArr={nameHolderArr}
    setNameHolderArr={setNameHolderArr}
    selector={selector}
    setSelector={setSelector}
    createDemoFarm={createDemoFarm}
  />
  {selector !== null && (
  <Main
  selectedFarm={selectedFarm}
  />
  )}
  <RunCollector
    setNameHolderArr={setNameHolderArr}
    selector={selector}
    selectedFarm={selectedFarm}
    currentDrop={currentDrop}
    setCurrentDrop={setCurrentDrop}
  />
  </div>
  {selector !== null && (
  <SidePanelWithInfo
    onOpenExpenses={() => setActiveModal("expenses")}
    onOpenDrop={() => setActiveModal("drop")}
  />
  )}
  </div>

  {activeModal === "expenses" && (
    <Modal title="Expenses" onClose={() => setActiveModal(null)}>
    </Modal>
  )}

  {activeModal === "drop" && (
    <Modal title="Drop" wide onClose={() => setActiveModal(null)}>
      <ItemSelectorPanel
        onClose={() => setActiveModal(null)}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        selector={selector}
        currentDrop={currentDrop}
        setCurrentDrop={setCurrentDrop}
      />
    </Modal>
  )}
  </div>)
}

export default App
