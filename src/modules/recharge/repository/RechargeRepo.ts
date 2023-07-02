import { Context } from "../../../../prisma";
import {
  RechargeInput,
  RechargeReservationInput,
  RechargeReservationOutput,
  RechargeByReservationIdInput,
  RechargeOutput,
  RechargelistByStationInput,
  RechargeByIdInput,
  RechargeByIdOutput,
} from "../dto/Recharge";
import { Recharge } from "../model/Recharge";
import IRechargeRepo from "./IRechargeRepo";

export default class RechargeRepo implements IRechargeRepo {
  public async createRecharge(
    data: RechargeInput,
    ctx: Context
  ): Promise<Recharge> {
    const dateNow = new Date();
    const recharge = await ctx.prisma.recharge.findFirst({
      where: {
        stationId: data.stationId,
        start: { lte: data.end },
        end: { gte: dateNow },
      },
    });

    if (recharge) {
      throw new Error(
        `Station ${data.stationId} is busy or a reservation has been made at this time`
      );
    }

    const userRecharging = await ctx.prisma.recharge.findFirst({
      where: {
        userId: data.userId,
        start: { lte: data.end },
        end: { gte: dateNow },
      },
    });

    if (userRecharging) {
      throw new Error(`User is already recharging`);
    }

    return await ctx.prisma.recharge.create({
      data: {
        stations: { connect: { id: data.stationId } },
        user: { connect: { id: data.userId } },
        end: data.end,
      },
    });
  }
  public async createRechargeReservation(
    data: RechargeReservationInput,
    ctx: Context
  ): Promise<RechargeReservationOutput> {
    if (data.end <= data.start) throw new Error(`Invalid date: ${data.end}`);
    const recharge = await ctx.prisma.recharge.findFirst({
      where: {
        stationId: data.stationId,
        start: { lte: data.end },
        end: { gte: data.start },
      },
    });

    if (recharge) {
      throw new Error(
        `Station ${data.stationId} is busy or a reservation has been made at this time`
      );
    }

    return await ctx.prisma.recharge.create({
      data: {
        start: data.start,
        end: data.end,
        stationId: data.stationId,
        userId: data.userId,
        reservation: true,
        status: "RESERVATION",
      },
    });
  }
  public async createRechargeByReservationId(
    data: RechargeByReservationIdInput,
    ctx: Context
  ): Promise<RechargeOutput> {
    const reservation = await ctx.prisma.recharge.findFirst({
      where: {
        id: data.reservationId,
        status: "RESERVATION",
      },
    });

    if (!reservation) {
      throw new Error(
        `Reservation with ${data.reservationId} id not found or it is not a reservation`
      );
    }
    const dateNow = new Date();

    const startTime = new Date(reservation.start);
    const endTime = new Date(reservation.end);

    if (dateNow >= startTime && dateNow <= endTime) {
      return await ctx.prisma.recharge.update({
        where: { id: data.reservationId },
        data: { status: "IN_PROGRESS" },
      });
    } else {
      throw new Error(
        `Your reservation time starts at ${startTime}, wait a moment!`
      );
    }
  }
  public async listStationHistory(
    data: RechargelistByStationInput,
    ctx: Context
  ): Promise<RechargeReservationOutput[]> {
    const stations = await ctx.prisma.recharge.findMany({
      where: { stationId: data.id },
    });

    return stations;
  }

  public async updateRechargeStatus(
    data: RechargeByIdInput,
    ctx: Context
  ): Promise<RechargeByIdOutput> {
    const reservation = await ctx.prisma.recharge.findFirst({
      where: {
        id: data.id,
      },
    });

    if (!reservation) {
      throw new Error(`Reservation with ${data.id} id not found`);
    }

    return await ctx.prisma.recharge.update({
      where: { id: data.id },
      data: { status: data.status },
    });
  }
}
