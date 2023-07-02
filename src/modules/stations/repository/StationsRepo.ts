import {
  SuitableStationsOutput,
  StationInput,
  StationsOutput,
} from "../dto/Stations";
import { Context } from "../../../../prisma/index";
import IStationsRepo from "./IStationsRepo";

import {
  ExoplanetDTO,
  ExoplanetResultDTO,
  convertExoplanet,
} from "../dto/Exoplanet";
import { QUERY_API } from "../consts";
import axios from "axios";

export default class StationRepo implements IStationsRepo {
  public async getSuitableStations(
    ctx: Context
  ): Promise<SuitableStationsOutput[]> {
    const exoplanets: SuitableStationsOutput[] =
      await ctx.prisma.suitablePlanets.findMany();
    if (exoplanets.length > 0) {
      return exoplanets;
    }

    const exoplanets_refresh = await axios.get(QUERY_API);

    const exoplanets_data: ExoplanetDTO[] = exoplanets_refresh.data;

    const data: ExoplanetResultDTO[] = exoplanets_data.map(convertExoplanet);

    await ctx.prisma.suitablePlanets.createMany({
      data,
    });

    const suitablePlanets: SuitableStationsOutput[] =
      await ctx.prisma.suitablePlanets.findMany();

    return suitablePlanets;
  }
  public async listStations(ctx: Context): Promise<StationsOutput[]> {
    const stations = await ctx.prisma.stations.findMany({
      include: { suitablePlanets: true },
    });

    return stations;
  }
  public async installStation(
    data: StationInput,
    ctx: Context
  ): Promise<SuitableStationsOutput> {
    const station = await ctx.prisma.suitablePlanets.update({
      where: { id: data.id },
      data: {
        hasStation: true,
      },
    });

    await ctx.prisma.stations.create({
      data: { planetId: data.id },
    });

    return station;
  }
}
