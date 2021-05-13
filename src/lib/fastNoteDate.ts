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

  let slicedStrDate = [
    strDate.slice(0, 4),
    strDate.slice(4, 6),
    strDate.slice(6, 8),
    strDate.slice(8, 10),
    strDate.slice(10, 12),
    strDate.slice(12, 14),
  ];

  if (cutTime) {
    for (let _i = 0; _i < 3; _i++) {
      slicedStrDate.pop();
    }
  }

  return slicedStrDate.reduce((pre, cur) => `${pre}/${cur}`);
}

export function strToNum(strDate: string) {
  return Number(strDate.replaceAll("/", ""));
}
