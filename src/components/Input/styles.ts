import { JssStyle } from 'jss';

import { Func } from '../../types/constants';
import { Theme } from "../../utils/theme";

export default (theme: Theme): Record<string | number | symbol, string | JssStyle | Func<string | JssStyle>> => ({
  input: {
    padding: "12px 16px",
    paddingRight: 32,
    outline: "none",
    border: `1px solid ${theme.colorGrey}`,
    borderRadius: 8,
    fontSize: 16,
    width: "calc(100% - 50px)",
    fontFamily: theme.fontFamily
  },
  root: ({ width = '' }) => ({
    position: "relative",
    margin: "8px 0",
    display: "inline-block",
    width
  }),
  placeholder: {
    position: "absolute",
    fontFamily: theme.fontFamily,
    top: 12,
    left: 12,
    userSelect: "none",
    pointerEvents: "none",
    color: "#ccc",
    padding: "0 8px",
    fontSize: 16,
    transition: "all .2s ease-in-out",
    background: "white"
  },
  placeholderActive: {
    top: -6,
    left: 8,
    fontWeight: "bold",
    fontSize: 12,
    color: theme.colorPrimary
  },
  inputActive: {
    border: `1px solid ${theme.colorPrimary}`
  },
  inputIcon: {
    fontSize: 8,
    width: 20,
    height: 20,
    position: 'absolute',
    right: 16,
    bottom: '50%',
    marginBottom: -8,
    userSelect: 'none',
  },
  error: {
    borderColor: theme.colorRed,
    color: theme.colorRed,
  }
});
