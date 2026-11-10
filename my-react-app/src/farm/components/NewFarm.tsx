import { useState } from "react";
import type { Farm } from "../type";

type NewFarmProps = {
  nameHolderArr: Farm[];
  setNameHolderArr: React.Dispatch<React.SetStateAction<Farm[]>>;
  selector: number | null;
  setSelector: React.Dispatch<React.SetStateAction<number | null>>;
  createDemoFarm: () => void;
};

export function NewFarm({
  nameHolderArr,
  setNameHolderArr,
  selector,
  setSelector,
  createDemoFarm,
}: NewFarmProps) {
  const [name, setName] = useState("");
  const [add, setAdd] = useState(false);

  function addFarm() {
    setNameHolderArr((prev) => [...prev, { id: Date.now(), name, runs: [] }]);
    setName("");
    setAdd(false);
  }

  function deleteFarm(farmId: number) {
    setNameHolderArr((prev) => prev.filter((farm) => farm.id !== farmId));
    if (selector === farmId) {
      setSelector(null);
    }
  }

  return (
    <div className="farm-selector">
      {nameHolderArr.length === 0 && (
        <h1 className="farm-empty-title">
          No farms yet. Create your first farm to get started.
        </h1>
      )}

      {(nameHolderArr.length === 0 || add) && (
        <div className="farm-create">
          Farm name{" "}
          <input
            className="farm-name-input"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <button className="button button-primary" onClick={addFarm}>
            Create
          </button>
        </div>
      )}

      {nameHolderArr.map((farm) => (
        <div className="farm-tab-wrap" key={farm.id}>
          <button
            className={
              selector === farm.id ? "farm-tab is-selected" : "farm-tab"
            }
            onClick={() => setSelector(farm.id)}
          >
            {farm.name}
          </button>
          <button
            type="button"
            className="button button-danger farm-tab-delete"
            onClick={() => deleteFarm(farm.id)}
          >
            ×
          </button>
        </div>
      ))}

      {nameHolderArr.length > 0 && !add && (
        <button className="button farm-add" onClick={() => setAdd(true)}>
          + <span className="farm-add-label">New farm</span>
        </button>
      )}

      <button className="button farm-demo" onClick={createDemoFarm}>
        Demo data
      </button>
    </div>
  );
}
