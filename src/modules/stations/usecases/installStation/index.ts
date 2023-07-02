import StationsRepo from "../../repository/StationsRepo";
import InstallStation from "./installStation";

const installStation = new InstallStation(new StationsRepo());

export { installStation };
