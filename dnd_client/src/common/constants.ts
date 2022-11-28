 import { decode } from "html-entities";


export const removeLastFourCharFromString = (value: string) => {
  if (value) {
    return value.substr(0, value.length - 4);
  }
  return null;
};

export const removeFirstThreeCharFromString = (value: string) => {
  if (value) {
    return value.substr(3, value.length);
  }
  return null;
};

export const removeLineBreakFromEndOfString = (value: string) => {
  if (value) {
    return value.replace(/[\r\n]+/gm, "");
  }
  return null;
};

export const decodeHtml = (text: string) => {
  let html = decode(text, { level: "html5" });
  return html;
};
