//  ниже панель с инфой
import { Farm, ExpensesPreSet} from "../type";
import { divImg } from "./utils/items";

import { usePriceItems } from "../PricesContext";

type MainProps = {
  selectedFarm: Farm | undefined;
  expensesPreSet: ExpensesPreSet
};

export function MainInfo({ selectedFarm, expensesPreSet }: MainProps) {
  const pricedItems = usePriceItems()
  const profit = (selectedFarm?.runs ?? []).reduce(
    (total, run) =>
      total +
      run.drop.reduce(
        (sum, drop) => sum + drop.count * (pricedItems.find(item => item.id === drop.item)?.price ?? 0),
        0,
      ),
    0,
  );
  const toSecond = (selectedFarm?.runs ?? []).reduce((total, run) => {
    const [h, m, s] = (run.time ?? "00:00:00").split(":").map(Number);
    return total + h * 3600 + m * 60 + s;
  }, +0);
  const [h, m, s] = [
    Math.floor(toSecond / 3600),
    Math.floor(toSecond / 60) % 60,
    toSecond % 60,
  ];
  const secondToHour =
    String(h).padStart(2, "0") +
    ":" +
    String(m).padStart(2, "0") +
    ":" +
    String(s).padStart(2, "0");

  const costCalc = () =>{

    let total = 0
    for (const run of selectedFarm?.runs ?? []) {
      if (Array.isArray(run?.PreSet)) { total += run.PreSet.reduce((sum, item) => { return item.customPrice ? sum + item.customPrice : sum + (pricedItems.find(priceItems => priceItems.id === item.itemId)?.price ?? 0) },0)}
      else if (run?.PreSet) {
        const arr = Object.values(run.PreSet.waystone).flat();
        total += arr.reduce((sum, item) => { return item.customPrice ? sum + item.customPrice : sum + (pricedItems.find(priceItems => priceItems.id === item.itemId)?.price ?? 0) }, 0)
      }
      
    } return total
  }

  return (
    <div className="farm-summary">
      <h4 className="summary-card summary-card--runs">
        <span className="summary-label">Runs</span>
        <span className="summary-value">{selectedFarm?.runs?.length ?? 0}</span>
      </h4>
      <h4 className="summary-card summary-card--profit">
        <span className="summary-label">Profit</span>
        <span className="summary-value">
          {(profit - Number(costCalc())).toFixed(2)} <img src={divImg} />
        </span>
      </h4>
      <h4 className="summary-card summary-card--rate">
        <span className="summary-label">Profit per hour</span>
        <span className="summary-value">
          {toSecond >= 1 ? (3600 / (toSecond / profit)).toFixed(2) : "-"}{" "}
          <img src={divImg} />
        </span>
      </h4>
      <h4 className="summary-card summary-card--compact">
        <span className="summary-label">Total costs</span>
        <span className="summary-value">{costCalc().toFixed(2)}<img src={divImg} /></span>
      </h4>
      <h4 className="summary-card summary-card--compact">
        <span className="summary-label">Total time</span>
        <span className="summary-value">{secondToHour}</span>
      </h4>
      <h4 className="summary-card summary-card--compact">
        <span className="summary-label">Maps per hour</span>
        <span className="summary-value">
          {toSecond >= 1
            ? +(3600 / (toSecond / selectedFarm!.runs.length)).toFixed(2)
            : "-"}{" "}
          {toSecond < 1 && (
            <span
              className="info-tooltip"
              title="Available once the total run time is greater than zero."
            >
              ⓘ
            </span>
          )}
        </span>
      </h4>
    </div>
  );
}