import StationsRepo from "../../repository/StationsRepo";
import GetSuitableStations from "./getSuitableStations";

const getSuitableStations = new GetSuitableStations(new StationsRepo());

export { getSuitableStations };
