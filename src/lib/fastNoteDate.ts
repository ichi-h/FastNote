import { DateInfo } from "./fastNoteDB";

export function getCurrentDate(date: Date): DateInfo {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  };
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

export function calcDateDiff(currentDate: Date, memoDate: Date) {
  const currentTime = Math.floor(currentDate.getTime() / 1000);
  const memoTime = Math.floor(memoDate.getTime() / 1000);
  const diff = currentTime - memoTime;

  if (diff < 60) {
    return `${diff} 秒前`;
  } else if (diff < 60 ** 2) {
    const res = Math.floor(diff / 60);
    return `${res} 分前`;
  } else if (diff < 60 ** 2 * 24) {
    const res = Math.floor(diff / 60 / 60);
    return `${res} 時間前`;
  } else {
    const year = memoDate.getFullYear();
    const month = memoDate.getMonth() + 1;
    const date = memoDate.getDate();
    return `${year}/${month}/${date}`;
  }
}

export function dateInfoToNum(dateInfo: DateInfo) {
  const list = [
    String(dateInfo.year),
    addZero(dateInfo.month + 1),
    addZero(dateInfo.date),
    addZero(dateInfo.hours),
    addZero(dateInfo.minutes),
    addZero(dateInfo.seconds),
  ];

  return Number(list.join(""));
}

export function addZero(num: number) {
  if (num < 10) {
    return `0${num}`;
  } else {
    return `${num}`;
  }
}
