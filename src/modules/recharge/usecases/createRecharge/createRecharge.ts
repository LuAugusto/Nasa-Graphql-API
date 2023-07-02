import { Context } from "../../../../../prisma/index";
import { RechargeInput } from "../../dto/Recharge";
import { Recharge } from "../../model/Recharge";
import IRechargeRepo from "../../repository/IRechargeRepo";

export default class CreateRecharge {
  constructor(private rechargeRepo: IRechargeRepo) {}

  async execute(ctx: Context, data: RechargeInput): Promise<Recharge> {
    const dateNow = new Date();
    if (data.end <= dateNow) throw new Error(`Invalid date: ${data.end}`);
    return await this.rechargeRepo.createRecharge(data, ctx);
  }
}
