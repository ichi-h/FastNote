export class FastNoteDate {
  private currentDate: Date;

  public constructor() {
    this.currentDate = new Date();
  }

  public getCurrentDate() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth() + 1;
    const date = this.currentDate.getDate();
    const hour = this.currentDate.getHours();
    const minute = this.currentDate.getMinutes();
    const second = this.currentDate.getSeconds();

    const resStr = [
      this.addZero(year),
      this.addZero(month),
      this.addZero(date),
      this.addZero(hour),
      this.addZero(minute),
      this.addZero(second),
    ];

    const resNumber = Number(resStr.join(""));

    return resNumber;
  }

  private addZero(num: number) {
    if (num < 10) {
      return `0${num}`;
    }
    return num;
  }
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
