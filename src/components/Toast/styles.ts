import { Theme } from "../../utils/theme";

export default (theme: Theme) => ({
  body: {
    borderRadius: 8,
    padding: 16,
    color: theme.textPrimary,
    fontFamily: theme.fontFamily,
    fontWeight: 'bold',
  },
  progress: {
    background: theme.colorPrimary,
  },
  toast: {
    borderRadius: 4,
  },
  container: {
    userSelect: 'none'
  }
});

export type Classes = {
  progress: string;
  body: string;
  toast: string;
  container: string;
};
