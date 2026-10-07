import currency from "../ApiDataBase/currency.json"
import { useState, useEffect } from 'react'
import './App.css'

function NewFarm({
    nameHolderArr,
    setNameHolderArr,
    selector,
    setSelector
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

  return (
    <div className="farm-selector">
      {nameHolderArr.length === 0 && (
        <h1 className="farm-empty-title">Тут пусто, но это не мешает вам создать новый</h1>
      )}

      {(nameHolderArr.length === 0 || add) && (
        <div className="farm-create">
          Введите название{" "}
          <input className="farm-name-input"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <button className="button button-primary" onClick={addFarm}>
            Создать
          </button>
        </div>
      )}

      {nameHolderArr.map((farm) => (
        <button
          className={selector === farm.id ? "farm-tab is-selected" : "farm-tab"}
          key={farm.id}
          onClick={() => setSelector(farm.id)}
        >
          {farm.name}
        </button>

      ))}

      {nameHolderArr.length > 0 && !add && (
        <button className="button farm-add" onClick={() => setAdd(true)}>
          +
        </button>
      )}
    </div>
  );
}

function SidePanelWithInfo({ onOpenExpenses, onOpenDrop }) {
  return(
    <aside className="side-panel">
      <button className="button side-panel-button" onClick={onOpenExpenses}>расходы</button>
      <button className="button side-panel-button" onClick={onOpenDrop}>дроп</button>
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
  "Все", "Валюта", "Сущности", "Делириум", "Разлом",
  "Бездна", "Храм Атзири", "Фрагменты", "Руны", "Ритуал", "Ядра душ",
  "Идолы", "Неогранённые камни", "Экспедиция", "Камни"
];

function ItemSelectorPanel({setSelectedItems,selectedItems,currentDrop,setCurrentDrop,onClose}) {
  return (
    <section className="item-selector" aria-label="Выбор предметов">
      <aside className="item-selector-sidebar">
        <div className="item-category-list" aria-label="Категории предметов">
          {ITEM_CATEGORIES.map(category => (
            <button
              type="button"
              key={category}
              className={category === "Все" ? "item-category is-active" : "item-category"}
              aria-disabled="true"
              title="Категория пока недоступна"
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
            Сохранить
          </button>
        </div>
      </aside>

      <div className="item-selector-content">
        <h3 className="item-section-title" id="item-currency-title">Валюта</h3>
        <div className="item-scroll" role="region" aria-labelledby="item-currency-title" tabIndex={0}>
          <div className="item-grid">
            {currency.items.map(cur => (
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


  return (
    <div className="farm-summary">
      <h4 className="summary-card">количетсво ранов {selectedFarm?.runs?.length ?? 0}</h4>
      <h4 className="summary-card">профит </h4>
      <h4 className="summary-card">профит в час</h4>
      <h4 className="summary-card">общ затраты</h4>
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
      <h4 className="run-title">инфо о вашем забеге</h4>
      <h4 className="run-number">номер забега: {(selectedFarm?.runs?.length ?? 0) + 1}</h4>
      <div className="run-drops">
      <span className="run-label">дроп:</span> {currentDrop.map((drop,index) =>{
        const itemInfo = currency.items.find(cur=> cur.id === drop.item);
        return(
        <div className="drop-row" key={drop.item}>
          <img className="item-icon" src={`https://web.poecdn.com${itemInfo.image}`}/>
          <input type="number" value={drop.count} className="drop-count-input" onChange={(event) => setCurrentDrop((prev)=> prev.map(item => item.item === drop.item ? {...item,count:Number(event.target.value)} : item))}/>


        </div>)
  } )}
      </div>
      {currentDrop.length === 0 && (
        <p className="run-hint">сначала выберите дроп</p>
      )}
      <button className="button button-primary" onClick={arrayChange} disabled={currentDrop.length === 0}>
      сохранить</button>
    </div>}

    <div className="run-history">
    {selectedFarm?.runs?.map((runs,index) =>(
      <div className="run-card" key={runs.id}>
        <h4 className="run-title">забег: {index + 1} </h4>
        <div className="run-drops">
        <span className="run-label">дроп:</span> {runs.drop.map((drop,index) =>{
        const itemInfo = currency.items.find(cur=> cur.id === drop.item);
        return(
        <div className="drop-row" key={index}>
          <img className="item-icon" src={`https://web.poecdn.com${itemInfo.image}`}/>:{drop.count}
        </div>)})}
        </div>

        <button className="button button-danger" onClick={() => {idForDell = runs.id, deleteRun()}}>удалить ран</button>

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
  return (
  <div className="farm-page">
  <div className="farm-row">
  <div className="farm-main">
  <NewFarm
    nameHolderArr={nameHolderArr}
    setNameHolderArr={setNameHolderArr}
    selector={selector}
    setSelector={setSelector}
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
    <Modal title="Расходы" onClose={() => setActiveModal(null)}>
    </Modal>
  )}

  {activeModal === "drop" && (
    <Modal title="Дроп" wide onClose={() => setActiveModal(null)}>
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
