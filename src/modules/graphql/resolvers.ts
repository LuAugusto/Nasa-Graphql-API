import { NonEmptyArray } from "type-graphql";
import { UserResolver } from "../users/resolvers/UserResolver";
import { StationsResolver } from "../stations/resolvers/StationsResolver";
import { RechargeResolver } from "../recharge/resolvers/RechargeResolvers";

export const listResolvers: NonEmptyArray<Function> = [
  UserResolver,
  StationsResolver,
  RechargeResolver,
];
