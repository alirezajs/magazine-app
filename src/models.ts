export interface Cause {
  name: string;
}

export interface Deals {
  cause: Cause;
  key: string;
  media: [];
  price: number;
  title: string;
}
