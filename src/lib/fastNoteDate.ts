import { DateInfo } from "./databaseInfo";

export function getCurrentDate(date: Date): DateInfo {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  }
}

export function dateInfoToDate(dateInfo: DateInfo) {
  return new Date(
    dateInfo.year,
    dateInfo.month,
    dateInfo.date,
    dateInfo.hours,
    dateInfo.minutes,
    dateInfo.seconds
  );
}

export function numToStr(numDate: number, cutTime: boolean) {
  const strDate = String(numDate);

  const slicedStrDate = [
    strDate.slice(0, 4),
    strDate.slice(4, 6),
    strDate.slice(6, 8),
  ];

  const slicedStrTime = [
    strDate.slice(8, 10),
    strDate.slice(10, 12),
    strDate.slice(12, 14),
  ];

  const gluedStrDate = slicedStrDate.reduce((pre, cur) => `${pre}/${cur}`);
  const gluedStrTime = slicedStrTime.reduce((pre, cur) => `${pre}:${cur}`);

  if (cutTime) return gluedStrDate;
  else return `${gluedStrDate} - ${gluedStrTime}`;
}

export function strToNum(strDate: string) {
  return Number(strDate.replaceAll("/", ""));
}
