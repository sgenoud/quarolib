import { dateMatch } from './matcher';

describe('test date match', () => {
  test('single month days match correctly', () => {
    // Months are 0 indexed in dates
    expect(dateMatch('1/22')(new Date(2018, 1, 22))).toBeFalsy();

    expect(dateMatch('1/22')(new Date(2018, 0, 22))).toBeTruthy();
    expect(dateMatch('12/22')(new Date(2018, 11, 22))).toBeTruthy();
  });

  test('single days match correctly', () => {
    expect(dateMatch('22')(new Date(2018, 0, 22))).toBeTruthy();
    expect(dateMatch('22')(new Date(2018, 1, 22))).toBeTruthy();
    expect(dateMatch('22')(new Date(2018, 2, 22))).toBeTruthy();
    expect(dateMatch('22')(new Date(2018, 3, 22))).toBeTruthy();
    expect(dateMatch('22')(new Date(2018, 4, 22))).toBeTruthy();
    expect(dateMatch('22')(new Date(2018, 11, 22))).toBeTruthy();
    expect(dateMatch('22')(new Date(2018, 11, 23))).toBeFalsy();
    expect(dateMatch('11')(new Date(2018, 11, 23))).toBeFalsy();
    expect(dateMatch('11')(new Date(2018, 10, 23))).toBeFalsy();
  });

  test('weekdays in month match correctly', () => {
    expect(dateMatch('3/(1)')(new Date(2019, 2, 4))).toBeTruthy();
    expect(dateMatch('3/(1)')(new Date(2019, 2, 11))).toBeTruthy();
    expect(dateMatch('3/(1)')(new Date(2019, 2, 18))).toBeTruthy();
    expect(dateMatch('3/(1)')(new Date(2019, 2, 25))).toBeTruthy();
    expect(dateMatch('3/(1)')(new Date(2019, 1, 25))).toBeFalsy();
    expect(dateMatch('3/(1)')(new Date(2019, 2, 26))).toBeFalsy();
    expect(dateMatch('3/(1)')(new Date(2019, 3, 1))).toBeFalsy();
  });

  test('weekdays alone match correctly', () => {
    expect(dateMatch('(1)')(new Date(2019, 2, 4))).toBeTruthy();
    expect(dateMatch('(1)')(new Date(2019, 2, 11))).toBeTruthy();
    expect(dateMatch('(1)')(new Date(2019, 2, 18))).toBeTruthy();
    expect(dateMatch('(1)')(new Date(2019, 2, 25))).toBeTruthy();
    expect(dateMatch('(1)')(new Date(2019, 1, 25))).toBeTruthy();
    expect(dateMatch('(1)')(new Date(2019, 3, 1))).toBeTruthy();

    expect(dateMatch('(1)')(new Date(2019, 2, 26))).toBeFalsy();
  });

  test('specific weekdays in month match correctly', () => {
    expect(dateMatch('3/(1,1)')(new Date(2019, 2, 4))).toBeTruthy();
    expect(dateMatch('3/(1,2)')(new Date(2019, 2, 11))).toBeTruthy();
    expect(dateMatch('3/(1,3)')(new Date(2019, 2, 18))).toBeTruthy();
    expect(dateMatch('3/(1,4)')(new Date(2019, 2, 25))).toBeTruthy();

    expect(dateMatch('3/(1,-1)')(new Date(2019, 2, 25))).toBeTruthy();
    expect(dateMatch('3/(1,-2)')(new Date(2019, 2, 18))).toBeTruthy();
    expect(dateMatch('3/(1,-3)')(new Date(2019, 2, 11))).toBeTruthy();
    expect(dateMatch('3/(1,-4)')(new Date(2019, 2, 4))).toBeTruthy();

    expect(dateMatch('(1,-1)')(new Date(2019, 2, 25))).toBeTruthy();
    expect(dateMatch('(1,-2)')(new Date(2019, 2, 18))).toBeTruthy();
    expect(dateMatch('(1,-3)')(new Date(2019, 2, 11))).toBeTruthy();
    expect(dateMatch('(1,-4)')(new Date(2019, 2, 4))).toBeTruthy();
  });

  test('easter definition', () => {
    expect(dateMatch('easter')(new Date(2019, 2, 4))).toBeFalsy();
    expect(dateMatch('easter')(new Date(2019, 3, 21))).toBeTruthy();
    expect(dateMatch('easter+1')(new Date(2019, 3, 22))).toBeTruthy();
    expect(dateMatch('easter-2')(new Date(2019, 3, 19))).toBeTruthy();
    expect(dateMatch('easter-2')(new Date(2019, 4, 19))).toBeFalsy();
  });
});
