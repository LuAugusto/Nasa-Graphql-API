import { Context } from "../../../../../prisma/index";
import {
  RechargeByReservationIdInput,
  RechargeOutput,
} from "../../dto/Recharge";
import IRechargeRepo from "../../repository/IRechargeRepo";

export default class CreateRechargeByReservationId {
  constructor(private rechargeRepo: IRechargeRepo) {}

  async execute(
    data: RechargeByReservationIdInput,
    ctx: Context
  ): Promise<RechargeOutput> {
    return await this.rechargeRepo.createRechargeByReservationId(data, ctx);
  }
}
