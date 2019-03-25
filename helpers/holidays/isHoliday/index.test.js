import isHoliday from './index';

import ch from '../locale/ch';
import fr from '../locale/fr';

describe('testing the isHoliday function', () => {
  it('correctly finds holidays', () => {
    expect(isHoliday(new Date(2019, 3, 21), { locale: ch.vd })).toBeTruthy();
    expect(isHoliday(new Date(2019, 3, 21), { locale: fr })).toBeTruthy();

    expect(isHoliday(new Date(2019, 3, 20), { locale: ch.vd })).toBeFalsy();
    expect(isHoliday(new Date(2019, 3, 20), { locale: fr })).toBeFalsy();
    expect(isHoliday(new Date(2009, 11, 25), { locale: ch.vd })).toBeTruthy();
  });

  it('correctly finds holidays depending on region', () => {
    expect(isHoliday(new Date(2019, 3, 19), { locale: ch.vd })).toBeTruthy();
    expect(isHoliday(new Date(2019, 3, 19), { locale: ch.vs })).toBeFalsy();

    expect(isHoliday(new Date(2019, 10, 11), { locale: ch.vs })).toBeFalsy();
    expect(isHoliday(new Date(2019, 10, 11), { locale: fr })).toBeTruthy();
  });
});
