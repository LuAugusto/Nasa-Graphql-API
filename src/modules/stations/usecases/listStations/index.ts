import StationsRepo from "../../repository/StationsRepo";
import ListStations from "./listStations";

const listStations = new ListStations(new StationsRepo());

export { listStations };
