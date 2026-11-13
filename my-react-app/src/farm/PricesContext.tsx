// PricesContext.tsx
import { createContext, useContext } from "react";
import {Item} from './type'

export const PricesContext = createContext<Item[] | null>(null);

export function usePriceItems() {
    const items = useContext(PricesContext);
    if (!items) throw new Error("usePriceItems вызван вне PricesContext.Provider");
    return items;
}