// import { playeds } from "@prisma/client";
import { useState } from 'react';

export interface Item {
  id: number;
  [key: string]: any;
}

export function useItems(
  initialItems: Item[]
): [Item[], Function, Function, Function, Function, Function] {
  const [items, setItems] = useState<Item[]>(initialItems);

  function removeItem(id: number) {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  }

  function addItem(item: Item) {
    setItems(prevItems => [...prevItems, item]);
  }

  function updateItem(item: Object, id: number) {
    setItems(prevItems => {
      const index = prevItems.findIndex(element => element.id === id);
      prevItems[index] = { ...prevItems[index], ...item };
      return prevItems;
    });
  }

  function collapseItem(id: number) {
    setItems(prevItems =>
      prevItems.map(item => {
        return item.id === id ? { ...item, collapsed: true } : item;
      })
    );
  }

  function uncollapseItem(id: number) {
    console.log('Escupe: ', items, id);
    setItems(prevItems =>
      prevItems.map(item => {
        return item.id === id ? { ...item, collapsed: false } : item;
      })
    );
  }

  return [items, addItem, updateItem, removeItem, collapseItem, uncollapseItem];
}
