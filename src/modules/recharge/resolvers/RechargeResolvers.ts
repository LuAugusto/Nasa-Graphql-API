import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../../../../prisma/index";

import { Recharge } from "../model/Recharge";

import {
  RechargeInput,
  RechargeReservationInput,
  RechargeReservationOutput,
  RechargeOutput,
  RechargeByReservationIdInput,
  RechargeByIdInput,
  RechargeByIdOutput,
  RechargelistByStationInput,
} from "../dto/Recharge";
import { verifyToken } from "../../users/usecases/verifyToken";
import { createRechargeReservation } from "../usecases/createRechargeReservation/index";
import { createRecharge } from "../usecases/createRecharge/index";
import { createRechargeByReservationId } from "../usecases/createRechargeByReservationId/index";
import { listStationHistory } from "../usecases/listStationHistory/index";
import { updateRechargeStatus } from "../usecases/updateRechargeStatus/index";

@Resolver()
export class RechargeResolver {
  @Mutation(() => Recharge)
  async createRecharge(
    @Arg("data") data: RechargeInput,
    @Arg("token") token: string,
    @Ctx() ctx: Context
  ): Promise<Recharge> {
    if (!(await verifyToken.execute(token, ctx))) {
      throw new Error("Token invalid or was not provided");
    }
    return await createRecharge.execute(ctx, data);
  }

  @Mutation(() => RechargeReservationOutput)
  async createRechargeReservation(
    @Arg("data") data: RechargeReservationInput,
    @Arg("token") token: string,
    @Ctx() ctx: Context
  ): Promise<RechargeReservationOutput> {
    if (!(await verifyToken.execute(token, ctx))) {
      throw new Error("Token invalid or was not provided");
    }
    return await createRechargeReservation.execute(data, ctx);
  }

  @Mutation(() => RechargeOutput)
  async createRechargeByReservationId(
    @Arg("data") data: RechargeByReservationIdInput,
    @Arg("token") token: string,
    @Ctx() ctx: Context
  ): Promise<RechargeOutput> {
    if (!(await verifyToken.execute(token, ctx))) {
      throw new Error("Token invalid or was not provided");
    }
    return await createRechargeByReservationId.execute(data, ctx);
  }

  @Mutation(() => RechargeByIdOutput)
  async updateRechargeStatus(
    @Arg("data") data: RechargeByIdInput,
    @Arg("token") token: string,
    @Ctx() ctx: Context
  ): Promise<RechargeByIdOutput> {
    if (!(await verifyToken.execute(token, ctx))) {
      throw new Error("Token invalid or was not provided");
    }
    return await updateRechargeStatus.execute(data, ctx);
  }

  @Query(() => [RechargeReservationOutput])
  async listStationHistory(
    @Arg("data") data: RechargelistByStationInput,
    @Arg("token") token: string,
    @Ctx() ctx: Context
  ): Promise<RechargeReservationOutput[]> {
    if (!(await verifyToken.execute(token, ctx))) {
      throw new Error("Token invalid or was not provided");
    }
    return await listStationHistory.execute(data, ctx);
  }
}
