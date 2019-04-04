/* global expect describe it */
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

    expect(isHoliday(new Date(2019, 8, 16), { locale: ch.vd })).toBeTruthy();
    expect(isHoliday(new Date(2019, 8, 16), { locale: ch.fr })).toBeFalsy();
  });

  it('correctly finds holidays depending on region', () => {
    expect(isHoliday(new Date(2019, 3, 19), { locale: ch.vd })).toBeTruthy();
    expect(isHoliday(new Date(2019, 3, 19), { locale: ch.vs })).toBeFalsy();

    expect(isHoliday(new Date(2019, 10, 11), { locale: ch.vs })).toBeFalsy();
    expect(isHoliday(new Date(2019, 10, 11), { locale: fr })).toBeTruthy();
  });

  it('correctly finds all the holidays in a valais in 2019', () => {
    expect(isHoliday(new Date(2015, 0, 1), { locale: ch.vs })).toBeTruthy();
    expect(isHoliday(new Date(2015, 2, 19), { locale: ch.vs })).toBeTruthy();
    expect(isHoliday(new Date(2015, 3, 5), { locale: ch.vs })).toBeTruthy();
    expect(isHoliday(new Date(2015, 3, 6), { locale: ch.vs })).toBeTruthy();
    expect(isHoliday(new Date(2015, 4, 14), { locale: ch.vs })).toBeTruthy();
    expect(isHoliday(new Date(2015, 4, 24), { locale: ch.vs })).toBeTruthy();
    expect(isHoliday(new Date(2015, 4, 25), { locale: ch.vs })).toBeTruthy();
    expect(isHoliday(new Date(2015, 5, 4), { locale: ch.vs })).toBeTruthy();
    expect(isHoliday(new Date(2015, 7, 1), { locale: ch.vs })).toBeTruthy();
    expect(isHoliday(new Date(2015, 7, 15), { locale: ch.vs })).toBeTruthy();
    expect(isHoliday(new Date(2015, 10, 1), { locale: ch.vs })).toBeTruthy();
    expect(isHoliday(new Date(2015, 11, 8), { locale: ch.vs })).toBeTruthy();
    expect(isHoliday(new Date(2015, 11, 25), { locale: ch.vs })).toBeTruthy();

    // Not a holiday in Valais
    expect(isHoliday(new Date(2015, 0, 2), { locale: ch.vs })).toBeFalsy();
    expect(isHoliday(new Date(2015, 2, 1), { locale: ch.vs })).toBeFalsy();
    expect(isHoliday(new Date(2015, 3, 3), { locale: ch.vs })).toBeFalsy();
    expect(isHoliday(new Date(2015, 4, 1), { locale: ch.vs })).toBeFalsy();
    expect(isHoliday(new Date(2015, 9, 21), { locale: ch.vs })).toBeFalsy();
    expect(isHoliday(new Date(2015, 11, 26), { locale: ch.vs })).toBeFalsy();
  });
});
