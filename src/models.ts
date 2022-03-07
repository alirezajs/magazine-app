export interface Cause {
  name: string;
}

export interface Deals {
  cause: Cause;
  key: string;
  media: string[];
  price: number;
  title: string;
}
