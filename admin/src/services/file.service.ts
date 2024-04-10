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

  async removeFile(file: string) {
    const response = await requestBuilder<string, unknown, { file: string }>({
      prefix: this.BASE_URL,
      method: "delete",
      url: "/",
      options: {
        isAuth: true,
        params: {
          file,
        },
      },
    });

    return response;
  }
}

export const fileService = new FileService();
