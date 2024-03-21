export interface IStock {
  id: string;
  name: string;
  address: string;
}

export type TypeAddStock = Omit<IStock, "id">;
