// import { playeds } from "@prisma/client";
import { useState } from 'react';

interface Item {
  id: number;
  [key: string]: any;
}

export function useItems(initialItems: Item[]): [Item[], Function, Function, Function, Function] {
  const [items, setItems] = useState<Item[]>(initialItems);

  function removeItem(id: number) {
    const newItems = items.filter((element: Item) => element.id !== id);
    setItems(newItems);
  }

  function addItem(item: Item) {
    setItems([...items, item]);
  }

  function updateItem(item: Object, id: number) {
    const index = items.findIndex(element => element.id === id);
    items[index] = { ...items[index], ...item };
    setItems(items);
  }

  return [items, addItem, updateItem, removeItem, setItems];
}
