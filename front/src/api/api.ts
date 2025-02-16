import { Item } from './types';

const API_URL = process.env.REACT_APP_API_URL || '/items';

// Создание объявления
export const createItem = async (item: Item, signal?: AbortSignal): Promise<Item> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
    signal,
  });
  if (!response.ok) {
    throw new Error('Ошибка при создании объявления');
  }
  return response.json();
};

// Получение всех объявлений
export const getItems = async (signal?: AbortSignal): Promise<Item[]> => {
  const response = await fetch(API_URL, { signal });
  if (!response.ok) {
    throw new Error('Ошибка при загрузке объявлений');
  }
  return response.json();
};

// Получение по ID
export const getItemById = async (id: number, signal?: AbortSignal): Promise<Item> => {
  const response = await fetch(`${API_URL}/${id}`, { signal });
  if (!response.ok) {
    throw new Error('Ошибка при загрузке объявления');
  }
  return response.json();
};

// Обновление по ID
export const updateItem = async (id: number, item: Item, signal?: AbortSignal): Promise<Item> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
    signal,
  });
  if (!response.ok) {
    throw new Error('Ошибка при обновлении объявления');
  }
  return response.json();
};

// Удаление по ID
export const deleteItem = async (id: number, signal?: AbortSignal): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    signal,
  });
  if (!response.ok) {
    throw new Error('Ошибка при удалении объявления');
  }
};

