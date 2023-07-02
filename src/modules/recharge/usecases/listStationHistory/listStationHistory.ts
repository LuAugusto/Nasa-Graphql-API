import { Context } from "../../../../../prisma/index";
import { RechargelistByStationInput } from "../../dto/Recharge";
import IRechargeRepo from "../../repository/IRechargeRepo";

export default class ListStationHistory {
  constructor(private rechargeRepo: IRechargeRepo) {}

  async execute(data: RechargelistByStationInput, ctx: Context) {
    return await this.rechargeRepo.listStationHistory(data, ctx);
  }
}
