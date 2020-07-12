import color from 'color';
import { Color } from "csstype";
import 'normalize.css';
// import 'apercu-font';
import 'typeface-muli';

interface ThemeMedia {
  mobile?: string;
  web?: string;
  tablet?: string;
}

export interface Theme {
  fontFamily: string;
  colorPrimary: Color;
  colorPrimaryLight: Color;
  colorSecondary: Color;
  colorRed: Color;
  colorGreen: Color;
  colorBlue: Color;
  colorAmber: Color;
  colorGrey: Color;
  colorWhite: Color;
  textPrimary: Color;
  textSecondary: Color;
  colorRandom(): string;
  media: ThemeMedia;
}

const primaryColor = color("#FE3E57", "hex")

const colorGreen = "#4caf50";
const colorBlue = "#2196f3";
const colorAmber = "#ff9800";
const theme: Theme = {
  fontFamily: `"Muli",-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol`,
  colorPrimary: primaryColor.hsl().string(),
  colorPrimaryLight: primaryColor.lighten(0.4).hsl().string(),
  colorSecondary: "#1F2255",
  colorRed: "#f44336",
  colorWhite: primaryColor.lighten(0.99).hsl().string(),
  colorGreen,
  colorBlue,
  colorAmber,
  colorGrey: "#e6e6e6",
  textPrimary: "#484848",
  textSecondary: "#906e62",
  media: {
    mobile: "@media all and (max-width: 414px)"
  },
  colorRandom: (): string => {
    const number = Math.floor(Math.random() * 3);

    if (number === 0) return colorGreen;

    if (number === 1) return colorBlue;

    return colorAmber;
  }
};

export default theme;
