

import type { ExpensesPreSet } from "../../type";
import { useExpensesItem, chaosImg } from "../utils/items";
import { Droppable } from "./Dnd";
import { usePriceItems } from "../../PricesContext";

type ExpensesDropSectionProps = {
  selectedExpenses: string[];
  activeId: string | number | null;
  expensesSelector: "A" | "B" | "C";
  setExpensesSelector: React.Dispatch<React.SetStateAction<"A" | "B" | "C">>;
  expensesPreSet: ExpensesPreSet;
  setExpensesPreSet: React.Dispatch<React.SetStateAction<ExpensesPreSet>>;
};

export function ExpensesDropSection({
  activeId,
  expensesSelector,
  expensesPreSet,
  setExpensesPreSet,
}: ExpensesDropSectionProps) {
  const pricedItems = usePriceItems()
  const expensesItem = useExpensesItem() 
  const PreSet = expensesPreSet[expensesSelector];

  if (Array.isArray(PreSet)) {
    const bossObject = expensesItem.find(
      (item) => item.id === PreSet[0]?.itemId,
    );

    return (
      <Droppable>
        {PreSet.length < 1 && activeId === null && (
          <div className="expenses-drop-target">
            <span className="expenses-drop-symbol" aria-hidden="true">
              ◇
            </span>
            <span>Drop area</span>
          </div>
        )}

        {activeId !== null && (
          <div className="expenses-drop-target">
            {/*<span className="expenses-drop-symbol" aria-hidden="true"></span>*/}
            <img
              src={expensesItem.find((item) => item.id === activeId)?.dragImg}
            />
          </div>
        )}

        {PreSet.length >= 1 && activeId === null && (
          <div className="expenses-drop-content">
            <div className="expenses-drop-target">
              {/*<span className="expenses-drop-symbol" aria-hidden="true"></span>*/}
              <img
                src={
                  bossObject?.dropImg ||
                  `https://web.poecdn.com${bossObject?.image}`
                }
              />
            </div>
            <p className="expenses-hint">
              If you enter your own price, the calculation will be based on it.
              If you want the price from Poe Ninja, just leave the field empty.
            </p>
            <div className="expenses-price-list">
              {PreSet.map(
                (exp) =>
                  expensesItem.find((item) => exp.itemId === item.id) && (
                    <div className="expenses-price-row" key={exp.itemId}>
                      <span className="expenses-price-pn">
                        <span className="expenses-price-label">PN price</span>
                        <span className="expenses-price-amount">
                          {((pricedItems.find(priceItems => priceItems.id === exp.itemId)?.price ?? 0) / (pricedItems.find(priceItems => priceItems.id === 'chaos')?.price ?? 0)).toFixed(
                            2,
                          )}
                          <img
                            className="item-icon"
                            src={chaosImg}
                            alt="Chaos Orb"
                          />
                        </span>
                      </span>
                      <label className="expenses-price-custom">
                        <span className="expenses-price-label">
                          Custom price
                        </span>
                        <input
                          placeholder="PN price"
                          min={0}
                          type="number"
                          onKeyDown={(e) => {
                            if (["-", "+", "e", "E"].includes(e.key))
                              e.preventDefault();
                          }}
                          value={
                            PreSet.find((n) => n.itemId === exp.itemId)
                              ?.customPrice || ""
                          }
                          onChange={(e) =>
                            setExpensesPreSet((prev) => {
                              const rightItem = PreSet.map((item) =>
                                item.itemId === exp.itemId
                                  ? {
                                      ...item,
                                      customPrice: Number(e.target.value),
                                    }
                                  : item,
                              );
                              return { ...prev, [expensesSelector]: rightItem };
                            })
                          }
                        />
                      </label>
                    </div>
                  ),
              )}
            </div>
          </div>
        )}
      </Droppable>
    );
  } else {
    const waystone = PreSet.waystone;
    const dragged = expensesItem.find((item) => item.id === activeId);
    return (
      <Droppable>
        {dragged?.group === "entry" ? (
          // тащат босса — показываем его картинку, как в ветке боссов
          <div className="expenses-drop-target">
            <img src={dragged.dragImg} />
          </div>
        ) : (<>
        <div className="expenses-drop-target expenses-drop-target--strip">
          <span className="expenses-drop-symbol" aria-hidden="true">
            ◇
          </span>
          <span>Drop a waystone, omen or tablet</span>
        </div>

        <p className="expenses-hint">
          If you enter your own price, the calculation will be based on it. If
          you want the price from Poe Ninja, just leave the field empty.
        </p>

          {/* ===== КАРТА ===== */}
          <section className="expenses-group">
            <h5 className="expenses-group-title">Waystone</h5>
              {waystone.map.length > 0 ? (
                <div className="expenses-price-list">
                  {waystone.map.map((exp) => {
                    const item = expensesItem.find((item) => item.id === exp.itemId);

                    return (
                      <div className="expenses-price-row" key={exp.itemId}>
                        <span className="expenses-price-name">
                          <img
                            className="item-icon"
                            src={
                              item?.image
                                ? `https://web.poecdn.com${item.image}`
                                : item?.backupImage
                            }
                            alt={item?.name}
                          />
                          {item?.name}
                          <button
                            type="button"
                            className="expenses-row-remove"
                            aria-label="Remove"
                            // убрать эту карту
                            onClick={() =>
                              setExpensesPreSet((prev) => ({
                                ...prev,
                                [expensesSelector]: {
                                  waystone: {
                                    ...waystone,
                                    map: waystone.map.filter((n) => n.itemId !== exp.itemId),
                                  },
                                },
                              }))
                            }
                          ></button>
                        </span>
                        <span className="expenses-price-pn">
                          <span className="expenses-price-label">PN price</span>
                          <span className="expenses-price-amount">
                            {((pricedItems.find(priceItems => priceItems.id === exp.itemId)?.price ?? 0) / (pricedItems.find(priceItems => priceItems.id === 'chaos')?.price ?? 0)).toFixed(2)}
                            <img className="item-icon" src={chaosImg} alt="Chaos Orb" />
                          </span>
                        </span>
                        <label className="expenses-price-custom">
                          <span className="expenses-price-label">Custom price</span>
                          <input
                            placeholder="PN price"
                            min={0}
                            type="number"
                            onKeyDown={(e) => {
                              if (["-", "+", "e", "E"].includes(e.key)) e.preventDefault();
                            }}
                            value={exp.customPrice || ""}
                            // записываем свою цену только этой карте
                            onChange={(e) =>
                              setExpensesPreSet((prev) => ({
                                ...prev,
                                [expensesSelector]: {
                                  waystone: {
                                    ...waystone,
                                    map: waystone.map.map((n) =>
                                      n.itemId === exp.itemId
                                        ? { ...n, customPrice: Number(e.target.value) }
                                        : n,
                                    ),
                                  },
                                },
                              }))
                            }
                          />
                        </label>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="expenses-group-empty">No waystone added</p>
              )}
          </section>

          {/* ===== ОМЕНЫ ===== */}
          <section className="expenses-group">
            <h5 className="expenses-group-title">Omens</h5>
            {waystone.omens.length > 0 ? (
              <div className="expenses-price-list">
                {waystone.omens.map((exp) => (
                  <div className="expenses-price-row" key={exp.itemId}>
                    <span className="expenses-price-name">
                      <img
                        className="item-icon"
                        src={`https://web.poecdn.com${expensesItem.find((item) => item.id === exp.itemId)?.image}`}
                        alt=""
                      />
                      {expensesItem.find((item) => item.id === exp.itemId)?.name}
                      <button
                        type="button"
                        className="expenses-row-remove"
                        aria-label="Remove"
                        // убрать этот омен
                        onClick={() =>
                          setExpensesPreSet((prev) => ({
                            ...prev,
                            [expensesSelector]: {
                              waystone: {
                                ...waystone,
                                omens: waystone.omens.filter((n) => n.itemId !== exp.itemId),
                              },
                            },
                          }))
                        }
                      ></button>
                    </span>
                    <span className="expenses-price-pn">
                      <span className="expenses-price-label">PN price</span>
                      <span className="expenses-price-amount">
                        {((pricedItems.find(priceItems => priceItems.id === exp.itemId)?.price ?? 0) / (pricedItems.find(priceItems => priceItems.id === 'chaos')?.price ?? 0)).toFixed(2)}
                        <img className="item-icon" src={chaosImg} alt="Chaos Orb" />
                      </span>
                    </span>
                    <label className="expenses-price-custom">
                      <span className="expenses-price-label">Custom price</span>
                      <input
                        placeholder="PN price"
                        min={0}
                        type="number"
                        onKeyDown={(e) => {
                          if (["-", "+", "e", "E"].includes(e.key)) e.preventDefault();
                        }}
                        value={exp.customPrice || ""}
                        // записываем свою цену только этому омену
                        onChange={(e) =>
                          setExpensesPreSet((prev) => ({
                            ...prev,
                            [expensesSelector]: {
                              waystone: {
                                ...waystone,
                                omens: waystone.omens.map((n) =>
                                  n.itemId === exp.itemId
                                    ? { ...n, customPrice: Number(e.target.value) }
                                    : n,
                                ),
                              },
                            },
                          }))
                        }
                      />
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <p className="expenses-group-empty">No omens added</p>
            )}
          </section>

          {/* ===== ТАБЛИЧКИ ===== */}
          <section className="expenses-group">
            <h5 className="expenses-group-title">Tablets</h5>
            {waystone.tablets.length > 0 ? (
              <div className="expenses-price-list">
                {waystone.tablets.map((exp) => (
                  <div className="expenses-price-row" key={exp.rowId}>
                    <span className="expenses-price-name">
                      <img
                        className="item-icon"
                        src={`https://web.poecdn.com${expensesItem.find((item) => item.id === exp.itemId)?.image}`}
                        alt=""
                      />
                      {expensesItem.find((item) => item.id === exp.itemId)?.name}
                      <button
                        type="button"
                        className="expenses-row-remove"
                        aria-label="Remove"
                        // убрать эту табличку
                        onClick={() =>
                          setExpensesPreSet((prev) => ({
                            ...prev,
                            [expensesSelector]: {
                              waystone: {
                                ...waystone,
                                tablets: waystone.tablets.filter((n) => n.rowId !== exp.rowId),
                              },
                            },
                          }))
                        }
                      ></button>
                    </span>
                    <span className="expenses-price-pn">
                      <span className="expenses-price-label">PN price</span>
                      <span className="expenses-price-amount">
                        {((pricedItems.find(priceItems => priceItems.id === exp.itemId)?.price ?? 0) / (pricedItems.find(priceItems => priceItems.id === 'chaos')?.price ?? 0)).toFixed(2)}
                        <img className="item-icon" src={chaosImg} alt="Chaos Orb" />
                      </span>
                    </span>
                    <label className="expenses-price-custom">
                      <span className="expenses-price-label">Custom price</span>
                      <input
                        placeholder="PN price"
                        min={0}
                        type="number"
                        onKeyDown={(e) => {
                          if (["-", "+", "e", "E"].includes(e.key)) e.preventDefault();
                        }}
                        value={exp.customPrice || ""}
                        // записываем свою цену только этой табличке
                        onChange={(e) =>
                          setExpensesPreSet((prev) => ({
                            ...prev,
                            [expensesSelector]: {
                              waystone: {
                                ...waystone,
                                tablets: waystone.tablets.map((n) =>
                                  n.rowId === exp.rowId
                                    ? { ...n, customPrice: Number(e.target.value) }
                                    : n,
                                ),
                              },
                            },
                          }))
                        }
                      />
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <p className="expenses-group-empty">No tablets added</p>
            )}
          </section>
        </>
        )}
      </Droppable>
    );
  }
}
