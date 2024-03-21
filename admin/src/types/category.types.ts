export interface ICategory {
  id: string;
  name: string;
  parentId?: string;
}

export type TypeCategory = Omit<ICategory, "id">;
