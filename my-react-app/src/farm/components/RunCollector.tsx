//  ниже панель с забегами (та что под инфой)
import { Drop,ExpensesPreSet,Farm, FarmRun, Item } from "../type";
import { PresetTip } from "./PresetTip";



type RunCollectorProps = {
  selectedFarm: Farm | undefined;
  setNameHolderArr: React.Dispatch<React.SetStateAction<Farm[]>>;
  selector: number | null;
  setCurrentDrop: React.Dispatch<React.SetStateAction<Drop[]>>;
  currentDrop: Drop[];
  time: string;
  setTime: React.Dispatch<React.SetStateAction<string>>;
  runPreSet: "A" | "B" | "C";
  setRunPreSet: React.Dispatch<React.SetStateAction<"A" | "B" | "C">>;
  expensesPreSet:ExpensesPreSet
  items:Item[]
};

export function RunCollector({
  selectedFarm,
  setNameHolderArr,
  selector,
  currentDrop,
  setCurrentDrop,
  time,
  setTime,
  runPreSet,
  setRunPreSet,
  expensesPreSet,
  items
}: RunCollectorProps) {
  
  if (!selectedFarm) return null;
  

  function arrayChange() {
    const PreSet = expensesPreSet[runPreSet]
    setNameHolderArr((prev) =>
      prev.map((farm) =>
        farm.id === selector
          ? {
              ...farm,
              runs: [
                ...farm.runs,
                {
                  saved: true,
                  id: Date.now(),
                  drop: currentDrop.filter((item) => item.count !== 0),
                  time: time,
                  PreSet: PreSet,
                  runSelectedPreSet: runPreSet
                },
              ],
            }
          : farm,
      ),
    );

    setCurrentDrop((prev) => prev.map((item) => ({ ...item, count: 0 })));
  }

  function deleteRun(runId: number) {
    setNameHolderArr((prev) =>
      prev.map((farm) =>
        farm.id === selector
          ? {
              ...farm,
              runs: farm.runs.filter((run) => run.id !== runId),
            }
          : farm,
      ),
    );
  }
  
  //  разрез на 10 а после сшивание в 100
  function chunk(runs: FarmRun[]) {
    const groupOfHundred: FarmRun[][][] = [];
    const groupOfTen: FarmRun[][] = [];
    const reversed = runs.toReversed();

    for (let i = 0; i < runs.length; i += 10) {
      groupOfTen.push(reversed.slice(i, i + 10));
    }
    for (let h = 0; h < runs.length; h += 100) {
      groupOfHundred.push(groupOfTen.slice(h / 10, h / 10 + 10));
    }
    return { groupOfHundred, groupOfTen };
  }

  function collectDrop(runs: FarmRun[]) {
    const totals: Record<string, number> = {};

    runs.forEach((run) => {
      run.drop.forEach(({ item, count }) => {
        totals[item] = (totals[item] ?? 0) + count;
      });
    });

    return Object.entries(totals).filter(([, count]) => count !== 0);
  }
  const total = selectedFarm.runs.length;
  const { groupOfTen, groupOfHundred } = chunk(selectedFarm.runs);
  const renderGroup = (groups: FarmRun[][], startIndex: number) => {
    return groups.map((runs, index) => (
      <details key={index}>
        <summary>
          {total - (startIndex + index * 10)}–
          {total - (startIndex + index * 10 + runs.length) + 1}
          <span className="drop-row">
            {collectDrop(runs).map(([itemId, count]) => {
              const item = items.find((item) => item.id === itemId);
              return (
                <span key={itemId}>
                  <img
                    className="item-icon"
                    src={
                      item?.image ? `https://web.poecdn.com${item.image}` : ""
                    }
                  />
                  x{count}
                </span>
              );
            })}
          </span>
        </summary>
        <div className="run-history">
          <table className="history-table">
            <thead>
              <tr>
                <th>Run</th>
                <th>Time</th>
                <th>Drop</th>
                <th className="run-action-heading"></th>
              </tr>
            </thead>
            <tbody>
              {runs?.map((runs, runIndex) => (
                <tr className="run-card" key={runs.id}>
                  <td className="run-title-cell">
                    <h4 className="run-title">
                      Run {total - (startIndex + index * 10 + runIndex)}{" "}
                      <span className="run-preset-badge">
                        {runs?.runSelectedPreSet}
                        {runs.PreSet && <PresetTip name={runs.runSelectedPreSet} PreSet={runs.PreSet} />}
                      </span>
                    </h4>
                  </td>
                  <td className="run-time-cell">
                    <span>{runs.time}</span>
                  </td>
                  <td className="run-loot-cell">
                    <div className="run-drops">
                      <span className="run-label">Drop:</span>{" "}
                      {runs.drop.map((drop, index) => {
                        const itemInfo = items.find(
                          (cur) => cur.id === drop.item,
                        );
                        return (
                          <div className="drop-row" key={index}>
                            <img
                              className="item-icon"
                              src={
                                itemInfo?.image
                                  ? `https://web.poecdn.com${itemInfo.image}`
                                  : ""
                              }
                            />
                            :{drop.count}
                          </div>
                        );
                      })}
                    </div>
                  </td>
                  <td className="run-action-cell">
                    <button
                      className="button button-danger"
                      onClick={() => deleteRun(runs.id)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    ));
  };

  return (
    <>
      {selector !== null && (
        <div className="run-editor">
          <div className="run-heading">
            <div className="run-heading-title">
              <h4 className="run-title">Current run</h4>
              <h4 className="run-number">
                Run number: {(selectedFarm?.runs?.length ?? 0) + 1}
              </h4>
            </div>
            
            <div className="run-heading-controls">
              <div className="expenses-presets" role="group" aria-label="Expenses preset">
                <button
                  type="button"
                  className={runPreSet === "A" ? "expenses-preset is-selected" : "expenses-preset"}
                  onClick={() => setRunPreSet("A")}
                >
                  A
                  <PresetTip name="A" PreSet={expensesPreSet.A} />
                </button>
                <button
                  type="button"
                  className={runPreSet === "B" ? "expenses-preset is-selected" : "expenses-preset"}
                  onClick={() => setRunPreSet("B")}
                >
                  B
                  <PresetTip name="B" PreSet={expensesPreSet.B} />
                </button>
                <button
                  type="button"
                  className={runPreSet === "C" ? "expenses-preset is-selected" : "expenses-preset"}
                  onClick={() => setRunPreSet("C")}
                >
                  C
                  <PresetTip name="C" PreSet={expensesPreSet.C} />
                </button>
              </div>
              <label className="run-time-label">
                <span>Time:</span>
                <input
                  type="time"
                  value={time}
                  step="1"
                  className="run-time"
                  onChange={(event) => setTime(event.target.value)}
                />
              </label>
            </div>

          </div>

          <div className="run-drops run-loot-grid">
            <span className="run-label">Drop:</span>{" "}
            {currentDrop.map((drop) => {
              const itemInfo = items.find((cur) => cur.id === drop.item);
              return (
                <div className="drop-row" key={drop.item}>
                  <img
                    className="item-icon"
                    src={
                      itemInfo?.image
                        ? `https://web.poecdn.com${itemInfo.image}`
                        : ""
                    }
                  />
                  <div className="drop-card-content">
                    <span className="drop-item-name">{itemInfo!.name}</span>
                    <input
                      type="number"
                      value={drop.count || ""}
                      className="drop-count-input"
                      onChange={(event) =>
                        setCurrentDrop((prev) =>
                          prev.map((item) =>
                            item.item === drop.item
                              ? { ...item, count: Number(event.target.value) }
                              : item,
                          ),
                        )
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>
          {currentDrop.length === 0 && (
            <p className="run-hint">
              Select items in Drop to start tracking this run.
            </p>
          )}
          <div className="run-actions">
            <button
              className="button button-primary"
              onClick={() => {
                const timeRegex = /^\d{2,}:[0-5]\d:[0-5]\d$/;
                timeRegex.test(time)
                  ? arrayChange()
                  : alert(
                      "Invalid time. Enter hours, minutes, and seconds (HH:MM:SS) with no empty fields.",
                    );
              }}
              disabled={currentDrop.length === 0}
            >
              Save run
            </button>
          </div>
        </div>
      )}
      {selectedFarm?.runs.length >= 100
        ? groupOfHundred.map((hundred, index) => (
            <details key={index}>
            <summary>
              {total - index * 100}–{Math.max(total - (index + 1) * 100 + 1, 1)}
                <span className="drop-row">
                  {collectDrop(hundred.flat()).map(([itemId, count]) => {
                    const item = items.find((item) => item.id === itemId);
                    return (
                      <span key={itemId}>
                        <img
                          key={item!.image}
                          className="item-icon"
                          src={
                            item?.image
                              ? `https://web.poecdn.com${item.image}`
                              : ""
                          }
                        />
                        x{count}
                      </span>
                    );
                  })}
                </span>
              </summary>
              {renderGroup(hundred, index * 100)}
            </details>
          ))
        : renderGroup(groupOfTen, 0)}
    </>
  );
}