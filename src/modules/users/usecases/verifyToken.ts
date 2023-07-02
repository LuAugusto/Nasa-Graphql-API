import { Context } from "../../../../prisma/index";

class VerifyToken {
  constructor() {}

  async execute(token: string, ctx: Context) {
    const dbToken = await ctx.prisma.tokens.findUnique({
      where: { token },
      include: { user: true },
    });

    return dbToken;
  }
}

const verifyToken = new VerifyToken();

export { verifyToken };
