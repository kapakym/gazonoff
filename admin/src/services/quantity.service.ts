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
  TCreateProduct,
  TUpdateProduct,
} from "@/types/product.types";
import { IQuantity, TCreateQunatity } from "@/types/quantity.types";

class QuantityService {
  BASE_URL = "quantity_products/";

  async createQuantity(data: TCreateQunatity) {
    const response = await requestBuilder<IQuantity, TCreateQunatity>({
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

  // async moveQuantity(data: IMoveProducts) {
  //   const response = await requestBuilder<boolean, IMoveProducts>({
  //     prefix: this.BASE_URL,
  //     method: "post",
  //     url: "/move",
  //     options: {
  //       data,
  //       isAuth: true,
  //     },
  //   });

  //   return response;
  // }

  // async updateProduct(id: string, data: TUpdateProduct) {
  //   const response = await requestBuilder<
  //     IProduct,
  //     TUpdateProduct,
  //     { id: string }
  //   >({
  //     prefix: this.BASE_URL,
  //     method: "patch",
  //     url: "/",
  //     options: {
  //       data: data,
  //       isAuth: true,
  //       params: {
  //         id,
  //       },
  //     },
  //   });

  //   return response;
  // }

  // async getQuantityFromProductId(id: string | undefined) {
  //   const response = await requestBuilder<
  //     IProduct[],
  //     unknown,
  //     { id: string | undefined }
  //   >({
  //     prefix: this.BASE_URL + "category/",
  //     method: "get",
  //     url: "/",
  //     options: {
  //       isAuth: true,
  //       params: {
  //         id,
  //       },
  //     },
  //   });

  //   return response;
  // }

  async getQuantityProducts() {
    const response = await requestBuilder<IQuantity[], unknown>({
      prefix: this.BASE_URL,
      method: "get",
      url: "/",
    });
    return response;
  }
}

export const productService = new QuantityService();
