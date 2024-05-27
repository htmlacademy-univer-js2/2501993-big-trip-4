import dayjs from 'dayjs';

const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = 1440;
const DATE_FORMAT = 'YYYY-MM-DD';
const DATE_TIME_FORMAT = 'DD/MM/YY hh:mm';
const TIME_FORMAT = 'hh:mm';

const humanizeTripPointDueDate = (date) => dayjs(date).format('DD MMM');

const getDaysOutput = (days) => days <= 0 ? '' : `${`${days}`.padStart(2, '0')}D`;

const getHoursOutput = (days, restHours) => (days <= 0 && restHours <= 0) ? '' : `${`${restHours}`.padStart(2, '0')}H`;

const getMinutesOutput = (restMinutes) => `${`${restMinutes}`.padStart(2, '0')}M`;

const getDuration = (dateFrom, dateTo) => {
  const start = dayjs(dateFrom);
  const end = dayjs(dateTo);
  const difference = end.diff(start, 'minute');

  const days = Math.trunc(difference / MINUTES_IN_DAY);
  const restHours = Math.trunc((difference - days * MINUTES_IN_DAY) / MINUTES_IN_HOUR);
  const restMinutes = difference - (days * MINUTES_IN_DAY + restHours * MINUTES_IN_HOUR);

  const daysOutput = getDaysOutput(days);
  const hoursOutput = getHoursOutput(days, restHours);
  const minutesOutput = getMinutesOutput(restMinutes);

  return `${daysOutput} ${hoursOutput} ${minutesOutput}`;
};

const getDate = (date) => dayjs(date).format(DATE_FORMAT);

const getTime = (date) => dayjs(date).format(TIME_FORMAT);

const getDateTime = (date) => dayjs(date).format(DATE_TIME_FORMAT);

const isPointDatePast = (dateTo) => dayjs().diff(dayjs(dateTo), 'minute') > 0;

const isPointDateFuture = (dateFrom) => dayjs(dateFrom).diff(dayjs(), 'minute') > 0;

const isPointDatePresent = (dateFrom, dateTo) => dayjs().diff(dayjs(dateFrom), 'minute') >= 0 && dayjs(dateTo).diff(dayjs(), 'minute') >= 0;

export { humanizeTripPointDueDate, getDuration, getDate, getTime, getDateTime, isPointDatePast, isPointDateFuture, isPointDatePresent };
