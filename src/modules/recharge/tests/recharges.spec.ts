import "reflect-metadata";
import { RechargeResolver } from "../resolvers/RechargeResolvers";
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

  const recharResolver = new RechargeResolver();

  beforeAll(async () => {
    prisma = new PrismaClient();
    ctx = { prisma };
    prismaMock.tokens.findUnique.mockReturnValue(true);
  });

  it("Should create a recharge", async () => {
    const endDate = new Date();
    endDate.setHours(endDate.getHours() + 1);
    prismaMock.recharge.create.mockResolvedValue({
      id: "123",
      status: "active",
      end: endDate,
    });

    const mockData = {
      stationId: "teste123",
      userId: "usersId",
      end: endDate,
    };
    const result = await recharResolver.createRecharge(mockData, token, ctx);

    expect(result).toHaveProperty("id");
    expect(result.end).toEqual(mockData.end);
  });

  it("Should update a recharge status", async () => {
    const mockData = {
      id: "12345",
      status: "COMPLETED",
    };
    prismaMock.recharge.findFirst.mockResolvedValue({
      id: "12345",
      status: "IN_PROGRESS",
    });
    prismaMock.recharge.update.mockResolvedValue({
      id: "12345",
      status: mockData.status,
    });

    const result = await recharResolver.updateRechargeStatus(
      mockData,
      token,
      ctx
    );

    expect(result.id).toEqual(mockData.id);
    expect(result.status).toEqual(mockData.status);
  });
  it("Should list a recharge station history", async () => {
    const mockData = {
      id: "12345",
    };
    const list = [
      {
        id: "12345",
        status: "IN_PROGRESS",
      },
      {
        id: "123456",
        status: "COMPLETED",
      },
      {
        id: "123457",
        status: "COMPLETED",
      },
    ];
    prismaMock.recharge.findMany.mockResolvedValue(list);

    const result = await recharResolver.listStationHistory(
      mockData,
      token,
      ctx
    );

    expect(result).toEqual(list);
    expect(result).toHaveLength(3);
  });
});
