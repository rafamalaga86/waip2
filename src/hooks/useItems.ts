import { useState } from 'react';

export interface Item {
  id: number;
  [key: string]: any;
}

export function useItems<T extends { id: number }>(
  initialItems: T[]
): [T[], Function, Function, Function, Function, Function] {
  const [items, setItems] = useState<T[]>(initialItems);

  function removeItem(id: number) {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  }

  function addItem(item: T) {
    setItems(prevItems => [...prevItems, item]);
  }

  function updateItem(item: Object, id: number) {
    setItems(prevItems => {
      return prevItems.map(element => (element.id === id ? { ...element, ...item } : element));
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
    console.error(items, id);
    setItems(prevItems =>
      prevItems.map(item => {
        return item.id === id ? { ...item, collapsed: false } : item;
      })
    );
  }

  return [items, addItem, updateItem, removeItem, collapseItem, uncollapseItem];
}
