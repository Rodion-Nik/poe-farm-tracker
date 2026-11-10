export type SidePanelProps = {
  onOpenExpenses: () => void;
  onOpenDrop: () => void;
};

export function FarmActions({ onOpenExpenses, onOpenDrop }: SidePanelProps) {
  return (
    <aside className="side-panel">
      <span className="side-panel-title">Expedition overview</span>
      <button className="button side-panel-button" onClick={onOpenExpenses}>
        Expenses
      </button>
      <button
        className="button side-panel-button side-panel-button--primary"
        onClick={onOpenDrop}
      >
        Drop
      </button>
    </aside>
  );
}