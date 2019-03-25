import { dateMatch } from './matcher';

const regionFilter = region => {
  return ({ regionsBlacklist, regionsWhitelist }) => {
    if (!regionsBlacklist && !regionsWhitelist) return true;

    if (regionsWhitelist && !regionsWhitelist.includes(region)) return false;
    if (regionsBlacklist && regionsBlacklist.includes(region)) return false;

    return true;
  };
};

export default (config, regions = null) => {
  const holidays = Object.keys(config).map(name => {
    const { date, regions: regionsWhitelist, regions_n: regionsBlacklist } = config[name];
    return {
      name,
      match: dateMatch(date),
      regionsBlacklist,
      regionsWhitelist,
    };
  });

  if (!regions) return { holidays };

  const regionsMap = {};
  regions.forEach(region => {
    regionsMap[region] = { holidays: holidays.filter(regionFilter(region)) };
  });

  return regionsMap;
};
