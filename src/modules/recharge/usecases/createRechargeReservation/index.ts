import RechargeRepo from "../../repository/RechargeRepo";
import CreateRechargeReservation from "./createRechargeReservation";

const createRechargeReservation = new CreateRechargeReservation(
  new RechargeRepo()
);

export { createRechargeReservation };
