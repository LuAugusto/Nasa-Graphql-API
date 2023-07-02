import RechargeRepo from "../../repository/RechargeRepo";
import CreateRecharge from "./createRecharge";

const createRecharge = new CreateRecharge(new RechargeRepo());

export { createRecharge };
