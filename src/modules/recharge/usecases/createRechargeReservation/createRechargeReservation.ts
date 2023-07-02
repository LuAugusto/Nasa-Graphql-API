import { Context } from "../../../../../prisma/index";
import {
  RechargeReservationInput,
  RechargeReservationOutput,
} from "../../dto/Recharge";
import IRechargeRepo from "../../repository/IRechargeRepo";

export default class CreateRechargeReservation {
  constructor(private rechargeRepo: IRechargeRepo) {}

  async execute(
    data: RechargeReservationInput,
    ctx: Context
  ): Promise<RechargeReservationOutput> {
    return await this.rechargeRepo.createRechargeReservation(data, ctx);
  }
}
