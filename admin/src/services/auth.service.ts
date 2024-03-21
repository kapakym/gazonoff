import requestBuilder from "@/api/requestBuilder";
import { IAdmin } from "@/types/admin.types";
import { IAuthForm } from "@/types/auth.types";
import { removeFromStorage, saveTokenStorage } from "./auth-token.service";

class AuthService {
  private BASE_URL = "auth/";
  async login(data: IAuthForm) {
    const response = await requestBuilder<IAdmin, IAuthForm>({
      prefix: this.BASE_URL,
      method: "post",
      url: "admin/login",
      options: {
        data,
      },
    });
    if (response.data.accessToken) saveTokenStorage(response.data.accessToken);
    return response;
  }

  async getNewTokens() {
    const response = await requestBuilder<{ accessToken: string }, unknown>({
      prefix: this.BASE_URL,
      method: "post",
      url: "login/access-token",
    });
    if (response.data.accessToken) {
      saveTokenStorage(response.data.accessToken);
    }
    return response;
  }

  async logout() {
    const response = await requestBuilder<boolean, unknown>({
      prefix: this.BASE_URL,
      method: "post",
      url: "logout",
    });

    if (response.data) removeFromStorage();
    return response;
  }
}

export const authService = new AuthService();
