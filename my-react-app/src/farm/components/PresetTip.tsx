import { usePriceItems } from "../PricesContext";
import type { ExpensesPreSet } from "../type";
import { useExpensesItem } from "./utils/items";

type PresetTipProps = {
    name: "A" | "B" | "C";
    PreSet: ExpensesPreSet["A"];
};




export function PresetTip({ name, PreSet }: PresetTipProps) {
    const expensesItem = useExpensesItem()
    // у боссов массив, у waystone три списка — сливаем в один
    const items = Array.isArray(PreSet)
        ? PreSet
        : [...PreSet.waystone.map, ...PreSet.waystone.omens, ...PreSet.waystone.tablets];

    return (
        <span className="preset-tip" role="tooltip">
            <span className="preset-tip-title">Preset {name}</span>
            {items.length === 0 && <span className="preset-tip-empty">Empty</span>}
            {items.map((exp, index) => {
                const item = expensesItem.find((item) => item.id === exp.itemId);
                return (
                    <span className="preset-tip-row" key={index}>
                        <img
                            className="item-icon"
                            src={item?.image ? `https://web.poecdn.com${item.image}` : item?.backupImage}
                            alt=""
                        />
                        {item?.name}
                    </span>
                );
            })}
        </span>
    );
}