import { Item } from '../api/types';

// Для поиска по названию
export const searchItemsByName = (items: Item[], searchText: string): Item[] => {
  return items.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );
};

// Для фильтрации по категории
export const filterItemsByType = (items: Item[], filterValue: string): Item[] => {
  return filterValue
    ? items.filter((item) => item.type === filterValue)
    : items;
};

// Для поиска и фильтрации
export const applyFilters = (
  items: Item[],
  searchText: string,
  filterValue: string
): Item[] => {
  let filteredItems = items;

  if (searchText) {
    filteredItems = searchItemsByName(filteredItems, searchText);
  }

  if (filterValue) {
    filteredItems = filterItemsByType(filteredItems, filterValue);
  }

  return filteredItems;
};