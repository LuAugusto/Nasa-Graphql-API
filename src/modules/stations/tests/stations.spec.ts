import "reflect-metadata";
import { StationsResolver } from "../resolvers/StationsResolver";
import { Context } from "../../../../prisma/index";
import { PrismaClient } from "@prisma/client";
import { prismaMock } from "./prismaMock";

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn(() => prismaMock),
}));

const token = "23d1da42-a8b8-4456-bda1-a69f0ea1a805";

describe("Recharge resolver mutation", () => {
  let prisma: PrismaClient;
  let ctx: Context;

  const stationsResolver = new StationsResolver();

  beforeAll(async () => {
    prisma = new PrismaClient();
    ctx = { prisma };
    prismaMock.tokens.findUnique.mockReturnValue(true);
  });

  it("Should be able to list stations", async () => {
    const data = [
      {
        id: "cljk2nbau0096f5tycpbju0tk",
        planetId: "cljk2n12m0002f5tyy0qv68a9",
        suitablePlanets: {
          id: "cljk2n12m0002f5tyy0qv68a9",
          mass: 10,
        },
      },
      {
        id: "3213213123qwdwqdqwd",
        planetId: "cljk2n12m0002f5tyy0qv68a9",
        suitablePlanets: {
          id: "cljk2n12m0002f5tyy0qv68a9",
          mass: 10,
        },
      },
      {
        id: "wdqqwqwd212131231",
        planetId: "cljk2n12m0002f5tyy0qv68a9",
        suitablePlanets: {
          id: "cljk2n12m0002f5tyy0qv68a9",
          mass: 10,
        },
      },
    ];
    prismaMock.stations.findMany.mockResolvedValue(data);

    const result = await stationsResolver.listStations(token, ctx);

    expect(result).toEqual(data);
  });
  it("Should be ", async () => {
    const data = [
      {
        id: "cljk2n12m0003f5tyhdlfed7e",
        name: "HD 110014 b",
        mass: 11.09,
        hasStation: false,
      },
      {
        id: "cljk2n12m0004f5tyvqx372eq",
        name: "HD 156846 b",
        mass: 10.57,
        hasStation: false,
      },
      {
        id: "cljk2n12m0005f5tyz95irhei",
        name: "CHXR 73 b",
        mass: 12.569,
        hasStation: false,
      },
    ];
    prismaMock.suitablePlanets.findMany.mockResolvedValue(data);
    const result = await stationsResolver.getSuitableStations(token, ctx);

    expect(result).toEqual(data);
  });
});
