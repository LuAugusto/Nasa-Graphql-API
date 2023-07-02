// import { UserLoginInputData, UserLoginOutputData } from "../dto/UserRegister";
// import { IUserRepository } from "./IUserRepository";
// import { Context } from "../../../../prisma/index";

// export default class UserRepository implements IUserRepository {
//   ctx: Context;
//   constructor() {}
//   public async login(data: UserLoginInputData): UserLoginOutputData {
//     const dbToken = await ctx.prisma.tokens.findUnique({
//       where: { token },
//       include: { user: true },
//     });
//   }
// }
