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

  async getProduct(id: string) {
    const response = await requestBuilder<IProduct, unknown, { id: string }>({
      prefix: this.BASE_URL,
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
}

export const productService = new ProductService();
