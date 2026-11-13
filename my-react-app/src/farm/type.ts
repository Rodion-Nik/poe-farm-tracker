
export type Drop = {
  item: string;
  count: number;
};

export type FarmRun = {
  id: number;
  saved: boolean;
  time: string;
  drop: Drop[];
  PreSet?: PricedItem[] | WaystoneExpenses;
  runSelectedPreSet: "A"|"B"|"C";
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


export type Item ={
  category: string;
  currency: string;
  fetched_at: string;
  id: string;
  image: string|null;
  name: string;
  price: number;
}
