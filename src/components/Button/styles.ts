import { JssStyle } from 'jss';

import { Func } from '../../types/constants';
import { Theme } from "../../utils/theme";
import { ButtonProps } from "./Button";

const defaultStyles = (theme: Theme) => ({
  display: "inline-block",
  textDecoration: "none",
  textAlign: "center",
  position: "relative",
  border: 0,
  WebkitBoxShadow: "0 1px 5px 0 rgba(0,0,0,0.06)",
  boxShadow: "0 1px 5px 0 rgba(0,0,0,0.06)",
  fontSize: 16,
  outline: "none",
  fontWeight: "bold",
  minWidth: 88,
  margin: "8px 0",
  WebkitAppearance: "none",
  MozAppearance: "none",
  appearance: "none",
  cursor: 'pointer',
  borderRadius: 4,
  fontFamily: theme.fontFamily,
  padding: "16px 32px"
});

export default (theme: Theme): Record<string | number | symbol, string | JssStyle | Func<string | JssStyle>> => ({
  [theme.media.mobile as any]: {
    button: {
      width: "100%"
    },
    secondary: {
      width: "100%"
    },
    link: {
      width: "calc(100% - 66px)"
    }
  },
  button: {
    ...defaultStyles(theme),
    background: ({ danger, success, disabled, loading }: ButtonProps) => {
      if (disabled || loading) return theme.colorGrey;

      if (danger) return theme.colorRed;

      if (success) return theme.colorGreen;

      return theme.colorPrimary;
    },
    border: 0,
    color: "#fff",
    textShadow: "0 1px 0 rgba(0,0,0,0.03)"
  },
  secondary: {
    ...defaultStyles(theme),
    background: ({ danger, success, disabled, loading }: ButtonProps) => {
      if (disabled || loading) return theme.colorGrey;

      if (danger) return theme.colorRed;

      if (success) return theme.colorGreen;

      return 'transparent';
    },
    color: ({ danger, success, disabled, loading }: ButtonProps) => {
      if (disabled || loading) return 'white';

      if (danger) return 'white'

      if (success) return 'white';

      return theme.colorPrimary;
    },
    borderColor: ({ danger, success, disabled, loading }: ButtonProps) => {
      if (disabled || loading) return theme.colorGrey;

      if (danger) return theme.colorRed

      if (success) return theme.colorGreen;

      return theme.colorPrimary;
    },
    backgroundColor: "transparent",
    border: '1px solid',
  },
  flat: {
    ...defaultStyles(theme),
    color: theme.colorPrimary,
    border: 0,
    WebkitBoxShadow: 0,
    boxShadow: 0,
    background: "transparent"
  },
  buttonIcon: {
    fontSize: 8,
    width: 24,
    height: 24,
    position: 'absolute',
    right: 16,
    bottom: '50%',
    marginBottom: -12,
    userSelect: 'none',
    pointerEvents: 'none'
  }
});

export type Classes = {
  button: string;
  secondary: string;
  flat: string;
  buttonIcon: string;
}
