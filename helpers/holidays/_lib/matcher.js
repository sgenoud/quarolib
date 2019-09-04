import { addWeeks, subWeeks, isBefore, isAfter, setDate, setMonth, subDays } from 'date-fns';

const parseNumber = (definition, name = 'definition') => {
  const number = parseInt(definition, 10);
  if (Number.isNaN(number)) throw new Error(`Could not parse ${name} ${definition}.`);
  return number;
};

const easterDateMonth = function easterDateMonth(year) {
  const century = Math.floor(year / 100);

  // Black magic to compute easter
  const n = year - 19 * Math.floor(year / 19);
  const k = Math.floor((century - 17) / 25);
  let i = century - Math.floor(century / 4) - Math.floor((century - k) / 3) + 19 * n + 15;
  i -= 30 * Math.floor(i / 30);
  i -=
    Math.floor(i / 28) *
    (1 - Math.floor(i / 28) * Math.floor(29 / (i + 1)) * Math.floor((21 - n) / 11));
  let j = year + Math.floor(year / 4) + i + 2 - century + Math.floor(century / 4);
  j -= 7 * Math.floor(j / 7);
  const l = i - j;

  const month = 3 + Math.floor((l + 40) / 44);
  const day = l + 28 - 31 * Math.floor(month / 4);

  return [month - 1, day];
};

const thisYear = new Date().getFullYear();
const easterCache = {};
[-1, -2, -3, -4, -5, -6, -7, -8, -9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(v => {
  const year = thisYear + v;
  easterCache[year] = easterDateMonth(year);
});

const isEaster = date => {
  const year = date.getFullYear();
  const [easterMonth, easterDate] = easterCache[year] || easterDateMonth(year);
  return date.getMonth() === easterMonth && date.getDate() === easterDate;
};

const easterMatch = definition => {
  if (!definition) return isEaster;

  const easterCorrection = parseNumber(definition, 'easter correction');
  return date => isEaster(subDays(date, easterCorrection));
};

const dayMatch = definition => {
  if (!definition) return () => true;

  const dayOfMonth = parseNumber(definition, 'day');

  return date => {
    return date.getDate() === dayOfMonth;
  };
};

const monthMatch = definition => {
  if (!definition) return () => true;
  const month = parseNumber(definition, 'month');

  return date => {
    return date.getMonth() === month - 1;
  };
};

const simpleWeekdayMatch = definition => {
  if (!definition) return () => true;

  const weekday = parseNumber(definition, 'weekday');

  return date => {
    return date.getDay() === weekday;
  };
};

const correctWeek = (monthDefinition, weekInMonthDefinition) => {
  const weekInMonth = parseNumber(weekInMonthDefinition, 'week in month');

  let month = null;
  if (monthDefinition) {
    month = parseNumber(monthDefinition, 'month') - 1;
  }

  if (weekInMonth < 0) {
    return date => {
      const localMonth = month === null ? date.getMonth() : month;
      return (
        addWeeks(date, -1 - weekInMonth).getMonth() === localMonth &&
        addWeeks(date, -weekInMonth).getMonth() === localMonth + 1
      );
    };
  }

  return date => {
    const localMonth = month === null ? date.getMonth() : month;
    return (
      subWeeks(date, weekInMonth - 1).getMonth() === localMonth &&
      subWeeks(date, weekInMonth).getMonth() === localMonth - 1
    );
  };
};

const correctRelativeDate = (monthDefinition, relativeDateDefinition) => {
  const relativeDate = parseNumber(relativeDateDefinition, 'relative date');
  let month = null;
  if (monthDefinition) {
    month = parseNumber(monthDefinition, 'month') - 1;
  }

  if (relativeDate < 0) {
    return date => {
      const localMonth = month === null ? date.getMonth() : month;

      if (date.getMonth() === localMonth && date.getDate() === -relativeDate) return true;
      const fullRelativeDate = setDate(setMonth(date, localMonth), -relativeDate);
      return isBefore(date, fullRelativeDate) && isAfter(date, subWeeks(fullRelativeDate, 1));
    };
  }

  return date => {
    const localMonth = month === null ? date.getMonth() : month;

    if (date.getMonth() === localMonth && date.getDate() === relativeDate) return true;
    const fullRelativeDate = setDate(setMonth(date, localMonth), relativeDate);
    return isAfter(date, fullRelativeDate) && isBefore(date, addWeeks(fullRelativeDate, 1));
  };
};

const weekdayMatch = (dayDefinition, month) => {
  const matchMonth = monthMatch(month);

  if (!dayDefinition.includes(',')) {
    const matchSimpleWeekday = simpleWeekdayMatch(dayDefinition);
    return date => matchMonth(date) && matchSimpleWeekday(date);
  }

  const [weekDay, config] = dayDefinition.split(',');
  const matchSimpleWeekday = simpleWeekdayMatch(weekDay);

  if (config.startsWith('[')) {
    return date => {
      return matchSimpleWeekday(date) && correctRelativeDate(month, config.slice(1, -1))(date);
    };
  }

  const matchCorrectWeek = correctWeek(month, config);

  return date => matchMonth(date) && matchSimpleWeekday(date) && matchCorrectWeek(date);
};

export const dateMatch = sourceDefinition => {
  const definition = sourceDefinition.replace(' ', '');
  if (!definition) throw new Error(`Could not parse empty definition.`);

  // if (definition.includes('|')) return rangeMatch(definition);

  if (definition.startsWith('easter')) return easterMatch(definition.replace('easter', ''));

  let [month, day] = definition.split('/');
  if (!day) {
    day = month;
    month = '';
  }

  if (day.startsWith('(') && day.endsWith(')')) {
    return weekdayMatch(day.slice(1, -1), month);
  }

  const matchMonth = monthMatch(month);
  const matchDay = dayMatch(day);

  return date => matchMonth(date) && matchDay(date);
};
