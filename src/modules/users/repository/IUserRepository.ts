import { UserLoginOutputData, UserLoginInputData } from "../dto/UserRegister";

export interface IUserRepository {
  login(data: UserLoginInputData): UserLoginOutputData;
}
