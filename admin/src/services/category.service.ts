import requestBuilder from "@/api/requestBuilder";
import {
  ICategory,
  ICategoryNode,
  ICategoryWithChild,
  TypeCategory,
} from "@/types/category.types";

class CategoryService {
  BASE_URL = "category/";

  async getCategories() {
    const response = await requestBuilder<ICategory[], unknown>({
      prefix: this.BASE_URL,
      method: "get",
      url: "/",
    });

    return response;
  }

  async createCategory(data: TypeCategory) {
    console.log(data);
    const response = await requestBuilder<ICategory, unknown>({
      prefix: this.BASE_URL,
      method: "post",
      url: "/",
      options: {
        data: {
          ...data,
          parentId: data.parentId === "root" ? undefined : data.parentId,
        },
        isAuth: true,
      },
    });

    return response;
  }

  async deleteCategory(id: string) {
    const response = await requestBuilder<ICategory, string>({
      prefix: this.BASE_URL + id,
      method: "delete",
      url: "/",
      options: {
        isAuth: true,
      },
    });

    return response;
  }

  async updateCategory(id: string, data: TypeCategory) {
    const response = await requestBuilder<ICategory, TypeCategory>({
      prefix: this.BASE_URL + id,
      method: "patch",
      url: "/",
      options: {
        isAuth: true,
        data,
      },
    });

    return response;
  }

  async getCategoryWithChildren(id: string) {
    const response = await requestBuilder<ICategoryWithChild, string>({
      prefix: this.BASE_URL + "withchidren/" + id,
      method: "get",
      url: "/",
      options: {
        isAuth: true,
      },
    });

    return response;
  }

  async getCategory(id: string) {
    const response = await requestBuilder<ICategory, string>({
      prefix: this.BASE_URL + id,
      method: "get",
      url: "/",
      options: {
        isAuth: true,
      },
    });

    return response;
  }
}

export const categoryService = new CategoryService();
