import { Context } from "../../../../../prisma/index";
import { RechargeByIdInput } from "../../dto/Recharge";
import IRechargeRepo from "../../repository/IRechargeRepo";

export default class UpdateRechargeStatus {
  constructor(private rechargeRepo: IRechargeRepo) {}

  async execute(data: RechargeByIdInput, ctx: Context) {
    return await this.rechargeRepo.updateRechargeStatus(data, ctx);
  }
}
