import type { useExpensesItem } from "../utils/items";

type ExpensesButtonProps = {
  item: ReturnType<typeof useExpensesItem>[number];
  selectedExpenses: string[];

};

export function ExpensesButton({
  
  item,
  selectedExpenses,

}: ExpensesButtonProps) {
  
  return (
    <button
      className={
        selectedExpenses.includes(item.id)
          ? "item-card is-selected"
          : "item-card"
      }
    >
      {item.image ? (
        <img
          className="item-icon"
          src={`https://web.poecdn.com${item.image}`}
          alt={item.name}
        />
      ) : (
        <img
          className="item-icon"
          src={`${item.backupImage}`}
          alt={item.name}
        />
      )}
      <span className="item-name">{item.name}</span>
    </button>
  );
}