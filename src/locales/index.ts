import zhCN from "./zh-CN.json";
import zhHK from "./zh-HK.json";
import enUS from "./en-US.json";

const locales: Record<string, any> = {
  "zh-CN": zhCN,
  "zh-HK": zhHK,
  "en-US": enUS,
};

export const localeOptions = [
  {
    label: "中文简体",
    value: "zh-CN",
  },
  {
    label: "中文繁体",
    value: "zh-HK",
  },
  {
    label: "English",
    value: "en-US",
  },
];

export default locales;
