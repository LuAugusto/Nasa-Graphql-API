import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../../../../prisma/index";
import {
  SuitableStationsOutput,
  StationInput,
  StationsOutput,
} from "../dto/Stations";
import { verifyToken } from "../../users/usecases/verifyToken";

import { getSuitableStations } from "../usecases/getSuitableStations/index";
import { installStation } from "../usecases/installStation/index";
import { listStations } from "../usecases/listStations/index";

@Resolver()
export class StationsResolver {
  @Query(() => [SuitableStationsOutput])
  async getSuitableStations(
    @Arg("token") token: string,
    @Ctx() ctx: Context
  ): Promise<SuitableStationsOutput[]> {
    if (!(await verifyToken.execute(token, ctx))) {
      throw new Error("Token invalid or was not provided");
    }
    return await getSuitableStations.execute(ctx);
  }

  @Query(() => [StationsOutput])
  async listStations(
    @Arg("token") token: string,
    @Ctx() ctx: Context
  ): Promise<StationsOutput[]> {
    if (!(await verifyToken.execute(token, ctx))) {
      throw new Error("Token invalid or was not provided");
    }
    return await listStations.execute(ctx);
  }

  @Mutation(() => SuitableStationsOutput)
  async installStation(
    @Arg("token") token: string,
    @Arg("data") data: StationInput,
    @Ctx() ctx: Context
  ): Promise<SuitableStationsOutput> {
    if (!(await verifyToken.execute(token, ctx))) {
      throw new Error("Token invalid or was not provided");
    }

    return await installStation.execute(data, ctx);
  }
}
