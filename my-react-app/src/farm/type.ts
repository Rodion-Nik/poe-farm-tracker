
export type Drop = {
  item: string;
  count: number;
};

export type FarmRun = {
  id: number;
  saved: boolean;
  time: string;
  drop: Drop[];
};

export type Farm = {
  id: number;
  name: string;
  runs: FarmRun[];
};

type PricedItem = {
  itemId: string;
  customPrice:number;
  
}


type TabletItem = PricedItem & { rowId: number };

export type WaystoneExpenses = {
  waystone: {
    map: PricedItem[];
    omens: PricedItem[];
    tablets: TabletItem[];
  };
};


export type ExpensesPreSet ={
  A: PricedItem[] | WaystoneExpenses;
  B: PricedItem[] | WaystoneExpenses;
  C: PricedItem[] | WaystoneExpenses;
}



