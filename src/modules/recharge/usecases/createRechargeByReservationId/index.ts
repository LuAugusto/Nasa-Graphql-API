import RechargeRepo from "../../repository/RechargeRepo";
import CreateRechargeByReservationId from "./createRechargeByReservationId";

const createRechargeByReservationId = new CreateRechargeByReservationId(
  new RechargeRepo()
);

export { createRechargeByReservationId };
