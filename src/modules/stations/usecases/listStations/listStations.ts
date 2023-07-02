import { Context } from "../../../../../prisma/index";

import IStationsRepo from "../../repository/IStationsRepo";

export default class listStations {
  constructor(private stationsRepo: IStationsRepo) {}

  async execute(ctx: Context) {
    return await this.stationsRepo.listStations(ctx);
  }
}
