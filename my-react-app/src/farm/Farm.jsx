import { allItems, getItemPrice } from "../ApiDataBase"
import { useState, useEffect } from 'react'
import exchangeOrder from "../ApiDataBase/currency-exchange-order.json"
import './App.css'

const divImg = "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lNb2RWYWx1ZXMiLCJzY2FsZSI6MSwicmVhbG0iOiJwb2UyIn1d/2986e220b3/CurrencyModValues.png"

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
        <h1 className="farm-empty-title">No farms yet. Create your first farm to get started.</h1>
      )}

      {(nameHolderArr.length === 0 || add) && (
        <div className="farm-create">
          Farm name{" "}
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
          + <span className="farm-add-label">New farm</span>
        </button>
      )}

      <button className="button farm-demo" onClick={createDemoFarm}>
        Demo data
      </button>
    </div>
  );
}

function SidePanelWithInfo({ onOpenExpenses, onOpenDrop }) {
  return(
    <aside className="side-panel">
      <button className="button side-panel-button" onClick={onOpenExpenses}>Expenses</button>
      <button className="button side-panel-button" onClick={onOpenDrop}>Drop</button>
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



function ItemSelectorPanel({setSelectedItems,selectedItems,currentDrop,setCurrentDrop,onClose}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [inputTextHolder, setInputTextHolder] = useState("")
  const correctDisplayOrder = {Pos:exchangeOrder.categories.map(categories => ({
                                name: categories.name, 
                                groups:categories.groups.map(group => ({
                                          name:group.name,
                                          items:group.items.map(orderItem => 
                                                      allItems.find(priceItem => 
                                                            priceItem.id === orderItem.id))}))}))}

  return (
    <section className="item-selector" aria-label="Item selector">
      <aside className="item-selector-sidebar">
        <div className="item-category-list" aria-label="Item categories">
          <button type="button" key={"All"}
           className={"All" === activeCategory ? "item-category is-active" : "item-category"}
           onClick={() => setActiveCategory("All")}>All</button>
          {correctDisplayOrder.Pos.map(({name}) => (
            <button
              type="button"
              key={name}
              className={name === activeCategory ? "item-category is-active" : "item-category"}
              onClick={() => setActiveCategory(name)}
            >
              {name}
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
        {correctDisplayOrder.Pos.filter(category => category.name === activeCategory || activeCategory === "All").map(({name,groups}) => 
        <div className="item-scroll" role="region" aria-labelledby="item-currency-title" tabIndex={0} key={name}>
            {groups.filter(group => group.items.some(item=> item && item.name.toLowerCase().includes(inputTextHolder))).map(({name,items}) => 
            <div className="item-grid" key={name}>
              <h3 className="item-section-title">{name}</h3>
              {items.filter(item=>  item ? item.name.toLowerCase().includes(inputTextHolder) : null).map(item => item ?
                <button  
                className={selectedItems.includes(item.id) ? "item-card is-selected" : "item-card"}
                onClick={() => {setSelectedItems(prev => prev.includes(item.id) ? prev.filter(id => id !== item.id) : [...prev, item.id])}}
                type="button" key={item.id}>{item.id}
                {item.image ? 
                <img className="item-icon" src={`https://web.poecdn.com${item.image}`} alt={item.name} /> : null}
                  <span className="item-name">{item.name}</span>
                </button>
                : null
              )}
              
            </div>
            )}

        </div>)}
        
      </div>
      <input onChange={(text) => setInputTextHolder(text.target.value.toLowerCase())}/>
    </section>
  )
}


function Main({
  selectedFarm,
  time
}) {
  const profit = (selectedFarm?.runs ?? []).reduce((total, run) =>
    total + run.drop.reduce((sum, drop) => sum + drop.count * getItemPrice(drop.item), 0)
  , 0);
  const toSecond = (selectedFarm?.runs ?? []).reduce((total, run) => {const [h,m,s] =  (run.time ?? "00:00:00").split(":").map(Number) ; return Number ? total + h*3600 + m*60 + s : total +0},+0)
  const [h,m,s] = [Math.floor(toSecond/3600),Math.floor(toSecond/60)%60,toSecond % 60]
  const secondToHour = String(h).padStart(2,"0")+":"+String(m).padStart(2,"0")+":"+String(s).padStart(2,"0")

  return (
    <div className="farm-summary">
      <h4 className="summary-card"><span className="summary-label">Runs</span><span className="summary-value">{selectedFarm?.runs?.length ?? 0}</span></h4>
      <h4 className="summary-card"><span className="summary-label">Profit</span><span className="summary-value">{profit.toFixed(2)} <img src={divImg}/></span></h4>
      <h4 className="summary-card"><span className="summary-label">Profit per hour</span><span className="summary-value">{toSecond >= 1 ? (3600/(toSecond/profit)).toFixed(2): "-"} <img src={divImg}/></span></h4>
      <h4 className="summary-card"><span className="summary-label">Total costs</span></h4>
      <h4 className="summary-card"><span className="summary-label">Total time</span><span className="summary-value">{secondToHour}</span></h4>
      <h4 className="summary-card"><span className="summary-label">Maps per hour</span><span className="summary-value">{toSecond >=1 ? + (3600/ (toSecond/selectedFarm?.runs.length)).toFixed(2): "-"} {toSecond < 1 &&<span className="info-tooltip" title="Available once the total run time is greater than zero.">ⓘ</span>}</span></h4>
    </div>
  )
}



function RunCollector ({
  selectedFarm,
  setNameHolderArr,
  selector,
  currentDrop,
  setCurrentDrop,
  time,
  setTime
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
                    time: time
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
  
  function chunk (){
    const groupOfHundred =[]
    const groupOfFive =[]
    for(let i = 0; i<selectedFarm?.runs.length;i += 10){
      groupOfFive.push(selectedFarm.runs.toReversed().slice(i,i+10));
    }
    for(let h=0; h < selectedFarm?.runs.length;h+=100){
      groupOfHundred.push(groupOfFive.slice(h/10,h/10+10))
    }
    return {groupOfHundred, groupOfFive}
    
  }
  function collectDrop(runs) {
  const totals = {};

  runs.forEach(run => {
    run.drop.forEach(({ item, count }) => {
      totals[item] = (totals[item] ?? 0) + count;
    });
  });

  return Object.entries(totals)
    .filter(([, count]) => count !== 0);
}


  const { groupOfFive, groupOfHundred } = chunk();
  const renderGroup = (groups, startIndex) => {
    return groups.map((runs,index) => (
    <details key={index}>
      <summary>{startIndex + index * 10 + 1}–{startIndex + index * 10 + runs.length} 
        <span key={crypto.randomUUID()} className="drop-row">{collectDrop(runs).map(([itemId,count]) => {const item = allItems.find(item => item.id === itemId); return(
        <span key={itemId}>
          <img  className="item-icon" src={`https://web.poecdn.com${item.image}`}/>x{count}</span>);})}
        </span>
      </summary>
      <div className="run-history">
      <table className="history-table">
      <thead><tr><th>Run</th><th>Time</th><th>Drop</th><th className="run-action-heading"></th></tr></thead>
      <tbody>
      {runs?.map((runs,runIndex) =>(
        <tr className="run-card" key={runs.id}>
          <td className="run-title-cell"><h4 className="run-title">Run {startIndex + index * 5 + runIndex + 1} </h4></td>
          <td className="run-time-cell"><span>{runs.time}</span></td>
          <td className="run-loot-cell">
          <div className="run-drops">
            <span className="run-label">Drop:</span> {runs.drop.map((drop,index) =>{
              const itemInfo = allItems.find(cur=> cur.id === drop.item);
              return(
                <div className="drop-row" key={index}>
                  <img className="item-icon" src={`https://web.poecdn.com${itemInfo.image}`}/>:{drop.count}
                </div>
              )})} 
          </div>
          </td>
          <td className="run-action-cell"><button className="button button-danger" onClick={() => {idForDell = runs.id, deleteRun()}}>X</button></td>
        </tr>))}
      </tbody>
      </table>
      </div>
    </details>))}



  return (
    <>
    {selector !== null &&
    <div className="run-editor">
      <div className="run-heading">
      <div className="run-heading-title">
      <h4 className="run-title">Current run</h4>
      <h4 className="run-number">Run number: {(selectedFarm?.runs?.length ?? 0) + 1}</h4>
      </div>
      <label className="run-time-label"><span>Time:</span><input type="time" value={time} step="1" className="run-time" onChange={event=> setTime(event.target.value)}/></label>
      </div>
      
      <div className="run-drops run-loot-grid">
      <span className="run-label">Drop:</span> {currentDrop.map((drop,index) =>{
        const itemInfo = allItems.find(cur=> cur.id === drop.item);
        return(
        <div className="drop-row" key={drop.item}>
          <img className="item-icon" src={`https://web.poecdn.com${itemInfo.image}`}/>
          <div className="drop-card-content">
          <span className="drop-item-name">{itemInfo.name}</span>
          <input type="number" value={drop.count || ''} className="drop-count-input" onChange={(event) => setCurrentDrop((prev)=> prev.map(item => item.item === drop.item ? {...item,count:Number(event.target.value)} : item))}/>
          </div>
        </div>)   
        })}   
      </div>
      {currentDrop.length === 0 && (
        <p className="run-hint">Select items in Drop to start tracking this run.</p>
      )}
      <div className="run-actions">
      <button className="button button-primary" onClick={() =>{const timeRegex = /^\d{2,}:[0-5]\d:[0-5]\d$/; timeRegex.test(time) ? arrayChange() : alert("Invalid time. Enter hours, minutes, and seconds (HH:MM:SS) with no empty fields.")}} disabled={currentDrop.length === 0}>Save run</button>
      </div>
    </div>}
      {selectedFarm?.runs.length >= 100 ? 
      groupOfHundred.map((hundred,index) => (
      <details key={index}>
        <summary>
          {index * 100 + 1}–{Math.min((index + 1) * 100, selectedFarm.runs.length)} 
          <span  className="drop-row">{collectDrop(hundred.flat()).map(([itemId,count]) => {const item = allItems.find(item => item.id === itemId); return(
            <span key={itemId}>
             <img key={item.image} className="item-icon" src={`https://web.poecdn.com${item.image}`}/>x{count}
            </span>);})}
          </span>
        </summary>
        {renderGroup(hundred,index *100)}
      </details>))

      :renderGroup(groupOfFive,0)}

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
  const [time,setTime] = useState("00:00:00")

  const selectedFarm = nameHolderArr.find(e => e.id === selector)

  function createDemoFarm() {
    const now = Date.now();
    const demoFarm = {
      id: now,
      name: "Demo farm",
      runs: [
        { id: now + 1, saved: true, time:"00:05:00",drop: [
          { item: "alch", count: 48 },
          { item: "chaos", count: 15 },
          { item: "exalted", count: 4 },
          { item: "aug", count: 60 },
          { item: "chance", count: 9 },
        ]},
        { id: now + 2, saved: true, time:"00:05:00",drop: [
          { item: "divine", count: 2 },
          { item: "regal", count: 10 },
          { item: "adept-rune", count: 3 },
          { item: "annul", count: 5 },
          { item: "bauble", count: 18 },
        ]},
        { id: now + 3, saved: true, time:"00:05:00",drop: [
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
  <header className="farm-header"><h1>Farm Tracker</h1><p>Expeditions journal</p></header>
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
  time={time}
  />
  )}
  <RunCollector
    setNameHolderArr={setNameHolderArr}
    selector={selector}
    selectedFarm={selectedFarm}
    currentDrop={currentDrop}
    setCurrentDrop={setCurrentDrop}
    time={time}
    setTime={setTime}
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
