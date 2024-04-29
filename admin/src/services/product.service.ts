import requestBuilder from "@/api/requestBuilder";
import {
  ICategory,
  ICategoryNode,
  ICategoryWithChild,
  TypeCategory,
} from "@/types/category.types";
import {
  IMoveProducts,
  IProduct,
  IProductWithQuantity,
  TCreateProduct,
  TUpdateProduct,
} from "@/types/product.types";

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

  async updateProduct(id: string, data: TUpdateProduct) {
    const response = await requestBuilder<
      IProduct,
      TUpdateProduct,
      { id: string }
    >({
      prefix: this.BASE_URL,
      method: "patch",
      url: "/",
      options: {
        data: data,
        isAuth: true,
        params: {
          id,
        },
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

  async getProducts() {
    const response = await requestBuilder<IProduct[], unknown>({
      prefix: this.BASE_URL,
      method: "get",
      url: "/",
      options: {
        isAuth: true,
      },
    });

    return response;
  }

  async getProductsWithQuantity() {
    const response = await requestBuilder<IProductWithQuantity[], unknown>({
      prefix: this.BASE_URL + "quantity",
      method: "get",
      url: "/",
      options: {
        isAuth: true,
      },
    });

    return response;
  }

  async getProduct(id: string) {
    const response = await requestBuilder<IProduct, unknown, { id: string }>({
      prefix: this.BASE_URL + "/id",
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
