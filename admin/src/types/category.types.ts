export interface ICategory {
  id: string;
  name: string;
  parentId?: string;
}

export type TypeCategory = Omit<ICategory, "id">;

export interface ICategoryCount {
  childrens: number;
  products: number;
}
export interface ICategoryNode extends ICategory {
  _count: ICategoryCount;
}
