import { useState } from "react";
import { ExpensesPreSet, WaystoneExpenses } from "../../type";
import { expensesItem } from "../utils/items";
import { DndContext, DragOverlay, DragStartEvent, DragEndEvent, } from "@dnd-kit/core";
import { ExpensesButton } from "./ExpensesButton";
import { ExpensesDropSection } from "./ExpensesDropSection";
import { Draggable } from "./Dnd";
import { snapCenterToCursor } from "@dnd-kit/modifiers";

type ExpensesProp = {
  expensesSelector: "A" | "B" | "C";
  setExpensesSelector: React.Dispatch<React.SetStateAction<"A" | "B" | "C">>;
  expensesPreSet: ExpensesPreSet;
  setExpensesPreSet: React.Dispatch<React.SetStateAction<ExpensesPreSet>>;
};

export function ExpensesMain({
  expensesSelector,
  setExpensesSelector,
  expensesPreSet,
  setExpensesPreSet,
}: ExpensesProp) {
  const [activeId, setActiveId] = useState<string | number | null>(null);
  // подсветка в каталоге = всё, что лежит в текущем пресете
  const PreSet = expensesPreSet[expensesSelector];
  const selectedExpenses = Array.isArray(PreSet)
    ? PreSet.map((n) => n.itemId)
    : [
      ...PreSet.waystone.map.map((n) => n.itemId),
      ...PreSet.waystone.omens.map((n) => n.itemId),
      ...PreSet.waystone.tablets.map((n) => n.itemId),
    ];

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
  }
  function handleDragEnd(event: DragEndEvent) {
    const found = expensesItem.find((item) => item.id === event.active.id);
    if (event.over?.id === "Droppable" && found?.group === "entry") {
      const filteredExp = expensesItem
        .filter((item) => item.itemCategory === found?.itemCategory)
        .map((item) => item.id);


      const PreSet = expensesPreSet[expensesSelector];
      const selectedPreSet = Array.isArray(PreSet) ? PreSet : [];

      setExpensesPreSet((prev) => ({
        ...prev,
        [expensesSelector]: filteredExp.map((item) => {
          const oldPrice = selectedPreSet.find((n) => n.itemId === item)?.customPrice ?? 0;
          return { itemId: item, customPrice: oldPrice };
        }),
      }));
    } else if (event.over?.id === "Droppable" && found?.group === "waystone") {
    const current = expensesPreSet[expensesSelector];
      //Если пресет был пресетом для босса (или пустым), создает новый waystone
    const waystone: WaystoneExpenses["waystone"] = Array.isArray(current)
      ? { map: [], omens: [], tablets: [] }
      : current.waystone;

    const newItem = { itemId: found.id, customPrice: 0 };
    let next = waystone;

    if (found.itemCategory === "Omens") {
      if (!waystone.omens.some((omen) => omen.itemId === found.id)) {
        next = { ...waystone, omens: [...waystone.omens, newItem] };
      }
    } else if (found.itemCategory === "Tablet") {
      next = {
        ...waystone,
        tablets: [...waystone.tablets, { ...newItem, rowId: Date.now() }],
      };
    } else if (found.itemCategory === "Waystone") {
      if (!waystone.map.some((n) => n.itemId === found.id)) {
        next = { ...waystone, map: [...waystone.map, newItem] };
      }
    }

    setExpensesPreSet((prev) => ({
      ...prev,
      [expensesSelector]: { waystone: next },
    }));


  }
    setActiveId(null);
  }
  const imgCheck = expensesItem.find((item) => item.detailsId === activeId);
  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="expenses-workspace">
        <aside
          className="expenses-workspace-panel expenses-extra"
          aria-label="Additional panel"
        >
          <div className="expenses-workspace-heading">
            <h4>Additional panel</h4>
          </div>
          <div className="expenses-empty-slot">Coming later</div>
        </aside>

        <section
          className="expenses-workspace-panel expenses-drop"
          aria-label="Selected expenses"
        >
          <div className="expenses-workspace-heading">
            <h4>Selected expenses</h4>
          </div>
          <div className="expenses-drop-body">
            <div className="expenses-presets-bar">
              <span className="expenses-price-label">Preset</span>
              <div
                className="expenses-presets"
                role="group"
                aria-label="Preset"
              >
                <button
                  type="button"
                  className={
                    expensesSelector === "A"
                      ? "expenses-preset is-selected"
                      : "expenses-preset"
                  }
                  onClick={() => setExpensesSelector("A")}
                >
                  A
                </button>
                <button
                  type="button"
                  className={
                    expensesSelector === "B"
                      ? "expenses-preset is-selected"
                      : "expenses-preset"
                  }
                  onClick={() => setExpensesSelector("B")}
                >
                  B
                </button>
                <button
                  type="button"
                  className={
                    expensesSelector === "C"
                      ? "expenses-preset is-selected"
                      : "expenses-preset"
                  }
                  onClick={() => setExpensesSelector("C")}
                >
                  C
                </button>
              </div>
            </div>
            <ExpensesDropSection
              selectedExpenses={selectedExpenses}
              activeId={activeId}
              expensesSelector={expensesSelector}
              setExpensesSelector={setExpensesSelector}
              expensesPreSet={expensesPreSet}
              setExpensesPreSet={setExpensesPreSet}
            ></ExpensesDropSection>
          </div>
        </section>

        <section
          className="expenses-workspace-panel expenses-catalog"
          aria-label="Available items"
        >
          <div className="expenses-workspace-heading">
            <h4>Available items</h4>
          </div>
          <div className="expenses-panel">
            <div className="item-grid expenses-section expenses-bosses">
              {" "}
              <span className="expenses-section-title">Bosses</span>
              {Object.entries(
                Object.groupBy(
                  expensesItem.filter((item) => item.group === "entry"),
                  ({ itemCategory }) => itemCategory!,
                ),
              ).map((group) =>
                group ? (
                  <div className="expenses-boss-group" key={group[0]}>
                    <h3 className="expenses-boss-title">{group[0]}</h3>
                    {group[1]?.map((item) => (
                      <Draggable key={item.detailsId} id={item.id}>
                        <ExpensesButton
                          selectedExpenses={selectedExpenses}

                          item={item}
                        />
                      </Draggable>
                    ))}
                  </div>
                ) : null,
              )}
            </div>
            <div className="item-grid expenses-section expenses-waystones">
              <span className="expenses-section-title">Waystone</span>
                {Object.entries(
                  Object.groupBy(
                  expensesItem.filter((item) => item.group === "waystone"),
                  ({ itemCategory }) => itemCategory!,
                ),
                ).map(([itemCategory, items]) => (
              <div key={itemCategory}>
                <span className="expenses-subgroup-title">{itemCategory}</span>
                {items!.map((item) => (
                <Draggable key={item.detailsId} id={item.id}>
                 <ExpensesButton
                 selectedExpenses={selectedExpenses}

                 item={item}
                 />
                </Draggable>
                ))}
              </div>
              ))}
          </div>
              
          </div>
        </section>
      </div>
      <DragOverlay modifiers={[snapCenterToCursor]}>
        <img
          src={
            imgCheck?.image
              ? `https://web.poecdn.com${imgCheck?.image}`
              : `${imgCheck?.backupImage}`
          }
        />
      </DragOverlay>
    </DndContext>
  );
}