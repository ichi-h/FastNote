const theme = {
  mainColor: "#bcd955",
  subColor: "#f2b950",
  topBarHeight: "5rem",
};

export const remToPx = (rem: string) => {
  let fontSize = getComputedStyle(document.documentElement).fontSize;
  let remNum = Number(rem.replace("rem", ""));

  return remNum * parseFloat(fontSize);
};

export default theme;
