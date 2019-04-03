import ch from '../locale/ch';

export default (date, options) => {
  const { locale = ch.vd } = options;
  return locale.holidays.some(({ match }) => match(date));
};
