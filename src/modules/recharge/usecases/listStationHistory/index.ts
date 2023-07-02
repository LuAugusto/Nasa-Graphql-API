import RechargeRepo from "../../repository/RechargeRepo";
import ListStationHistory from "./listStationHistory";

const listStationHistory = new ListStationHistory(new RechargeRepo());

export { listStationHistory };
