import { Theme } from "../../utils/theme";

const defaultStyles = (theme: Theme) => ({
  fontFamily: theme.fontFamily,
  fontWeight: 700,
  margin: 0,
  marginBottom: 4
});

const styles = (theme: Theme) => ({
  h1: ({ primaryColor = false }) => ({
    ...defaultStyles(theme),
    fontSize: 64,
    marginBottom: 8,
    letterSpacing: -4,
    color: primaryColor ? theme.colorPrimary : theme.textPrimary,
  }),
  h2: ({ primaryColor = false }) => ({
    ...defaultStyles(theme),
    fontSize: 48,
    letterSpacing: -2,
    color: primaryColor ? theme.colorPrimary : theme.textPrimary,
  }),
  h3: ({ primaryColor = false }) => ({
    ...defaultStyles(theme),
    fontSize: 32,
    letterSpacing: -1,
    color: primaryColor ? theme.colorPrimary : theme.textPrimary,
  }),
  h4: ({ primaryColor = false }) => ({
    ...defaultStyles(theme),
    fontSize: 24,
    color: primaryColor ? theme.colorPrimary : theme.textPrimary,
  }),
  caption: ({ primaryColor = false }) => ({
    ...defaultStyles(theme),
    wordWrap: "break-word",
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: "0.08333333333333333em",
    textTransform: "uppercase",
    color: primaryColor ? theme.colorPrimary : theme.textPrimary,
  }),
  p: ({ primaryColor = false }) => ({
    ...defaultStyles(theme),
    fontSize: 16,
    fontWeight: 400,
    color: primaryColor ? theme.colorPrimary : theme.textPrimary,
    marginBottom: 8,
  }),
  [theme.media.mobile as any]: {
    h1: {
      fontSize: 48
    },
    h2: {
      fontSize: 40
    },
    h3: {
      fontSize: 32
    },
    h4: {
      fontSize: 24
    }
  }
});

export default styles;

export type Classes = {
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  caption: string;
  p: string;
}
