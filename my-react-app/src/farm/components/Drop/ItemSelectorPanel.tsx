import { useState } from "react";
import exchangeOrder from "../../../ApiDataBase/currency-exchange-order.json";
import { allItems } from "../../../ApiDataBase";
import { Drop } from "../../type";
const correctDisplayOrder = {
    Pos: exchangeOrder.categories.map((categories) => ({
        name: categories.name,
        groups: categories.groups.map((group) => ({
            name: group.name,
            items: group.items.map((orderItem) =>
                allItems.find((priceItem) => priceItem.id === orderItem.id),
            ),
        })),
    })),
};



//  ниже все что касается панели Drop

type ItemSelectorPanelProps = {
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
    selectedItems: string[];
    setCurrentDrop: React.Dispatch<React.SetStateAction<Drop[]>>;
    currentDrop: Drop[];
    onClose: () => void;
};

export function ItemSelectorPanel({
    setSelectedItems,
    selectedItems,
    currentDrop,
    setCurrentDrop,
    onClose,
}: ItemSelectorPanelProps) {
    const [activeCategory, setActiveCategory] = useState("All");
    const [inputTextHolder, setInputTextHolder] = useState("");

    return (
        <section className="item-selector" aria-label="Item selector">
            <aside className="item-selector-sidebar">
                <div className="item-category-list" aria-label="Item categories">
                    <button
                        type="button"
                        key={"All"}
                        className={
                            "All" === activeCategory
                                ? "item-category is-active"
                                : "item-category"
                        }
                        onClick={() => setActiveCategory("All")}
                    >
                        All
                    </button>
                    {correctDisplayOrder.Pos.map(({ name }) => (
                        <button
                            type="button"
                            key={name}
                            className={
                                name === activeCategory
                                    ? "item-category is-active"
                                    : "item-category"
                            }
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
                        onClick={() => {
                            (setCurrentDrop(
                                selectedItems.map((id) => ({
                                    item: id,
                                    count: currentDrop.find((d) => d.item === id)?.count ?? 0,
                                })),
                            ),
                                selectedItems.length === 0 ? "" : onClose());
                        }}
                    >
                        Save
                    </button>
                </div>
            </aside>

            <div className="item-selector-content">
                {correctDisplayOrder.Pos.filter(
                    (category) =>
                        category.name === activeCategory || activeCategory === "All",
                ).map(({ name, groups }) => (
                    <div
                        className="item-scroll"
                        role="region"
                        aria-labelledby="item-currency-title"
                        tabIndex={0}
                        key={name}
                    >
                        {groups
                            .filter((group) =>
                                group.items.some(
                                    (item) =>
                                        item && item.name.toLowerCase().includes(inputTextHolder),
                                ),
                            )
                            .map(({ name, items }) => (
                                <div className="item-grid" key={name}>
                                    <h3 className="item-section-title">{name}</h3>
                                    {items
                                        .filter((item) =>
                                            item
                                                ? item.name.toLowerCase().includes(inputTextHolder)
                                                : null,
                                        )
                                        .map((item) =>
                                            item ? (
                                                <button
                                                    className={
                                                        selectedItems.includes(item.id)
                                                            ? "item-card is-selected"
                                                            : "item-card"
                                                    }
                                                    onClick={() => {
                                                        setSelectedItems((prev) =>
                                                            prev.includes(item.id)
                                                                ? prev.filter((id) => id !== item.id)
                                                                : [...prev, item.id],
                                                        );
                                                    }}
                                                    type="button"
                                                    key={item.id}
                                                >
                                                    {item.image ? (
                                                        <img
                                                            className="item-icon"
                                                            src={`https://web.poecdn.com${item.image}`}
                                                            alt={item.name}
                                                        />
                                                    ) : null}
                                                    <span className="item-name">{item.name}</span>
                                                </button>
                                            ) : null,
                                        )}
                                </div>
                            ))}
                    </div>
                ))}
            </div>
            <input
                onChange={(text) => setInputTextHolder(text.target.value.toLowerCase())}
            />
        </section>
    );
}