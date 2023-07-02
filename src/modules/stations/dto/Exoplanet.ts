interface ExoplanetDTO {
  pl_name: string;
  pl_bmassj: number;
}

interface ExoplanetResultDTO {
  name: string;
  mass: number;
  hasStation: boolean;
}

function convertExoplanet(exoplanet: ExoplanetDTO): ExoplanetResultDTO {
  return {
    name: exoplanet.pl_name,
    mass: exoplanet.pl_bmassj,
    hasStation: false,
  };
}

export { convertExoplanet, ExoplanetDTO, ExoplanetResultDTO };
