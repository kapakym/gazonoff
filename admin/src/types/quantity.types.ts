export interface IQuantity {
  id: string;
  productId: string;
  stockId: string;
  quantity: number;
}

export type TCreateQunatity = Omit<IQuantity, "id">;

export interface IQuantityForm {
  productId: string;
  stockId: { value: string; label: string };
  quantity: number;
}
