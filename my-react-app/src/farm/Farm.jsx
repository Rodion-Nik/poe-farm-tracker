import currency from "../ApiDataBase/currency.json"
import { useState } from 'react'
import './App.css'
console.log(currency)

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
          onClick={() =>
            {console.log(farm);
            setSelector(farm.id);
          }}
        >
          {farm.name}
        </button>

      ))}

      {nameHolderArr.length > 0 && !add && (
        <>
        <button className="button farm-add" onClick={() => setAdd(true)}>
          +
        </button>
        <button className="button button-debug" onClick={() => console.log(nameHolderArr,selector)}>
        123
        </button>
        </>
      )}
    </div>
  );
}

function SidePanelWithInfo() {
  return(
    <aside className="side-panel"></aside>
  )
}

function ItemSelectorPanel({nameHolderArr,setNameHolderArr,selector,setSelectedItems,selectedItems,currentDrop,setCurrentDrop}) {





  return(
  <section className="item-selector">
    <h3 className="item-section-title">Валюта</h3>
    <div className="item-grid">
    {currency.items.map((cur)=> (

      <button
      key={cur.id}
      className={selectedItems.includes(cur.id) ? "item-card is-selected" : "item-card"}
      onClick={() => {setSelectedItems(prev => prev.includes(cur.id) ? prev.filter(id => id !== cur.id) : [...prev, cur.id])}}>
        <h6 className="item-name">{cur.name}</h6>
        <img className="item-icon" src={`https://web.poecdn.com${cur.image}`} alt={cur.name} loading="lazy"/>
      </button>
    )
    )}
    </div>
    <div className="item-selector-actions">
    <button className="button button-primary" onClick={() => {setCurrentDrop(selectedItems.map(id => ({
    item: id,
    count: currentDrop.find(d => d.item === id)?.count ?? 0
    })))}}>сохранить</button>
    <button className="button button-debug" onClick={() => console.log(currentDrop)}>qwe</button>
    </div>
  </section>
  )
}


function Main({
  nameHolderArr,
  selectedFarm
}) {


  return (
    <div className="farm-summary">
      <h4 className="summary-card">количетсво ранов {selectedFarm?.runs?.length ?? 2}</h4>
      <h4 className="summary-card">профит </h4>
      <h4 className="summary-card">профит в час</h4>
      <h4 className="summary-card">общ затраты</h4>
    </div>
  )
}



function RunCollector ({
  nameHolderArr,
  selectedFarm,
  setNameHolderArr,
  selector,
  selectedItems,
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
      <button className="button button-primary" onClick={arrayChange}>
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

        {!runs.saved &&
        <button className="button button-primary" onClick={arrayChange}>
        сохранить</button>}
        {runs.saved &&
        <button className="button button-danger" onClick={() => {idForDell = runs.id, deleteRun()}}>удалить ран</button>}

      </div>))}
    </div>
    </>
  )
}




function App({}) {
  const [nameHolderArr, setNameHolderArr] = useState([]);
  const [selector, setSelector] = useState(null)
  const [selectedItems, setSelectedItems] = useState([])
  const [currentDrop, setCurrentDrop] = useState([])

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
  <Main
  nameHolderArr={nameHolderArr}
  selectedFarm={selectedFarm}
  />
  <RunCollector
    nameHolderArr={nameHolderArr}
    setNameHolderArr={setNameHolderArr}
    selector={selector}
    setSelector={setSelector}
    selectedFarm={selectedFarm}
    selectedItems={selectedItems}
    currentDrop={currentDrop}
    setCurrentDrop={setCurrentDrop}
  />
  <ItemSelectorPanel
  selectedItems={selectedItems}
  setSelectedItems={setSelectedItems}
  nameHolderArr={nameHolderArr}
  setNameHolderArr={setNameHolderArr}
  selector={selector}
  currentDrop={currentDrop}
  setCurrentDrop={setCurrentDrop}

  />

<button className="button button-debug" onClick={() => {
  console.log("=== DEBUG ===");
  console.log("nameHolderArr:", nameHolderArr);
  console.log("selector:", selector);
  console.log("selectedFarm:", selectedFarm);
  console.log("selectedItems:", selectedItems);
  console.log("currentDrop:", currentDrop);
}}>
  DEBUG
</button>
  </div>
  <SidePanelWithInfo />
  </div>
  </div>)
}

export default App
