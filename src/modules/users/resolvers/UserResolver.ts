import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { v4 as uuid } from "uuid";
import { Context } from "../../../../prisma/index";
import { User } from "../models/User";

import {
  UserLoginInputData,
  UserLoginOutputData,
  UserRegisterInputData,
} from "../dto/UserRegister";
import { hash } from "bcryptjs";

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async register(
    @Arg("data") data: UserRegisterInputData,
    @Ctx() ctx: Context
  ): Promise<User> {
    const hashPassword = await hash(data.password, 10);

    const user = ctx.prisma.users.create({
      data: {
        email: data.email,
        password: hashPassword,
      },
    });

    return user;
  }

  @Mutation(() => UserLoginOutputData, { nullable: true })
  async login(
    @Arg("data") data: UserLoginInputData,
    @Ctx() ctx: Context
  ): Promise<UserLoginOutputData | null> {
    const user = await ctx.prisma.users.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      return null;
    }
    const tokenCode = uuid();
    const token = await ctx.prisma.tokens.create({
      data: { token: tokenCode, user: { connect: { id: user.id } } },
    });

    const result: UserLoginOutputData = {
      id: user.id,
      email: user.email,
      token: token.token,
    };

    return result;
  }
}
