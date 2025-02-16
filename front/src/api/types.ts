export interface Item {
    id?: number;
    name: string;
    description: string;
    location: string;
    type: string;
    image?: string;
    [key: string]: any; // Для доп полей
  }