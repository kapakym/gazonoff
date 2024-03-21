import { IAdmin } from "./admin.types";

export interface IAuthForm {
  email: string;
  password: string;
}

export interface IAuthResponse {
  accessToken: string;
  user: IAdmin;
}
