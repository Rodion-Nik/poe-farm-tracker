import MapStats from "./4760.json";
import './App.css'


function Navboard() {
  return (
    <div className="my-div">
    <button>Map Statistic</button>
    <button>Farm Planer</button>
    </div>
  )
}

function LoadFileButton (){
  return (
  <button>Load File</button>)
}

function SelfMapWrite () {
  return (
  <button>Self Write</button>)
}


function CreateNewArray ({arr}) {
  //убераем хайдауты из масива
  let result = arr.areaLog.filter(item => !item.name.includes("Hideout"))
  const completedaMap = result.length 
  //групирование результата без хайдаутов
  const group = {}
  console.log(group)
  //const mintime = Math.min(...group.map(item => item.duration));
  //console.log(mintime)
  result.forEach((map) => {
    if (!group[map.name]){
      group[map.name] = []
    }
    group[map.name].push(map)
  })
  
  return (
    <div>
      <div>
        <h1>Map visited: {completedaMap}</h1>
      </div>
      <div>
        {Object.entries(group).map(([name,visited]) =>(
          <div  key={name}>
            <h2>{name}: {visited.length} </h2>

          </div>
        ))}
        
      </div>
    </div>
  )
}

function Stats() {
  return (<>
  <section> {/*это секция для нав бара*/}
    <Navboard />
  </section>
  <section> {/*это секция для фулл страницы*/}
    <div> {/*область с кнопками для загрузки и тд*/}
      <LoadFileButton /> 
      <SelfMapWrite/>
    </div>
    <div>{/*область для общ статистики*/}
      <CreateNewArray arr={MapStats} />
    </div>
    {/*тут через функцию будут подсаны карты и тд*/}
  </section>
  </>)
}

export default Stats
