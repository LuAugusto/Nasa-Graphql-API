import {
  RechargeInput,
  RechargeByReservationIdInput,
  RechargeReservationOutput,
  RechargeReservationInput,
  RechargeOutput,
  RechargelistByStationInput,
  RechargeByIdOutput,
  RechargeByIdInput,
} from "../dto/Recharge";
import { Context } from "../../../../prisma/index";
import { Recharge } from "../model/Recharge";

export default interface IRechargeRepo {
  createRecharge(data: RechargeInput, ctx: Context): Promise<Recharge>;
  createRechargeReservation(
    data: RechargeReservationInput,
    ctx: Context
  ): Promise<RechargeReservationOutput>;
  createRechargeByReservationId(
    data: RechargeByReservationIdInput,
    ctx: Context
  ): Promise<RechargeOutput>;
  listStationHistory(
    data: RechargelistByStationInput,
    ctx: Context
  ): Promise<RechargeReservationOutput[]>;
  updateRechargeStatus(
    data: RechargeByIdInput,
    ctx: Context
  ): Promise<RechargeByIdOutput>;
}
