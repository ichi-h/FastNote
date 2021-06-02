import { calcDateDiff } from "../../lib/fastNoteDate";

describe("calcDateDiff", () => {
  let currentDate: Date;
  let memoDate: Date;

  beforeEach(() => {
    currentDate = new Date(2021, 0, 1, 0, 0, 0);
    memoDate = new Date(2021, 0, 1, 0, 0, 0);
  });

  it("「○秒前」で表示されるか", () => {
    memoDate.setSeconds(memoDate.getSeconds() - 30);
    expect(calcDateDiff(currentDate, memoDate)).toBe("30 秒前");
  });

  it("「○分前」で表示されるか", () => {
    memoDate.setMinutes(memoDate.getMinutes() - 3);
    expect(calcDateDiff(currentDate, memoDate)).toBe("3 分前");
  });

  it("「○時間前」で表示されるか", () => {
    memoDate.setHours(memoDate.getHours() - 3);
    expect(calcDateDiff(currentDate, memoDate)).toBe("3 時間前");
  });

  describe("Y/M/Dで表示されるか", () => {
    it("日付違い", () => {
      memoDate.setDate(memoDate.getDate() - 3);
      expect(calcDateDiff(currentDate, memoDate)).toBe("2020/12/29");
    });

    it("月違い", () => {
      memoDate.setMonth(memoDate.getMonth() - 3);
      expect(calcDateDiff(currentDate, memoDate)).toBe("2020/10/1");
    });

    it("年違い", () => {
      memoDate.setFullYear(memoDate.getFullYear() - 3);
      expect(calcDateDiff(currentDate, memoDate)).toBe("2018/1/1");
    });
  });
});
