export interface Cause {
  name: string;
}

export interface Charity {
  name: string;
  description: string;
  website: string;
}

export interface User {
  avatar: string;
  name: string;
}

export interface Deals {
  cause: Cause;
  key: string;
  media: string[];
  price: number;
  title: string;
  user: User;
  charity: Charity;
  description: string;
  availableQuantity:number
}
