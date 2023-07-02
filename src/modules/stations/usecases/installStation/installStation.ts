import { Context } from "../../../../../prisma/index";
import { StationInput } from "../../dto/Stations";

import IStationsRepo from "../../repository/IStationsRepo";

export default class InstallStations {
  constructor(private stationsRepo: IStationsRepo) {}

  async execute(data: StationInput, ctx: Context) {
    return await this.stationsRepo.installStation(data, ctx);
  }
}
