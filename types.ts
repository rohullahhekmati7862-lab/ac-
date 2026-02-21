export interface MenuItem {
  id: string;
  category: 'vorspeise' | 'hauptgericht' | 'dessert' | 'getränke';
  name: string;
  description: string;
  price: string;
  highlight?: boolean;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum ViewState {
  HOME = 'HOME',
  MENU = 'MENU',
  RESERVATION = 'RESERVATION',
}