import requestBuilder from "@/api/requestBuilder";
import {
  ICategory,
  ICategoryNode,
  ICategoryWithChild,
  TypeCategory,
} from "@/types/category.types";
import { IMoveProducts, IProduct, TCreateProduct } from "@/types/product.types";

class ProductService {
  BASE_URL = "product/";

  async getCategories() {
    const response = await requestBuilder<ICategory[], unknown>({
      prefix: this.BASE_URL,
      method: "get",
      url: "/",
    });

    return response;
  }

  async createProduct(data: TCreateProduct) {
    const response = await requestBuilder<IProduct, TCreateProduct>({
      prefix: this.BASE_URL,
      method: "post",
      url: "/",
      options: {
        data,
        isAuth: true,
      },
    });

    return response;
  }

  async moveProducts(data: IMoveProducts) {
    const response = await requestBuilder<boolean, IMoveProducts>({
      prefix: this.BASE_URL,
      method: "post",
      url: "/move",
      options: {
        data,
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

export const productService = new ProductService();
