import { vd } from '../locale/ch';

export default (date, options) => {
  const { locale = defaultLocale } = options;
  return locale.holidays.some(({ match }) => match(date));
};
