import { Theme } from "../../utils/theme";
import { TextProps } from './Text';

const defaultStyles = (theme: Theme, props: TextProps) => ({
  fontFamily: theme.fontFamily,
  fontWeight: 700,
  margin: 0,
  marginBottom: 4,
  color: colorFromProps(props, theme)
});

const colorFromProps = (props: TextProps, theme: Theme): string => {
  let color = theme.textPrimary;

  if (props.primaryColor) color = theme.colorPrimary;

  if (props.secondaryColor) color = theme.colorSecondary;

  if (props.red) color = theme.colorRed;

  if (props.green) color = theme.colorGreen;

  if (props.grey) color = theme.colorGrey;

  return color;
}

const styles = (theme: Theme) => ({
  h1: (props: TextProps) => ({
    ...defaultStyles(theme, props),
    fontSize: 64,
    marginBottom: 8,
  }),
  h2: (props: TextProps) => ({
    ...defaultStyles(theme, props),
    fontSize: 48,
  }),
  h3: (props: TextProps) => ({
    ...defaultStyles(theme, props),
    fontSize: 32,
  }),
  h4: (props: TextProps) => ({
    ...defaultStyles(theme, props),
    fontSize: 24,
    marginBottom: 16,
  }),
  caption: (props: TextProps) => ({
    ...defaultStyles(theme, props),
    wordWrap: "break-word",
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: "0.08333333333333333em",
    textTransform: "uppercase",
    userSelect: 'none'
  }),
  p: (props: TextProps) => ({
    ...defaultStyles(theme, props),
    fontSize: 16,
    fontWeight: 400,
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
