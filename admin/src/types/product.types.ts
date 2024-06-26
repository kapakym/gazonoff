import { IOptionField } from "@/components/ui/ParamsField/ParamsField";
import { IQuantity } from "./quantity.types";

export interface IProduct {
  id: string;
  name: string;
  price?: number;
  photos?: string[];
  photoMain?: string;
  description?: string;
  raiting?: number;
  byThis?: string[];
  vendor_code?: string;
  params?: string;
  new?: boolean;
  bestsellers?: boolean;
  categoryId: string;
}

export interface IProductForm {
  id: string;
  name: string;
  price?: number;
  photos?: FileList;
  photoMain?: string;
  description?: string;
  raiting?: number;
  byThis?: string[];
  vendor_code?: string;
  new?: boolean;
  bestsellers?: boolean;
  categoryId: string;
  params?: IOptionField[];
}

export interface ICreateFiles {
  folder: string;
  data: FormData;
}

export interface ICreateFilesRes {
  name: string;
  url: string;
}

export type TCreateProduct = Omit<IProduct, "id">;

export type TUpdateProduct = Partial<TCreateProduct>;

export interface IPhotosUri {
  name: string;
  url: string;
  isUploaded: boolean;
}

export interface IMoveProducts {
  products: string[];
  categoryId: string;
}

export interface IProductWithQuantity extends IProduct {
  quantityProducts: IQuantity[];
}
