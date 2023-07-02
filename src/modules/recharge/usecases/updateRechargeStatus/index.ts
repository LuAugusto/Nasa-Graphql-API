import RechargeRepo from "../../repository/RechargeRepo";
import UpdateRechargeStatus from "./updateRechargeStatus";

const updateRechargeStatus = new UpdateRechargeStatus(new RechargeRepo());

export { updateRechargeStatus };
