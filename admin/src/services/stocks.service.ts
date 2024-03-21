import requestBuilder from "@/api/requestBuilder";
import { IStock, TypeAddStock } from "@/types/stocks.types";

class StocksService {
  BASE_URL = "stocks/";

  async getStocks() {
    const response = await requestBuilder<IStock[], unknown>({
      prefix: this.BASE_URL,
      method: "get",
      url: "/",
    });

    return response;
  }

  async createStock(data: TypeAddStock) {
    const response = await requestBuilder<IStock, unknown>({
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

  async deleteStock(id: string) {
    const response = await requestBuilder<boolean, string>({
      prefix: this.BASE_URL + id,
      method: "delete",
      url: "/",
      options: {
        isAuth: true,
      },
    });

    return response;
  }

  async updateStock(id: string, data: TypeAddStock) {
    const response = await requestBuilder<IStock, TypeAddStock>({
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

  async getStock(id: string) {
    const response = await requestBuilder<IStock, string>({
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

export const stocksService = new StocksService();
