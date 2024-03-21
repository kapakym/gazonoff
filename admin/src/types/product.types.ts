export interface IProduct {
  name: string;
  price?: number;
  photos?: string[];
  photoMain?: string;
  description?: string;
  raiting?: number;
  byThis?: string[];
  vendor_code?: string;
  params?: string[];
  new?: boolean;
  bestsellers?: boolean;
}
