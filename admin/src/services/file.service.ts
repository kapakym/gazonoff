import requestBuilder from "@/api/requestBuilder";
import {
  ICategory,
  ICategoryNode,
  ICategoryWithChild,
  TypeCategory,
} from "@/types/category.types";
import {
  ICreateFiles,
  ICreateFilesRes,
  IProduct,
  TCreateProduct,
} from "@/types/product.types";

class FileService {
  BASE_URL = "files/";

  async getCategories() {
    const response = await requestBuilder<ICategory[], unknown>({
      prefix: this.BASE_URL,
      method: "get",
      url: "/",
    });

    return response;
  }

  async createFiles(data: ICreateFiles) {
    const response = await requestBuilder<
      ICreateFilesRes[],
      FormData,
      { folder: string }
    >({
      prefix: this.BASE_URL,
      method: "post",
      url: "/",
      options: {
        data: data.data,
        isAuth: true,
        params: {
          folder: data.folder,
        },
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

  async getProductsFromCategory(id: string | undefined) {
    const response = await requestBuilder<
      IProduct[],
      unknown,
      { id: string | undefined }
    >({
      prefix: this.BASE_URL + "category/",
      method: "get",
      url: "/",
      options: {
        isAuth: true,
        params: {
          id,
        },
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

export const fileService = new FileService();
