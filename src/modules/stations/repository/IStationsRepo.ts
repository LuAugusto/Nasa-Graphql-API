import {
  SuitableStationsOutput,
  StationInput,
  StationsOutput,
} from "../dto/Stations";
import { Context } from "../../../../prisma/index";

export default interface IRechargeRepo {
  getSuitableStations(ctx: Context): Promise<SuitableStationsOutput[]>;
  listStations(ctx: Context): Promise<StationsOutput[]>;
  installStation(
    data: StationInput,
    ctx: Context
  ): Promise<SuitableStationsOutput>;
}
