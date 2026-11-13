
import { expenses } from "../../../ApiDataBase/Expenses";
import { usePriceItems } from "../../PricesContext";
import { Item } from "../../type";

export function useExpensesItem() {
  const pricedItems = usePriceItems()
  return expenses.map((exp) => ({
    ...exp,
    ...pricedItems.find((item) => item.id === exp.detailsId)!,
  }));
}

export const divImg =
  "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lNb2RWYWx1ZXMiLCJzY2FsZSI6MSwicmVhbG0iOiJwb2UyIn1d/2986e220b3/CurrencyModValues.png";
export const chaosImg =
  "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lSZXJvbGxSYXJlIiwic2NhbGUiOjEsInJlYWxtIjoicG9lMiJ9XQ/c0ca392a78/CurrencyRerollRare.png";

